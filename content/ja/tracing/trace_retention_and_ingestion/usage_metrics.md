---
title: 使用量メトリクス
kind: ドキュメント
description: Tracing without Limits の使用量を監視する方法を学びます。
---
APM とインデックス化の使用量を監視しているときに、数値が予想と一致しない場合、または取り込み率または保持率を変更する場合は、[保持フィルター][1]または[取り込み制御][2]のドキュメントを参照してください。

### 使用量ダッシュボード
{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="インデックス化されたスパンダッシュボード" >}}

Datadog には、APM の使用量と、取り込まれ、インデックス化されたスパンを監視するための、すぐに使用できる[使用量ダッシュボード][3]が用意されています。

カスタムダッシュボードまたはモニターを作成するために使用する主要なメトリクスは次のとおりです。

 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

### インデックス化されたスパン

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="スパンのインデックス化" >}}

デフォルトの [Datadog Intelligent Retention Filter][4] を含む、サービスに設定された各保持フィルターにより、Datadog アカウントのインデックス化されたスパンの数は_増加_します。

インデックス化されたスパンは請求に影響を与える可能性があるため、設定されている各フィルターの横に ‘Spans Indexed’ 列が表示され、そのフィルターに選択されたタイムフレームに基づいてインデックス化されたスパンの数が示されます。

**注:** Datadog Intelligent Retention Filter 自体では、APM Host の料金に含まれるインデックス化されたスパン以外に追加で請求が発生することはありません。

**注**: 保持フィルターを作成、変更、または無効にするには、管理者権限が必要です。


[1]: /ja/tracing/trace_retention_and_ingestion/#retention-filters
[2]: /ja/tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /ja/tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter