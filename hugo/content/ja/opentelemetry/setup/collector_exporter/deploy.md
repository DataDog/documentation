---
aliases:
- /ja/opentelemetry/collector_exporter/deployment
further_reading:
- link: /opentelemetry/setup/collector_exporter/datadog_exporter/
  tag: ドキュメント
  text: Datadog Exporter と Connector を設定する
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: 外部サイト
  text: OpenTelemetry Collector のデプロイ
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Architecture Center
  text: Kubernetes の OpenTelemetry Collector
title: Datadog Exporter を使用して OpenTelemetry Collector をデプロイする
---
このページでは、OpenTelemetry Collector と Datadog Exporter のさまざまなデプロイオプションを案内し、Datadog にトレース、メトリクス、およびログを送信できるようにします。

## Collector のデプロイ {#deploy-the-collector}

OpenTelemetry Collector は、さまざまなインフラストラクチャーのニーズに合わせて、さまざまな環境にデプロイできます。このセクションでは、以下のデプロイオプションについて説明します。

- [ホスト上で](#on-a-host)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

デプロイ方法によって、特定の機能や能力が異なる場合があることに注意してください。これらの違いの詳細については、「[デプロイメントに基づく制限](#deployment-based-limitations)」を参照してください。

インフラストラクチャーに最適なデプロイオプションを選択し、以下の手順を完了してください。

### ホスト上で {#on-a-host}

`--config` パラメーターを使用してコンフィギュレーションファイルを指定し、Collector を実行します。

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker {#docker}

{{< tabs >}}
{{% tab "localhost" %}}
OpenTelemetry Collector を Docker イメージとして実行し、同じホストからトレースを受信するには

1. [`otel/opentelemetry-collector-contrib`][1] などの公開されている Docker イメージを選択します。

2. OpenTelemetry トレースが OpenTelemetry Collector に送信されるように、コンテナ上で開くポートを決定します。デフォルトでは、トレースはポート 4317 で gRPC を介して送信されます。gRPC を使用しない場合は、ポート 4318 を使用してください。

3. `collector.yaml` ファイルを使用してコンテナを実行し、必要なポートを公開します。たとえば、ポート 4317 を使用している場合は次のようにします。

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "その他のコンテナ" %}}

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

   アプリケーションコンテナの実行中は、OpenTelemetry Collector の適切なホスト名を使用するように環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` が構成されていることをご確認ください。以下の例では、`opentelemetry-collector` です。

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

### Kubernetes {#kubernetes}

{{< tabs >}}
{{% tab "DaemonSet" %}}

Kubernetes 環境で OpenTelemetry 収集を構成するには、DaemonSet を使用することが最も一般的で推奨される方法です。Kubernetes インフラストラクチャーに OpenTelemetry Collector と Datadog Exporter をデプロイするには、次のようにします。

1. アプリケーションの構成を含むこの[構成例][1]を使用して、Datadog Exporter を含む OpenTelemetry Collector を DaemonSet としてセットアップします。
2. DaemonSet の重要なポートが公開され、アプリケーションからアクセス可能であることを確認します。以下の[例からの][2]構成オプションがこれらのポートを定義しています。
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

1. Datadog コンテナのタグ付けに使用される有用な Kubernetes 属性を収集するために、[例に示すように][3] Pod IP をリソース属性として報告します。

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

   これにより、[構成マップ][5]で使用される [Kubernetes Attributes Processor][4] が、トレースにアタッチするために必要なメタデータを抽出することができるようになります。このメタデータにアクセスできるようにするために、追加で設定する必要がある[ロール][6]があります。[この例][1]は完全で、すぐに使用でき、正しいロールが設定されています。
  
1. [アプリケーションコンテナ][7]を正しい OTLP エンドポイントホスト名を使用するように構成します。OpenTelemetry Collector は DaemonSet として実行されるため、現在のホストを対象とする必要があります。[例のチャート][8]に従って、アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を適切に設定します。

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

   この構成は、`resourcedetection` プロセッサを使用してホストメタデータを収集し、`k8sattributes` プロセッサで Kubernetes メタデータを追加し、`datadog.host.use_as_metadata` 属性を `true` に設定します。詳細については、「[OpenTelemetry のセマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする][9]」を参照してください。


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
2. DaemonSet の重要なポートが公開され、アプリケーションからアクセス可能であることを確認します。以下の[例からの][2]構成オプションがこれらのポートを定義しています。
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

1. Datadog コンテナのタグ付けに使用される有用な Kubernetes 属性を収集するために、[例に示すように][3] Pod IP をリソース属性として報告します。

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

   これにより、[構成マップ][5]で使用される [Kubernetes Attributes Processor][4] が、トレースにアタッチするために必要なメタデータを抽出することができるようになります。このメタデータにアクセスできるようにするために、追加で設定する必要がある[ロール][6]があります。[この例][1]は完全で、すぐに使用でき、正しいロールが設定されています。
  
1. [アプリケーションコンテナ][7]を正しい OTLP エンドポイントホスト名を使用するように構成します。OpenTelemetry Collector は DaemonSet として実行されるため、現在のホストを対象とする必要があります。[例のチャート][8]に従って、アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を適切に設定します。

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

1. [現在設置されている][10] Datadog Exporter の代わりに [OTLP エクスポーター][9]を含めるように DaemonSet を変更します。

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. サービスパイプラインが、[サンプルにある][11] Datadog のものでなく、このエクスポーターを使用することを確認します。

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

1. Gateway Collector の構成が、Agent で OTLP エクスポーターに置き換えられたのと同じ Datadog Exporter の設定を使用していることを確認します。たとえば、次のようになります (`<DD_SITE>` はご使用のサイトです{{< region-param key="dd_site" code="true" >}})。

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
   ゲートウェイデプロイメントでは、ホストメタデータが Agent Collector によって収集され、Gateway Collector によって保持されることを確認する必要があります。これにより、ホストメタデータが Agent によって収集され、ゲートウェイを介して適切に Datadog に転送されます。 
   詳細については、[OpenTelemetry セマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする][14]を参照してください。

   **Agent Collector の構成**:

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

   **Gateway Collector の構成**:

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

OpenTelemetry Operator を使用するには、[OpenTelemetry Operator のデプロイに関する公式ドキュメント][1]に従ってください。このドキュメントの説明に従って、Operator に加えて証明書マネージャーをデプロイします。

OpenTelemetry Collector の標準 Kubernetes 構成の 1 つを使用して Operator を構成します。
* [DaemonSet デプロイメント][2] - ホストメトリクスを確実に受信したい場合は、DaemonSet デプロイメントを使用します。
* [ゲートウェイのデプロイメント][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /ja/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes
[3]: /ja/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes
{{% /tab %}}

{{< /tabs >}}


## ホスト名解決 {#hostname-resolution}

ホスト名がどのように解決されるかを理解するために、[OpenTelemetry セマンティック規約をホスト名にマッピングする][25]を参照してください。

## デプロイメントに基づく制限 {#deployment-based-limitations}

OpenTelemetry Collector には、Agent とゲートウェイという [2 つの主要なデプロイメント方法][20]があります。デプロイメント方法に応じて、以下のコンポーネントを利用できます。

| デプロイメントモード | ホストメトリクス | Kubernetes オーケストレーションメトリクス | トレース | ログの自動取り込み |
| --- | --- | --- | --- | --- |
| ゲートウェイとして | | {{< X >}} | {{< X >}} | |
| Agent として | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## 参考資料 {#further-reading}

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