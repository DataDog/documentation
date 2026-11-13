---
core_product:
- apm
id: trace_metric
title: métrique de trace
---
Les métriques de trace sont automatiquement collectées et conservées avec une politique de rétention de 15 mois, similaire à toute autre [métrique Datadog][1]. Elles peuvent être utilisées pour identifier et alerter sur les accès, les erreurs ou la latence. Les statistiques et les métriques sont toujours calculées sur la base de toutes les traces et ne sont pas affectées par les contrôles d'ingestion.

Les métriques de trace sont marquées par le host recevant les traces ainsi que par le service ou la ressource. Par exemple, après l'instrumentation d'un service web, les métriques de trace sont collectées pour le span de point d'entrée `web.request` sur la [page **Metrics Catalog**][2].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métriques de trace" >}}

Les métriques de trace peuvent être exportées vers un tableau de bord depuis la page **Service** ou **Resource**. De plus, les métriques de trace peuvent être interrogées à partir d'un tableau de bord existant.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="tableau de bord des métriques de trace" >}}

Les métriques de trace sont utiles pour la surveillance. Les moniteurs APM peuvent être configurés sur la page [New Monitors][3], [Service][4] ou [Resource][5]. Un ensemble de moniteurs suggérés est disponible sur la page [Service][4] ou [Resource][5].


[1]: /fr/extend/guide/data-collection-resolution/
[2]: https://app.datadoghq.com/metric/catalog
[3]: https://app.datadoghq.com/monitors
[4]: /fr/tracing/services/service_page/
[5]: /fr/tracing/services/resource_page/