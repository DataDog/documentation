---
aliases:
- /ja/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
description: Datadog Agent による OTLP トレースデータの取り込み
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: GitHub
  text: Agent における OTLP の取り込み
kind: documentation
title: Datadog Agent による OTLP トレースの取り込み
---


OTLP Ingest in the Agent は、[OpenTelemetry SDK][1] でインスツルメントされたアプリケーションから Datadog Agent に直接テレメトリーデータを送信する方法です。バージョン 6.32.0 と 7.32.0 以降、Datadog Agent は gRPC または HTTP を通じて OTLP トレースと [OTLP メトリクス][2]を取り込むことができるようになりました。

OTLP Ingest in the Agent では、Datadog Agent でトレース観測可能性機能を利用することができます。アプリケーションは OpenTelemetry SDK でインスツルメントされているため、Application Security Management、Continuous Profiler、ランタイムメトリクス、取り込みルールなどの Datadog トレーシングライブラリ固有の機能は、取り込まれたデータでは利用できません。

まず、OpenTelemetry SDK を使って、[アプリケーションをインスツルメントします][3]。次に、テレメトリーデータを OTLP フォーマットで Datadog Agent にエクスポートします。この構成は、以下のページで説明されているように、サービスがデプロイされているインフラストラクチャーの種類によって異なります。

OpenTelemetry のインスツルメンテーションのドキュメントを読んで、インスツルメンテーションを Agent に向ける方法を理解してください。以下に説明する `receiver` セクションは [OpenTelemetry Collector OTLP レシーバー構成スキーマ][4]に従っています。

{{< img src="metrics/otel/otlp_ingestion_update.png" alt="OTel SDK/ライブラリ、Datadog トレースライブラリ、Datadog インテグレーション -> Datadog Agent -> Datadog" style="width:100%;">}}

## Datadog Agent で OTLP の取り込みを有効にする

{{< tabs >}}
{{% tab "Host" %}}

OTLP の取り込みはデフォルトではオフになっており、`datadog.yaml` ファイルの構成を更新するか、環境変数を設定することでオンにすることが可能です。以下の `datadog.yaml` 構成は、デフォルトのポートでエンドポイントを有効にします。

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

- gRPC の場合 (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 
- HTTP の場合 (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

これらは core Agent と trace Agent プロセスの両方に渡さなければなりません。コンテナ環境で実行する場合は、ローカルではないインターフェイスでもサーバーを利用できるように、`localhost` の代わりに `0.0.0.0` を使用します。

この機能には、gRPC と HTTP のどちらかを構成します。以下は、[両方の構成を示すアプリケーション例][1]です。

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent のセットアップ][1]に従ってください。

2. Datadog Agent コンテナでは、以下のエンドポイント環境変数を設定し、対応するポートを公開します。
   - gPRC の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` を `0.0.0.0:4317` に設定し、ポート `4317` を公開します。
   - HTTP の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を `0.0.0.0:4318` に設定し、ポート `4318` を公開します。

[1]: /ja/agent/docker/
{{% /tab %}}
{{% tab "Kubernetes (Daemonset)" %}}

1. [Kubernetes Agent のセットアップ][1]に従ってください。

2. トレース Agent コンテナとコア Agent コンテナの両方で、以下の環境変数を構成します。

   gPRC の場合:
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

   gPRC の場合:
   ```
   ports:
     - containerPort: 4317
       hostPort: 4317
       name: traceportgrpc
       protocol: TCP
   ```

   HTTP の場合
   ```
   ports:
     - containerPort: 4318
       hostPort: 4318
       name: traceporthttp
       protocol: TCP
   ```

[1]: /ja/agent/kubernetes/?tab=daemonset
{{< /tabs >}}

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
{{< /tabs >}}

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

Datadog Agent でサポートされている環境変数や設定は、他にも多数あります。それらすべての概要を知るには、[構成テンプレート][5]を参照してください。

## アプリケーションから Datadog Agent に OTLP トレースを送信する

{{< tabs >}}
{{% tab "Docker" %}}
1. アプリケーションコンテナでは、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` に、Datadog Agent コンテナを指すように設定します。例:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318.
   ```

2. 両方のコンテナが同じブリッジネットワークに定義されている必要がありますが、これは Docker Compose を使用している場合に自動的に処理されます。そうでない場合は、[Docker アプリケーションのトレース][1]の Docker の例に従って、正しいポートでブリッジネットワークをセットアップしてください。

[1]: /ja/agent/docker/apm/#docker-network
{{< /tabs >}}

{{% tab "Kubernetes" %}}
1. アプリケーションデプロイファイルで、`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を使って、OpenTelemetry クライアントがトレースを送信するエンドポイントを構成します。

   gPRC の場合:
   ```
   env:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
   ```

   HTTP の場合:
   ```
   env:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
   ```
{{< /tabs >}}
{{< /tabs >}}

<div class="alert alert-info">OTLP ライブラリのドキュメントを確認してください。それらのいくつかは、トレースを `/` ルートパスの代わりに `/v1/traces` に送らなければなりません。</div>


## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[5]: https://github.com/DataDog/datadog-agent/blob/7.35.0/pkg/config/config_template.yaml