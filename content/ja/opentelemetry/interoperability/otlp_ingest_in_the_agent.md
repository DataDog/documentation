---
aliases:
- /ja/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /ja/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /ja/opentelemetry/otlp_ingest_in_the_agent/
description: Ingest OTLP trace data through the Datadog Agent
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: OTLP ingestion in the Agent
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OTLP Metrics Types
- link: /opentelemetry/runtime_metrics/
  tag: Documentation
  text: OpenTelemetry Runtime Metrics
title: Datadog Agent による OTLP の取り込み
---


OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with [OpenTelemetry SDKs][1] to Datadog Agent. Since versions 6.32.0 and 7.32.0, the Datadog Agent can ingest OTLP traces and [OTLP metrics][2] through gRPC or HTTP. Since versions 6.48.0 and 7.48.0, the Datadog Agent can ingest OTLP logs through gRPC or HTTP.

OTLP Ingest in the Agent allows you to use observability features in the Datadog Agent. Data from applications instrumented with OpenTelemetry SDK cannot be used in some Datadog proprietary products, such as Application Security Management, Continuous Profiler, and Ingestion Rules. [OpenTelemetry Runtime Metrics are supported for some languages][10].

To get started, you first [instrument your application][3] with OpenTelemetry SDKs. Then, export the telemetry data in OTLP format to the Datadog Agent. Configuring this varies depending on the kind of infrastructure your service is deployed on, as described on the page below. Although the aim is to be compatible with the latest OTLP version, the OTLP Ingest in the Agent is not compatible with all OTLP versions. The versions of OTLP that are compatible with the Datadog Agent are those that are also supported by the OTLP receiver in the OpenTelemetry Collector. To verify the exact versions supported, check the `go.opentelemetry.io/collector` version in the Agent `go.mod` file.

OpenTelemetry のインスツルメンテーションのドキュメントを読んで、インスツルメンテーションを Agent に向ける方法を理解してください。以下に説明する `receiver` セクションは [OpenTelemetry Collector OTLP レシーバー構成スキーマ][5]に従っています。

{{< img src="metrics/otel/otlp_ingestion_update.png" alt="OTel SDK/ライブラリ、Datadog トレースライブラリ、Datadog インテグレーション -> Datadog Agent -> Datadog" style="width:100%;">}}

<div class="alert alert-warning"><strong>注</strong>: サポートされているセットアップは、すべての OpenTelemetry データ生成ホスト上に配置された取り込み Agent です。あるホストを実行しているコレクターまたはインスツルメンテーションアプリから、別のホストの Agent に OpenTelemetry テレメトリーを送信することはできません。しかし、Agent がコレクターまたは SDK インストルメンテーションアプリにローカルであれば、複数のパイプラインをセットアップすることができます。</div>

## Datadog Agent で OTLP の取り込みを有効にする

{{< tabs >}}
{{% tab "ホスト" %}}

OTLP ingestion is off by default, and you can turn it on by updating your `datadog.yaml` file configuration or by setting environment variables. The following `datadog.yaml` configurations enable endpoints on the default ports.

gRPC の場合、デフォルトは 4317 番ポートです。

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: localhost:4317
```
HTTP の場合、デフォルトは 4318 番ポートです。

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: localhost:4318
```

または、環境変数でポートを指定して、エンドポイントを構成します。

- For gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- HTTP の場合 (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

これらは core Agent と trace Agent プロセスの両方に渡さなければなりません。コンテナ環境で実行する場合は、ローカルではないインターフェイスでもサーバーを利用できるように、`localhost` の代わりに `0.0.0.0` を使用します。

この機能には、gRPC と HTTP のどちらかを構成します。以下は、[両方の構成を示すアプリケーション例][1]です。

OTLP logs ingestion on the Datadog Agent is disabled by default so that you don't have unexpected logs product usage that may impact billing. To enable OTLP logs ingestion:

1. Explicitly enable log collection as a whole by following [Host Agent Log collection setup][2]:

   ```yaml
   logs_enabled: true
   ```

2. Set `otlp_config.logs.enabled` to true:

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
[2]: /ja/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

1. Follow the [Datadog Docker Agent setup][1].

2. For the Datadog Agent container, set the following endpoint environment variables and expose the corresponding port:
   - For gRPC: Set `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` to `0.0.0.0:4317` and expose port `4317`.
   - HTTP の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を `0.0.0.0:4318` に設定し、ポート `4318` を公開します。

3. If you want to enable OTLP logs ingestion, set the following endpoint environment variables in the Datadog Agent container:
   - Set `DD_LOGS_ENABLED` to true.
   - Set `DD_OTLP_CONFIG_LOGS_ENABLED` to true.

[1]: /ja/agent/docker/
{{% /tab %}}
{{% tab "Kubernetes (Daemonset)" %}}

1. [Kubernetes Agent のセットアップ][1]に従ってください。

2. トレース Agent コンテナとコア Agent コンテナの両方で、以下の環境変数を構成します。

   gRPC の場合:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
   value: "0.0.0.0:4317"
   ```

   HTTP の場合:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
   value: "0.0.0.0:4318"
   ```
3. コンテナポート 4317 または 4318 をコア Agent コンテナのホストポートにマッピングします。

   gRPC の場合:
   ```
   ports:
     - containerPort: 4317
       hostPort: 4317
       name: traceportgrpc
       protocol: TCP
   ```

   For HTTP
   ```
   ports:
     - containerPort: 4318
       hostPort: 4318
       name: traceporthttp
       protocol: TCP
   ```

4. If you want to enable OTLP logs ingestion, set the following endpoint environment variables in the core Agent container:

   Enable [log collection with your DaemonSet][2]:
   ```
   name: DD_LOGS_ENABLED
   value: "true"
   ```

   And enable OTLP logs ingestion:
   ```
   name: DD_OTLP_CONFIG_LOGS_ENABLED
   value: "true"
   ```

[1]: /ja/agent/kubernetes/?tab=daemonset
[2]: /ja/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}

{{% tab "Kubernetes (Helm) - values.yaml" %}}

1. [Kubernetes Agent のセットアップ][1]に従ってください。

2. `values.yaml` ファイルの `datadog.otlp` セクションを編集して、Agent で OTLP エンドポイントを有効にします。

   gRPC の場合:
   ```
   otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
   ```

   HTTP の場合:
   ```
   otlp:
    receiver:
      protocols:
        http:
          enabled: true
   ```

これは、各プロトコルをデフォルトのポート (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`) で有効にするものです。


[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}

{{% tab "Kubernetes (Helm) - set" %}}

1. [Kubernetes Agent のセットアップ][1]に従ってください。

2. 優先プロトコルを有効にします。

   gRPC の場合:
   ```
   --set "datadog.otlp.receiver.protocols.grpc.enabled=true"
   ```
   HTTP の場合:
   ```
   --set "datadog.otlp.receiver.protocols.http.enabled=true"
   ```

これは、各プロトコルをデフォルトのポート (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`) で有効にするものです。

[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}
{{< /tabs >}}

Datadog Agent でサポートされている環境変数や設定は、他にも多数あります。それらすべての概要を知るには、[構成テンプレート][6]を参照してください。

## Sending OpenTelemetry traces, metrics, and logs to Datadog Agent

{{< tabs >}}
{{% tab "Docker" %}}
1. アプリケーションコンテナでは、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` に、Datadog Agent コンテナを指すように設定します。例:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. 両方のコンテナが同じブリッジネットワークに定義されている必要がありますが、これは Docker Compose を使用している場合に自動的に処理されます。そうでない場合は、[Docker アプリケーションのトレース][1]の Docker の例に従って、正しいポートでブリッジネットワークをセットアップしてください。

[1]: /ja/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
In the application deployment file, configure the endpoint that the OpenTelemetry client sends traces to with the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable.

gRPC の場合:
```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
```

HTTP の場合:
```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
```
**Note**: To enrich container tags for custom metrics, set the appropriate resource attributes in the application code where your OTLP metrics are generated. For example, set the `container.id` resource attribute to the pod's UID.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">When configuring the endpoint for sending traces, ensure you use the correct path required by your OTLP library. Some libraries expect traces to be sent to the <code>/v1/traces</code> path, while others use the root path <code>/</code>.</div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/7.35.0/pkg/config/config_template.yaml
[10]: /ja/opentelemetry/runtime_metrics/