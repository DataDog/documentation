---
aliases:
- /fr/graphing/correlations/
- /fr/dashboards/correlations/
description: Détectez automatiquement les anomalies dans les graphiques de séries
  temporelles et identifier les tags contributeurs pour une analyse des causes racines
  plus rapide.
further_reading:
- link: /watchdog/insights/
  tag: Documentation
  text: En savoir plus sur Watchdog Insights
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: Détection d'anomalies, corrélations prédictives - Utilisation de la surveillance
    des métriques assistée par IA
title: Watchdog Explains
---

## Présentation

Watchdog Explains est un assistant d'investigation qui détecte les anomalies sur les graphiques de séries temporelles et identifie quels tags y contribuent. Cela vous permet de concentrer immédiatement votre investigation sur les zones problématiques de votre infrastructure ou de votre pile logicielle.

Pour désactiver Watchdog Explains, consultez la section [Désactivation de la détection d'anomalies](#désactivation-de-la-détection-danomalie).

<div class="alert alert-info">Watchdog Explains est disponible pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de séries temporelles</a> avec des données <strong>Metric</strong> (agrégation avg, sum, min et max).</div>

## Comment Watchdog Explains détecte les anomalies

Watchdog Explains applique la détection d'anomalies aux graphiques de votre dashboard en analysant à la fois la forme et la valeur des séries temporelles sous-jacentes. Il identifie les écarts par rapport aux modèles historiques, signalant les pics, les chutes ou les dérives graduelles qui ne correspondent pas au comportement attendu.

Pour tenir compte de la saisonnalité, l'algorithme remonte jusqu'à trois semaines dans le temps. Par exemple, si un pic apparaît un lundi à 9h00, Watchdog compare ce point de données aux lundis précédents à la même heure. Si des modèles similaires apparaissent de manière cohérente, le pic est traité comme **saisonnier** et n'est pas signalé comme une anomalie. Cela permet de réduire les faux positifs et de garantir que seuls les écarts inattendus sont mis en évidence.

Les anomalies peuvent être des pics ou des chutes brusques, mais peuvent également être des tendances plus subtiles comme des changements d'étape ou des changements de pente.

<div class="alert alert-info">La détection d'anomalies dans Watchdog Explains fonctionne avec les <strong>données Metrics</strong> (agrégation avg, sum, min et max).</div>

## Watchdog Explains isole la cause avec l'analyse dimensionnelle

Vous pouvez commencer votre investigation à partir de n'importe quel graphique de séries temporelles qui utilise des données de métrique. Lorsque Watchdog Explains détecte une anomalie, il met en évidence la région affectée avec une zone rose. Pour commencer l'investigation, cliquez sur **Investigate Anomaly**.

Cela ouvre une vue d'investigation en plein écran. Watchdog analyse l'anomalie et met en évidence tous les groupes de tags qui ont contribué de manière significative à la forme ou à l'échelle de l'anomalie. Cliquez sur un tag pour voir comment la suppression ou l'isolation de cette dimension affecte le graphique. Utilisez cela pour identifier les causes racines comme des clients, services ou environnements spécifiques.

{{< img src="/dashboards/graph_insights/watchdog_explains/isolation_tag_breakdown.png" alt="Répartition des tags dans l'investigation Watchdog Explains" style="width:100%;" >}}


## Désactivation de la détection d'anomalie

<div class="alert alert-info">Vous pouvez désactiver l'analyse des anomalies sur n'importe quel dashboard. Cela n'affecte que votre vue, les autres utilisateurs du dashboard voient toujours les anomalies sauf s'ils la désactivent.
</div>

{{< img src="/dashboards/graph_insights/watchdog_explains/disable_anomaly_detection.png" alt="Désactivation de la détection d'anomalies dans Watchdog Explains" style="width:100%;" >}}

Pour désactiver la détection d'anomalies sur un dashboard, ouvrez **Anomalies** en haut du dashboard et cliquez sur **Turn Off**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}