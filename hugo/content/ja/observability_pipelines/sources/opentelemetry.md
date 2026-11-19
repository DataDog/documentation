---
description: Observability Pipelines Worker を使用して、OpenTelemetry コレクターからログ、メトリクス、またはトレースを収集する方法を学習します。
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

Observability Pipelines の OpenTelemetry (OTel) ソースを使用して、HTTP または gRPC 経由で OTel コレクターからログやメトリクスを収集します。

**注**:
- Datadog Agent と並行して別のプロセスとして実行される OpenTelemetry コレクターである Agent のコレクターを使用している場合は、OpenTelemetry ソースを使用して [Observability Pipelines にデータを送信](#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines)します。
- OpenTelemetry コレクターの Splunk HEC Distribution を使用している場合は、[Splunk HEC ソース][4]を使用して Observability Pipelines にログを送信します。

### このソースを使用するタイミング {#when-to-use-this-source}

このソースを使用する一般的なシナリオ:

- データを収集およびルーティングするための標準的な方法として [OpenTelemetry][1] を使用しており、データをさまざまな送信先にルーティングする前に正規化したい場合。
- 複数のソースからデータを収集しており、一貫した処理のためにそれらを一元的に集約したい場合。
    - たとえば、一部のサービスが OpenTelemetry を使用してログをエクスポートし、他のサービスが Datadog Agent やその他の Observability Pipelines [ソース][2]を使用している場合、すべてのデータを Observability Pipelines に送信して処理できます。

## 前提条件 {#prerequisites}

フォワーダーが SSL を有効にするようにグローバルに構成されている場合は、適切な TLS 証明書と、秘密鍵の作成に使用したパスワードが必要です。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: OpenTelemetry HTTP と gRPC リスナーアドレスの識別子、および該当する場合は TLS キーパスの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][6]する際に、このソースをセットアップします。パイプラインは、[UI][10]、[API][11]、または [Terraform][12] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で OpenTelemetry ソースを選択した後:

1. HTTP リスナーアドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. gRPC リスナーアドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

{{< img src="observability_pipelines/sources/otel_settings.png" alt="OpenTelemetry ソース設定" style="width:35%;" >}}

## シークレットのデフォルト {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP アドレス識別子:
	- Observability Pipelines Worker が OTel コレクターからのデータをリッスンする HTTP ソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_OTEL_HTTP_ADDRESS` です。
- gRPC アドレス識別子:
	- Observability Pipelines Worker が OTel Collector からのデータをリッスンする gRPC ソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_OTEL_GRPC_ADDRESS` です。
- TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_OTEL_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{< /tabs >}}

## Observability Pipelines Worker にデータを送信する {#send-data-to-the-observability-pipelines-worker}

OTel エクスポーターが HTTP または gRPC を指すように構成します。Worker は、各プロトコルに対して構成可能なリスナーポートを公開します。

<div class="alert alert-info">以下に示すポート 4318 (HTTP) と 4317 (gRPC) は、あくまで例です。Worker でいずれかのプロトコルのポート値を構成できます。選択したポート値と OTel エクスポーターが一致していることを確認します。</a></div>

{{< tabs >}}
{{% tab "ログ" %}}

### HTTP の構成例 {#http-configuration-example}

Worker は、デフォルトのポートである 4318 で HTTP エンドポイントを公開します。Worker でポート値を構成できます。

たとえば、Python で HTTP 経由の OTel ログエクスポーターを構成するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4318/v1/logs"
    )
```

### gRPC の構成例 {#grpc-configuration-example}

Worker は、デフォルトのポートである 4317 で gRPC エンドポイントを公開します。Worker でポート値を構成できます。

たとえば、Python で gRPC 経由の OTel ログエクスポーターを構成するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4317"
    )
```

リスナーアドレスの環境変数を、以下のデフォルト値に設定します。Worker で異なるポート値を設定した場合は、代わりにそれらを使用します。

- HTTP リスナーアドレス: `worker:4318`
- gRPC リスナーアドレス: `worker:4317`

{{% /tab %}}

{{% tab "メトリクス" %}}

### HTTP の構成例 {#http-configuration-example-1}

Worker は、デフォルトのポートである 4318 で HTTP エンドポイントを公開します。Worker でポート値を構成できます。

たとえば、Python で HTTP 経由の OTel メトリクスエクスポーターを構成するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    http_exporter = OTLPMetricExporter(
        endpoint="http://worker:4318/v1/metrics"
    )
```

### gRPC の構成例 {#grpc-configuration-example-1}

Worker は、デフォルトのポートである 4317 で gRPC エンドポイントを公開します。Worker でポート値を構成できます。

たとえば、Python で gRPC 経由の OTel メトリクスエクスポーターを構成するには、次のようにします。

```python
    from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
    grpc_exporter = OTLPMetricExporter(
        endpoint="grpc://worker:4317"
    )
```

リスナーアドレスの環境変数を、以下のデフォルト値に設定します。Worker で異なるポート値を設定した場合は、代わりにそれらを使用します。

- HTTP リスナーアドレス: `worker:4318`
- gRPC リスナーアドレス: `worker:4317`

{{% /tab %}}
{{< /tabs >}}

## Agent のコレクターから Observability Pipelines にデータを送信する {#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines}

{{< tabs >}}
{{% tab "ログ" %}}

Agent のコレクターからログを送信するには、以下を実行します。
1. Helm を使用して Agent のコレクターをデプロイします。手順については、[Agent の Collector を Kubernetes DaemonSet としてセットアップする][5]を参照してください。
1. [OpenTelemetry ソース](#set-up-the-source-in-the-pipeline-ui)を使用して、Observability Pipelines で[パイプラインをセットアップ][6]します。
    1. (オプション) Datadog では、ログに `source` フィールドがない場合に `op_otel_ddot:true` フィールドを追加する [Edit Fields プロセッサー][7]をパイプラインに追加することを推奨しています。
    1. Worker をインストールする際の OpenTelemetry ソースの環境変数について:
        1. HTTP リスナーを `0.0.0.0:4318` に設定します。
        1. gRPC リスナーを `0.0.0.0:4317` に設定します。
    1. Worker のインストールとパイプラインのデプロイが完了したら、OpenTelemetry コレクターの [`otel-config.yaml`][9] を更新し、Observability Pipelines にログを送信するエクスポーターを追加します。例:
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
- Observability Pipelines にログを送信するのは Datadog Agent 自体ではなく Agent のコレクターであるため、以下の設定は Agent のコレクターから Observability Pipelines へのログ送信では機能しません。
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`
- Agent のコレクターから送信されたログには、Datadog によるログの正しいパースを妨げるネストされたオブジェクトが含まれる場合があります。これを解決するため、Datadog では[カスタムプロセッサー][8]を使用してネストされた `resource` オブジェクトをフラット化することを推奨しています。
- Agent のコレクターと Observability Pipelines Worker が同じホスト上で実行されている場合、デフォルトの OTLP レシーバーポート (4317/4318) が競合する可能性があります。一般的な Kubernetes デプロイでは、コレクターと Worker は別々のポッドで実行されるため、この問題は発生しません。

[5]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/observability_pipelines/processors/edit_fields#add-field
[8]: /ja/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}

{{% tab "メトリクス" %}}

Agent のコレクターからメトリクスを送信するには、以下を実行します。
1. Helm を使用して Agent のコレクターをデプロイします。手順については、[Agent の Collector を Kubernetes DaemonSet としてセットアップする][5]を参照してください。
1. [OpenTelemetry ソース](#set-up-the-source-in-the-pipeline-ui)を使用して、Observability Pipelines で[パイプラインをセットアップ][6]します。
    1. (オプション) Datadog では、フィールド `op_otel_ddot:true` を追加する [Edit Fields プロセッサー][7]をパイプラインに追加することを推奨しています。
    1. Worker をインストールする際の OpenTelemetry ソースの環境変数について:
        1. HTTP リスナーを `0.0.0.0:4318` に設定します。
        1. gRPC リスナーを `0.0.0.0:4317` に設定します。
    1. Worker のインストールとパイプラインのデプロイが完了したら、OpenTelemetry コレクターの [`otel-config.yaml`][9] を更新し、Observability Pipelines にメトリクスを送信するエクスポーターを追加します。例:
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
- Observability Pipelines にメトリクスを送信するのは Datadog Agent 自体ではなく Agent のコレクターであるため、以下の設定は Agent のコレクターから Observability Pipelines へのメトリクス送信では機能しません。
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL`
- Agent のコレクターから送信されたメトリクスには、Datadog によるメトリクスの正しいパースを妨げるネストされたオブジェクトが含まれる場合があります。これを解決するため、Datadog では[カスタムプロセッサー][8]を使用してネストされた `resource` オブジェクトをフラット化することを推奨しています。
- Agent のコレクターと Observability Pipelines Worker が同じホスト上で実行されている場合、デフォルトの OTLP レシーバーポート (4317/4318) が競合する可能性があります。一般的な Kubernetes デプロイでは、コレクターと Worker は別々のポッドで実行されるため、この問題は発生しません。

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