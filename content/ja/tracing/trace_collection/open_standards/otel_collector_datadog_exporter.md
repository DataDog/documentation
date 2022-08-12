---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
description: OpenTelemetry のトレースを OpenTelemetry コレクターと Datadog エクスポーターに送信する
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: OpenTelemetry
  text: Collectorドキュメント
kind: documentation
title: OpenTelemetry コレクター Datadog エクスポーター
---

OpenTelemetry Collector は、あらゆるベンダーに対応する個別のエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。Datadog には、[OpenTelemetry Collector 内にエクスポーター][1]があり、OpenTelemetry SDKs からのトレースおよびメトリクスを受信したり、（Datadog Agent を使用せずに）データを Datadog へ転送したりできます。すべての対応言語で動作するほか、[これらの OpenTelemetry トレースデータをアプリケーションログに接続する][2]ことができます。

[サポートされている方法で OpenTelemetry Collector をデプロイ][3]し、[OpenTelemetry コンフィギュレーション YAML ファイル[4]に `datadog` exporter および [Datadog API キー][5]を追加して構成します。

```
datadog:
  api:
    key: "<API key>"
```
データを異なる [Datadog サイト][6]に送信するには、`site` パラメーターも設定します。
```
datadog:
  api:
    key: "<API key>"
    site: {{< region-param key="dd_site" code="true" >}}
```

OpenTelemetry でインスツルメントを行う各アプリケーションで、[その言語の SDK][1] を使用して、リソース属性 `deployment.environment`、`service.name`、`service.version` を設定します。

エクスポーターは、次のソースを順番にチェックしてホスト名の取得を試みます。現在のソースが利用できないか無効である場合は、次のソースにフォールバックします。

1. OTLP リソースに設定されたホスト名
1. エクスポーターコンフィギュレーションでホスト名を手動設定
1. クラウドプロバイダー API ホスト名
1. Kubernetes のホスト名
1. 完全修飾ドメイン名
1. オペレーティングシステムのホスト名

## Collector で OpenTelemetry のトレースを取り込む

<div class="alert alert-warning">
OpenTelemetry Collector 用 Datadog エクスポーターは、現在ベータ版です。CPU およびメモリリソースの使用量が高くなることがあります。特にパイプラインおよびバッチプロセッサーを構成する場合は、本番環境に即した正確なメトリクスで応答するまでに反復処理が必要となります。適切に動作しない場合は、<a href="https://docs.datadoghq.com/help/">サポートまでお問い合わせ</a>ください。
</div>

OpenTelemetry Collector の構成は、[パイプライン][8]を `otel-collector-configuration.yml` ファイルに追加して行います。コレクターを `--config=<path/to/configuration_file>` コマンドライン引数を使用して渡すことで起動する場合は、このコンフィギュレーションファイルへの相対パスを指定します。コンフィギュレーションファイルの指定例については、以下の[環境固有のセットアップ](#環境固有のセットアップ)セクションまたは [OpenTelemetry Collector ドキュメント][9]を参照してください。

以下は、`otlp` レシーバー、`batch` プロセッサー、`datadog` エクスポーターで構成されたトレースパイプラインの例です。

```
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:

exporters:
  datadog:
    host_metadata:
      tags:
        - example:tag
    api:
      key: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      site: {{< region-param key="dd_site" code="true" >}}

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
```

## 環境固有のセットアップ

### ホスト

1. [プロジェクトリポジトリの最新リリース][11]から適切なバイナリをダウンロードします。

2. `otel_collector_config.yaml` ファイルを作成します。[サンプルテンプレート](#Collector で OpenTelemetry のトレースを取り込む)を参考にしてはじめましょう。これで Collector の OTLP レシーバーと Datadog エクスポーターが有効になります。

3. `--config` パラメーターで yaml コンフィギュレーションファイルを指定し、ホスト上でダウンロードを実行します。例:

      ```
      otelcontribcol_linux_amd64 --config otel_collector_config.yaml
      ```

### Docker

Opentelemetry Collector コンテナを実行し、[インストール済みのホスト](#ホストからトレースを受信する)または[その他のコンテナ](#その他のホストからトレースを受信する)のいずれかからトレースを受信します。

<div class="alert alert-info">
OpenTelemetry Collector Contrib ディストリビューションの最新タグは、<a href="https://github.com/open-telemetry/opentelemetry-collector-releases/issues/73">リリースごとに更新されるわけではありません</a>。
Collector を最新版にピン留めして、最新の変更点をピックアップしてください。
</div>

#### ホストからトレースを受信する

1. `otel_collector_config.yaml` ファイルを作成します。[サンプルテンプレート](#Collector で OpenTelemetry のトレースを取り込む)を参考にしてはじめましょう。これで Collector の OTLP レシーバーと Datadog エクスポーターが有効になります。

2. [`otel/opentelemetry-collector-contrib:latest`][12] などの公開された Docker イメージを選択します。

3.  コンテナ上でどのポートをオープンするかを決定します。OpenTelemetry トレースは複数のポート上で TCP または UDP 経由で OpenTelemetry Collector に送信されるため、これらのポートをコンテナ上で公開しておく必要があります。デフォルトでは、トレースは OTLP/gRPC 経由でポート `4317` に送信されますが、共通のプロトコルとそれに関連するポートには次のものが含まれます。

      - ポート `9411`: Zipkin/HTTP
      - ポート `14250`: Jaeger/gRPC
      - ポート `14268`: Jaeger/HTTP
      - ポート (UDP) `6831`: Jaeger/Compact
      - ポート `4317`: OTLP/gRPC
      - ポート `4318` の OTLP/HTTP

4. 構成済みのポートと `otel_collector_config.yaml` ファイルでコンテナを実行します。例:

      ```
      $ docker run \
      -p 4317:4317 \
      --hostname $(hostname) \
      -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
      otel/opentelemetry-collector-contrib:<VERSION>
      ```

5. アプリケーションに[メタデータを追加](#OpenTelemetry Collector Datadog エクスポーター)し、統合サービスタグ付けで利用できる適切なリソース属性で構成します。

#### その他のコンテナからトレースを受信

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
              --hostname $(hostname) \
              -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
              otel/opentelemetry-collector-contrib:<VERSION>

    # Application
    docker run -d --name app \
              --network <NETWORK_NAME> \
              --hostname $(hostname) \
              -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
              company/app:latest
    ```

### Kubernetes

OpenTelemetry Collector は 2 つの[デプロイメントシナリオ][3]で実行できます。

- sidecar または daemonset でアプリケーションと同じホストで実行中の OpenTelemetry Collector Agent、または

- クラスター毎、データセンター毎、リージョン毎のコンテナやデプロイといったスタンドアロン型のサービスの 2 種類です。

Datadog で適切なメタデータを正確に追跡するには、それぞれの Kubernetes ノード上で、OpenTelemetry Collector を Agent モードで実行します。

OpenTelemetry Collector を daemonset としてデプロイする場合は、[以下のコンフィギュレーション例](#Kubernetes での OpenTelemetry Collector コンフィギュレーション例)をガイドとして参照してください。

アプリケーションコンテナ上ではダウンロード API を使用してホスト IP をプルします。アプリケーションコンテナには `status.hostIP` を指す環境変数が必要です。OpenTelemetry Application SDK ではこの場合に `OTEL_EXPORTER_OTLP_ENDPOINT` という名前の変数が使用されています。[以下のスニペット例](#Kubernetes での OpenTelemetry アプリケーションのコンフィギュレーション例)をガイドとして使用してください。

#### Kubernetes での OpenTelemetry コレクターコンフィギュレーション例

OpenTelemetry Collector を daemonset およびスタンドアロンの双方でデプロイする場合の Kubernetes マニフェストのサンプル全文は[こちらを参照してください[13]。お使いの環境に応じてサンプルの内容を修正してください。Datadog に固有の主要なセクションは次の通りです。

1. この例では OpenTelemetry Collector を [daemonset 経由の Agent モード][14]でデプロイしています。関連する k8s ノードとポッド固有のメタデータを収集し、テレメトリーデータを[スタンドアロン Collector モード][15]の OpenTelemetry Collector に転送します。このスタンドアロン Collector モードの OpenTelemetry Collector はその後 Datadog のバックエンドにエクスポートされます。[こちらのデプロイメントモデルのダイアグラム][16]もご覧ください。

2. daemonset によって Agent としてデプロイされた OpenTelemetry Collector の場合、daemonset 内の `spec.containers.env` でダウンロード API を使用して `status.podIP` をキャプチャし、それを `OTEL_RESOURCE_ATTRIBUTES` 環境変数の一部として追加する必要があります。これは OpenTelemetry Collector の `resourcedetection` および `k8sattributes` プロセッサにより使用され、`batch` プロセッサ と共に `traces` パイプラインに追加されます。

   daemonset の `spec.containers.env` セクションで次を実行します。

    ```yaml
      # ...
      env:
         # Get pod ip so that k8sattributes can tag resources
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
          # This is picked up by the resource detector
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "k8s.pod.ip=$(POD_IP)"
      # ...
    ```

   `otel-agent-conf` ConfigMap's `data.otel-agent-config` の `processors` セクションで次を実行します。

    ```yaml
      # ...
      # The resource detector injects the pod IP
      # to every metric so that k8sattributes can
      # fetch information afterwards.
      resourcedetection:
        detectors: [env]
        timeout: 5s
        override: false
      # The k8sattributes processor in the Agent is in passthrough mode
      # so that it only tags with the minimal info for the
      # collector k8sattributes to complete
      k8sattributes:
        passthrough: true
      # ...
    ```

   `otel-agent-conf` ConfigMap の `data.otel-agent-config` `service.pipelines.traces` セクションで次を実行します。

    ```yaml
      # ...
      # resourcedetection must come before k8sattributes
      processors: [batch, resourcedetection, k8sattributes]
      # ...
    ```

3. スタンドアロン Collector モードの OpenTelemetry Collector で、ダウンストリームの Collector からトレースを受信して Datadog のバックエンドにエクスポートする場合は、`batch` プロセッサと `k8sattributes` プロセッサを含みます。これらは `datadog` エクスポーターと共にデータの一部となり、`traces` パイプラインに追加されます。

   `otel-collector-conf` ConfigMap の `data.otel-collector-config` `processors` セクションで次を実行します。

    ```yaml
      # ...
      batch:
      k8sattributes:
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
      processors: [batch, k8sattributes]
      exporters: [datadog]
      # ...
    ```
<div class="alert alert-warning"><code>unknown processors type "k8sattributes" for k8sattributes</code> というエラーが発生した場合、最新の OpenTelemetry Collector (v0.37.0 以上) にアップグレードしてください。</div>

#### Kubernetes での OpenTelemetry アプリケーションのコンフィギュレーション例

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
        # これは、opentelemetry sdks で拾われます
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: "http://$(HOST_IP):4317"
```

コレクターの構成に関する詳しい情報や上記以外の例については、[OpenTelemetry Collector コンフィギュレーションドキュメント][4]を参照してください。

### Datadog Agent と並行して実行する

既存の Datadog Agent を持つホストで OpenTelemetry Collector を実行する場合、Datadog エクスポーターを、Datadog Agent を指す OTLP エクスポーターに置き換えます。

1. [専用セクション][17]の説明に従って、gRPC による Datadog Agent OTLP 取り込みを有効にします。

2. OpenTelemetry のコレクター構成において、Datadog Agent のエンドポイントを指す OTLP エクスポーターを定義します。例えば、Datadog Agent がポート 4317 でリッスンしていて、同じホストで実行している場合、以下のようにエクスポーターを定義します。
   ```yaml
   exporters:
     otlp:
       endpoint: "0.0.0.0:4317"
       tls:
        insecure: true
   ```
   コンテナ環境で実行する場合は、Datadog Agent の適切なホスト名を使用するように `endpoint` 設定が構成されていることを確認してください。

3. OpenTelemetry のコレクター構成において、メトリクスとトレースパイプラインの Datadog エクスポーターの使用を OTLP エクスポーターに置き換えます。例えば、Datadog エクスポーターを使ったメトリクスとトレースのパイプラインが 1 つずつある場合、以下のような構成にします。
   ```yaml
   pipelines:
     metrics:
      receivers: [...]
      processors: [...]
      exporters: [nop/1, nop/2, otlp] # replaced 'datadog' by 'otlp'
    traces:
      receivers: [...]
      processors: [...]
      exporters: [nop/3, nop/4, otlp] # replaced 'datadog' by 'otlp'
   ```

この構成により、ホストのメタデータの一貫性を確保し、ホストタグとホストエイリアスの構成を一元化することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/getting_started/site/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[8]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#pipelines
[9]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/examples
[10]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor#batch-processor
[11]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[12]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/example_k8s_manifest.yaml
[14]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-an-agent
[15]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-a-standalone-collector
[16]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/images/opentelemetry-service-deployment-models.png
[17]: /ja/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/