---
aliases:
- /ja/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control
  tag: ガイド
  text: トレース取り込み量制御
- link: /tracing/trace_pipeline/ingestion_controls
  tag: ドキュメント
  text: インジェスチョンコントロール
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry サポート
title: OpenTelemetry による取り込みサンプリング
---

## 概要

OpenTelemetry SDK と OpenTelemetry Collector はサンプリング機能を提供します。アプリケーションの状態を把握するために、トレースを 100% 取り込む必要は必ずしもありません。トレースを Datadog に送信する前にサンプリングレートを設定し、ビジネスおよび可観測性の目標に最も関連するデータのみを取り込みながら、全体的なコストを管理制御してください。

このドキュメントでは、OpenTelemetry を使用してトレースを Datadog に送る主な 2 つの方法を示します。

- **[OpenTelemetry Collector][1]** にトレースを送信し、Datadog Exporter を使って Datadog に転送する。
- トレースを **[Datadog Agent OTLP 取り込み][3]**に送信し、Datadog に転送する

**注**: Datadog は、同じホスト上で OpenTelemetry Collector と Datadog Agent の両方を同時に実行することをサポートしていません。

### OpenTelemetry Collector を使用する場合

この方法では、OpenTelemetry Collector が OpenTelemetry SDK からトレースを受信し、Datadog Exporter を使って Datadog にエクスポートします。このシナリオでは、[APM トレースメトリクス][4]は Datadog Connector によって計算されます:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_collector.png" alt="Collector を使用した OpenTelemetry APM メトリクスの計算" style="width:100%;" >}}

OpenTelemetry Collector の高度な処理機能 (たとえばテールベースサンプリング) が必要な場合は、この方法を選択してください。Collector がトレースを受信するように設定するには、[OpenTelemetry Collector と Datadog Exporter][1] の手順に従ってください。

### Datadog Agent の OTLP 取り込みを使用する場合

この方法では、OpenTelemetry SDK から OTLP プロトコルを使用して Datadog Agent に直接トレースを送信します。これにより、別途 OpenTelemetry Collector サービスを起動せずにトレースを Datadog に送ることができます。このシナリオでは、APM トレースメトリクスは Agent によって計算されます:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_agent.png" alt="Datadog Agent を使用した OpenTelemetry APM メトリクスの計算" style="width:100%;" >}}

独立した OpenTelemetry Collector サービスを立てる必要がない、よりシンプルなセットアップを好む場合は、この方法を選択してください。Datadog Agent で OTLP を使用してトレースを受信するよう設定するには、[Datadog Agent による OTLP 取り込み][15]の手順に従ってください。

## 取り込み量の削減

OpenTelemetry では、OpenTelemetry のライブラリと OpenTelemetry Collector の両方でサンプリングを設定できます。

- OpenTelemetry SDK の**ヘッドベースサンプリング**
- OpenTelemetry Collector の**テールベースサンプリング**
- Datadog Agent の **確率的サンプリング (Probabilistic sampling)**

### ヘッドベースサンプリング

SDK レベルで_ヘッドベースサンプリング_を実装できます。これは、トレースの開始時点でサンプリングが決定される方式です。どのトレースを取り込むことが重要かを明確に把握し、トレース処理の早い段階でサンプリングを行いたい、高スループットのアプリケーションに特に有用です。

#### 設定方法

ヘッドベースサンプリングを設定するには、OpenTelemetry SDK が提供する [TraceIdRatioBased][5] あるいは [ParentBased][6] サンプリング手法を使用します。これにより、SDK レベルで `trace_id` に基づく決定的なヘッドベースサンプリングを実装できます。

#### 注意点

ヘッドベースサンプリングは APM メトリクスの計算に影響します。サンプリングされたトレースのみが OpenTelemetry Collector または Datadog Agent に送信され、そこでメトリクスが計算されます。

サンプリングされなかったトレースのメトリクスを推定するには、SDK で設定したサンプリングレートを使用し、[数式と関数][7]を利用してください。

スパンからのトレース分析モニターとメトリクスにトレースサンプリングを設定することの意味については、[取り込み量制御ガイド][8]を参照してください。


### テールベースサンプリング

OpenTelemetry Collector レベルで_テールベースサンプリング_を実行できます。これにより、エラーや高遅延のトレースを可視化するための、より高度なルールを定義できます。

#### 設定方法

テールベースサンプリングを設定するには、Collector レベルで一連のルールに基づいてトレースをサンプリングできる [Tail Sampling Processor][9] または [Probabilistic Sampling Processor][10] を使用してください。

#### 考慮事項

テールベースサンプリングには、特定のトレースに含まれるすべてのスパンが同じ Collector インスタンスで受信される必要があるという制限があります。もしトレースが複数の Collector インスタンスに分散されており、テールベースサンプリングを利用する場合は、そのトレースの一部が Datadog に送られない可能性があります。

コレクターレベルのテールベースサンプリングを使用しながら、APM メトリクスがアプリケーションのトラフィックの 100% に基づいて計算されるようにするには、[Datadog Connector][11] を使用します。

<div class="alert alert-info">Datadog Connector は v0.83.0 から利用可能です。古いバージョンから移行する場合は、<a href="/opentelemetry/guide/switch_from_processor_to_connector">OpenTelemetry APM メトリクスのために Datadog Processor から Datadog Connector に切り替える</a>をお読みください。</div>

スパンからのトレース分析モニターとメトリクスにトレースサンプリングを設定することの意味については、[取り込み量制御ガイド][8]を参照してください。

### 確率的サンプリング

Datadog Agent の OTLP 取り込みを使用する場合、Agent v7.54.0 以降で確率的サンプリング機能が利用可能です。

#### 設定方法

確率的サンプリングを設定するには、以下のいずれかを行ってください:

- `DD_APM_PROBABILISTIC_SAMPLER_ENABLED` を `true` にし、`DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE` にサンプリングしたいトレースの割合 (`0`〜`100` の間) を指定する。
- Agent の設定ファイルに以下の YAML を追加する。

  ```yaml
  apm_config:
    # ...
    probabilistic_sampler:
        enabled: true
        sampling_percentage: 51 #In this example, 51% of traces are captured.
        hash_seed: 22 #A seed used for the hash algorithm. This must match other agents and OTel
  ```

**Datadog トレーシングライブラリと OTel SDK を混在させる場合**

- 確率的サンプリングは、Datadog ライブラリと OTel トレーシングライブラリ双方から生成されたスパンに適用されます。
- Datadog Agent **と** OTel Collector の両方にスパンを送信する場合は、一貫したサンプリングを確保するために、Datadog Agent (`DD_APM_PROBABILISTIC_SAMPLER_HASH_SEED`) と OTel Collector (`hash_seed`) のシード値を同じに設定してください。

<div class="alert alert-warning"><code>DD_OTLP_CONFIG_TRACES_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code> は非推奨となり、<code>DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code> に置き換えられました。</div>

#### 考慮事項

- 確率的サンプリングは、トレーシングライブラリレベルで設定されたスパンのサンプリング優先度を無視します。その結果、確率的サンプリングは**[ヘッドベースサンプリング][16]**と互換性がありません。つまり、ヘッドベースでサンプリングされたトレースが確率的サンプリングによってドロップされる可能性があります。
- 確率的サンプリングでキャプチャされなかったスパンでも、Datadog Agent の[エラーおよびレアサンプリング][12]でキャプチャされる可能性があります。
- 一貫したサンプリングを行うには、すべてのトレーサーが [128 ビットのトレース ID][17] をサポートしている必要があります。

## Datadog での取り込み量のモニタリング

[APM Estimated Usage ダッシュボード][13] および `datadog.estimated_usage.apm.ingested_bytes` メトリクスを使用して、特定の期間における取り込み量を可視化できます。ダッシュボードを特定の環境やサービスにフィルタリングして、どのサービスが取り込み量の大部分を占めているかを確認してください。

もし取り込み量が予想より多い場合は、サンプリングレートの調整を検討してください。

## 統合サービスタグ付け

OpenTelemetry から Datadog にデータを送る際には、トレースデータを統合サービスタグ付けと関連付けることが重要です。

統合サービスタグ付けを設定すると、トレースが正確に対応するサービスや環境にリンクされます。これが適切に行われないと、ホストが誤って割り当てられ、使用量やコストが想定外に増加する可能性があります。

詳細は [統合サービスタグ付け][18]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/otel_collector_datadog_exporter
[2]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=alongsidetheagent#step-5---run-the-collector
[3]: /ja/opentelemetry/otlp_ingest_in_the_agent
[4]: /ja/tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[7]: /ja/dashboards/functions/#add-a-function
[8]: /ja/tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector#datadog-connector
[12]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#error-and-rare-traces
[13]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[14]: /ja/opentelemetry/guide/migration/
[15]: /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[16]: /ja/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling
[17]: /ja/opentelemetry/interoperability/otel_api_tracing_interoperability/#128-bit-trace-ids
[18]: /ja/getting_started/tagging/unified_service_tagging/#opentelemetry