---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
  - opentelemetry demo
aliases:
- /ja/opentelemetry/guide/otel_demo_to_datadog
- /ja/opentelemetry/otel_demo_to_datadog
further_reading:
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: カタログ
- link: /tracing/trace_explorer/
  tag: ドキュメント
  text: Trace Explorer
- link: /tracing/trace_explorer/trace_queries/
  tag: ドキュメント
  text: トレースクエリ
- link: /error_tracking/
  tag: ドキュメント
  text: Error Tracking
title: OpenTelemetry Demo から Datadog へのデータ送信
---
## 概要 {#overview}

<div class="alert alert-info">このチュートリアルでは、Datadog Exporter と Datadog Connector を使用します。新しい Collector 構成については、Datadog は <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector のセットアップ</a>の OTLP パイプラインを推奨しています。</div>

[OpenTelemetry Demo][1] は、OpenTelemetry (OTel)
インスツルメンテーションと観測機能を示すためにコミュニティによって開発されたマイクロサービスデモアプリケーションです。これは、HTTP と gRPC を介して相互に通信する複数のマイクロサービスで構成される e コマース Web ページです。すべてのサービスは OpenTelemetry でインスツルメントされており、トレース、メトリクス、ログを生成します。

このページでは、OpenTelemetry Demo をデプロイし、そのデータを Datadog に送信するために必要な手順を説明します。

## 前提条件 {#prerequisites}

このガイドを完了するには、以下を確認してください。

1. まだの場合は、[Datadog アカウントを作成][2] します。
2. [Datadog API キー][3] を見つけるか、作成します。
3. アプリケーション用の空き容量 6 GB RAM。

Docker または Kubernetes (Helm を使用) を使ってデモをデプロイできます。希望するデプロイ方法を選択し、必要なツールがインストールされていることを確認してください。

{{< tabs >}}
{{% tab "Docker" %}}

- Docker
- Docker Compose v2.0.0+
- Make (オプション)

{{% /tab %}}

{{% tab "Kubernetes" %}}

- Kubernetes 1.24+
- Helm 3.9+
- 接続用に構成された kubectl を備えたアクティブな Kubernetes クラスター

{{% /tab %}}
{{< /tabs >}}

## デモの構成とデプロイ {#configuring-and-deploying-the-demo}

### リポジトリの複製 {#cloning-the-repository}

`opentelemetry-demo` リポジトリをデバイスに複製します。

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### OpenTelemetry Collector の構成 {#configuring-the-opentelemetry-collector}

デモのテレメトリデータを Datadog に送信するには、OpenTelemetry Collector の構成に以下のコンポーネントを追加する必要があります。

- `Resource Processor` は `optional` ですが、`deployment.environment.name` リソース属性を設定するために使用される推奨コンポーネントであり、Datadog はこれを `env` タグにマッピングします。
- `Datadog Connector`は、Datadog APM トレースメトリクスを計算します。
- `Datadog Exporter`は、トレース、メトリクス、およびログを Datadog にエクスポートします。
- `Datadog Extension`は `optional` コンポーネントであり、インフラストラクチャー監視内で OpenTelemetry Collector の構成を表示することができます。(詳細は [Datadog Extension][13] を参照してください)。

これらのコンポーネントを構成するには、以下の手順を完了します。

{{< tabs >}}
{{% tab "Docker" %}}

1. デモのリポジトリを開きます。ルートフォルダーに `docker-compose.override.yml` という名前のファイルを作成します。

2. 作成されたファイルを開きます。以下の内容を貼り付けて、[Datadog サイト][7] および [Datadog API キー][8] 環境変数を設定します。

    ```yaml
    services:
      otel-collector:
        command:
          - "--config=/etc/otelcol-config.yml"
          - "--config=/etc/otelcol-config-extras.yml"
          - "--feature-gates=datadog.EnableOperationAndResourceNameV2"
        environment:
          - DD_SITE_PARAMETER=<Your API Site>
          - DD_API_KEY=<Your API Key>
    ```

3. OpenTelemetry Collector を構成するには、`src/otel-collector/otelcol-config-extras.yml` を開き、ファイルに以下を追加します。

    ```yaml
    extensions:
      datadog/extension:
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        http:
          endpoint: "localhost:9875"
          path: "/metadata"

    exporters:
      datadog:
        traces:
          compute_stats_by_span_kind: true
          trace_buffer: 500
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            min_size: 10
            max_size: 100
            flush_timeout: 10s

    processors:
      resource:
        attributes:
          - key: deployment.environment.name
            value: "otel"
            action: upsert

    connectors:
      datadog/connector:
        traces:
          compute_stats_by_span_kind: true

    service:
      extensions: [datadog/extension]
      pipelines:
        traces:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource, transform/sanitize_spans]
          exporters: [otlp_grpc/jaeger, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [datadog/connector, docker_stats, httpcheck/frontend-proxy, hostmetrics, nginx, otlp, postgresql, redis, spanmetrics]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [otlp_http/prometheus, debug, datadog]
        logs:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [opensearch, debug, datadog]
    ```

    By default, the collector in the demo application merges the configuration from two files:

    - `src/otel-collector/otelcol-config.yml`: contains the default configuration for the collector.
    - `src/otel-collector/otelcol-config-extras.yml`: used to add extra configuration to the collector.

    <div class="alert alert-info">
    YAML 値をマージする場合、オブジェクトはマージされ、配列は置換されます。
    そのため、実際に構成されているものよりも多くのコンポーネントがパイプラインで指定されています。
    以前の構成は、メイン <code>otelcol-config</code> ファイルで構成された値を置換しません。
    </div>

[7]: /ja/getting_started/site/
[8]: https://app.datadoghq.com/organization-settings/api-keys/

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Datadog サイトおよび API キーのシークレットを保存するには、`dd-secrets` という名前のシークレットを作成します。

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. OpenTelemetry Demo を管理およびデプロイするには、OpenTelemetry [Helm チャート][4] をリポジトリに追加します。

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    ```

3. 以下の内容で、`my-values-file.yml` という名前のファイルを作成します。

    ```yaml
    opentelemetry-collector:
      extraEnvsFrom:
        - secretRef:
            name: dd-secrets
      config:
        extensions:
          datadog/extension:
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            http:
              endpoint: "localhost:9875"
              path: "/metadata"
        exporters:
          datadog:
            traces:
              compute_stats_by_span_kind: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            sending_queue:
              batch:
                min_size: 10
                max_size: 100
                flush_timeout: 10s

        processors:
          resource:
            attributes:
              - key: deployment.environment.name
                value: "otel"
                action: upsert

        connectors:
          datadog/connector:
            traces:
              compute_stats_by_span_kind: true

        service:
          extensions: [health_check, datadog/extension]
          pipelines:
            traces:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlp/jaeger, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [datadog/connector, otlp, spanmetrics]
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    YAML 値をマージする場合、オブジェクトはマージされ、配列は置換されます。
    そのため、実際に構成されているものよりも多くのコンポーネントがパイプラインで指定されています。
    以前の構成は、メイン <code>otelcol-config</code> ファイルで構成された値を置換しません。
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### デモの実行 {#running-the-demo}

{{< tabs >}}
{{% tab "Docker" %}}

make がインストールされている場合は、次のコマンドを使用してデモを開始できます。

```shell
make start
```

`make` がインストールされていない場合は、`docker compose` コマンドを直接使用できます。

```shell
docker compose --env-file .env --env-file .env.override up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Helm を使用して Kubernetes にデモアプリケーションをデプロイするには、次のコマンドを実行します。

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## アプリケーションのナビゲーション {#navigating-the-application}

Astronomy Shop Web UI にアクセスして、アプリケーションを探索し、テレメトリデータがどのように生成されるかを観察できます。

{{< tabs >}}
{{% tab "Docker" %}}

<http://localhost:8080> に移動します。

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. ローカルクラスターを実行している場合は、フロントエンドプロキシをポートフォワードする必要があります。

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

2. <http://localhost:8080> に移動します。

{{% /tab %}}
{{< /tabs >}}

## テレメトリデータの相関関係 {#telemetry-data-correlation}

デモのすべてのサービスで使用されているインスツルメンテーションの手順は、OpenTelemetry のメインドキュメント
で確認できます。

各サービスが実装されている言語とその
ドキュメントは、[言語機能リファレンステーブル][10] で確認できます。

## Datadog での OpenTelemetry データの確認 {#exploring-opentelemetry-data-in-datadog}

OTel デモが実行されている間、組み込みの負荷ジェネレーターがアプリケーション内のトラフィックをシミュレートします。
数秒後、Datadog にデータが到着し始めます。

### カタログ {#catalog}

OTel デモの一部であるすべてのサービスを表示する:

1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}][11] に移動します。

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog.png" alt="OpenTelemetry デモアプリケーションからサービスリストのカタログページを表示する" style="width:90%;" >}}

2. {{< ui >}}Map{{< /ui >}} を選択して、サービスがどのように接続されているかを確認します。{{< ui >}}Map layout{{< /ui >}} を {{< ui >}}Cluster{{< /ui >}} または {{< ui >}}Flow{{< /ui >}} に変更して、異なるモードでマップを表示します。

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_flow.png" alt="すべてのサービスが接続された Service Map フローを表示する" style="width:90%;" >}}

3. {{< ui >}}Catalog{{< /ui >}} ビューを選択し、次にサービスを選択して、サイドパネルでパフォーマンスの概要を表示します。

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_service.png" alt="特定のサービスのパフォーマンスとセットアップガイダンスの概要を表示します。" style="width:90%;" >}}

### Trace Explorer {#trace-explorer}

OTel デモから受信したトレースを確認する:

1. {{< ui >}}Performance{{< /ui >}} > {{< ui >}}Setup Guidance{{< /ui >}} から {{< ui >}}View Traces{{< /ui >}} をクリックしてトレースエクスプローラーを開き、選択されたサービスをフィルターとして適用します。

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="チェックアウトサービスのすべてのインデックス化されたスパンを含むトレースビュー" style="width:90%;" >}}

2. インデックス化されたスパンを選択して、このトランザクションの完全なトレースの詳細を表示します。

{{< img src="/getting_started/opentelemetry/otel_demo/trace_waterfall.png" alt="その特定のトランザクションに属するすべてのスパンを含むトレースビュー" style="width:90%;" >}}

3. タブを切り替えて、詳細情報を表示します。
   - ホストメトリクスを報告しているサービスのインフラストラクチャーメトリクス。
   - すでに実装されているサービスのランタイムメトリクス。
   - このトレースと関連付けられたログエントリ。
   - このトレースにリンクされたスパンリンク。

### トレースクエリ {#trace-queries}

Datadog では、受信した OpenTelemetry データをフィルタリングおよびグループ化できます。たとえば、特定のユーザーからのすべてのトランザクションを検索するには、トレースクエリを使用できます。

OTel デモは `user.id` をスパンタグとして送信するため、これを使用してユーザーによってトリガーされたすべてのトランザクションをフィルタリングできます。

1. サイドパネルの {{< ui >}}Info{{< /ui >}} から、ユーザー ID の行にカーソルを合わせ、{{< ui >}}cog{{< /ui >}} アイコンをクリックし、{{< ui >}}filter by @app.user.id:<user_id>{{< /ui >}} を選択します。

2. 以前のフィルターをすべて削除し、{{< ui >}}@app.user.id{{< /ui >}} のみが適用された状態にすると、指定したユーザー ID を持つスパンを含むすべてのトランザクションを表示できます。

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="特定の app.user.id を含むすべてのスパンをフィルタリングするトレースクエリ" style="width:90%;" >}}

### Error Tracking {#error-tracking}

OpenTelemetry Demo には、エラーシナリオをシミュレートするための Feature Flag エンジンが含まれています。

1. [http://localhost:8080/feature][12] に移動して、利用可能なシナリオを管理します。詳細については、[OpenTelemetry Demo に関するドキュメント][5] を参照してください。
2. デモでエラーが発生し始めたら、Datadog で影響を受けるサービスを可視化し、追跡できます。

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="PaymentService Fail Feature Flag Enabled エラーが表示された、Error Tracking ビュー" style="width:90%;" >}}

### OpenTelemetry Collector 構成 {#opentelemetry-collector-configuration}

Datadog Extension を使用すると、以下のいずれかのページで Datadog 内の OpenTelemetry Collector 構成を表示できます。

- [インフラストラクチャーリスト][14]。
- [Resource Catalog][15]。

Collector が実行されているホスト名を選択すると、その完全な構成を可視化できます。

{{< img src="/getting_started/opentelemetry/otel_demo/collector_full_config.png" alt="Datadog 内で表示された OpenTelemetry Collector 構成" style="width:90%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://opentelemetry.io/docs/demo/feature-flags/
[10]: https://opentelemetry.io/docs/demo/#language-feature-reference
[11]: https://app.datadoghq.com/services
[12]: http://localhost:8080/feature
[13]: /ja/opentelemetry/integrations/datadog_extension/
[14]: https://app.datadoghq.com/infrastructure
[15]: https://app.datadoghq.com/infrastructure/catalog