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
エージェントでの OTLP インジェストは、[OpenTelemetry SDK][1] でインスツルメンテーションされたアプリケーションから Datadog Agent にテレメトリーデータを直接送信する方法です。バージョン 6.32.0 および 7.32.0 以降、Datadog Agent は gRPC または HTTP を介して OTLP トレースおよび [OTLP メトリクス][2] を取り込むことができます。バージョン 6.48.0 および 7.48.0 以降、Datadog Agent は gRPC または HTTP を介して OTLP ログを取り込むことができます。

エージェントでの OTLP インジェストを使用すると、Datadog Agent の可観測性機能を利用できます。OpenTelemetry SDK でインスツルメンテーションされたアプリケーションからのデータは、App および API Protection、Continuous Profiler、Ingestion Rules などの一部の Datadog 独自製品では使用できません。[OpenTelemetry ランタイムメトリクスは一部の言語でサポートされています][10]。

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="図：OpenTelemetry SDK は OTLP プロトコルを介して Datadog エクスポーターを使用してコレクターにデータを送信し、Datadog のプラットフォームに転送します。" style="width:100%;" >}}

<div class="alert alert-info">このセットアップでサポートされている Datadog 機能を確認するには、<a href="/opentelemetry/compatibility/">機能互換性テーブル</a>を <b>OTel から Datadog エージェント (OTLP)</b>の下で参照してください。</div>

## 初期設定 {#initial-setup}

始めるには、まず [OpenTelemetry SDK][3] でアプリケーションにインスツルメンテーションします。次に、テレメトリーデータを OTLP 形式で Datadog Agent にエクスポートします。これを構成する方法は、サービスが展開されているインフラストラクチャーの種類によって異なります。以下のページに説明があります。最新の OTLP バージョンとの互換性を目指していますが、Datadog Agent における OTLP インジェストはすべての OTLP バージョンと互換性があるわけではありません。Datadog Agent と互換性のある OTLP バージョンは、OpenTelemetry コレクターの OTLP レシーバーでもサポートされているバージョンです。サポートされている正確なバージョンを確認するには、Datadog Agent の `go.mod` ファイルの `go.opentelemetry.io/collector` バージョンを確認してください。

OpenTelemetry のインスツルメンテーション ドキュメントを読んで、インスツルメンテーションを Datadog Agent に向ける方法を理解してください。以下に説明する `receiver` セクションは、[OpenTelemetry コレクター OTLP レシーバー構成スキーマ][5] に従っています。

<div class="alert alert-warning">サポートされているセットアップは、すべての OpenTelemetry データを生成するホストに展開された Datadog Agent です。異なるホスト上の Datadog Agent に、1 つのホストで実行されているコレクターまたはインスツルメンテーションされたアプリから OpenTelemetry テレメトリを送信することはできません。ただし、Datadog Agent がコレクターまたは SDK でインスツルメンテーションされたアプリにローカルである場合、複数のパイプラインを設定できます。</div>

## Datadog Agent で OTLP の取り込みを有効にする {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "ホスト" %}}

OTLP の取り込みはデフォルトでオフになっており、`datadog.yaml`ファイルの設定を更新するか、環境変数を設定することでオンにできます。以下の `datadog.yaml` 設定は、デフォルトポートでエンドポイントを有効にします。有効にすると、メトリクスとトレースの取り込みはデフォルトでオンになります。ログの取り込みは、予期しないログの請求を防ぐためにデフォルトで無効になっています。

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

これらは、コア Datadog Agent とトレース Datadog Agent の両方のプロセスに渡す必要があります。コンテナ環境で実行している場合は、サーバーがローカル以外のインターフェースで利用可能であることを確認するために、`0.0.0.0``localhost`を使用してください。

この機能には、gRPC または HTTP のいずれかを設定してください。こちらは、両方の設定を示す[サンプルアプリケーション][1]です。

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent のセットアップ][1]に従ってください。

2. Datadog Agent コンテナでは、以下のエンドポイント環境変数を設定し、対応するポートを公開します:
   - gRPC の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`を`0.0.0.0:4317`に設定し、ポート`4317`を公開します。
   - HTTP の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`を`0.0.0.0:4318`に設定し、ポート`4318`を公開します。

<div class="alert alert-danger">
<strong>既知の問題</strong>: Datadog Agent バージョン7.61.0以降、OTLPの取り込みパイプラインはDocker環境で起動に失敗する可能性があり、次のエラーが表示されます:<code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
影響を受けるバージョンを使用している場合は、次のいずれかの回避策を使用できます:<br><br>
1. 環境変数を設定します <code>HOST_PROC</code> から <code>/proc</code> Datadog Agent Docker コンテナ内で。<br>
2. 削除 <code>/proc/:/host/proc/:ro</code> から <code>volumes</code> Datadog Agent Docker コンテナ内で。<br>
3. 設定 <code>pid</code> から <code>host</code> Datadog Agent Docker コンテナ内で。<br><br>
これらの設定は、次のいずれかを通じて適用できます。 <code>docker</code> コマンドまたは Docker Compose ファイル。</div>

[1]: /ja/agent/docker/
{{% /tab %}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}

1.  基本インストールのために[Kubernetes Agent セットアップ][1]に従ってください。

2.  オペレーターの`datadog-agent.yaml`マニフェストで、好みのプロトコル gRPC または HTTP を有効にします：

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

これは、各プロトコルをデフォルトのポート (`4317` は OTLP/gRPC、`4318` は OTLP/HTTP) で有効にします。メトリクスとトレースはデフォルトで有効になっています。

[1]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  基本インストールのために[Kubernetes Agent セットアップ][1]に従ってください。

2.  ヘルムの`datadog-values.yaml`ファイルで、好みのプロトコル gRPC または HTTP を有効にします：

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

これは、各プロトコルをデフォルトのポート (`4317` は OTLP/gRPC、`4318` は OTLP/HTTP) で有効にします。メトリクスとトレースはデフォルトで有効になっています。

[1]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "手動 (Daemonset)" %}}

1.  基本インストールのために[手動 Kubernetes インストールガイド][1]に従ってください。

2.  以下の環境変数を、`trace-agent`コンテナとコア`agent`コンテナの両方で構成します：

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

3. コア`agent`コンテナのホストポートに、コンテナポート 4317 または 4318 をマッピングします：

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

AWS Lambda と Datadog で OpenTelemetry を使用するための詳細な手順については、

- OpenTelemetry で Lambda 関数をインスツルメンテーションする
- Datadog SDK 内での OpenTelemetry API サポートの使用
- OpenTelemetry トレースを Datadog Lambda Extension に送信する

[AWS Lambda と OpenTelemetry][100]のサーバーレスドキュメントを参照してください。

[100]: /ja/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### OTLP ログの取り込みを有効にする {#enabling-otlp-logs-ingestion}

OTLP ログの取り込みは、予期しない請求を避けるためにデフォルトで無効になっています。これを有効にするには、ログ収集と OTLP ログの取り込みの両方を明示的に有効にする必要があります。

{{< tabs >}}
{{% tab "ホスト" %}}

1. [Host Agent Log collection setup][7] に従ってログ収集を有効にします。

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

Datadog Agent コンテナ内に次の環境変数を設定します。

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}

`datadog-agent.yaml`ファイル内で

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

`datadog-values.yaml`ファイル内で:

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

コア Agent コンテナ内に次の環境変数を設定します。

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

詳細については、[log collection with your DaemonSet][8] を参照してください。

[8]: /ja/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Datadog Agent では、他にも多くの環境変数と設定がサポートされています。それらすべての概要については、[the configuration template][6] を参照してください。

## OpenTelemetry のトレース、メトリクス、およびログを Datadog Agent に送信する {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Datadog Agent で OTLP 取り込みを有効にした後、OpenTelemetry で計測されたアプリケーションを構成して、エージェントの OTLP エンドポイントにテレメトリデータをエクスポートします。データをエージェントに送信するために、**アプリケーション**環境内で `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を設定します。この設定がないと、エージェントの OTLP 受信機が有効になっていても、アプリケーションはエージェントにテレメトリデータを送信しません。

{{< tabs >}}
{{% tab "ホスト" %}}
アプリケーションの環境内で`OTEL_EXPORTER_OTLP_ENDPOINT`環境変数を設定します。

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
1. アプリケーションコンテナの場合、`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を Datadog Agent コンテナを指すように設定します。たとえば、以下のとおりです。

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. 両方のコンテナは同じブリッジネットワークで定義されている必要があり、Docker Compose を使用すると自動的に処理されます。そうでない場合は、[Tracing Docker Applications][1] の Docker の例に従って、正しいポートでブリッジネットワークを設定してください。

[1]: /ja/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
アプリケーションデプロイファイルで、`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を使って、OpenTelemetry クライアントがトレースを送信するエンドポイントを構成します。

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
**注意**: カスタムメトリクスのためにコンテナタグを豊かにするには、OTLPメトリクスが生成されるアプリケーションコードで適切なリソース属性を設定してください。例えば、`container.id` リソース属性を Pod の UID に設定します。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">トレースを送信するためのエンドポイントを構成する際は、OTLPライブラリに必要な正しいパスを使用することを確認してください。一部のライブラリは、トレースが以下に送信されることを期待しています。 <code>/v1/traces</code> 一部のライブラリはパスを使用し、他のライブラリはルートパスを使用します。 <code>/</code>.</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /ja/opentelemetry/runtime_metrics/