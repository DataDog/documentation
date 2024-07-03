---
aliases:
- /ja/tracing/ingestion/
- /ja/tracing/trace_ingestion/
- /ja/tracing/trace_retention_and_ingestion/
description: スパンの取り込みをコントロールする方法を学ぶ
title: トレースパイプライン
---

{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースパイプライン" >}}

インスツルメントされたアプリケーションからトレースを収集し、アプリケーションをエンドツーエンドで視覚化することができます。[トレースエクスプローラー][1]から分散型トレースをクエリして視覚化し、マイクロサービス内のリクエストの流れを理解して、エラーやパフォーマンスの問題を簡単に調査することができます。

APM では、トレースの**取り込み**と**保持**の両方を完全にカスタマイズすることができます。

## 取り込みのメカニズム

トレースを設定し、きめ細かい[取り込み構成][2]でアプリケーションをエンドツーエンドで可視化することができます。アプリケーションの停止やサービスの応答性低下などのパフォーマンスの問題を見逃さないために、すべてのエラーと高レイテンシーのトレースを含む完全なトレースを取得することができます。

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="サービスセットアップ" >}}


## Ingestion controls

[Ingestion Control ページ][3]では、サービス全体の取り込み量と構成設定の概要を確認できます。

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Ingestion Control ページ概要" >}}

## スパンからメトリクスを生成する

取り込んだスパンからメトリクスを生成し、そのカスタムメトリクスをクエリや比較に使用することができます。詳しくは、[スパンからメトリクスを生成する][4]を参照してください。

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="スパンベースメトリクスのグラフ" >}}

## トレースの保持

Datadog によってスパンが取り込まれた後、アカウントに設定された[保持フィルター][5]に従って、一部は 15 日間保管されます。Datadog インテリジェント保持フィルターは、アプリケーションの健全性を監視するために、トレースの一定割合をインデックス化します。さらに、独自のカスタム保持フィルターを定義して、組織の目標をサポートするために保持したいトレースデータのインデックスを作成することができます。

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="保持フィルターページ" >}}

## トレース使用量メトリクス

APM 推定使用量や取り込み理由ダッシュボードの使用など、取り込み量やインデックスされたデータの量を追跡・監視する方法については、[使用量メトリクス][6]をご覧ください。

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage ダッシュボード" >}}


[1]: /ja/tracing/trace_explorer
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ja/tracing/trace_pipeline/ingestion_controls
[4]: /ja/tracing/trace_pipeline/generate_metrics
[5]: /ja/tracing/trace_pipeline/trace_retention
[6]: /ja/tracing/trace_pipeline/metrics