---
aliases:
- /ja/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /ja/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /ja/opentelemetry/otlp_ingest_in_the_agent/
- /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Datadog Agent による OTLP トレースデータの取り込み
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: ブログ
  text: Agent における OTLP の取り込み
- link: /metrics/open_telemetry/otlp_metric_types
  tag: よくあるご質問
  text: OTLP メトリクスタイプ
- link: /opentelemetry/runtime_metrics/
  tag: よくあるご質問
  text: OpenTelemetry ランタイムメトリクス
title: Datadog Agent による OTLP の取り込み
---
Agent における OTLP 取り込みは、[OpenTelemetry SDK][1] でインスツルメントされたアプリケーションから Datadog Agent へテレメトリデータを直接送信する方法です。バージョン 6.32.0 および 7.32.0 以降、Datadog Agent は gRPC または HTTP 経由で OTLP トレースと [OTLP メトリクス][2] を取り込めます。バージョン 6.48.0 および 7.48.0 以降、Datadog Agent は gRPC または HTTP 経由で OTLP ログを取り込めます。

Agent における OTLP 取り込みにより、Datadog Agent の各種可観測性機能を利用できます。OpenTelemetry SDK でインスツルメントされたアプリケーションのデータは、App and API Protection、Continuous Profiler、Ingestion Rules といった Datadog 独自製品では使用できない場合があります。[OpenTelemetry ランタイムメトリクスは、一部の言語でサポートされています][10]。

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="図: OpenTelemetry SDK が Datadog エクスポーターを使用しているコレクターに OTLP プロトコルを介してデータを送信し、このコレクターが Datadog のプラットフォームにデータを転送します。" style="width:100%;" >}}

<div class="alert alert-info">このセットアップでサポートされる Datadog 機能については、<b>OTel to Datadog Agent (OTLP)</b> にある<a href="/opentelemetry/compatibility/">機能互換性表</a>を参照してください。</div>

## 初期セットアップ {#initial-setup}

開始するには、まず OpenTelemetry SDK で [アプリケーションをインスツルメント][3] します。次に、テレメトリデータを OTLP 形式で Datadog Agent にエクスポートします。構成手順は、以下のページで説明するように、サービスがデプロイされているインフラストラクチャーの種類によって異なります。最新の OTLP バージョンとの互換性を目指していますが、Agent における OTLP 取り込みがすべての OTLP バージョンに対応しているわけではありません。Datadog Agent と互換性のある OTLP バージョンは、OpenTelemetry コレクターの OTLP レシーバーでもサポートされているバージョンと同じです。サポートされている正確なバージョンを確認するには、Agent の `go.mod` ファイルで `go.opentelemetry.io/collector` バージョンを確認してください。

インスツルメンテーションの送信先として Agent を指定する方法は、OpenTelemetry のインスツルメンテーションドキュメントを参照してください。以下に記載する `receiver` セクションは、[OpenTelemetry コレクター OTLP レシーバー構成スキーマ][5] に準拠します。

<div class="alert alert-warning">サポートされるセットアップ方法は、OpenTelemetry データを生成する各ホストに取り込み用 Agent をデプロイするものです。1 つのホストで動作するコレクターやインスツルメント済みアプリから、別ホストの Agent に OpenTelemetry テレメトリを送信することはできません。ただし、Agent がコレクターまたは SDK インスツルメント済みアプリに対してローカルである場合は、複数のパイプラインを設定できます。</div>

## Datadog Agent で OTLP 取り込みを有効にする {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "ホスト" %}}

OTLP 取り込みはデフォルトで無効です。`datadog.yaml` ファイルの構成を更新するか、環境変数を設定して有効化できます。以下の `datadog.yaml` の構成は、デフォルトポートでエンドポイントを有効にします。有効にすると、メトリクスとトレースの取り込みがデフォルトで有効になります。ログの取り込みは、予定外のログへの課金を防ぐためにデフォルトで無効になっています。

{{% otel-endpoint-note %}}

gRPC の場合、デフォルトは 4317 番ポートです。

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
  logs:
    enabled: false
```
HTTP の場合、デフォルトは 4318 番ポートです。

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: false
```

または、環境変数でポートを指定して、エンドポイントを構成します。

- gRPC の場合 (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- HTTP の場合 (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

これらは、コア Agent とトレース Agent の両方のプロセスに渡す必要があります。コンテナ化された環境で実行している場合は、ローカル以外のインターフェイスでもサーバーを使用できるよう、`localhost` の代わりに `0.0.0.0` を使用してください。

この機能には、gRPC または HTTP のいずれかを構成してください。こちらに [両方の構成を示すアプリケーション例][1] があります。

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent のセットアップ][1] に従います。

2. Datadog Agent コンテナでは、以下のエンドポイント環境変数を設定し、対応するポートを公開します。
   - gRPC の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` を `0.0.0.0:4317` に設定し、ポート `4317` を公開します。
   - HTTP の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を `0.0.0.0:4318` に設定し、ポート `4318` を公開します。

<div class="alert alert-danger">
<strong>既知の問題</strong>: Agent バージョン 7.61.0 以降、Docker 環境では、OTLP 取り込みパイプラインが次のエラーを出して起動に失敗することがあります。<code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code><br><br>
影響を受けるバージョンを使用している場合は、次のいずれかの回避策を使用できます。<br><br>
1. Agent Docker コンテナで、環境変数 <code>HOST_PROC</code> を <code>/proc</code> に設定します。<br>
2. Agent Docker コンテナで、 <code>/proc/:/host/proc/:ro</code> から <code>volumes</code> を削除します。<br>
3. Agent Docker コンテナで、 <code>pid</code> を <code>host</code> に設定します。<br><br>
これらの構成は、 <code>docker</code> コマンドまたは Docker Compose ファイルのいずれかを使用して適用できます。</div>

[1]: /ja/agent/docker/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

1.  基本インストール用の [Kubernetes Agent のセットアップ][1] に従います。

2.  Operator の `datadog-agent.yaml` マニフェストで gRPC または HTTP のうち、使用するプロトコルを有効にします。

    gRPC の場合:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              grpc:
                enabled: true
    ```
    
    For HTTP:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              http:
                enabled: true
    ```

{{% k8s-operator-redeploy %}}

これは、各プロトコルをデフォルトのポート (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`) で有効にするものです。メトリクスとトレースはデフォルトで有効になっています。

[1]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  基本インストール用の [Kubernetes Agent のセットアップ][1] に従います。

2.  Helm の `datadog-values.yaml` ファイルで gRPC または HTTP のうち、使用するプロトコルを有効にします。

    gRPC の場合:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            grpc:
              enabled: true
    ```

    For HTTP:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            http:
              enabled: true
    ```

{{% k8s-helm-redeploy %}}

これは、各プロトコルをデフォルトのポート (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`) で有効にするものです。メトリクスとトレースはデフォルトで有効になっています。

[1]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "手動 (Daemonset)" %}}

1.  基本インストール用の [Kubernetes の手動インストールガイド][1] に従います。

2.  `trace-agent` コンテナとコア `agent` コンテナの両方で、以下の環境変数を構成します。

    gRPC の場合:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
    value: "0.0.0.0:4317"
    ```

    For HTTP:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
    value: "0.0.0.0:4318"
    ```

3. コンテナポート 4317 または 4318 をコア `agent` コンテナのホストポートにマッピングします。

    gRPC の場合:
    ```yaml
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: traceportgrpc
        protocol: TCP
    ```

    For HTTP
    ```yaml
    ports:
      - containerPort: 4318
        hostPort: 4318
        name: traceporthttp
        protocol: TCP
    ```

[1]: /ja/containers/guide/kubernetes_daemonset/
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda と Datadog で OpenTelemetry を使用するための詳細な手順は、次のとおりです。

- OpenTelemetry を使用して Lambda 関数をインスツルメントする
- Datadog SDK 内での OpenTelemetry API サポートを使用する
- OpenTelemetry トレースを Datadog Lambda Extension に送信する

詳細は、Serverless ドキュメントの [AWS Lambda および OpenTelemetry][100] を参照してください。

[100]: /ja/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### OTLP ログの取り込みを有効にする {#enabling-otlp-logs-ingestion}

OTLP ログの取り込みは、予定外の課金を防ぐためにデフォルトで無効になっています。これを有効にするには、ログ収集と OTLP ログの取り込みの両方を明示的に有効にする必要があります。

{{< tabs >}}
{{% tab "ホスト" %}}

1. [ホスト Agent のログ収集のセットアップ][7] に従って、ログ収集を有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `otlp_config.logs.enabled`を true に設定します。

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /ja/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Datadog Agent コンテナで次の環境変数を設定します。

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` ファイルで、次のように設定します。

```yaml
spec:
  # (...)
  features:
    otlp:
      #(... enable gRPC or HTTP ingestion...)
    logCollection:
      enabled: true
  override:
    nodeAgent:
      containers:
        agent:
          env:
            - name: DD_OTLP_CONFIG_LOGS_ENABLED
              value: "true"
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` ファイルで、次のように設定します。

```yaml
datadog:
  # (...)
  otlp:
    #(... enable gRPC or HTTP ingestion...)
    logs:
      enabled: true
  logs:
    enabled: true
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "手動 (Daemonset)" %}}

コア Agent コンテナで次の環境変数を設定します。

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

詳細は、[DaemonSet によるログの収集][8] を参照してください。

[8]: /ja/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Datadog Agent では、ほかにも多くの環境変数と設定がサポートされています。それらすべての概要については、[構成テンプレート][6] を参照してください。

## OpenTelemetry のトレース、メトリクス、ログを Datadog Agent に送信する {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Datadog Agent で OTLP 取り込みを有効にしたら、テレメトリデータを Agent の OTLP エンドポイントにエクスポートするように OpenTelemetry でインスツルメントされたアプリケーションを構成します。Agent にデータを転送するように、ご使用の**アプリケーション**環境で `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を設定します。このように設定されていない場合、Agent の OTLP レシーバーが有効になっていても、アプリケーションから Agent にテレメトリデータが送信されません。

{{< tabs >}}
{{% tab "ホスト" %}}
ご使用のアプリケーションの環境で `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を設定します。

gRPC の場合:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
```

HTTP の場合:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```
{{% /tab %}}

{{% tab "Docker" %}}
1. アプリケーションコンテナで、Datadog Agent コンテナを指すように環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` を設定します。たとえば、次のようにします。

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. 両方のコンテナは同じブリッジネットワーク内に定義されている必要があります。これは、Docker Compose を使用している場合は自動的に処理されます。そうでない場合は、[Docker アプリケーションのトレース][1] の Docker の例に従って、ブリッジネットワークに適切なポートを設定してください。

[1]: /ja/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
アプリケーションのデプロイメントファイルで、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` を使用して OpenTelemetry クライアントがトレースを送信するエンドポイントを構成します。

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
**注**: Custom Metrics のコンテナタグを充実させるには、OTLP メトリクスを生成するアプリケーションコード内で適切なリソース属性を設定します。たとえば、`container.id` リソース属性に Pod の UID を設定します。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">トレースの送信先エンドポイントを構成する際は、ご使用の OTLP ライブラリに必要となる、正しいパスを使用してください。ライブラリによっては、トレースの送信先として <code>/v1/traces</code> パスを指定する必要があるものもあれば、ルートパス <code>/</code>に変更します。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /ja/opentelemetry/runtime_metrics/