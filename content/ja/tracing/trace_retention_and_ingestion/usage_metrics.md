---
title: 使用量メトリクス
kind: ドキュメント
description: Tracing without Limits の使用量を監視する方法を学びます。
---
APM と Indexed Span の使用量を監視しているときに、数値が予想と一致しない場合、または取り込み率または保持率を変更する場合は、[保持フィルター][1]または[取り込み制御][2]のドキュメントを参照してください。

このドキュメントでは、Indexed Span と Ingested Span の消費を監視するために使用可能なメトリクスとデフォルトのダッシュボードについて詳しく説明します。Datadog APM プランには、Indexed Span と Ingested Span が含まれています。詳細については、[価格設定ドキュメント][3]を参照するか、[価格設定シナリオの例][4]をご覧ください。

### トレース分析使用量ダッシュボード

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardOverview.png" style="width:100%;" alt="Tracing without Limits 使用量ダッシュボード" >}}

Datadog は、APM の使用量、および Indexed Span と Ingested Span のボリュームを監視するための、すぐに使用できる[使用量ダッシュボード][5]を提供します。

このダッシュボードの各メトリクスは、アカウントで使用可能な以下の 3 つの Datadog 標準メトリクスのいずれかを利用しています。

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

これらのメトリクスは `env` と `service` でタグ付けされており、特定の環境とサービスの取り込みまたはインデックス化の制御を微調整する必要があるかどうかを判断するのに役立ちます。デフォルトのダッシュボード内でこれらのメトリクスを使用するか、独自のダッシュボードとモニターを作成して、保持フィルターの構成ミスを検出するか、モニターのしきい値を設定します。

デフォルトの[トレース分析ダッシュボード][5]には、最も多い Indexed Span と Ingested Span がどこから来ているかを一目で確認できるウィジェットのグループがいくつかあります。このダッシュボードには、前述のように、 `env`、`service`、および一意の `env` と `service` の組み合わせのトップリストが含まれています。

**注:** 請求はバイトに基づいていますが、ダッシュボードではバイトとスパンの両方の内訳を確認できます。

### Indexed Span

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="スパンのインデックス化" >}}

デフォルトの [Datadog インテリジェント保持フィルター][6]を含む、サービスに設定された各保持フィルターは、Datadog アカウントの Indexed Span の数を_増加_させます。

インデックス化されたスパンは請求に影響を与える可能性があるため、設定されている各フィルターの横に ‘Spans Indexed’ 列が表示され、そのフィルターに選択されたタイムフレームに基づいてインデックス化されたスパンの数が示されます。

**注:** Datadog Intelligent Retention Filter 自体では、APM Host の料金に含まれるインデックス化されたスパン以外に追加で請求が発生することはありません。

**注**: 保持フィルターを作成、変更、または無効にするには、管理者権限が必要です。


[1]: /ja/tracing/trace_retention_and_ingestion/#retention-filters
[2]: /ja/tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /ja/account_management/billing/apm_distributed_tracing/
[5]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[6]: /ja/tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter