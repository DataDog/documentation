---
aliases: null
description: Datadog Agent による OTLP トレースデータの取り込み
further_reading: null
kind: documentation
title: Datadog Agent による OTLP トレースの取り込み
---


OTLP Ingest in the Agent は、[OpenTelemetry SDK][1] でインスツルメントされたアプリケーションから Datadog Agent に直接テレメトリーデータを送信する方法です。バージョン 6.32.0 と 7.32.0 以降、Datadog Agent は gRPC または HTTP を通じて OTLP トレースと [OTLP メトリクス][2]を取り込むことができるようになりました。

OTLP Ingest in the Agent では、Datadog Agent でトレース観測可能性機能を利用することができます。アプリケーションは OpenTelemetry SDK でインスツルメントされているため、アプリケーションセキュリティモニタリング、Continuous Profiler、ランタイムメトリクス、取り込みルールなどの Datadog トレーシングライブラリ固有の機能は、取り込まれたデータでは利用できません。

<div class="alert alert-warning">OTLP メトリクスの取り込みはベータ版であり、その動作や構成は変更される可能性があります。</div>

まず、OpenTelemetry SDK を使って、[アプリケーションをインスツルメントします][3]。次に、テレメトリーデータを OTLP フォーマットで Datadog Agent にエクスポートします。この構成は、以下のページで説明されているように、サービスがデプロイされているインフラストラクチャーの種類によって異なります。

OpenTelemetry のインスツルメンテーションのドキュメントを読んで、インスツルメンテーションを Agent に向ける方法を理解してください。以下に説明する `receiver` セクションは [OpenTelemetry Collector OTLP レシーバー構成スキーマ][4]に従っています。


{{< tabs >}}
{{% tab "Host" %}}

OTLP の取り込みはデフォルトではオフになっており、`datadog.yaml` ファイルの構成を更新するか、環境変数を設定することでオンにすることが可能です。以下の `datadog.yaml` 構成は、デフォルトのポートでエンドポイントを有効にします。

gRPC の場合、デフォルトは 4317 番ポートです。

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
```
HTTP の場合、デフォルトは 4318 番ポートです。

```yaml
otlp_config:
  receiver:
    protocols:
      http:
```

または、環境変数でポートを指定して、エンドポイントを構成します。

- gRPC の場合 (`0.0.0.0:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 
- HTTP の場合 (`0.0.0.0:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

これらは、コア Agent とトレース Agent が別々のコンテナで実行されている場合、両方に渡される必要があります。

この機能には、gRPC と HTTP のどちらかを構成します。以下は、[両方の構成を示すアプリケーション例][1]です。

非推奨のお知らせ: `datadog.yaml` で OTLP 受信の構成を行う際に、以下に示す `experimental:` 構成とそれに対応する環境変数 `DD_OTLP_HTTP_PORT` および `DD_OTLP_GRPC_PORT` を使用していましたが、これは非推奨となり Agent バージョン `7.37.0` で削除される予定です。

```yaml
experimental:
  otlp:
    receiver:
      protocols:
        grpc:
        http:
```

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent のセットアップ][1]に従ってください。

2. Datadog Agent コンテナでは、以下のエンドポイント環境変数を設定し、対応するポートを公開します。
   - gPRC の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` とポート `4317`
   - HTTP の場合: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` とポート `4318`

3. アプリケーションコンテナでは、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` に、Datadog Agent コンテナを指すように設定します。例:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318.
   ```

4. 両方のコンテナが同じブリッジネットワークに定義されている必要がありますが、これは Docker Compose を使用している場合に自動的に処理されます。そうでない場合は、[Docker アプリケーションのトレース][2]の Docker の例に従って、正しいポートでブリッジネットワークをセットアップしてください。


[1]: /ja/agent/docker/
[2]: /ja/agent/docker/apm/#docker-network
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

4. アプリケーションデプロイファイルで、`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を使って、OpenTelemetry クライアントがトレースを送信するエンドポイントを構成します。

   gPRC の場合:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4317" # sends to gRPC receiver on port 4317
   ```

   HTTP の場合:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4318" # sends to HTTP receiver on port 4318
   ```


[1]: /ja/agent/kubernetes/?tab=daemonset
{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

1. [Kubernetes Agent のセットアップ][1]に従ってください。

2. Agent の環境変数を設定します。`set` コマンドを使用することができます。

   gRPC の場合:
   ```
   --set "datadog.env[0].name=DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT,datadog.env[0].value=0.0.0.0:4317"
   ```
   HTTP の場合:
   ```
   --set "datadog.env[0].name=DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT,datadog.env[0].value=0.0.0.0:4318"
   ```

   または、`values.yaml` ファイルの `datadog.env` パラメーターにこのコマンドを設定できます。

   gRPC の場合:
   ```
   env
     - name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT
       value: "0.0.0.0:4317"
   ```

   HTTP の場合:
   ```
   env: 
     - name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT
       value: "0.0.0.0:4318"
   ```

3. コンテナポート (gRPC の場合は `4317`、HTTP の場合は `4318`) を、コア Agent コンテナのホストポートにマッピングします。`set` コマンドを使用することもできます。

   gRPC の場合:
   ```
   --set 'agents.containers.agent.ports[0].containerPort=4317,agents.containers.agent.ports[0].hostPort=4317,agents.containers.agent.ports[0].name=traceportgrpc,agents.containers.agent.ports[0].protocol=TCP' 
   ```
   HTTP の場合:
   ```
   --set 'agents.containers.agent.ports[0].containerPort=4318,agents.containers.agent.ports[0].hostPort=4318,agents.containers.agent.ports[0].name=traceporthttp,agents.containers.agent.ports[0].protocol=TCP'
   ```

   または、`values.yaml` ファイルの `agents.containers.agent.ports` パラメーターにこのコマンドを設定できます。

   gRPC の場合:
   ```
     ports: 
       - containerPort: 4317
         hostPort: 4317
         name: traceportgrpc
         protocol: TCP
   ```

   HTTP の場合:
   ```
     ports: 
       - containerPort: 4318
         hostPort: 4318
         name: traceporthttp
         protocol: TCP
   ```

4. アプリケーションデプロイファイルで、`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を使って、OpenTelemetry クライアントがトレースを送信するエンドポイントを構成します。

   gPRC の場合:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4317" # sends to gRPC receiver on port 4317
   ```

   HTTP の場合:
   ```
   env:
    - name: <DD_AGENT_HOST>
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$<DD_AGENT_HOST>:4318" # sends to HTTP receiver on port 4318
   ```


[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}
{{< /tabs >}}

Datadog Agent でサポートされている環境変数や設定は、他にも多数あります。それらすべての概要を知るには、[構成テンプレート][5]を参照してください。

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/otlp/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[5]: https://github.com/DataDog/datadog-agent/blob/7.35.0/pkg/config/config_template.yaml