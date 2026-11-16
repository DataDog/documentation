---
aliases:
- /fr/bits_ai/bits_ai_sre/investigate_alerts/
- /fr/bits_ai/bits_investigation/investigate_alerts/
- /fr/bits_ai/bits_ai_sre/investigate_issues/
description: Utilisez Bits Investigation pour enquêter automatiquement sur les alertes
  de monitor et fournir une analyse de la cause racine, permettant une résolution
  d'incident plus rapide.
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-sre-deeper-reasoning
  tag: Blog
  text: 'Découvrez le nouveau Bits Investigation : un raisonnement plus approfondi,
    deux fois plus rapide'
title: Investigate Issues
---
## Démarrer une Bits Investigation {#start-a-bits-investigation}

Vous pouvez lancer Bits Investigation depuis plusieurs points d'entrée :

- Alertes de monitor, que vous pouvez déclencher de deux manières :
  - [**Manuel**](#manual-monitor-alerts) : Démarrer à partir d'une alerte de monitor individuelle
  - [**Automatique**](#enable-automatic-investigations) : Configurer les monitors pour lancer automatiquement Bits Investigation chaque fois qu'ils passent à l'état d'alerte.
- [Page de détails du test Synthetic](#from-the-synthetic-test-details-page)
- [Real User Monitoring](#real-user-monitoring)
- [Prompt général](#general-prompt)

### Alertes de monitor {#manual-monitor-alerts}

Vous pouvez invoquer Bits sur une alerte de monitor ou un événement d'avertissement individuel à partir de plusieurs points d'entrée :

#### Option 1 : Liste des monitors Bits Investigation {#monitor-list}
1. Accédez à [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5].
1. Cliquez sur {{< ui >}}Investigate Recent Alerts{{< /ui >}} et sélectionnez une alerte.

#### Option 2 : Page d'état du monitor {#option-2-monitor-status-page}
Accédez à la page d'état du monitor d'un [monitor pris en charge par Bits Investigation](#supported-monitors) et cliquez sur {{< ui >}}Investigate with Bits Investigation{{< /ui >}} dans le coin supérieur droit.

#### Option 3 : Panneau latéral des événements du monitor {#option-3-monitor-event-side-panel}
Dans le panneau latéral des événements du monitor d'un [monitor pris en charge par Bits Investigation](#supported-monitors), cliquez sur {{< ui >}}Investigate with Bits Investigation{{< /ui >}}.

#### Option 4 : Slack {#option-4-slack}
Pour utiliser l'intégration Slack, [connectez votre espace de travail Slack à Bits Investigation][8].

Dans Slack, répondez à une notification de monitor avec `@Datadog Investigate this alert`.

### Tests Synthetic {#synthetic-tests}

Lorsqu'un monitor de test Synthetic de navigateur ou d'API se déclenche, vous pouvez lancer Bits Investigation pour identifier la cause racine. Bits analyse les résultats et l'historique des tests Synthetic parallèlement aux traces, aux logs et aux métriques. Il fait ressortir une cause première probable et identifie si l'échec reflète une réelle régression ou une mauvaise configuration.

#### Depuis la page de détails du test Synthetic {#from-the-synthetic-test-details-page}

1. Sur la page [Synthetic Tests][18], ouvrez le test Synthetic que vous souhaitez investiguer et accédez à la section {{< ui >}}Timeline{{< /ui >}}.
1. Sélectionnez l'événement {{< ui >}}Alert Triggered{{< /ui >}} pour l'exécution de test en échec.
1. Cliquez sur {{< ui >}}Investigate with Bits{{< /ui >}}.

L'investigation s'ouvre dans une nouvelle page, et vous pouvez également la consulter depuis la page de détails du test une fois qu'elle est terminée.

#### Depuis un monitor Synthetic {#from-a-synthetic-monitor}

Les monitors Synthetic prennent en charge les mêmes points d'entrée basés sur les monitors que les autres types de monitors pris en charge. Consultez [Alertes de monitor](#manual-monitor-alerts) pour connaître les options disponibles, ou activez {{< ui >}}Auto-Investigate{{< /ui >}} sur un monitor Synthetic pour lancer automatiquement des investigations. Pour plus de détails, consultez [Activer les investigations automatiques](#enable-automatic-investigations).

### Real User Monitoring {#real-user-monitoring}

Vous pouvez lancer Bits Investigation depuis plusieurs endroits dans Real User Monitoring (RUM) :

- Cartes de recommandation sur la page **Optimisation** de RUM et dans Operations Monitoring. Pour plus de détails, consultez [Optimiser les performances avec Bits AI][19].
- Le bouton **Anomaly · Investigate** sur un graphique vital RUM. Pour plus de détails, consultez [Examinez les régressions et les alertes avec Bits AI][20].
- Les monitors RUM, qui prennent en charge les mêmes points d'entrée basés sur les monitors que les autres types de monitors pris en charge, y compris [les investigations automatiques](#enable-automatic-investigations). Pour plus de détails, consultez [Examinez les régressions et les alertes avec Bits AI][20].

### Prompt général {#general-prompt}

Cliquez sur [New Investigation][16] et décrivez le problème que vous souhaitez résoudre. Incluez autant de contexte pertinent que possible :
- Symptômes observés (par ex. erreurs, latence), y compris tout lien vers la télémétrie Datadog qui l'indique
- Tags pertinents tels que le service, l'application ou l'environnement qui isolent le problème
- Une fenêtre temporelle (par défaut, les 4 dernières heures)

Plus votre prompt est précis, plus l'investigation sera exacte et utile.

Bons exemples :
- Analyser les requêtes vers search-service en prod. Certaines requêtes renvoient des résultats vides alors qu'elles ne le devraient pas. Le problème a commencé vers 10:00 UTC.
- Analyser la cause de ces erreurs : https://app.datadoghq.com/logs?query=service%3Asearch-service%20status%3Aerror Elles ont commencé à apparaître il y a environ 5 minutes.

Mauvais exemple :
- L'application est lente. Quel est le problème ?

Vous pouvez également déclencher une investigation depuis Slack.  Mentionnez Datadog dans un message : `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`. Si déclenchée dans un fil de discussion Slack, Bits Investigation utilise automatiquement l'intégralité du fil comme contexte d'investigation.


### Activer les investigations automatiques {#enable-automatic-investigations}

En plus des investigations manuelles, vous pouvez configurer Bits pour qu'il s'exécute automatiquement lorsqu'un monitor passe à l'état d'alerte :

#### Depuis la liste des monitors Bits Investigation {#from-the-bits-investigation-monitors-list}
1. Accédez à [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5].
1. Activez {{< ui >}}Auto-Investigate{{< /ui >}} pour un seul monitor, ou modifiez en masse plusieurs monitors en les sélectionnant, puis en cliquant sur {{< ui >}}Auto-Investigate All{{< /ui >}}.

#### Pour un seul monitor {#for-a-single-monitor}
1. Ouvrez la page d'état du monitor et cliquez sur {{< ui >}}Edit{{< /ui >}}.
1. Faites défiler jusqu'à {{< ui >}}Configure notifications & automations{{< /ui >}} et activez {{< ui >}}Investigate with Bits Investigation{{< /ui >}}.

<div class="alert alert-info"><ul><li>L'activation des investigations automatiques via la Datadog API ou Terraform n'est pas prise en charge.</li><li>Une investigation démarre lorsqu'un monitor passe à l'état d'alerte.</li><li>Les transitions vers l'état d'avertissement ou d'absence de données, les <a href="/monitors/notify/#renotify">renotifications</a> et les notifications de test ne déclenchent pas d'investigations automatiques.
</li></ul></div>

### Monitors pris en charge {#supported-monitors}

Bits est capable d'exécuter des investigations sur les types de monitors suivants:
  - Métrique
  - Anomalie
  - Prévision
  - Intégration
  - Singularité
  - Logs
  - APM (`APM Metrics` uniquement; `Trace Analytics` n'est pas pris en charge)
  - Composites
  - SLOs
  - API Synthetics et tests Browser
  - RUM

## Comment Bits Investigation enquête {#how-bits-investigates}
Lorsqu'elle enquête sur un problème, Bits Investigation fonctionne en boucle continue d'observation, de raisonnement et d'action. Elle commence par formuler des hypothèses sur la cause première potentielle, puis utilise ses outils pour interroger les données de télémétrie afin de valider ou d'invalider ces hypothèses. Chaque étape s'appuie sur les conclusions précédentes. À mesure que de nouveaux éléments apparaissent, Bits met à jour sa compréhension, affine son raisonnement et enchaîne des étapes d'investigation supplémentaires, en s'adaptant et en corrigeant sa trajectoire jusqu'à ce qu'elle converge vers la cause première la plus probable.

À la fin d'une investigation, Bits Investigation présente soit une conclusion claire étayée par des preuves, soit la qualifie de non concluante lorsque les données disponibles sont insuffisantes pour étayer une conclusion défendable.

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Organigramme montrant les hypothèses que Bits Investigation a formulées et testées" style="width:100%;" >}}

### Sources de données prises en charge {#supported-data-sources}
Bits utilise les sources de données suivantes lors de ses investigations:

#### Produits Datadog {#datadog-products}
- Métriques
- Traces APM
- Logs
- Dashboards
- Événements
- [Suivi des changements][4]
- [Code source][17] (GitHub uniquement)
- Watchdog
- Real User Monitoring
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>Ajouter une délimitation de service : </b> Pour les monitors associés à un service, ajoutez un tag de service au monitor, ou filtrez ou regroupez la requête du monitor par service. Cela aide Bits à corréler les données avec plus de précision.</div>

#### Intégrations tierces {#third-party-integrations}
- Grafana
- Dynatrace
- Sentry
- Splunk
- ServiceNow
- Confluence

<div class="alert alert-info">
Les intégrations tierces sont en préversion pour tous les clients.</div>

Pour connaître les meilleures pratiques permettant de maximiser l'efficacité des investigations, consultez [Sources de connaissances][9].

### Modes d'affichage des investigations {#investigation-display-modes}
Il existe deux modes d'affichage : Étapes d'investigation et Arbre d'hypothèses.

Pendant qu'une investigation est en cours, Bits Investigation capture chaque étape qu'elle réalise — y compris la manière dont elle évalue les preuves et prend des décisions — dans la vue {{< ui >}}Investigation Steps{{< /ui >}}. Cela fournit un enregistrement détaillé et en temps réel du processus de raisonnement de l'agent.

Une fois l'investigation terminée, vous pouvez passer à la vue {{< ui >}}Hypothesis Tree{{< /ui >}} pour explorer une visualisation structurée sous forme d'arbre du chemin d'investigation, ce qui facilite la compréhension des résultats et des conclusions en un coup d'œil.


## Rapports {#reports}

L'onglet {{< ui >}}Reports{{< /ui >}} vous permet de suivre le nombre d'investigations réalisées au fil du temps par monitor, utilisateur, service et équipe. Vous pouvez également suivre le temps moyen jusqu'à la conclusion pour évaluer l'impact de Bits Investigation sur votre efficacité en astreinte.

[3]: /fr/bits_ai/bits_investigation/configure/#configure-knowledge-base-integrations
[4]: /fr/change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /fr/bits_ai/bits_investigation/configure#slack
[9]: /fr/bits_ai/bits_investigation/knowledge_sources/
[10]: /fr/incident_response/on-call/pages/#page-from-notifications
[14]: /fr/incident_response/work_management/notifications_integrations/#third-party-tickets
[15]: /fr/account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /fr/source_code/#tag-your-apm-telemetry-with-git-information
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /fr/real_user_monitoring/bits_ai/optimize_performance/
[20]: /fr/real_user_monitoring/bits_ai/investigate_regressions/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}