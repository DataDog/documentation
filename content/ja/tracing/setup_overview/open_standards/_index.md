---
title: OpenTelemetry と OpenTracing
kind: documentation
description: 'アプリケーションのトレース生成にオープン標準を使用する'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: OpenTelemetry
  text: Collectorドキュメント
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: ブログ
  text: Datadog と OpenTelemetry のパートナーシップ
- link: /tracing/connect_logs_and_traces/opentelemetry
  tag: Documentation
  text: OpenTelemetry トレースとログに接続
- link: "https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/"
  tag: ブログ
  text: OpenTelemetry 用 AWS マネージド Lambda レイヤーについて
---
Datadog は [OpenTelemetry][1] および [OpenTracing][2] のような、さまざまなオープン標準をサポートしています。

## OpenTelemetry コレクター Datadog エクスポーター

OpenTelemetry Collector は、あらゆるベンダーに対応する個別のエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。Datadog には、[OpenTelemetry Collector 内にエクスポーター][3]があり、OpenTelemetry SDKs からのトレースおよびメトリクスを受信したり、（Datadog Agent を使用せずに）データを Datadog へ転送したりできます。すべての対応言語で動作するほか、[これらの OpenTelemetry トレースデータをアプリケーションログに接続する](#OpenTelemetry トレースとログに接続)ことができます。

[サポートされている方法で OpenTelemetry Collector をデプロイ][4]し、[OpenTelemetry コンフィギュレーション YAML ファイル[5]に `datadog` exporter および [Datadog API キー][6]を追加して構成します。

```
datadog:
  api:
    key: "<API key>"
```
データを Datadog EU サイトに送信するには、`site` パラメーターも設定します。
```
datadog:
  api:
    key: "<API key>"
    site: datadoghq.eu
```

OpenTelemetry がインスツルメント化されたアプリケーションで、[使用する言語の SDK][1] を使用してリソース属性 `deployment.environment`、`service.name`、`service.version` を設定します。フォールバックとして、[コンフィギュレーション例ファイル][7]に従いホスト名（任意）、環境、サービス名、サービスのバージョンをコレクターレベルで構成し、統合的なサービスタグ付けをすることも可能です。ホスト名を明示的に指定しない場合、エクスポーターは以下のソースを順にチェックし、利用不可または無効な場合は次にフォールバックする、という自動デフォルトを試行します。

<!--- 1. 他の OpenTelemetry コンポーネントにより設定されたホスト名 -->
1. コンフィギュレーションでホスト名を手動設定
1. EC2 の非デフォルトホスト名 (EC2 インスタンスの場合)
1. EC2 インスタンス ID (EC2 インスタンスの場合)
1. 完全修飾ドメイン名
1. オペレーティングシステムのホスト名

### Collector で OpenTelemetry のトレースを取り込む

OpenTelemetry Collector の構成は、[パイプライン][8]を `otel-collector-configuration.yml` ファイルに追加して行います。コレクターを `--config=<path/to/configuration_file>` コマンドライン引数を使用して渡すことで起動する場合は、このコンフィギュレーションファイルへの相対パスを指定します。コンフィギュレーションファイルの指定例については、以下の[環境固有のセットアップ](#環境固有のセットアップ)セクションまたは [OpenTelemetry Collector ドキュメント][9]を参照してください。

エクスポーターは、`datadog` エクスポーターが使用され、以下で構成された[バッチプロセッサー][10]が含まれることを前提とします。
  - `timeout` の必須設定である `10s` (10 秒)。10秒間のトレースを表すバッチは、トレース関連の統計に対する Datadog の API 取り込みの制約となります。
  <div class="alert alert-info"><strong>重要！</strong> この<code>timeout</code> 設定をしない場合、<code>.hits</code>、<code>.errors</code>、<code>.duration</code> など、他のサービスおよびサービスリソースの一定期間のトレース関連メトリクスが不正確になります。</div>

<div class="alert alert-warning">
OpenTelemetry Collector 用 Datadog エクスポーターは、現在ベータ版です。CPU およびメモリリソースの使用量が高くなることがあります。特にパイプラインおよびバッチプロセッサーを構成する場合は、本番環境に即した正確なメトリクスで応答するまでに反復処理が必要となります。適切に動作しない場合は、<a href="https://docs.datadoghq.com/help/">サポートまでお問い合わせ</a>ください。
</div>

以下は、`otlp` レシーバー、`batch` プロセッサー、`datadog` エクスポーターで構成されたトレースパイプラインの例です。

```
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:
    timeout: 10s

exporters:
  datadog/api:
    hostname: customhostname
    env: prod
    service: myservice
    version: myversion

    tags:
      - example:tag

    api:
      key: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      site: datadoghq.eu

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/api]
```

### 環境固有のセットアップ

#### ホスト

1. [プロジェクトリポジトリの最新リリース][11]から適切なバイナリをダウンロードします。

2. `otel_collector_config.yaml` ファイルを作成します。[サンプルテンプレート](#Collector で OpenTelemetry のトレースを取り込む)を参考にしてはじめましょう。これで Collector の OTLP レシーバーと Datadog エクスポーターが有効になります。

3. `--config` パラメーターで yaml コンフィギュレーションファイルを指定し、ホスト上でダウンロードを実行します。例:

      ```
      otelcontribcol_linux_amd64 --config otel_collector_config.yaml
      ```

#### Docker

Opentelemetry Collector コンテナを実行し、[インストール済みのホスト](#ホストからトレースを受信する)または[その他のコンテナ](#その他のホストからトレースを受信する)のいずれかからトレースを受信します。

##### ホストからトレースを受信する

1. `otel_collector_config.yaml` ファイルを作成します。[サンプルテンプレート](#Collector で OpenTelemetry のトレースを取り込む)を参考にしてはじめましょう。これで Collector の OTLP レシーバーと Datadog エクスポーターが有効になります。

2. [`otel/opentelemetry-collector-contrib:latest`][12] などの公開された Docker イメージを選択します。

3.  コンテナ上でどのポートをオープンするかを決定します。OpenTelemetry トレースは複数のポート上で TCP または UDP 経由で OpenTelemetry Collector に送信されるため、これらのポートをコンテナ上で公開しておく必要があります。デフォルトでは、トレースは OTLP/gRPC 経由でポート `55680` に送信されますが、共通のプロトコルとそれに関連するポートには次のものが含まれます。

      - ポート `9411`: Zipkin/HTTP
      - ポート `14250`: Jaeger/gRPC
      - ポート `14268`: Jaeger/HTTP
      - ポート (UDP) `6831`: Jaeger/Compact
      - ポート `55680`: OTLP/gRPC
      - ポート `55681`: OTLP/HTTP

4. 構成済みのポートと `otel_collector_config.yaml` ファイルでコンテナを実行します。例:

      ```
      $ docker run \
      -p 55680:55680 \
      -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
      otel/opentelemetry-collector-contrib
      ```

5. アプリケーションに[メタデータを追加](#OpenTelemetry Collector Datadog エクスポーター)し、統合サービスタグ付けで利用できる適切なリソース属性で構成します。

##### その他のコンテナからトレースを受信

1. `otel_collector_config.yaml` ファイルを作成します。[サンプルテンプレート](#Collector で OpenTelemetry のトレースを取り込む)を参考にしてはじめましょう。これで Collector の OTLP レシーバーと Datadog エクスポーターが有効になります。


2. [この手順に従って](#OpenTelemetry Collector Datadog エクスポーター)アプリケーションにメタデータを追加し、統合サービスタグ付けで利用できる適切なリソース属性で構成します。

3. Docker ネットワークを作成する

    ```
    docker network create <NETWORK_NAME>
    ```

4. OpenTelemetry Collector コンテナとアプリケーションコンテナを同じネットワークで実行します。**注**: アプリケーションコンテナの実行中は、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` が OpenTelemetry Collector 向けの適切なホスト名を使用して構成されていることをご確認ください。以下の例では `opentelemetry-collector` を使用しています。

    ```
    # Datadog Agent
    docker run -d --name opentelemetry-collector \
              --network <NETWORK_NAME> \
              -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
              otel/opentelemetry-collector-contrib

    # Application
    docker run -d --name app \
              --network <NETWORK_NAME> \
              -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:55680 \
              company/app:latest
    ```

#### Kubernetes

OpenTelemetry Collector は 2 つの[デプロイメントシナリオ][4]で実行できます。

- sidecar または daemonset でアプリケーションと同じホストで実行中の OpenTelemetry Collector Agent、または

- クラスター毎、データセンター毎、リージョン毎のコンテナやデプロイといったスタンドアロン型のサービスの 2 種類です。

Datadog で適切なメタデータを正確に追跡するには、それぞれの Kubernetes ノード上で、OpenTelemetry Collector を Agent モードで実行します。

OpenTelemetry Collector を daemonset としてデプロイする場合は、[以下のコンフィギュレーション例](#Kubernetes での OpenTelemetry Collector コンフィギュレーション例)をガイドとして参照してください。

アプリケーションコンテナ上ではダウンロード API を使用してホスト IP をプルします。アプリケーションコンテナには `status.hostIP` を指す環境変数が必要です。OpenTelemetry Application SDK ではこの場合に `OTEL_EXPORTER_OTLP_ENDPOINT` という名前の変数が使用されています。[以下のスニペット例](#Kubernetes での OpenTelemetry アプリケーションのコンフィギュレーション例)をガイドとして使用してください。

##### Kubernetes での OpenTelemetry コレクターコンフィギュレーション例

OpenTelemetry Collector を daemonset およびスタンドアロンの双方でデプロイする場合の Kubernetes マニフェストのサンプル全文は[こちらを参照してください[13]。お使いの環境に応じてサンプルの内容を修正してください。Datadog に固有の主要なセクションは次の通りです。

1. この例では OpenTelemetry Collector を [daemonset 経由の Agent モード][14]でデプロイしています。関連する k8s ノードとポッド固有のメタデータを収集し、テレメトリーデータを[スタンドアロン Collector モード][15]の OpenTelemetry Collector に転送します。このスタンドアロン Collector モードの OpenTelemetry Collector はその後 Datadog のバックエンドにエクスポートされます。[こちらのデプロイメントモデルのダイアグラム][16]もご覧ください。

2. daemonset 経由で Agent としてデプロイされた OpenTelemetry Collector の場合、daemonset 内の `spec.containers.env` でダウンロード API を使用して `status.podIP` をキャプチャし、それを `OTEL_RESOURCE` 環境変数の一部として追加する必要があります。これは OpenTelemetry Collector の `resourcedetection` および `k8s_tagger` プロセッサにより使用され、`batch` プロセッサ と共に `traces` パイプラインに追加されます。

   daemonset の `spec.containers.env` セクションで次を実行します。

    ```yaml
      # ...
      env:
         # Get pod ip so that k8s_tagger can tag resources
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
          # This is picked up by the resource detector
        - name: OTEL_RESOURCE
          value: "k8s.pod.ip=$(POD_IP)"
      # ...
    ```

   `otel-agent-conf` ConfigMap's `data.otel-agent-config` の `processors` セクションで次を実行します。

    ```yaml
      # ...
      # The resource detector injects the pod IP
      # to every metric so that the k8s_tagger can
      # fetch information afterwards.
      resourcedetection:
        detectors: [env]
        timeout: 5s
        override: false
      # The k8s_tagger in the Agent is in passthrough mode
      # so that it only tags with the minimal info for the
      # collector k8s_tagger to complete
      k8s_tagger:
        passthrough: true
      batch:
      # ...
    ```

   `otel-agent-conf` ConfigMap の `data.otel-agent-config` `service.pipelines.traces` セクションで次を実行します。

    ```yaml
      # ...
      # resourcedetection must come before k8s_tagger
      processors: [resourcedetection, k8s_tagger, batch]
      # ...
    ```

3. スタンドアロン Collector モードの OpenTelemetry Collector で、ダウンストリームの Collector からトレースを受信して Datadog のバックエンドにエクスポートする場合は、`batch` プロセッサが `10s` の `timeout` を含むよう構成し、`k8s_tagger` を有効にしてください。これらは `datadog` エクスポーターと共にデータの一部となり、`traces` パイプラインに追加されます。

   `otel-collector-conf` ConfigMap の `data.otel-collector-config` `processors` セクションで次を実行します。

    ```yaml
      # ...
      batch:
        timeout: 10s
      k8s_tagger:
      # ...
    ```

   `otel-collector-conf` ConfigMap の `data.otel-collector-config` `exporters` セクションで次を実行します。

    ```yaml
      exporters:
        datadog:
          api:
            key: <YOUR_API_KEY>
    ```

   `otel-collector-conf` ConfigMap の `data.otel-collector-config` `service.pipelines.traces` セクションで次を実行します。

    ```yaml
      # ...
      processors: [k8s_tagger, batch]
      exporters: [datadog]
      # ...
    ```

##### Kubernetes での OpenTelemetry アプリケーションのコンフィギュレーション例

OpenTelemetry Collector のコンフィギュレーションに加えて、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` をホスト IP に構成し、アプリケーションにインストールされた OpenTelemetry SDK がテレメトリーデータを Collector に送信することを確認してください。ダウンロード API を使用してホスト IP をプルし、それを環境変数として設定します。この変数は `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数の設定時に補間的な機能を果たします。

```
apiVersion: apps/v1
kind: Deployment
...
spec:
  containers:
  - name: <CONTAINER_NAME>
    image: <CONTAINER_IMAGE>/<TAG>
    env:
      - name: HOST_IP
        valueFrom:
          fieldRef:
            fieldPath: status.hostIP
        # This is picked up by the opentelemetry sdks
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: "http://$(HOST_IP):55680"
```

コレクターの構成に関する詳しい情報や上記以外の例については、[OpenTelemetry Collector コンフィギュレーションドキュメント][5]を参照してください。

## OpenTelemetry のトレースとログを接続する

OpenTelemetry のトレースとログを接続することで、アプリケーションログのモニタリングと分析時に OpenTelemetry トレースにより提供されるコンテキストを追加することができます。言語固有の使用方法とサンプルコードは [OpenTelemetry トレースとログを接続][17]を参照してください。

## OpenTelemetry Collector Datadog エクスポーターの代替

Datadog は OpenTelemetry Collector Datadog エクスポーターを OpenTelemetry のトレーシングクライアントと併用することをお勧めしています。しかし、これがうまく動作しない場合には以下の方法をお試しいただけます。

  - サポート対象の各言語には、[OpenTracing のデータを Datadog に送信する][18]場合のサポートも付随しています。

  - [Python][19]、[Ruby][20]、[NodeJS][21] にも言語固有の OpenTelemetry Datadog スパンエクスポーターがあり、OpenTelemetry のトレーシングクライアントから Datadog Agent へトレースを直接エクスポートすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: https://opentracing.io/docs/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[5]: https://opentelemetry.io/docs/collector/configuration/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/config.yaml
[8]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#pipelines
[9]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/examples
[10]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor#batch-processor
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest
[12]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/example_k8s_manifest.yaml
[14]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-an-agent
[15]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-a-standalone-collector
[16]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/images/opentelemetry-service-deployment-models.png
[17]: /tracing/connect_logs_and_traces/opentelemetry
[18]: /tracing/setup_overview/open_standards/java
[19]: /tracing/setup_overview/open_standards/python#opentelemetry
[20]: /tracing/setup_overview/open_standards/ruby#opentelemetry
[21]: /tracing/setup_overview/open_standards/nodejs#opentelemetry
