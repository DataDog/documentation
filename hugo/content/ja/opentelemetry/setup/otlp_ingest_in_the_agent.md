---
aliases:
- /ja/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /ja/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /ja/opentelemetry/otlp_ingest_in_the_agent/
- /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Datadog Agent を介して OTLP トレースデータを取り込みます。
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: ブログ
  text: Agent での OTLP インジェスト
- link: /metrics/open_telemetry/otlp_metric_types
  tag: ドキュメント
  text: OTLP メトリクスタイプ
- link: /opentelemetry/runtime_metrics/
  tag: ドキュメント
  text: OpenTelemetry ランタイムメトリクス
title: Datadog Agent による OTLP インジェスト
---
Agent での OTLP インジェストは、[OpenTelemetry SDK][1] でインスツルメンテーションされたアプリケーションから Datadog Agent に直接テレメトリデータを送信する方法です。バージョン 6.32.0 および 7.32.0 以降、Datadog Agent は gRPC または HTTP を介して OTLP トレースおよび [OTLP メトリクス][2]をインジェストすることができます。バージョン 6.48.0 および 7.48.0 以降、Datadog Agent は gRPC または HTTP を介して OTLP ログをインジェストすることができます。

Agent での OTLP インジェストにより、Datadog Agent のオブザーバビリティ機能を使用できるようになります。OpenTelemetry SDK でインスツルメンテーションされたアプリケーションからのデータは、App and API Protection、Continuous Profiler、Ingestion Rules などの一部の Datadog 独自製品では使用できません。[OpenTelemetry ランタイムメトリクスは一部の言語でサポートされています][10]。

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="図: OpenTelemetry SDK が OTLP プロトコルを介してデータを Datadog Exporter を備えた Collector に送信し、それが Datadog プラットフォームに転送されます。" style="width:100%;" >}}

<div class="alert alert-info">このセットアップでサポートされている Datadog 機能を確認するには、<b>OTel から Datadog Agent (OTLP) へ</b>の下の <a href="/opentelemetry/compatibility/">機能互換性テーブル</a>を参照してください。</div>

## 初期セットアップ {#initial-setup}

開始するには、まず OpenTelemetry SDK を使用して[アプリケーションをインスツルメンテーション][3]します。次に、テレメトリデータを OTLP 形式で Datadog Agent にエクスポートします。これの設定方法は、以下のページで説明されているように、サービスがデプロイされているインフラストラクチャーの種類によって異なります。最新の OTLP バージョンとの互換性を目指していますが、Agent での OTLP インジェストはすべての OTLP バージョンと互換性があるわけではありません。Datadog Agent と互換性のある OTLP のバージョンは、OpenTelemetry Collector の OTLP レシーバーでもサポートされているバージョンです。サポートされている正確なバージョンを確認するには、Agent の `go.mod` ファイルで `go.opentelemetry.io/collector` のバージョンを確認してください。

OpenTelemetry インスツルメンテーションのドキュメントを読んで、インスツルメンテーションを Agent に向ける方法を理解してください。以下で説明する `receiver` セクションは、[OpenTelemetry Collector OTLP レシーバー構成スキーマ][5]に従っています。

<div class="alert alert-warning">サポートされているセットアップは、OpenTelemetry データを生成するすべてのホストにインジェスト Agent をデプロイすることです。あるホストで実行されているコレクターやインスツルメンテーションされたアプリから、別のホスト上の Agent に OpenTelemetry テレメトリを送信することはできません。ただし、Agent がコレクターまたは SDK でインスツルメンテーションされたアプリに対してローカルにある場合は、複数のパイプラインをセットアップできます。</div>

## Datadog Agent での OTLP インジェストの有効化 {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "ホスト" %}}

OTLP インジェストはデフォルトでオフになっています。`datadog.yaml` ファイルの設定を更新するか、環境変数を設定することでオンにできます。以下の `datadog.yaml` 構成により、デフォルトポートでエンドポイントが有効になります。有効にすると、メトリクスとトレースのインジェストがデフォルトでオンになります。予期しないログの課金を防ぐため、ログのインジェストはデフォルトで無効になっています。

{{% otel-endpoint-note %}}

gRPC の場合、デフォルトポートは 4317 です。

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
  logs:
    enabled: false
```
HTTP の場合、デフォルトポートは 4318 です。

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: false
```

あるいは、環境変数を通じてポートを指定してエンドポイントを構成することもできます。

- gRPC の場合 (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- HTTP の場合 (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

これらは、コア Agent と trace Agent の両方のプロセスに渡す必要があります。コンテナ化された環境で実行している場合は、サーバーがローカル以外のインターフェースでも利用できるように、`0.0.0.0` の代わりに `localhost` を使用してください。

この機能には、gRPC または HTTP のいずれかを設定してください。[両方の設定を示すサンプルアプリケーション][1]はこちらです。

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent のセットアップ][1]に従ってください。

2. Datadog Agent コンテナについては、以下のエンドポイント環境変数を設定し、対応するポートを公開してください。
   - gRPC の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` を `0.0.0.0:4317` に設定し、ポート `4317` を公開します。
   - HTTP の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を `0.0.0.0:4318` に設定し、ポート `4318` を公開します。

<div class="alert alert-danger">
<strong>既知の問題</strong>: Agent バージョン 7.61.0 以降、Docker 環境で OTLP インジェストパイプラインの起動に失敗し、次のエラーが表示される場合があります。<code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code><br><br>
影響を受けるバージョンを使用している場合は、以下の回避策のいずれかを使用できます。<br><br>
1. Agent の Docker コンテナで環境変数 <code>HOST_PROC</code> を <code>/proc</code> に設定します。<br>
2. Agent の Docker コンテナで <code>/proc/:/host/proc/:ro</code> を <code>volumes</code> から削除します。<br>
3. Agent の Docker コンテナで <code>pid</code> を <code>host</code> に設定します。<br><br>
これらの設定は、 <code>docker</code> コマンドまたは Docker compose ファイルのいずれかを使用して適用できます。</div>

[1]: /ja/agent/docker/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

1.  基本インストールについては、[Kubernetes Agent のセットアップ][1]に従ってください。

2.  Operator の `datadog-agent.yaml` マニフェストで、優先するプロトコル (gRPC または HTTP) を有効にします。

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

これにより、デフォルトポート (OTLP/gRPC の場合は `4317`、OTLP/HTTP の場合は `4318`) で各プロトコルが有効になります。メトリクスとトレースはデフォルトで有効になっています。

[1]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  基本インストールについては、[Kubernetes Agent のセットアップ][1]に従ってください。

2.  Helm の `datadog-values.yaml` ファイルで、優先するプロトコル (gRPC または HTTP) を有効にします。

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

これにより、デフォルトポート (OTLP/gRPC の場合は `4317`、OTLP/HTTP の場合は `4318`) で各プロトコルが有効になります。メトリクスとトレースはデフォルトで有効になっています。

[1]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "手動 (DaemonSet)" %}}

1.  基本インストールについては、[Kubernetes の手動インストールガイド][1]に従ってください。

2.  `trace-agent` コンテナおよびコア `agent` コンテナの両方で、以下の環境変数を設定します。

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

3. コア `agent` コンテナのホストポートに、コンテナポート 4317 または 4318 をマッピングします。

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

AWS Lambda および Datadog で OpenTelemetry を使用するための詳細な手順については、以下を参照してください。

- OpenTelemetry を使用した Lambda 関数のインスツルメンテーション
- Datadog SDK 内での OpenTelemetry API サポートの使用
- Datadog Lambda Extension への OpenTelemetry トレースの送信

[AWS Lambda と OpenTelemetry][100] に関する Serverless のドキュメントを参照してください。

[100]: /ja/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### OTLP ログのインジェストの有効化 {#enabling-otlp-logs-ingestion}

予期しない課金を避けるため、OTLP ログの取り込みはデフォルトで無効になっています。これを有効にするには、ログ収集と OTLP ログの取り込みの両方を明示的に有効にする必要があります。

{{< tabs >}}
{{% tab "ホスト" %}}

1. [ホストエージェントのログ収集セットアップ][7]に従い、ログ収集を有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `otlp_config.logs.enabled` を true に設定します。

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /ja/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Datadog Agent コンテナに以下の環境変数を設定します。

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` ファイル内

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

`datadog-values.yaml` ファイル内:

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
{{% tab "手動 (DaemonSet)" %}}

コア Agent コンテナに以下の環境変数を設定します。

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

詳細については、[DaemonSet を使用したログ収集][8]を参照してください。

[8]: /ja/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Datadog Agent でサポートされている他の環境変数や設定は多数あります。概要については、[Agent 構成ファイル][6]を参照してください。

## OpenTelemetry のトレース、メトリクス、ログを Datadog Agent に送信する {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Datadog Agent で OTLP の取り込みを有効にした後、OpenTelemetry でインスツルメントされたアプリケーションが Agent の OTLP エンドポイントへテレメトリーデータをエクスポートするように構成します。データを Agent に送信するには、**アプリケーション**の環境で `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を設定します。この構成を行わないと、Agent の OTLP レシーバーが有効になっていても、アプリケーションは Agent にテレメトリーデータを送信しません。

{{< tabs >}}
{{% tab "ホスト" %}}
アプリケーションの環境で `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を設定します。

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
1. アプリケーションコンテナで、`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を Datadog Agent コンテナを指すように設定します。例:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. 両方のコンテナは同じブリッジネットワーク内で定義されている必要があります。Docker Compose を使用している場合は、これが自動的に処理されます。そうでない場合は、[Docker アプリケーションのトレーシング][1]の Docker の例に従って、正しいポートでブリッジネットワークをセットアップします。

[1]: /ja/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
アプリケーションのデプロイメントファイルで、OpenTelemetry クライアントがトレースを送信するエンドポイントを `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数で構成します。

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
**注**: カスタムメトリクス用のコンテナタグを充実させるには、OTLP メトリクスが生成されるアプリケーションコード内で適切なリソース属性を構成します。たとえば、コンテナの[リソースディテクター][1]を使用して `container.id` リソース属性を構成します。

[1]: https://opentelemetry.io/docs/concepts/resources/#resource-detectors
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">トレース送信用のエンドポイントを構成する際は、お使いの OTLP ライブラリで要求される正しいパスを必ず使用します。ライブラリによっては、トレースの送信先として <code>/v1/traces</code> パスを使用するものもあれば、ルートパスである <code>/</code>を使用するものもあります。</div>

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: /ja/agent/configuration/agent-configuration-files/
[10]: /ja/opentelemetry/runtime_metrics/