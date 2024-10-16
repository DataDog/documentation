---
core_product:
- apm
title: métrique de trace
---
Tout comme les autres types de [métriques Datadog][1], les métriques de trace sont automatiquement recueillies et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier des hits, des erreurs ou de la latence et générer des alertes à ce sujet. Les statistiques et les métriques sont toujours calculées en fonction de toutes les traces, et ne sont pas affectés par les contrôles d'ingestion.

Le host qui reçoit les traces ajoute un tag aux métriques de traces en même temps que le service ou la ressource. Par exemple, après avoir instrumenté un site web, les métriques de traces sont collectées pour le span de point d'entrée `web.request` sur la [page **Metrics Summary**][2].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métriques de trace" >}}

Les métriques de trace peuvent être exportées vers un dashboard à partir de la page **Service** ou **Ressource**. Elles peuvent également être interrogées à partir d'un dashboard existant.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="dashboard de métriques de trace" >}}

Les métriques de trace sont idéales pour la surveillance. Il est possible de définir des monitors d'APM depuis les pages [New monitor][3], [Service][4] ou [Resource][5]. Des suggestions de monitors sont affichées sur la page [Service][4] ou [Resource][5].


[1]: /fr/developers/guide/data-collection-resolution-retention/
[2]: https://app.datadoghq.com/metric/summary
[3]: https://app.datadoghq.com/monitors
[4]: /fr/tracing/services/service_page/
[5]: /fr/tracing/services/resource_page/