---
core_product:
- apm
id: trace_metric
title: トレースメトリクス
---
トレースメトリクスは自動的に収集され、他の [Datadog メトリクス][1]と同様に 15 か月の保持ポリシーで保持されます。これらは、ヒット、エラー、またはレイテンシーを特定し、それらについてアラートを送信するために使用できます。統計とメトリクスは常にすべてのトレースに基づいて計算され、取り込みコントロールの影響を受けません。

トレースメトリクスには、サービスやリソースに加え、トレースを受信するホストのタグが付けられます。例えば、ウェブサービスをインスツルメントすると、エントリポイントスパン `web.request` のトレースメトリクスが収集され、[**メトリクスカタログ**ページ][2]で確認できます。

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="トレースメトリクス" >}}

トレースメトリクスは、**サービス**ページまたは**リソース**ページからダッシュボードにエクスポートできます。さらに、トレースメトリクスは既存のダッシュボードからクエリすることも可能です。

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="トレースメトリクスダッシュボード" >}}

トレースメトリクスは監視に役立ちます。APM モニターは、[新規モニター][3]、[サービス][4]、または[リソース][5]ページで設定できます。推奨モニターのセットは、[サービス][4]または[リソース][5]ページで利用できます。


[1]: /ja/extend/guide/data-collection-resolution/
[2]: https://app.datadoghq.com/metric/catalog
[3]: https://app.datadoghq.com/monitors
[4]: /ja/tracing/services/service_page/
[5]: /ja/tracing/services/resource_page/