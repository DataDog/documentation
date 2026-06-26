---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: ドキュメント
  text: OpenTelemetry トラブルシューティング
title: Datadog と OpenTelemetry の互換性
---
## 概要 {#overview}

Datadog は、完全な OpenTelemetry (OTel) 実装から OpenTelemetry と Datadog コンポーネントを組み合わせたハイブリッド構成まで、さまざまなユースケースに対応する複数のセットアップオプションを提供しています。このページでは、さまざまなセットアップとサポートされている Datadog 製品および機能の互換性について説明し、ニーズに最適な構成を選択する手助けをします。

## セットアップ {#setups}

Datadog は、OpenTelemetry を使用するためのいくつかの構成をサポートしています。これらのセットアップの主な違いは、使用する SDK (OpenTelemetry または Datadog) と、テレメトリデータを処理して転送するために使用されるコレクターの違いです。

| セットアップタイプ | API | SDK | コレクター/エージェント |
|--------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**Datadog SDK + DDOT (推奨)**][29] | Datadog API または OTel API | Datadog SDK | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + DDOT**][29]                  | OTel API                | OTel SDK    | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + OSS Collector**][7]          | OTel API                | OTel SDK    | OTel Collector (OSS)                          |
| [**Direct OTLP Ingest**][28] | OTel API | OTel SDK | 該当なし (Datadog エンドポイントへ直接) |

## 機能の互換性 {#feature-compatibility}

以下の表は、さまざまなセットアップ間の機能互換性を示しています。

| 機能 | Datadog SDK + DDOT (推奨) | OTel SDK + DDOT | OTel SDK + OSS Collector | Direct OTLP Ingest |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Correlated Traces、Metrics、Logs][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Distributed Tracing][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [LLM Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Runtime Metrics][23] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Span Links][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trace Metrics][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." >}}) |
| [Database Monitoring][14] (DBM) | {{< X >}} | {{< X >}} |  |  |
| [Infrastructure Host List][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Cloud Network Monitoring][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Live Container Monitoring/Kubernetes Explorer][20] | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17] (USM) | {{< X >}} | {{< X >}} | | |
| [App and API protection][11] (AAP) | {{< X >}} | | | |
| [Continuous Profiler][12] | {{< X >}} | | | |
| [Data Observability: Jobs Monitoring][13] (DJM) | {{< X >}} | | | |
| [Data Streams Monitoring][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}} | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}} |
| [Real User Monitoring][22] (RUM) | {{< X >}} | | | |
| [Source code integration][24] | {{< X >}} | | | |

## APIサポート {#api-support}

Datadog SDK は、さまざまな言語で OpenTelemetry のトレース、メトリクス、ログ API をサポートしています。以下の表で、ご利用の言語のセットアップガイドとサポートの詳細を確認してください。

| 言語 | トレース API | メトリクス API | ログ API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | {{< X >}} | *未サポート* |
| [Go][35] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Ruby][36] | {{< X >}} | Alpha | *未サポート* |
| [PHP][37] | {{< X >}} | {{< X >}} | *未サポート* |

## 詳細情報 {#more-details}

### LLM Observability {#llm-observability}

[生成 AI 属性](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/)を持つOpenTelemetryトレースは、自動的に LLM Observability トレースに変換されます。この変換を無効にするには、[LLM Observability 変換の無効化][38]を参照してください。

### ランタイムメトリクス {#runtime-metrics}

- **Datadog SDK の設定**: DogStatsD (UDP ポート 8125) を使用して[ランタイムメトリクス][23]を発行します。Datadog Agent で DogStatsD が有効になっていることを確認してください。
- **OpenTelemetry SDK の設定**: [OpenTelemetry ランタイムメトリクス][1]仕様に従い、通常は OTLP (ポート 4317/4318) を使用して送信されます。

### Real User Monitoring (RUM) {#real-user-monitoring-rum}

完全な RUM 機能を有効にするには、RUM とトレースを相関させるために[サポートされているヘッダーを注入する][2]必要があります。

### Cloud Network Monitoring (CNM) {#cloud-network-monitoring-cnm}

スパンレベルまたはエンドポイントレベルのモニタリングは**サポートされていません**。

詳細については、[Cloud Network Monitoring の設定][3]を参照してください。

### ソースコードインテグレーション {#source-code-integration}

OpenTelemetry のセットアップでサポートされていない言語については、[テレメトリタグ付けの設定][5]を行い、データを特定のコミットにリンクします。

## サポートレベル {#support-levels}

Datadog は OpenTelemetry コンポーネントおよび構成に対して、さまざまなサポートレベルを提供します。

- **Datadog Supported Components**: Datadog が提供するコンポーネント ([Datadog Connector][39]、[Datadog Exporter][40]、および [Infra Attribute Processor][41] など)これらのコンポーネントは Datadog によって維持され、定期的に更新され、バグ修正や機能強化の対象として優先されます。

- **Community Supported Components**: デフォルトで [DDOT Collector][42] に含まれる OpenTelemetry コンポーネント。Datadog は、これらのコンポーネントが安全で安定しており、互換性があることを支援します。

- **Custom Components**: デフォルトで含まれていない OpenTelemetry コンポーネントや構成 (例えば、[カスタム Collector コンポーネント][43] や [サポートされていないランタイムのインスツルメンテーション][44])Datadog は、出発点としてガイダンスとドキュメントを提供しますが、これらのコンポーネントの機能を直接サポートすることはありません。カスタムコンポーネントに関する問題については、[OpenTelemetry コミュニティ][45]またはコンポーネントのメンテナーに相談してください。

## プラットフォームおよび環境のサポート {#platform-and-environment-support}

OpenTelemetry Collector は多くの環境にデプロイできますが、特定のプラットフォームには固有の制限やサポート要件があります。

* **AWS EKS Fargate**: この環境は**現在サポートされておらず**、OpenTelemetry Collector と併用するとインフラストラクチャーホストの請求が不正確になります。公式サポートは将来のリリースで提供される予定です。最新の情報については、[Collector セットアップガイド][7]を参照してください。

## ベストプラクティス {#best-practices}

Datadog と OpenTelemetry を併用する際、Datadog は最適なパフォーマンスを実現し、潜在的な問題を回避するために以下のベストプラクティスを推奨します。

- **混合インスツルメンテーションを避ける**: ほとんどの場合、同じアプリケーションで Datadog SDK と OpenTelemetry SDK の両方を使用しないでください。未定義の動作につながる可能性があります。
  - **例外**: Python などの一部の言語では、Datadog SDK と OpenTelemetry SDK の両方をインストールする必要があります。
  - 常に、[言語固有のインスツルメンテーションドキュメント][8]に従い、正しくサポートされたセットアップを使用していることを確認してください。
- **同一ホストでの Datadog Agent と別個の Collector の併用を避ける**: 同じホスト上で Datadog Agent と別個の OpenTelemetry Collector を実行しないでください。問題が発生する可能性があります。ただし、同じフリート内の異なるホストで Agent と Collector を実行することはできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/integrations/runtime_metrics/
[2]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /ja/network_monitoring/cloud_network_monitoring/setup/
[4]: /ja/infrastructure/process/
[5]: /ja/integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /ja/opentelemetry/collector_exporter/
[8]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /ja/opentelemetry/agent
[10]: /ja/tracing/trace_collection/
[11]: /ja/security/application_security/
[12]: /ja/profiler/
[13]: /ja/data_jobs/
[14]: /ja/opentelemetry/correlate/dbm_and_traces/
[15]: /ja/data_streams/
[16]: /ja/infrastructure/process/
[17]: /ja/universal_service_monitoring/
[18]: /ja/security/cloud_siem/
[19]: /ja/opentelemetry/correlate/
[20]: /ja/containers/
[21]: /ja/network_monitoring/performance/
[22]: /ja/opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /ja/tracing/metrics/runtime_metrics/
[24]: /ja/integrations/guide/source-code-integration/
[25]: /ja/tracing/trace_collection/span_links/
[26]: /ja/tracing/metrics/metrics_namespace/
[27]: /ja/tracing/trace_collection/
[28]: /ja/opentelemetry/setup/agentless
[29]: /ja/opentelemetry/setup/ddot_collector
[30]: /ja/infrastructure/list/
[31]: /ja/opentelemetry/instrument/api_support/dotnet/
[32]: /ja/opentelemetry/instrument/api_support/python/
[33]: /ja/opentelemetry/instrument/api_support/nodejs/
[34]: /ja/opentelemetry/instrument/api_support/java/
[35]: /ja/opentelemetry/instrument/api_support/go/
[36]: /ja/opentelemetry/instrument/api_support/ruby/
[37]: /ja/opentelemetry/instrument/api_support/php/
[38]: /ja/llm_observability/instrumentation/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /ja/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /ja/opentelemetry/setup/ddot_collector/custom_components
[44]: /ja/opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/