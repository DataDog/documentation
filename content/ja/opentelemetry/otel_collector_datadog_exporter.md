---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ja/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
description: OpenTelemetry のデータを OpenTelemetry コレクターと Datadog エクスポーターに送信する
further_reading:
- link: tracing/glossary/
  tag: OpenTelemetry
  text: Collectorドキュメント
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: GitHub
  text: OpenTelemetry コレクターを使用して Datadog エクスポーター経由で Datadog にメトリクス、トレース、ログを送信する
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: GitHub
  text: Datadog で IoT アプリケーションを監視するために HiveMQ と OpenTelemetry を使用する
kind: documentation
title: OpenTelemetry Collector Datadog エクスポーター
---

OpenTelemetry Collector は、あらゆるベンダーに対応するエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。OpenTelemetry Collector 用の [Datadog エクスポーター][1]では、OpenTelemetry SDK から Datadog にトレース、メトリクス、ログデータを転送することができます (Datadog Agent は不要です)。すべての対応言語で動作するほか、[これらの OpenTelemetry トレースデータをアプリケーションログに接続する][2]ことができます。

{{< img src="metrics/otel/datadog_exporter.png" alt="アプリケーションインスツルメンテーションライブラリ、クラウドインテグレーション、その他のモニタリングソリューション (Prometheus など) -> OTel コレクター内の Datadog エクスポーター -> Datadog" style="width:100%;">}}

## Datadog エクスポーターで OTel コレクターをセットアップする

Datadog Exporter と一緒に OpenTelemetry Collector を実行するには

### 1. OpenTelemetry コレクターをダウンロードする

OpenTelemetry Collector Contribute の最新リリースを[プロジェクトのリポジトリ][3]からダウンロードします。

### 2. Datadog エクスポーターを構成する

Datadog Exporter を使用するには、[OpenTelemetry Collector の構成][4]に追加します。コンフィギュレーションファイルを作成し、`collector.yaml` という名前をつけます。Datadog API キーを環境変数 `DD_API_KEY` に設定した後、すぐに使用できる基本構成を提供するサンプルファイルを使用します。

{{< code-block lang="yaml" filename="collector.yaml" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      http:
      grpc:
  # Datadog で正しいインフラストラクチャーのメトリクスを取得するためには、hostmetrics レシーバーが必要です。
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # prometheus レシーバーは、OpenTelemetry コレクターダッシュボードに必要なメトリクスをスクレイピングします。
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

processors:
  batch:
    # Datadog APM Intake の上限は 3.2MB です。バッチがそれを超えないように
    # しましょう。
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s

exporters:
  datadog:
    api:
      site: <DD_SITE>
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
{{< /code-block >}}

ここで `<DD_SITE>` はあなたのサイト、{{< region-param key="dd_site" code="true" >}} となります。

上記の構成により、OpenTelemetry のインスツルメンテーションライブラリから HTTP と gRPC で OTLP データを受信できるようになり、非開発環境では必須の[バッチ処理][5]が設定されます。

#### 高度なコンフィギュレーション

Datadog Exporter の構成オプションは、[このドキュメントにあるコンフィギュレーションファイルの例][6]で説明されています。デプロイメントに関連する他のオプション、例えば `api::site` や `host_metadata` セクションにあるものがあるかもしれません。

### 3. アプリケーションを構成する

トレースのメタデータを充実させ、Datadog とのインテグレーションを円滑に行うには

- **リソース検出システム**を使用する: 言語 SDK で提供されている場合、コンテナ情報をリソース属性としてアタッチします。例えば、Go の場合、[`WithContainer()`][7] リソースオプションを使用します。

- **[統合サービスタグ付け][8]**を適用する: 統合サービスタグ付けに適切なリソース属性をアプリケーションに構成していることを確認してください。これは、Datadog のテレメトリーを、サービス名、デプロイ環境、サービスバージョンなどのタグで結びつけます。アプリケーションはこれらのタグを OpenTelemetry のセマンティック規則 (`service.name`、`deployment.environment`、`service.version`) を使用して設定する必要があります。

### 4. コレクターを実行する

{{< tabs >}}
{{% tab "ホスト上" %}}

コンフィグレーションファイルを `--config` パラメータで指定し、コレクターを実行します。

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{< /tabs >}}

{{% tab "Docker (ローカルホスト)" %}}
OpenTelemetry Collector を Docker イメージとして実行し、同じホストからトレースを受信するには

1. [`otel/opentelemetry-collector-contrib`][1] などの公開された Docker イメージを選択します。

2. OpenTelemetry のトレースを OpenTelemetry Collector に送信するために、コンテナ上でどのポートをオープンするかを決定します。デフォルトでは、トレースはポート 4317 の gRPC で送信されます。gRPC を使用しない場合は、ポート 4138 を使用します。

3. コンテナを実行し、事前に定義した `collector.yaml` ファイルを使用して、必要なポートを公開します。例えば、ポート 4317 を使用する場合を考えてみましょう。

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

Kubernetes 環境で OTel 収集を構成するには、DaemonSet を使用することが最も一般的で推奨される方法です。Kubernetes インフラクチャーに OpenTelemetry コレクターと Datadog エクスポーターをデプロイするには

1. アプリケーションの構成例も含め、こちらの [Datadog Exporter を DaemonSet として使用した OpenTelemetry Collector の全構成例][11]を使用してください。

   特に、DaemonSet の重要なポートがアプリケーションに公開され、アクセスできることを保証する、いくつかの[例からの重要な構成オプション][2]に注意してください。

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

   もし、アプリケーションに標準の HTTP ポートと gRPC ポートの両方が必要ない場合は、削除しても問題ありません。

2. Datadog コンテナのタグ付けに使用される貴重な Kubernetes 属性を収集し、[例に示すように][3] Pod IP をリソース属性として報告します。

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


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
{{% /tab %}}
{{% tab "Kubernetes (Gateway)" %}}

Kubernetes Gateway のデプロイで OpenTelemetry コレクターと Datadog エクスポーターをデプロイするには

1. アプリケーションの構成例も含め、こちらの [Datadog Exporter を DaemonSet として使用した OpenTelemetry Collector の全構成例][11]を使用してください。

   特に、DaemonSet の重要なポートがアプリケーションに公開され、アクセスできることを保証する、いくつかの[例からの重要な構成オプション][2]に注意してください。

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

   もし、アプリケーションに標準の HTTP ポートと gRPC ポートの両方が必要ない場合は、削除しても問題ありません。

2. Datadog コンテナのタグ付けに使用される貴重な Kubernetes 属性を収集し、[例に示すように][3] Pod IP をリソース属性として報告します。

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

   これにより、各 Agent は OTLP プロトコルを介して Collector Gateway にデータを転送することが保証されます。

6. `GATEWAY_HOSTNAME` を OpenTelemetry Collector Gateway のアドレスに置き換えます。

7. Kubernetes のメタデータがトレースに適用され続けるようにするには、[`k8sattributes` プロセッサー][12] に Pod IP を Gateway Collector に転送して、メタデータを取得できるようにします。

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   `passthrough` オプションの詳細については、[そのドキュメント][13]を参照してください。

8. Gateway Collector の構成が、Agent で OTLP エクスポーターに置き換わったのと同じ Datadog Exporter 設定を使用していることを確認します。例えば、以下のようになります (ここで `<DD_SITE>` はあなたのサイト、{{< region-param key="dd_site" code="true" >}} です)。

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

OpenTelemetry Operator を使用するには

1. [OpenTelemetry Operator のデプロイメントに関する公式ドキュメント][1]に従ってください。そこに記載されているように、Operator に加えて、証明書マネージャをデプロイします。

2. OpenTelemetry Collector の標準 Kubernetes 構成の 1 つを使用して Operator を構成します。
   * [Daemonset デプロイメント][2] - ホストメトリクスを確実に受信したい場合は、DaemonSet デプロイメントを使用します。
   * [ゲートウェイのデプロイメント][3]

   例:

   ```yaml
   apiVersion: opentelemetry.io/v1alpha1
   kind: OpenTelemetryCollector
   metadata:
     name: opentelemetry-example
   spec:
     mode: daemonset
     hostNetwork: true
     image: otel/opentelemetry-collector-contrib
     env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             key:  datadog_api_key
             name: opentelemetry-example-otelcol-dd-secret
     config:
       receivers:
         otlp:
           protocols:
             grpc:
             http:
       hostmetrics:
         collection_interval: 10s
         scrapers:
           paging:
             metrics:
               system.paging.utilization:
                 enabled: true
           cpu:
             metrics:
               system.cpu.utilization:
                 enabled: true
           disk:
           filesystem:
             metrics:
               system.filesystem.utilization:
                 enabled: true
           load:
           memory:
           network:
       processors:
         k8sattributes:
         batch:
           # Datadog APM Intake limit is 3.2MB. Let's make sure the batches do not
           # go over that.
           send_batch_max_size: 1000
           send_batch_size: 100
           timeout: 10s
       exporters:
         datadog:
           api:
             key: ${env:DD_API_KEY}
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
           traces:
             receivers: [otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
   ```




[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[3]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#4-run-the-collector
{{% /tab %}}
{{% tab "Agent と並んで" %}}

Datadog Agent と並行して OpenTelemetry Collector を使用するには

1. 先に設定した [OpenTelemetry Collector DaemonSet][1] と並行して Datadog Agent が各ホストで実行されるように、追加の DaemonSet を設定します。詳細は、[Kubernetes での Datadog Agent のデプロイに関するドキュメント][2]をお読みください。

2. [Datadog Agent での OTLP 取り込み][3]を有効にします。

3. Datadog Agent が OTLP トレースとメトリクスを受信できるようになったので、以下の構成を[構成マップ][5]に追加することで、[OpenTelemetry Collector DaemonSet][1] を変更して Datadog Exporter ではなく、[OTLP エクスポーター][4]を使用するように変更します。

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "${env:HOST_IP}:4317"
   # ...
   ```

4. [DaemonSet で][6]環境変数 `HOST_IP` が提供されていることを確認します。

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
   # ...
   ```

5. [サービスパイプライン][7]が OTLP を使用していることを確認します。

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   この場合、Datadog Agent によってこれらのメトリクスが発行されるため、`hostmetrics` レシーバーを使用しないでください。

[1]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[2]: /ja/containers/kubernetes/
[3]: /ja/opentelemetry/otlp_ingest_in_the_agent/?tab=kubernetesdaemonset#enabling-otlp-ingestion-on-the-datadog-agent
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
{{% /tab %}}
{{< /tabs >}}

### ホスト名解決

OpenTelemetry シグナルがタグ付けされるホスト名は、以下のソースを基に順番に取得され、現在のソースが利用できないか無効な場合は、次のソースにフォールバックされます。

1. [リソース属性][9]から、例えば `host.name` (他の多くの属性もサポートされています)。
2. エクスポーターの構成にある `hostname` フィールド。
3. クラウドプロバイダー API。
4. Kubernetes のホスト名。
5. 完全修飾ドメイン名。
6. オペレーティングシステムのホスト名。

## デプロイメントに基づく制限

OpenTelemetry コレクターには、[2 つの主要なデプロイメント方法][14]があります。Agent と Gateway です。デプロイメント方法によっては、利用できないコンポーネントがあります。

| デプロイメントモード | ホストメトリクス | Kubernetes オーケストレーションメトリクス | トレース | ログの自動取り込み |
| --- | --- | --- | --- | --- |
| Gateway として | | {{< X >}} | {{< X >}} | |
| Agent として | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[8]: /ja/getting_started/tagging/unified_service_tagging/
[9]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[14]: https://opentelemetry.io/docs/collector/deployment/