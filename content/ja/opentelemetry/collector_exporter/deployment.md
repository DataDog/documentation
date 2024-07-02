---
title: Deployment
further_reading:
- link: /opentelemetry/collector_exporter/configuration/
  tag: Documentation
  text: Configuring the OpenTelemetry Collector
- link: "https://opentelemetry.io/docs/collector/deployment/"
  tag: 外部サイト
  text: OpenTelemetry Collector Deployment
---

## Downloading the collector

OpenTelemetry Collector を Datadog Exporter とともに実行するには、最新リリースの [OpenTelemetry Collector Contrib ディストリビューション][3]をダウンロードしてください。

## コレクターの実行

{{< tabs >}}
{{% tab "ホスト上" %}}

コンフィグレーションファイルを `--config` パラメータで指定し、コレクターを実行します。

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (ローカルホスト)" %}}
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
{{% tab "Docker (他のコンテナ)" %}}

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
{{% tab "Kubernetes (DaemonSet)" %}}

Kubernetes 環境で OpenTelemetry 収集を構成するには、DaemonSet を使用することが最も一般的で推奨される方法です。Kubernetes インフラクチャーに OpenTelemetry コレクターと Datadog エクスポーターをデプロイするには

1. アプリケーションの構成例も含め、こちらの [Datadog Exporter を DaemonSet として使用した OpenTelemetry Collector の全構成例][11]を使用してください。

   [例の構成オプションの一部][2] (以下、繰り返し) は、DaemonSet の重要なポートが公開され、アプリケーションにアクセスできるようにします。

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

   アプリケーションに標準 HTTP ポートと gRPC ポートの両方が不要な場合は、対応する構成オプションを削除できます。

2. To collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example][3]:

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

   これにより、[構成マップ][5]で使用される [Kubernetes Attributes Processor][4] が、トレースにアタッチするために必要なメタデータを抽出することができるようになるのです。このメタデータにアクセスできるようにするために、追加で設定する必要のある[ロール][6]が存在します。[この例][1]は完成しており、すぐに使用でき、正しいロールが設定されています。

3. [アプリケーションコンテナ][7]を用意します。アプリケーションコンテナを構成するには、正しい OTLP エンドポイントホスト名が使用されていることを確認します。OpenTelemetry コレクターは DaemonSet として実行されるので、現在のホストをターゲットにする必要があります。アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を、[サンプルチャート][8]のように正しく設定します。

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


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39

{{% /tab %}}
{{% tab "Kubernetes (Gateway)" %}}

Kubernetes Gateway のデプロイで OpenTelemetry コレクターと Datadog エクスポーターをデプロイするには

1. アプリケーションの構成例も含め、こちらの [Datadog Exporter を DaemonSet として使用した OpenTelemetry Collector の全構成例][11]を使用してください。

   [例の構成オプションの一部][2] (以下、繰り返し) は、DaemonSet の重要なポートが公開され、アプリケーションにアクセスできるようにします。

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

   アプリケーションに標準 HTTP ポートと gRPC ポートの両方が不要な場合は、対応する構成オプションを削除できます。

2. To collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example][3]:

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

   これにより、[構成マップ][5]で使用される [Kubernetes Attributes Processor][4] が、トレースにアタッチするために必要なメタデータを抽出することができるようになるのです。このメタデータにアクセスできるようにするために、追加で設定する必要のある[ロール][6]が存在します。[この例][1]は完成しており、すぐに使用でき、正しいロールが設定されています。

3. [アプリケーションコンテナ][7]を用意します。アプリケーションコンテナを構成するには、正しい OTLP エンドポイントホスト名が使用されていることを確認します。OpenTelemetry コレクターは DaemonSet として実行されるので、現在のホストをターゲットにする必要があります。アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を、[サンプルチャート][8]のように正しく設定します。

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

4. DaemonSet に[現在設置されている][10] Datadog Exporter の代わりに [OTLP エクスポーター][9]を含めるように変更します。

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

5. サービスパイプラインが、[サンプルにある][11] Datadog のものでなく、このエクスポーターを使用することを確認してください。

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

   This ensures that each Agent forwards its data through the OTLP protocol to the Collector Gateway. 

6. `GATEWAY_HOSTNAME` を OpenTelemetry Collector Gateway のアドレスに置き換えます。

7. Kubernetes のメタデータがトレースに適用され続けるようにするには、[`k8sattributes` プロセッサー][12] に Pod IP を Gateway Collector に転送して、メタデータを取得できるようにします。

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   `passthrough` オプションの詳細については、[そのドキュメント][13]を参照してください。

8. Make sure that the Gateway Collector's configuration uses the same Datadog Exporter settings that have been replaced by the OTLP exporter in the Agents. For example (where `<DD_SITE>` is your site, {{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
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

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

OpenTelemetry Operator を使用するには、[OpenTelemetry Operator のデプロイメントに関する公式ドキュメント][1]に従ってください。そこに記載されているように、Operator に加えて、証明書マネージャをデプロイします。

OpenTelemetry Collector の標準 Kubernetes 構成の 1 つを使用して Operator を構成します。
* [DaemonSet デプロイメント][2] - ホストメトリクスを確実に受信したい場合は、DaemonSet デプロイメントを使用します。
* [ゲートウェイのデプロイメント][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /opentelemetry/collector_exporter/?tab=kubernetesdaemonset#running-the-collector
[3]: /opentelemetry/collector_exporter/?tab=kubernetesgateway#running-the-collector
{{% /tab %}}

{{< /tabs >}}


### ホスト名解決

See [Mapping OpenTelemetry Semantic Conventions to Hostnames][25] to understand how the hostname is resolved.

## デプロイメントに基づく制限

OpenTelemetry コレクターには、[2 つの主要なデプロイメント方法][20]があります。Agent と Gateway です。デプロイメント方法によっては、以下のコンポーネントを利用できます。

| デプロイメントモード | ホストメトリクス | Kubernetes オーケストレーションメトリクス | トレース | ログの自動取り込み |
| --- | --- | --- | --- | --- |
| Gateway として | | {{< X >}} | {{< X >}} | |
| Agent として | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[18]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: /opentelemetry/schema_semantics/hostname/
