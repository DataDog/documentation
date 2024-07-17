---
core_product:
- apm
title: トレースメトリクス
---
トレースメトリクスは自動的に収集され、他の [Datadog メトリクス][1]と同様の 15 か月の保持ポリシーで保持されます。これを使用して、ヒット、エラー、またはレイテンシーを特定し、アラートを発信することができます。統計およびメトリクスは、常にすべてのトレースに基づき算出されるため、Ingestion controls による影響を受けません。

Trace metrics are tagged by the host receiving traces along with the service or resource. For example, after instrumenting a web service trace metrics are collected for the entry-point span `web.request` on the [**Metrics Summary** page][2].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="トレースメトリクス" >}}

トレースメトリクスは、**Service** または **Resource** ページからダッシュボードにエクスポートできます。さらに、既存のダッシュボードからトレースメトリクスを照会できます。

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="トレースメトリクスダッシュボード" >}}

トレースメトリクスは、監視に役立ちます。APM モニターは、[New Monitors][3]、[Service][4]、または [Resource][5] ページで設定できます。推奨されるモニターのセットは、[Service][4] または [Resource][5] ページで利用できます。


[1]: /ja/developers/guide/data-collection-resolution-retention/
[2]: https://app.datadoghq.com/metric/summary
[3]: https://app.datadoghq.com/monitors
[4]: /ja/tracing/services/service_page/
[5]: /ja/tracing/services/resource_page/