---
aliases:
- /ja/tracing/trace_retention_and_ingestion/usage_metrics/
- /ja/tracing/trace_retention/usage_metrics/
- /ja/tracing/trace_ingestion/usage_metrics/
description: APM の使用量を監視する方法を学びます。
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: トレースの取り込み
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: トレースの保持
title: 使用量メトリクス
---

## 概要

以下のアプリ内構成ページでは、APM の取り込み量とインデックス化量を設定することができます。
- **[Ingestion Control ページ][1]**を使用して、取り込まれるスパンの量を制御します。
- インデックス化されるスパンの数を制御するには、**[Retention Filters ページ][2]**を使用します。

どちらのページも、**使用量メトリクス**を利用しています。

アカウントで利用できるメトリクスは次のとおりです。

 - `datadog.estimated_usage.apm.ingested_bytes` (請求対象のディメンション)
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`
 - `datadog.estimated_usage.apm.indexed_spans` (請求対象のディメンション)


これらのメトリクスをダッシュボードやモニターで活用することで、使用量を視覚化し、管理することができます。これらのメトリクスを使用して、すぐに使える 2 つのダッシュボードが構築されています。これらのダッシュボードは、APM の使用量や、取り込まれたスパンの量とインデックス化されたスパンの量を監視するのに役立ちます。

Datadog APM のプランには、インデックス化されたスパンと取り込まれたスパンが含まれています。詳細は、[価格設定ページ][3]またはいくつかの[価格設定例シナリオ][4]をご覧ください。

### 取り込まれたスパンの量

取り込まれたスパンの使用量に関連するメトリクスは以下のとおりです。

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`

使用量は `datadog.estimated_usage.apm.ingested_bytes` で制御します。取り込みはスパンやトレース数ではなく、量として計測されます。このメトリクスは `env` と `service` によってタグ付けされているので、どの環境とサービスが取り込み量に寄与しているかを特定することができます。

このメトリクスはまた、`ingestion_reason` によってタグ付けされ、Datadog にスパンを送信する責任がある[取り込みメカニズム][5]を反映させることができます。これらのメカニズムは、Datadog Agent のトレーシングライブラリの中にネストされています。このディメンションの詳細については、[取り込み理由ダッシュボード][6]を参照してください。

`datadog.estimated_usage.apm.ingested_traces` メトリクスは、1 秒間にサンプリングされるリクエスト数を計測し、[ヘッドベースサンプリング][7]によってサンプリングされたトレースのみをカウントします。このメトリクスは `env` と `service` によってタグ付けされているので、どのサービスが最も多くのトレースを開始しているのかを特定することもできます。

### Indexed Span

`datadog.estimated_usage.apm.indexed_spans` メトリクスを使用して、[タグベースの保持フィルター][2]でインデックス化されるスパン数を制御します。

このメトリクスは `env` と `service` によってタグ付けされているので、どの環境とサービスがインデックス化の使用量に寄与しているのかを特定することができます。

## APM Traces Estimated Usage ダッシュボード

[APM Traces Usage ダッシュボード][8]には、大まかな KPI と追加の使用情報を表示する複数のウィジェットグループが含まれています。

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage ダッシュボード" >}}

このダッシュボードでは、以下の情報を見ることができます。

- グローバル使用量メトリクス
- ホスト、Fargate、AWS Lambda など、APM が有効なインフラストラクチャー
- `service`、`env`、`ingestion_reason` で区切られた取り込み量
- `service` と `env` で区切られたインデックス化量

## APM 取り込み理由ダッシュボード

[APM 取り込み理由ダッシュボード][6]は、取り込み量の各ソースに関する洞察を提供します。各取り込み使用量メトリクスには、`ingestion_reason` ディメンションが付与されており、どの構成オプション (Datadog Agent 構成やトレーシングライブラリ構成) や製品 (RUM や Synthetic Testing など) が、最も多くの APM データを生成しているかを確認することができます。

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_ingestion_reasons.png" style="width:100%;" alt="APM 取り込み理由ダッシュボード" >}}

取り込みの理由ごとに、どの環境やサービスが全体のボリュームに最も影響を与えているかを知ることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_controls
[2]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /ja/account_management/billing/apm_tracing_profiler/
[5]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[6]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms//#head-based-sampling
[8]: https://app.datadoghq.com/dash/integration/apm_estimated_usage