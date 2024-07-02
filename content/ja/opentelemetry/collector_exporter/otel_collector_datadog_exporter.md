---
title: OpenTelemetry Collector Datadog Exporter
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
description: 'Send OpenTelemetry data to the OpenTelemetry collector and Datadog exporter'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: 外部サイト
  text: Collector documentation
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: Blog
  text: Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter
- link: "https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/"
  tag: Blog
  text: Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OTLP Metrics Types
---

OpenTelemetry Collector は、あらゆるベンダーに対応するエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。OpenTelemetry Collector 用の [Datadog エクスポーター][1]では、OpenTelemetry SDK から Datadog にトレース、メトリクス、ログデータを転送することができます (Datadog Agent は不要です)。すべての対応言語で動作するほか、[これらの OpenTelemetry トレースデータをアプリケーションログに接続する][2]ことができます。

{{< img src="metrics/otel/datadog_exporter.png" alt="アプリケーションインスツルメンテーションライブラリ、クラウドインテグレーション、その他のモニタリングソリューション (Prometheus など) -> OpenTelemetry コレクター内の Datadog エクスポーター -> Datadog" style="width:100%;">}}

## Datadog エクスポーターで OpenTelemetry コレクターをセットアップする

Datadog Exporter と一緒に OpenTelemetry Collector を実行するには

### Step 1 - Download the OpenTelemetry Collector

OpenTelemetry Collector Contribute の最新リリースを[プロジェクトのリポジトリ][3]からダウンロードします。

### Step 2 - Configure the Datadog Exporter

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

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

exporters:
  datadog:
    api:
      site: <DD_SITE>
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog]
{{< /code-block >}}

ここで `<DD_SITE>` はあなたのサイト、{{< region-param key="dd_site" code="true" >}} となります。

上記の構成により、OpenTelemetry のインスツルメンテーションライブラリから HTTP と gRPC で OTLP データを受信できるようになり、非開発環境では必須の[バッチ処理][5]が設定されます。なお、バッチ処理でテレメトリーデータを大量に処理すると、`413 - Request Entity Too Large` エラーが発生することがあります。

バッチプロセッサの正確な構成は、シグナルの種類だけでなく、特定のワークロードに依存します。Datadog インテークは、3 つのシグナルタイプに対して異なるペイロードサイズ制限を設けています。
- トレースインテーク: 3.2MB
- ログインテーク: [5MB 非圧縮][6]
- メトリクス V2 インテーク: [500KB または解凍後 5MB][7]

#### 高度なコンフィギュレーション

Datadog Exporter の構成オプションは、[このドキュメントにあるコンフィギュレーションファイルの例][8]で説明されています。デプロイメントに関連する他のオプション、例えば `api::site` や `host_metadata` セクションにあるものがあるかもしれません。

### Step 3 - Configure your application

トレースのメタデータを充実させ、Datadog とのインテグレーションを円滑に行うには

- **リソース検出システム**を使用する: 言語 SDK で提供されている場合、コンテナ情報をリソース属性としてアタッチします。例えば、Go の場合、[`WithContainer()`][9] リソースオプションを使用します。

- **[統合サービスタグ付け][10]**を適用する: 統合サービスタグ付けに適切なリソース属性をアプリケーションに構成していることを確認してください。これは、Datadog のテレメトリーを、サービス名、デプロイ環境、サービスバージョンなどのタグで結びつけます。アプリケーションはこれらのタグを OpenTelemetry のセマンティック規則 (`service.name`、`deployment.environment`、`service.version`) を使用して設定する必要があります。

### Step 4 - Configure the logger for your application

{{< img src="logs/log_collection/otel_collector_logs.png" alt="コレクター内の filelog レシーバーにデータを送信するホスト、コンテナ、アプリケーション、コレクター内の Datadog Exporter が Datadog バックエンドにデータを送信する様子を示した図" style="width:100%;">}}

OpenTelemetry SDK のロギング機能は完全にサポートされていないため (詳細は [OpenTelemetry ドキュメント][11]の各言語を参照)、Datadog ではアプリケーションに標準のロギングライブラリを使用することを推奨しています。言語固有の[ログ収集のドキュメント][12]に従って、アプリケーションに適切なロガーをセットアップしてください。Datadog は、[カスタムパースルール][13]の必要性を避けるために、JSON でログを出力するようにロギングライブラリを設定することを強く推奨しています。

#### filelog レシーバーの構成

[演算子][14]を使って、filelog レシーバーを構成します。例えば、`checkoutservice` というサービスがあり、それが `/var/log/pods/services/checkout/0.log` にログを書き込んでいるとしたら、ログのサンプルは以下のようになります。

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

filelog の構成例

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include`: レシーバーが追跡するファイルのリスト 
- `start_at: end`: 書き込まれている新しいコンテンツを読むことを示します
- `poll_internal`: ポーリング頻度を設定します
- 演算子:
    - `json_parser`: JSON ログをパースします。デフォルトでは、filelog レシーバーは各ログ行をログレコードに変換し、それがログの[データモデル][15]の `body` となります。次に、`json_parser` が JSON の本文をデータモデルの属性に変換します。
    - `trace_parser`: Datadog でログとトレースを関連付けるために、ログから `trace_id` と `span_id` を抽出します。

#### Remap OTel's `service.name` attribute to `service` for logs

For Datadog Exporter versions 0.83.0 and later, the `service` field of OTel logs is populated as [OTel semantic convention][25] `service.name`. However, `service.name` is not one of the default [service attributes][26] in Datadog's log preprocessing.

To get the `service` field correctly populated in your logs, you can specify `service.name` to be the source of a log's service by setting a [log service remapper processor][27].

<details>
<summary><strong>Optional: Using Kubernetes</strong></summary>

There are multiple ways to deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure. For the filelog receiver to work, the [Agent/DaemonSet deployment][16] is the recommended deployment method.

In containerized environments, applications write logs to `stdout` or `stderr`. Kubernetes collects the logs and writes them to a standard location. You need to mount the location on the host node into the Collector for the filelog receiver. Below is an [extension example][17] with the mounts required for sending logs. 

```
apiVersion: apps/v1
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.71.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```
</details>

### Step 5 - Run the collector

{{< tabs >}}
{{% tab "ホスト上" %}}

コンフィグレーションファイルを `--config` パラメータで指定し、コレクターを実行します。

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (localhost)" %}}

OpenTelemetry Collector を Docker イメージとして実行し、同じホストからトレースを受信するには

1. [`otel/opentelemetry-collector-contrib`][1] などの公開された Docker イメージを選択します。

2. OpenTelemetry のトレースを OpenTelemetry Collector に送信するために、コンテナ上でどのポートをオープンするかを決定します。デフォルトでは、トレースはポート 4317 の gRPC で送信されます。gRPC を使用しない場合は、ポート 4318 を使用します。

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

{{% tab "Docker (other containers)" %}}

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
           send_batch_max_size: 100
           send_batch_size: 10
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
[2]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[3]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#4-run-the-collector

{{% /tab %}}
{{< /tabs >}}


### ログとトレースの相関

Datadog Exporter を使って OpenTelemetry のトレースも Datadog に送る場合、`trace_parser` 演算子を使って各トレースから `trace_id` を抽出し、それを関連するログに追加してください。Datadog は関連するログとトレースを自動的に関連付けます。詳細は [OpenTelemetry のトレースとログの接続][18]を参照してください。

{{< img src="logs/log_collection/logs_traces_correlation.png" alt="トレースと相関のあるログの一覧を表示するトレースパネル" style="width:70%;">}}

### ホスト名解決

See [Mapping OpenTelemetry Semantic Conventions to Hostnames][28] to understand how the hostname is resolved.

## デプロイメントに基づく制限

OpenTelemetry コレクターには、[2 つの主要なデプロイメント方法][20]があります。Agent と Gateway です。デプロイメント方法によっては、利用できないコンポーネントがあります。

| デプロイメントモード | ホストメトリクス | Kubernetes オーケストレーションメトリクス | トレース | ログの自動取り込み |
| --- | --- | --- | --- | --- |
| Gateway として | | {{< X >}} | {{< X >}} | |
| Agent として | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## すぐに使えるダッシュボード

Datadog provides out-of-the-box dashboards that you can copy and customize. To use Datadog's out-of-the-box OpenTelemetry dashboards:

1. [OpenTelemetry インテグレーション][21]をインストールします。
2. Go to **Dashboards** > **Dashboards list** and search for `opentelemetry`:

   {{< img src="metrics/otel/dashboard.png" alt="ダッシュボードリストには、OpenTelemetry のすぐに使えるダッシュボードが 2 つ (ホストメトリクスとコレクターメトリクス) 表示されています。" style="width:80%;">}}

**Host Metrics** ダッシュボードは、[ホストメトリクスレシーバー][22] から収集されたデータ用です。**Collector Metrics** ダッシュボードは、有効化する[メトリクスレシーバー][23]に応じて収集された他の種類のメトリクス用です。


### コンテナ概要ダッシュボード

<div class="alert alert-info">コンテナ概要ダッシュボードは非公開ベータ版です。<a href="https://forms.gle/g3ndvTnepWY4Bvuh7">このフォームに記入</a>してお試しください。</div>

<div class="alert alert-warning">この機能は <a href="/containers/guide/docker-deprecation/">Kubernetes の Docker 非推奨</a>の影響を受けており、Kubernetes バージョン 1.24+ では OpenTelemetry 用の <code>dockerstatsreceiver</code> が使えないかもしれません。</div>

[Docker Stats][24] レシーバーは OpenTelemetry Collector 用のコンテナメトリクスを生成します。Datadog Exporter はコンテナのメトリクスを Datadog の対応するメトリクスに変換します。

以下の構成を使用して、コンテナ概要ダッシュボードに入力する Docker Stats レシーバーの追加属性を有効にします。

```yaml
  docker_stats:
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

この機能をサポートする OpenTelemetry Collector の必要最小バージョンは v0.78.0 です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://docs.datadoghq.com/api/latest/logs/
[7]: https://docs.datadoghq.com/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /logs/log_collection/?tab=host
[13]: /logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[18]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#service-remapper
[28]: /opentelemetry/schema_semantics/hostname/
