---
description: Détectez et regroupez automatiquement les anomalies sur les graphiques
  d'un dashboard, identifiez les tags qui y contribuent et déléguez l'analyse de la
  cause profonde à Bits Investigation.
further_reading:
- link: /dashboards/graph_insights/watchdog_explains/
  tag: Documentation
  text: Analysez une anomalie unique avec Watchdog Explains
- link: /bits_ai/bits_investigation/
  tag: Documentation
  text: Découvrez comment Bits Investigation analyse la cause profonde
site_support_id: dashboard_anomaly_detection
title: Étudiez les anomalies des dashboards
---
## Présentation {#overview}

Datadog détecte les anomalies sur les graphiques de séries temporelles de votre dashboard, regroupe les anomalies concomitantes en problèmes et identifie les tags qui y contribuent le plus. À partir d'une anomalie, vous pouvez affiner la cause sur un graphique unique avec [Watchdog Explains][2], ou déléguer l'analyse de la cause profonde à [Bits Investigation][1].

<div class="alert alert-info">La détection d'anomalies est disponible pour les <a href="/dashboards/widgets/timeseries/">widgets de séries temporelles</a> avec des données {{< ui >}}Metrics{{< /ui >}} (<code>avg</code>, <code>sum</code>, <code>min</code>, et <code>max</code> agrégation ). Les widgets utilisant des fonctions telles que <code>cumsum</code>, <code>anomalies</code>, ou <code>outliers</code> ne sont pas éligibles.</div>

La détection s'exécute lorsque vous ouvrez un dashboard et les problèmes apparaissent en 20 secondes environ. Si Datadog ne détecte aucune anomalie, le menu {{< ui >}}Investigate{{< /ui >}} et les contrôles décrits sur cette page n'apparaissent pas.

Datadog n'exécute pas la détection d'anomalies sur :

- Les dashboards publics (partagés), car aucun utilisateur connecté ne peut agir sur un résultat
- Les dashboards intégrés dans l'application mobile
- Les dashboards en mode TV
- Les dashboards en mode impression
- Les dashboards pour lesquels vous avez désactivé {{< ui >}}Auto-detect issues{{< /ui >}}

## Comment Datadog détecte les anomalies {#how-datadog-detects-anomalies}

Datadog applique la détection d'anomalies aux graphiques de votre dashboard en analysant à la fois la forme et la valeur des séries temporelles sous-jacentes. Il identifie les écarts par rapport aux modèles historiques, en signalant les pics, les creux ou les dérives progressives qui ne correspondent pas au comportement attendu.

Pour tenir compte de la saisonnalité, l'algorithme remonte jusqu'à trois semaines en arrière. Par exemple, si un pic apparaît un lundi à 9h00, Datadog compare ce point de données aux lundis précédents à la même heure. Si des modèles similaires apparaissent de manière cohérente, le pic est traité comme **saisonnier** et n'est pas signalé comme une anomalie. Cela permet de réduire les faux positifs afin que Datadog ne fasse apparaître que les écarts inattendus.

Les anomalies peuvent être des pics ou des chutes brusques, mais peuvent également être des tendances plus subtiles telles que des changements progressifs ou des variations de pente.

## Trouvez les problèmes détectés sur un dashboard {#find-detected-issues-on-a-dashboard}

Cliquez sur {{< ui >}}Investigate{{< /ui >}} en haut du dashboard pour voir les problèmes détectés par Datadog. Chaque problème nomme la métrique qui a dévié et le moment où elle a été détectée. Développer un problème affiche également ses tags influents et le {{< ui >}}Widget affected{{< /ui >}}.

La sélection d'un problème fait défiler le dashboard jusqu'au graphique concerné.

Les anomalies se produisant sur plusieurs widgets à la fois sont regroupées en un seul problème, tel que `Anomalies co-occur on 18 widgets`.

{{< img src="dashboards/graph_insights/investigate_anomalies/investigate_menu.png" alt="Le menu Investigate est ouvert sur un dashboard, listant quatre problèmes détectés avec un bouton bascule Auto-detect issues." style="width:100%;" >}}

## Examinez une anomalie {#review-an-anomaly}

Les anomalies détectées sont surlignées en rose sur le graphique.

1. Survolez une zone surlignée. Une puce apparaît, résumant l'anomalie et son écart par rapport à la plage attendue, par exemple : `The spike is 70% higher than the expected range as inferred from the past 3 weeks of data.`
1. Cliquez sur la fiche pour la développer. La fiche développée contient toujours :
   - **Tags influente** : les tags contribuant le plus à l'anomalie.
   - **Étapes suivantes** : actions de suivi suggérées, telles que l'affichage du service concerné ou la création d'un monitor.

   Certaines anomalies incluent également une section **Co-occurs with**, listant d'autres métriques qui ont dévié sur la même période.

{{< img src="dashboards/graph_insights/investigate_anomalies/anomaly_chip.png" alt="Une fiche d'anomalie développée montrant un tag influent, les étapes suivantes et le bouton Investigate With AI." style="width:100%;" >}}

## Analysez un graphique unique avec Watchdog Explains {#analyze-a-single-graph-with-watchdog-explains}

Pour restreindre une anomalie à un tag spécifique, ouvrez le graphique en plein écran et cliquez sur {{< ui >}}Findings{{< /ui >}}. Ce panneau est alimenté par Watchdog Explains.

Chaque résultat nomme un tag qui explique probablement l'anomalie. Il montre également le graphique avant et après avoir filtré ce tag, afin que vous puissiez confirmer si sa suppression aplatit le pic.

Pour plus d'informations, consultez [Watchdog Explains][2].

## Recherchez la cause première avec Bits Investigation {#investigate-root-cause-with-bits-investigation}

Cliquez sur {{< ui >}}Investigate With AI{{< /ui >}} depuis une fiche d'anomalie développée, depuis le menu {{< ui >}}Investigate{{< /ui >}} ou depuis un résultat de Watchdog Explains. Datadog ouvre [Bits Investigation][1] dans un nouvel onglet, où il analyse l'anomalie et signale une cause première, une évaluation de l'impact et une chronologie.

Si des investigations connexes existent déjà, le bouton indique {{< ui >}}See _N_ Related Investigations{{< /ui >}}, où _N_ est le nombre. Cliquez sur le bouton pour ouvrir une liste filtrée d'investigations. Pour ouvrir une seule investigation, cliquez sur {{< ui >}}Review Completed Investigation{{< /ui >}}.

<div class="alert alert-info">Le nombre d'investigations connexes est limité à l'ensemble du dashboard et à la plage temporelle, et non à l'anomalie que vous consultez. Un nombre égal à un peut signifier qu'une investigation a été lancée à partir d'un autre graphique sur le même dashboard.</div>

Les investigations lancées de cette manière enregistrent {{< ui >}}Dashboard Anomaly{{< /ui >}} comme source et portent un tag `dashboard_id`. Utilisez la source ou le tag pour trouver une investigation dans la liste Bits Investigation.

## Désactivez la détection d'anomalies {#turn-off-anomaly-detection}

Pour arrêter l'analyse des anomalies sur un dashboard, cliquez sur {{< ui >}}Investigate{{< /ui >}} et désactivez {{< ui >}}Auto-detect issues{{< /ui >}}.

Cette préférence s'applique à un seul dashboard et est enregistrée dans votre navigateur. Les autres utilisateurs du même dashboard continuent de voir les anomalies, sauf s'ils désactivent eux-mêmes la détection. La préférence n'est pas non plus transférée vers un autre navigateur ou appareil.

Pour exclure un widget unique de la détection d'anomalies, modifiez le widget, développez {{< ui >}}Anomaly Detection{{< /ui >}} et sélectionnez {{< ui >}}Hide{{< /ui >}}. Ce paramètre fait partie de la définition du widget ; il s'applique donc à tous ceux qui consultent le dashboard.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_investigation/
[2]: /fr/dashboards/graph_insights/watchdog_explains/