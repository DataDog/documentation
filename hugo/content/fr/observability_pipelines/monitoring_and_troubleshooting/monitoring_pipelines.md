---
aliases:
- /fr/observability_pipelines/monitoring/
description: Apprenez à suivre le statut des pipelines, des Workers et des composants
  grâce à des graphiques d'état et des monitors prêts à l'emploi.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines
  tag: Documentation
  text: Configurez un pipeline
- link: /monitors/types/metric/
  tag: Documentation
  text: Configurez un monitor de métriques
- link: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
  tag: Documentation
  text: Métriques d'utilisation d'Observability Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
title: Surveillance des Pipelines
---
## Présentation {#overview}

Un pipeline se compose de composants qui collectent, traitent et acheminent vos données d'observabilité. Vous pouvez suivre le statut de vos pipelines et composants de la manière suivante :

- Visualisez les graphiques d'état de vos [pipelines](#view-the-status-of-your-pipelines), [Workers](#view-the-status-of-your-workers) et [composants](#view-the-status-of-your-pipeline-components) (sources, processeurs et destinations).
- Activez des [monitors prêts à l'emploi](#out-of-the-box-monitors) qui vous alertent si :
    - Un Observability Pipelines Worker présente une utilisation élevée du processeur ou de la mémoire, ou perd des données.
    - Un composant émet des erreurs.
    - Un quota défini a été atteint.
- Créez vos propres dashboards, notebooks et monitors avec les [métriques Observability Pipelines][5] disponibles.

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipelines_list.png" alt="La page de liste Pipelines affichant le statut, les événements/s et les octets/s pour chaque pipeline." style="width:100%;" >}}

## Visualisez le statut de vos pipelines {#view-the-status-of-your-pipelines}

1. Accédez à [Observability Pipelines][1] pour voir combien d'événements ou d'octets vos pipelines reçoivent et envoient. Les métriques {{< ui >}}events/s{{< /ui >}} et {{< ui >}}bytes/s{{< /ui >}} affichées sur cette page sont basées sur une moyenne sur 15 minutes.
1. Sélectionnez un pipeline.
1. Cliquez sur l'onglet {{< ui >}}Health{{< /ui >}} pour voir les détails concernant le pipeline et ses composants. Vous pouvez visualiser des graphiques de :
    - Dans quelle mesure chaque composant est utilisé, et le nombre total d'événements que le composant reçoit et envoie.
    - Le nombre de requêtes effectuées vers des destinations, et le nombre d'erreurs rencontrées par ces requêtes.
    - Combien d'événements sont intentionnellement et involontairement abandonnés.
    - Toute modification du nombre de requêtes et d'erreurs pour chaque composant au cours de la semaine précédente.

Vous pouvez exporter un graphique d'état vers un dashboard, un notebook ou un monitor. Le graphique exporté vous montre que la métrique est regroupée par les tags spécifiques du pipeline et du composant.

## Voir le statut de vos Workers {#view-the-status-of-your-workers}

Pour voir les graphiques de l'utilisation des ressources et des données envoyées via les Workers Observability Pipelines :

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un pipeline.
1. Cliquez sur l'onglet {{< ui >}}Workers{{< /ui >}} pour voir l'utilisation de la mémoire et du processeur, les statistiques de trafic et les éventuelles erreurs des Workers.
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/workers_tab.png" alt="L'onglet Workers affichant l'utilisation de la mémoire, l'utilisation du processeur, les événements/s, les octets/s et les erreurs pour chaque Worker." style="width:100%;" >}}
1. Cliquez sur l'onglet {{< ui >}}Latest Deployment & Setup{{< /ui >}} pour voir le statut de déploiement de vos Workers.
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/worker_deployment_status.png" alt="L'onglet « Latest Deployment and Setup » affiche un statut déployé pour chaque Worker." style="width:100%;" >}}

## Voir le statut des composants de votre pipeline {#view-the-status-of-your-pipeline-components}

Pour voir les métriques d'une source, d'un processus ou d'une destination :

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un pipeline.
1. Cliquez sur la roue dentée à côté du nom de la source, du processeur ou de la destination, puis sélectionnez {{< ui >}}View details{{< /ui >}}. Datadog affiche des graphiques d'état pour le composant que vous avez sélectionné.
1. Si vous souhaitez exporter un graphique vers un [incident][2], un [dashboard][3] ou un [notebook][4], cliquez sur l'icône d'exportation sur le graphique. Le graphique exporté montre que la métrique est regroupée par les tags spécifiques du pipeline et du composant.

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipeline_health_graphs.png" alt="Graphiques d'état affichant les événements entrants et sortants, les octets entrants et sortants, les erreurs, les données abandonnées, l'utilisation et les événements de tampon pour un pipeline." style="width:35%;" >}}

## Monitors prêts à l'emploi {#out-of-the-box-monitors}

Pour voir les monitors prêts à l'emploi disponibles :

1. Accédez à [Observability Pipelines][1].
1. Cliquez sur {{< ui >}}Enable monitors{{< /ui >}} dans la colonne {{< ui >}}Monitors{{< /ui >}} pour votre pipeline.
1. Cliquez sur {{< ui >}}Start{{< /ui >}} pour configurer un monitor pour l'un des cas d'utilisation suggérés.<br>
    La nouvelle page de monitor de métriques est configurée en fonction du cas d'utilisation que vous avez sélectionné. Vous pouvez mettre à jour la configuration pour la personnaliser davantage. Consultez la [documentation du monitor de métriques][3] pour plus d'informations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /fr/incident_response/incident_management/
[3]: /fr/monitors/types/metric/
[4]: /fr/notebooks/
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/