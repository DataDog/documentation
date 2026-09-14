---
aliases:
- /ja/tracing/ingestion/
- /ja/tracing/trace_ingestion/
- /ja/tracing/trace_retention_and_ingestion/
description: スパンの取り込みをコントロールする方法を説明します
further_reading:
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: ラーニングセンター
  text: APM レート制限と保持
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: '分散型トレーシングの習得: データ量の課題と、Datadog の効率的なサンプリングのアプローチ'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: '分散型トレーシングの最適化: 予算内に収め、重要なトレースをキャプチャするためのベストプラクティス'
title: トレースパイプライン
---
{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースパイプライン" >}}

インスツルメントされたアプリケーションからトレースを収集し、アプリケーションをエンドツーエンドで可視化します。[Trace Explorer][1] から分散型トレースをクエリおよび視覚化し、リクエストがマイクロサービス間をどのように流れるかを理解し、エラーやパフォーマンスの問題を簡単に調査します。

APM では、トレースの**取り込み**と**保持**の両方を完全にカスタマイズすることができます。

## 取り込みのメカニズム {#ingestion-mechanisms}

きめ細かな [取り込み構成][2] を使用して、アプリケーションをエンドツーエンドで可視化するためにトレーシングを設定します。アプリケーションの停止や応答しないサービスなどのパフォーマンスの問題を見逃さないよう、すべてのエラーと高レイテンシーのトレースを含む完全なトレースを確実にキャプチャしてください。

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="サービスのセットアップ" >}}


## Ingestion Control {#ingestion-controls}

[Ingestion Control ページ][3] では、サービス全体の取り込み量と構成設定の概要を確認できます。

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Ingestion Control ページの概要" >}}

## パイプラインの処理 {#processing-pipelines}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">パイプラインの処理は、 {{< region-param key="dd_site_name" >}}ではサポートされていません。</div>
{{< /site-region >}}

[処理パイプライン][7] を使用した取り込みの後に、スパン属性を変換、正規化、エンリッチします。アプリケーションコードを変更することなく、サービス間で属性の命名方法を標準化し、一貫性のないキーを統合し、スパン値から構造化データを抽出します。

{{< img src="tracing/processing_pipelines/manage_pipelines.png" style="width:100%;" alt="処理パイプライン" >}}

## スパンからのメトリクスの生成 {#generating-metrics-from-spans}

取り込まれたスパンからメトリクスを生成し、そのカスタムメトリクスをクエリや比較に使用できます。詳細については、[スパンからのメトリクスの生成][4] を参照してください。

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="スパンベースのメトリクスのグラフ" >}}

## トレースの保持 {#trace-retention}

スパンの取り込み後に、[保持フィルター][5] によって、どの個別スパンがインデックス化され、15 日間保存されるかが決定します。Datadog インテリジェント保持フィルターは、代表的な一部のスパンを自動的にインデックス化します。これはアプリケーションの健全性の監視に役立ちます。オーガニゼーションの目標にとって重要な追加のスパンをインデックス化するために、カスタム保持フィルターを定義することもできます。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="[Retention Filters] (保持フィルター) ページ" >}}

## トレース使用量メトリクス {#trace-usage-metrics}

APM 推定使用量や取り込み理由ダッシュボードの使用など、取り込み量やインデックスされたデータの量を追跡・監視する方法については、[使用量メトリクス][6] をご覧ください。

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM 推定使用量ダッシュボード" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ja/tracing/trace_pipeline/ingestion_controls
[4]: /ja/tracing/trace_pipeline/generate_metrics
[5]: /ja/tracing/trace_pipeline/trace_retention
[6]: /ja/tracing/trace_pipeline/metrics
[7]: /ja/tracing/trace_pipeline/processing_pipelines