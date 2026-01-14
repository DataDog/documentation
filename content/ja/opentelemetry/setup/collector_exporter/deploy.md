---
aliases:
- /ja/opentelemetry/collector_exporter/deployment
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector の構成
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: 外部サイト
  text: OpenTelemetry Collector のデプロイ
title: OpenTelemetry Collector をデプロイする
---

このページでは、OpenTelemetry Collector と Datadog Exporter のさまざまなデプロイオプションを案内し、Datadog にトレース、メトリクス、およびログを送信できるようにします。

## Collector のデプロイ

OpenTelemetry Collector は、さまざまなインフラストラクチャーのニーズに合わせて、さまざまな環境にデプロイできます。このセクションでは、以下のデプロイオプションについて説明します。

- [ホスト上で](#on-a-host)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

デプロイ方法によっては、特定の機能や能力が異なる場合があることに注意してください。これらの違いの詳細な概要については、[デプロイベースの制限事項](#deployment-based-limitations)を参照してください。

インフラストラクチャーに最適なデプロイオプションを選択し、以下の手順を完了してください。

### ホスト上で

`--config` パラメーターを使用してコンフィギュレーションファイルを指定し、Collector を実行します。

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker

{{< tabs >}}
{{% tab "localhost" %}}
OpenTelemetry Collector を Docker イメージとして実行し、同じホストからトレースを受信するには

1. [`otel/opentelemetry-collector-contrib`][1] などの公開された Docker イメージを選択します。

2. OpenTelemetry のトレースを OpenTelemetry Collector に送信するために、コンテナ上でどのポートをオープンするかを決定します。デフォルトでは、トレースはポート 4317 の gRPC で送信されます。gRPC を使用しない場合は、ポート 4318 を使用します。

3. コンテナを実行し、`collector.yaml` ファイルを使用して、必要なポートを公開します。例えば、ポート 4317 を使用する場合

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "他のコンテナ" %}}

OpenTelemetry Collector を Docker イメージとして実行し、その他のコンテナからトレースを受信するには

1. Docker ネットワークを作成します。

    ```
    docker network create <NETWORK_NAME>
    ```

2. OpenTelemetry Collector とアプリケーションコンテナを同じネットワークの一部として実行します。

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   アプリケーションコンテナの実行中は、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` が OpenTelemetry Collector 向けの適切なホスト名を使用して構成されていることをご確認ください。以下の例では `opentelemetry-collector` を使用しています。

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}
{{< /tabs >}}

### Kubernetes

{{< tabs >}}
{{% tab "DaemonSet" %}}

Kubernetes 環境で OpenTelemetry 収集を構成するには、DaemonSet を使用することが最も一般的で推奨される方法です。Kubernetes インフラクチャーに OpenTelemetry コレクターと Datadog エクスポーターをデプロイするには

1. アプリケーションの構成を含むこの[構成例][1]を使用して、Datadog Exporter を含む OpenTelemetry Collector を DaemonSet としてセットアップします。
2. DaemonSet の重要なポートが公開され、アプリケーションからアクセス可能であることを確認してください。以下の[例からの][2]構成オプションがこれらのポートを定義しています。
   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
   <div class="alert alert-info">アプリケーションが HTTP と gRPC の両方を必要としない場合、構成から未使用のポートを削除してください。</div>

1. Datadog のコンテナタグ付けに使用される有用な Kubernetes 属性を収集するため、[例に示すように][3] Pod IP をリソース属性として報告します。

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   これにより、[構成マップ][5]で使用される [Kubernetes Attributes Processor][4] が、トレースに付加するための必要なメタデータを抽出できるようになります。このメタデータへのアクセスを許可するために設定する必要がある追加の[ロール][6]があります。[例][1]は完全で、すぐに使用でき、正しいロールが設定されています。

1. [アプリケーションコンテナ][7]を正しい OTLP エンドポイントホスト名を使用するように構成します。OpenTelemetry Collector は DaemonSet として実行されるため、現在のホストを対象とする必要があります。[例のチャート][8]のように、アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を適切に設定します。

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

  1. 正確なホスト情報を確保するために、ホストメタデータの収集を構成します。DaemonSet を設定して、ホストメタデータを収集し転送します。

     ```yaml
     processors:
       resourcedetection:
         detectors: [system, env]
       k8sattributes:
         # existing k8sattributes config
       transform:
         trace_statements:
           - context: resource
             statements:
               - set(attributes["datadog.host.use_as_metadata"], true)
     ...
     service:
       pipelines:
         traces:
           receivers: [otlp]
           processors: [resourcedetection, k8sattributes, transform, batch]
           exporters: [datadog]
     ```

   この構成は、`resourcedetection` プロセッサを使用してホストメタデータを収集し、`k8sattributes` プロセッサで Kubernetes メタデータを追加し、`datadog.host.use_as_metadata` 属性を `true` に設定します。詳細については、[OpenTelemetry セマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする][9]を参照してください。


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: /ja/opentelemetry/schema_semantics/host_metadata/


{{% /tab %}}
{{% tab "ゲートウェイ" %}}

Kubernetes Gateway のデプロイで OpenTelemetry コレクターと Datadog エクスポーターをデプロイするには

1. アプリケーションの構成を含むこの[構成例][1]を使用して、Datadog Exporter を含む OpenTelemetry Collector を DaemonSet としてセットアップします。
2. DaemonSet の重要なポートが公開され、アプリケーションからアクセス可能であることを確認してください。以下の[例からの][2]構成オプションがこれらのポートを定義しています。
   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
   <div class="alert alert-info">アプリケーションが HTTP と gRPC の両方を必要としない場合、構成から未使用のポートを削除してください。</div>

1. Datadog のコンテナタグ付けに使用される有用な Kubernetes 属性を収集するため、[例に示すように][3] Pod IP をリソース属性として報告します。

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   これにより、[構成マップ][5]で使用される [Kubernetes Attributes Processor][4] が、トレースに付加するための必要なメタデータを抽出できるようになります。このメタデータへのアクセスを許可するために設定する必要がある追加の[ロール][6]があります。[例][1]は完全で、すぐに使用でき、正しいロールが設定されています。

1. [アプリケーションコンテナ][7]を正しい OTLP エンドポイントホスト名を使用するように構成します。OpenTelemetry Collector は DaemonSet として実行されるため、現在のホストを対象とする必要があります。[例のチャート][8]のように、アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を適切に設定します。

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

1. DaemonSet に[現在設置されている][10] Datadog Exporter の代わりに [OTLP エクスポーター][9]を含めるように変更します。

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. サービスパイプラインが、[サンプルにある][11] Datadog のものでなく、このエクスポーターを使用することを確認してください。

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   これにより、各 Agent が OTLP プロトコルを介してデータを Collector Gateway に転送します。

1. `<GATEWAY_HOSTNAME>` を OpenTelemetry Collector Gateway のアドレスに置き換えます。

1. [`k8sattributes` プロセッサ][12]を構成して、Pod IP を Gateway Collector に転送し、メタデータを取得できるようにします。

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   `passthrough` オプションの詳細については、[そのドキュメント][13]を参照してください。

1. Gateway Collector の構成が、Agent で OTLP エクスポーターに置き換えられたのと同じ Datadog Exporter の設定を使用していることを確認します。例 (`<DD_SITE>` はあなたのサイト、{{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```
1. ホストメタデータの収集を構成します。
   ゲートウェイデプロイメントでは、ホストメタデータがエージェントコレクターによって収集され、ゲートウェイコレクターによって保持されることを確認する必要があります。これにより、ホストメタデータがエージェントによって収集され、ゲートウェイを介して適切に Datadog に転送されます。
   詳細については、[OpenTelemetry セマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする][14]を参照してください。

   **エージェントコレクターの構成**:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true

   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [resourcedetection, k8sattributes, transform, batch]
         exporters: [otlp]
   ```

   **ゲートウェイコレクターの構成**:

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]

   exporters:
     datadog:
       api:
         key: ${DD_API_KEY}
       hostname_source: resource_attribute

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [k8sattributes, batch]
         exporters: [datadog]
   ```

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L56-L59
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L136-L148
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L69
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#as-a-gateway
[14]: /ja/opentelemetry/schema_semantics/host_metadata/

{{% /tab %}}
{{% tab "Operator" %}}

OpenTelemetry Operator を使用するには、[OpenTelemetry Operator のデプロイメントに関する公式ドキュメント][1]に従ってください。そこに記載されているように、Operator に加えて、証明書マネージャをデプロイします。

OpenTelemetry Collector の標準 Kubernetes 構成の 1 つを使用して Operator を構成します。
* [DaemonSet デプロイメント][2] - ホストメトリクスを確実に受信したい場合は、DaemonSet デプロイメントを使用します。
* [ゲートウェイのデプロイメント][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /ja/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes
[3]: /ja/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes
{{% /tab %}}

{{< /tabs >}}


## ホスト名解決

ホスト名がどのように解決されるかを理解するために、[OpenTelemetry セマンティック規約をホスト名にマッピングする][25]を参照してください。

## デプロイメントに基づく制限

OpenTelemetry コレクターには、[2 つの主要なデプロイメント方法][20]があります。Agent と Gateway です。デプロイメント方法によっては、以下のコンポーネントを利用できます。

| デプロイメントモード | ホストメトリクス | Kubernetes オーケストレーションメトリクス | トレース | ログの自動取り込み |
| --- | --- | --- | --- | --- |
| Gateway として | | {{< X >}} | {{< X >}} | |
| Agent として | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[18]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: /ja/opentelemetry/schema_semantics/hostname/