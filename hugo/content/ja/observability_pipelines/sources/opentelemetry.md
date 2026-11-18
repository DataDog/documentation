---
description: Observability Pipelines Worker を使用して、OpenTelemetry Collector からログ、メトリクス、またはトレースを収集する方法を学習します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、環境内のメトリクス量とタグを管理する
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して AI アプリから ClickHouse と Datadog に OTel データをルーティングする
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: OpenTelemetry ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の OpenTelemetry (OTel) ソースを使用して、HTTP または gRPC を介して OTel コレクターからログやメトリクスを収集します。

**注**:
- Datadog Distribution of OpenTelemetry (DDOT) Collector を使用している場合は、OpenTelemetry ソースを使用して [Observability Pipelines にデータを送信します](#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines)。
- OpenTelemetry Collector の Splunk HEC ディストリビューションを使用している場合は、[Splunk HEC ソース][4] を使用して Observability Pipelines にログを送信します。

### このソースを使用するタイミング {#when-to-use-this-source}

このソースを使用する一般的なシナリオ:

- [OpenTelemetry][1] をデータ収集およびルーティングの標準的な方法として使用しており、データをさまざまな宛先にルーティングする前に正規化したい場合。
- 複数のソースからデータを収集しており、一貫した処理のためにそれらを中央の場所に集約したい場合。
    - たとえば、一部のサービスが OpenTelemetry を使用してログをエクスポートし、他のサービスが Datadog Agent やその他の Observability Pipelines [ソース][2] を使用している場合、すべてのデータを Observability Pipelines に送信して処理できます。

## 前提条件 {#prerequisites}

フォワーダーがグローバル設定で SSL を有効にしている場合は、適切な TLS 証明書と、秘密鍵を作成する際に使用したパスワードが必要です。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: OpenTelemetry HTTP および gRPC リスナーアドレスの識別子と、該当する場合は TLS キーパスのみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][6] する際に、このソースをセットアップします。パイプラインは、[UI][10]、[API][11]、または [Terraform][12] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で OpenTelemetry ソースを選択した後:

1. HTTP リスナーアドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. gRPC リスナーアドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

{{< img src="observability_pipelines/sources/otel_settings.png" alt="OpenTelemetry ソースの設定" style="width:35%;" >}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP アドレス識別子:
	- Observability Pipelines Worker が OTel コレクターからのデータを受信する HTTP ソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_OTEL_HTTP_ADDRESS` です。
- gRPC アドレス識別子:
	- Observability Pipelines Worker が OTel コレクターからのデータを受信するためにリッスンする gRPC ソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_OTEL_GRPC_ADDRESS` です。
- TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_OTEL_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{< /tabs >}}

## Observability Pipelines Worker にデータを送信する {#send-data-to-the-observability-pipelines-worker}

HTTP または gRPC を指すように OTel エクスポーターを構成します。Worker は、各プロトコルに対して構成可能なリスナーポートを公開します。

<div class="alert alert-info">以下に示すポート 4318 (HTTP) および 4317 (gRPC) は例です。Worker でいずれかのプロトコルのポート値を構成できます。OTel エクスポーターが選択したポート値と一致していることを確認してください。</a></div>

{{< tabs >}}
{{% tab "ログ" %}}

### HTTP の構成例 {#http-configuration-example}

Worker はポート 4318 で HTTP エンドポイントを公開します。これがデフォルトのポートです。Worker でポート値を構成できます。

たとえば、Python で HTTP 経由の OTel ログエクスポーターを構成するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4318/v1/logs"
    )
```

### gRPC の構成例 {#grpc-configuration-example}

Worker はポート 4317 で gRPC エンドポイントを公開します。これがデフォルトのポートです。Worker でポート値を構成できます。

たとえば、Python で gRPC 経由の OTel ログエクスポーターを構成するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4317"
    )
```

リスナーアドレスの環境変数を以下のデフォルト値に設定します。Workerで異なるポート値を設定した場合は、代わりにそれらを使用してください。

- HTTPリスナーアドレス：`worker:4318`
- gRPCリスナーアドレス：`worker:4317`

{{% /tab %}}

{{% tab "メトリクス" %}}

### HTTP の構成例 {#http-configuration-example-1}

Worker はポート 4318 で HTTP エンドポイントを公開します。これがデフォルトのポートです。Worker でポート値を構成できます。

例えば、PythonでHTTP経由のOTelメトリクスエクスポーターを設定するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    http_exporter = OTLPMetricExporter(
        endpoint="http://worker:4318/v1/metrics"
    )
```

### gRPC の構成例 {#grpc-configuration-example-1}

Worker はポート 4317 で gRPC エンドポイントを公開します。これがデフォルトのポートです。Worker でポート値を構成できます。

例えば、PythonでgRPC経由のOTelメトリクスエクスポーターを設定するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
    grpc_exporter = OTLPMetricExporter(
        endpoint="grpc://worker:4317"
    )
```

リスナーアドレスの環境変数を以下のデフォルト値に設定します。Workerで異なるポート値を設定した場合は、代わりにそれらを使用してください。

- HTTPリスナーアドレス：`worker:4318`
- gRPCリスナーアドレス：`worker:4317`

{{% /tab %}}
{{< /tabs >}}

## Datadog Distribution of OpenTelemetry CollectorからObservability Pipelinesにデータを送信する{#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines}

{{< tabs >}}
{{% tab "ログ" %}}

Datadog Distribution of the OpenTelemetry (DDOT) Collectorからログを送信するには：
1. Helmを使用してDDOT Collectorをデプロイします。手順については、[Install the DDOT Collector as a Kubernetes DaemonSet][5]を参照してください。
1. Observability Pipelinesで[OpenTelemetry ソース](#set-up-the-source-in-the-pipeline-ui)を使用して[パイプラインをセットアップ][6]します。
    1. （オプション）Datadogでは、ログに`op_otel_ddot:true`フィールドがない場合に備えて、`source`フィールドを追加する[Edit Fieldsプロセッサ][7]をパイプラインに追加することを推奨しています。
    1. Workerをインストールする際、OpenTelemetry ソースの環境変数については以下のように設定します。
        1. HTTPリスナーを`0.0.0.0:4318`に設定します。
        1. gRPCリスナーを`0.0.0.0:4317`に設定します。
    1. Workerのインストールとパイプラインのデプロイが完了したら、OpenTelemetry Collectorの[`otel-config.yaml`][9]を更新し、Observability Pipelinesにログを送信するエクスポーターを含めます。たとえば、以下のような場合です。
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                logs:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**注**:
- DDOTはDatadog AgentではなくObservability Pipelinesにログを送信するため、DDOTからObservability Pipelinesにログを送信する場合、以下の設定は機能しません。
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`
- DDOTから送信されたログには、Datadogがログを正しくパースできない原因となるネストされたオブジェクトが含まれている可能性があります。これを解決するために、Datadogでは[Custom Processor][8]を使用してネストされた`resource`オブジェクトをフラット化することを推奨しています。
- DDOT CollectorとObservability Pipelines Workerが同じホスト上で実行されている場合、デフォルトのOTLPレシーバーポート（4317/4318）が競合する可能性があります。一般的なKubernetesデプロイメントでは、CollectorとWorkerは別々のポッドで実行されるため、この問題は発生しません。

[5]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/observability_pipelines/processors/edit_fields#add-field
[8]: /ja/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}

{{% tab "メトリクス" %}}

Datadog Distribution of the OpenTelemetry (DDOT) Collectorからメトリクスを送信するには：
1. Helmを使用してDDOT Collectorをデプロイします。手順については、[Install the DDOT Collector as a Kubernetes DaemonSet][5]を参照してください。
1. Observability Pipelinesで[OpenTelemetry ソース](#set-up-the-source-in-the-pipeline-ui)を使用して[パイプラインをセットアップ][6]します。
    1. （オプション）Datadogでは、`op_otel_ddot:true`フィールドを追加する[Edit Fieldsプロセッサ][7]をパイプラインに含めることを推奨しています。
    1. Workerをインストールする際、OpenTelemetryソースの環境変数については以下のように設定してください：
        1. HTTPリスナーを`0.0.0.0:4318`に設定します。
        1. gRPCリスナーを`0.0.0.0:4317`に設定します。
    1. Workerのインストールとパイプラインのデプロイが完了したら、OpenTelemetry Collectorの[`otel-config.yaml`][9]を更新し、Observability Pipelinesにメトリクスを送信するエクスポーターを追加してください。たとえば、以下のとおりです。
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                metrics:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**注**:
- DDOTはDatadog AgentではなくObservability Pipelinesにメトリクスを送信するため、DDOTからObservability Pipelinesへメトリクスを送信する際には以下の設定は機能しません：
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL`
- DDOTから送信されたメトリクスには、Datadogがメトリクスを正しくパースできなくなるネストされたオブジェクトが含まれている可能性があります。これを解決するために、Datadogでは[Custom Processor][8]を使用してネストされた`resource`オブジェクトをフラット化することを推奨しています。
- DDOT CollectorとObservability Pipelines Workerが同じホスト上で実行されている場合、デフォルトのOTLPレシーバーポート（4317/4318）が競合する可能性があります。一般的なKubernetesデプロイメントでは、CollectorとWorkerは別々のポッドで実行されるため、この問題は発生しません。

[5]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/observability_pipelines/processors/edit_fields#add-field
[8]: /ja/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/collector/
[2]: /ja/observability_pipelines/sources/
[3]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[4]: /ja/observability_pipelines/sources/splunk_hec/#send-logs-from-the-splunk-distributor-of-the-opentelemetry-collector-to-observability-pipelines
[5]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/observability_pipelines/processors/edit_fields#add-field
[8]: /ja/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /ja/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline