---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
description: OpenTelemetry のトレースを OpenTelemetry コレクターと Datadog エクスポーターに送信する
further_reading:
- link: tracing/glossary/
  tag: OpenTelemetry
  text: Collectorドキュメント
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: GitHub
  text: OpenTelemetry コレクターから Datadog エクスポーター経由で Datadog にメトリクスとトレースを送信する
kind: documentation
title: OpenTelemetry コレクター Datadog エクスポーター
---

OpenTelemetry Collector は、あらゆるベンダーに対応するエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。Datadog には、OpenTelemetry Collector で使える [Exporter][1] があり、OpenTelemetry SDK から Datadog にトレースやメトリクスデータを転送することができます (Datadog Agent は不要です)。すべての対応言語で動作するほか、[これらの OpenTelemetry トレースデータをアプリケーションログに接続する][2]ことができます。

{{< img src="metrics/otel/datadog_exporter.png" alt="アプリケーションインスツルメンテーションライブラリ、クラウドインテグレーション、その他のモニタリングソリューション (Prometheus など) -> OTel コレクター内の Datadog エクスポーター -> Datadog" style="width:100%;">}}

## コレクターの実行

Datadog Exporter と一緒に OpenTelemetry Collector を実行するには

1. OpenTelemetry Collector Contribute の最新リリースを[プロジェクトのリポジトリ][3]からダウンロードします。

2. コンフィグレーションファイルを作成し、`collector.yaml` という名前をつけます。以下の [Datadog Exporter の構成](#configuring-the-datadog-exporter)のサンプルファイルを使用します。

3. コンフィグレーションファイルを `--config` パラメータで指定し、コレクターを実行します。

      ```
      otelcontribcol_linux_amd64 --config collector.yaml
      ```

## Datadog Exporter の構成

Datadog Exporter を使用するには、[OpenTelemetry Collector の構成][4]に追加します。以下は、環境変数 `DD_API_KEY` に Datadog API キーを設定した後、すぐに利用できる基本的なコンフィグレーションファイルです。

```yaml
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
  # prometheus レシーバーは、OpenTelemetry Collector Dashboard に必要なメトリクスをスクレイピングします。
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
      site: {{< region-param key="dd_site" code="true" >}}
      key: ${DD_API_KEY}

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
```

上記の構成により、OpenTelemetry のインスツルメンテーションライブラリから HTTP と gRPC で OTLP データを受信できるようになり、非開発環境では必須の[バッチ処理][5]が設定されます。

### 高度なコンフィギュレーション

Datadog Exporter の構成オプションは、[このドキュメントにあるコンフィギュレーションファイルの例][6]で説明されています。デプロイメントに関連する他のオプション、例えば `api::site` や `host_metadata` セクションにあるものがあるかもしれません。

### ホスト名解決

OpenTelemetry シグナルがタグ付けされるホスト名は、以下のソースを基に順番に取得され、現在のソースが利用できないか無効な場合は、次のソースにフォールバックされます。

1. [リソース属性][7]から、例えば `host.name` (他の多くの属性もサポートされています)。
2. エクスポーターの構成にある `hostname` フィールド。
3. クラウドプロバイダー API。
4. Kubernetes のホスト名。
5. 完全修飾ドメイン名。
6. オペレーティングシステムのホスト名。


## アプリケーションの構成

トレースのメタデータを充実させ、Datadog とのインテグレーションを円滑に行うには

- **リソース検出システム**を使用する: 言語 SDK で提供されている場合、コンテナ情報をリソース属性としてアタッチします。例えば、Go の場合、[`WithContainer()`][8] リソースオプションを使用します。

- **[統合サービスタグ付け][9]**を適用する: これは、Datadog のテレメトリーを、サービス名、デプロイ環境、サービスバージョンなどのタグで結びつけます。アプリケーションはこれらのタグを OpenTelemetry のセマンティック規則 (`service.name`、`deployment.environment`、`service.version`) を使用して設定する必要があります。


## Docker を使用する

Opentelemetry Collector コンテナを実行し、[ローカルホスト](#receive-traces-from-localhost)、または[その他のコンテナ](#receive-traces-from-other-containers)からトレースを受信します。

### ローカルホストからトレースを受信する

OpenTelemetry Collector を Docker イメージとして実行し、同じホストからトレースを受信するには

1. `collector.yaml` ファイルを作成します。[上のテンプレート例](#configuring-the-datadog-exporter)を参考にするとよいでしょう。

2. [`otel/opentelemetry-collector-contrib`][10] などの公開された Docker イメージを選択します。

3. OpenTelemetry のトレースを OpenTelemetry Collector に送信するために、コンテナ上でどのポートをオープンするかを決定します。デフォルトでは、トレースはポート 4317 の gRPC で送信されます。gRPC を使用しない場合は、ポート 4138 を使用します。

4. コンテナを実行し、事前に定義した `collector.yaml` ファイルを使用して、必要なポートを公開します。例えば、ポート 4317 を使用する場合を考えてみましょう。

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

5. [統合サービスタグ付け](#unified-service-tagging)に適切なリソース属性がアプリケーションに構成されていることを確認してください。

### その他のコンテナからトレースを受信

OpenTelemetry Collector を Docker イメージとして実行し、その他のコンテナからトレースを受信するには

1. `collector.yaml` ファイルを作成します。[上のテンプレート例](#configuring-the-datadog-exporter)を参考にするとよいでしょう。

2. [統合サービスタグ付け](#unified-service-tagging)に適切なリソース属性がアプリケーションに構成されていることを確認してください。

3. Docker ネットワークを作成します。

    ```
    docker network create <NETWORK_NAME>
    ```

4. OpenTelemetry Collector とアプリケーションコンテナを同じネットワークの一部として実行します。

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

## Kubernetes を使用する

Kubernetes インフラクチャーに OpenTelemetry Collector と Datadog Exporter をデプロイする方法は複数存在します。最も一般的で推奨される方法は、Daemonset を使用する方法です。

### DaemonSet のデプロイメント

アプリケーションの構成例も含め、こちらの [Datadog Exporter を DaemonSet として使用した OpenTelemetry Collector の全構成例][11]をご確認ください。

特に、DaemonSet の重要なポートがアプリケーションに公開され、アクセスできることを保証する、いくつかの[例からの重要な構成オプション][12]に注意してください。

```yaml
# ...
        ports:
        - containerPort: 4318 # OpenTelemetry HTTP レシーバーのデフォルトポート。
          hostPort: 4318
        - containerPort: 4317 # OpenTelemetry gRPC レシーバーのデフォルトポート。
          hostPort: 4317
        - containerPort: 8888  # Collector の観測可能性メトリクスをクエリするためのデフォルトのエンドポイント。
# ...
```

もし、アプリケーションに標準の HTTP ポートと gRPC ポートの両方が必要ない場合は、削除しても問題ありません。

Datadog コンテナのタグ付けに使用される貴重な Kubernetes 属性を収集するために、Pod IP をリソース属性として報告します。そのためには、[例に示すように][13]:

```yaml
# ...
        env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        # k8s.pod.ip は、k8sattributes のポッドを関連付けるために使用されます
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "k8s.pod.ip=$(POD_IP)"
# ...
```

これにより、[構成マップ][15]で使用される [Kubernetes Attributes Processor][14] が、トレースにアタッチするために必要なメタデータを抽出することができるようになるのです。このメタデータにアクセスできるようにするために、追加で設定する必要のある[ロール][16]が存在します。

[この例][11]は完全で、すぐに使用でき、正しいロールが設定されています。必要なのは、[アプリケーションコンテナ][17]を提供することだけです。

アプリケーションの構成については、以下の[アプリケーションの構成](#application-configuration)セクションをお読みください。

### ゲートウェイコレクターサービス

ゲートウェイのデプロイの場合

1. [DaemonSet のデプロイ](#daemonset-deployment)と同様に、各 [OpenTelemetry Collector Agent][18] をセットアップします。

2. DaemonSet に[現在設置されている][20] Datadog Exporter の代わりに [OTLP エクスポーター][19]を含めるように変更します。

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

3. サービスパイプラインが、[サンプルにある][21] Datadog のものでなく、このエクスポーターを使用することを確認してください。

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

4. `GATEWAY_HOSTNAME` を OpenTelemetry Collector Gateway のアドレスに置き換えます。

5. Kubernetes のメタデータがトレースに適用され続けるようにするには、[`k8sattributes` プロセッサー][22] に Pod IP を Gateway Collector に転送して、メタデータを取得できるようにします。

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   `passthrough` オプションの詳細については、[そのドキュメント][23]を参照してください。

6. Gateway Collector の構成が、Agent で OTLP エクスポーターに置き換わったのと同じ Datadog Exporter 設定を使用していることを確認します。例えば、以下のようになります。

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: {{< region-param key="dd_site" code="true" >}}
         key: ${DD_API_KEY}
   # ...
   ```

### Kubernetes 用 OpenTelemetry Operator

OpenTelemetry Operator を使用するには

1. [OpenTelemetry Operator のデプロイメントに関する公式ドキュメント][24]に従ってください。そこに記載されているように、Operator に加えて、証明書マネージャをデプロイします。

2. OpenTelemetry Collector の標準構成の 1 つを使用して Operator を構成します。
   * [daemonset デプロイメント](#daemonset-deployment) - ホストメトリクスを確実に受信したい場合は、daemonset デプロイメントを使用します。
   * [ゲートウェイデプロイメント](#gateway-collector-service)

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

     config: |
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
             key: ${DD_API_KEY}
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

### アプリケーションの構成

アプリケーションコンテナを構成するには

 1. 正しい OTLP エンドポイントのホスト名が使用されていることを確認します。OpenTelemetry Collector は [Agent](#daemonset-deployment) と[ゲートウェイ](#gateway-collector-service)の両方のデプロイメントで DaemonSet として動作するので、現在のホストをターゲットにする必要があります。アプリケーションコンテナの `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を、[サンプル図][25] のように正しく設定してください。

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

2. [アプリケーションの構成](#configuring-your-application)の説明に従って、OpenTelemetry Instrumentation Library SDK が正しく構成されていることを確認します。

## Datadog Agent と並行して

Datadog Agent と並行して OpenTelemetry Collector を使用するには

1. 先に設定した [OpenTelmetry Collector DaemonSet](#daemonset-deployment) と並行して Datadog Agent が各ホストで実行されるように、追加の DaemonSet を設定します。詳細は、[Kubernetes での Datadog Agent のデプロイに関するドキュメント][26]をお読みください。

2. [Datadog Agent での OTLP 取り込み][27]を有効にします。

3. Datadog Agent が OTLP トレースとメトリクスを受信できるようになったので、[OpenTelemetry Collector Daemonset](#daemonset-deployment) を変更して Datadog Exporter ではなく、[OTLP エクスポーター][19]を使用するように変更します。これを行うには、[構成マップ][28]に追加します。

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "${HOST_IP}:4317"
   # ...
   ```

4. [DaemonSet で][29]環境変数 `HOST_IP` が提供されていることを確認します。

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
   # ...
   ```

5. [サービスパイプライン][21]が OTLP を使用していることを確認します。

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


## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[9]: /ja/getting_started/tagging/unified_service_tagging/
[10]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[14]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[18]: https://opentelemetry.io/docs/collector/deployment/#agent
[19]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[20]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220
[24]: https://github.com/open-telemetry/opentelemetry-operator#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[26]: https://docs.datadoghq.com/ja/containers/kubernetes/
[27]: https://docs.datadoghq.com/ja/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/?tab=kubernetesdaemonset#enabling-otlp-ingestion-on-the-datadog-agent
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33