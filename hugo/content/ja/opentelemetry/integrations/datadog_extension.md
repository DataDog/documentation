---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
- link: /infrastructure/list/
  tag: ドキュメント
  text: インフラストラクチャーリスト
- link: /infrastructure/resource_catalog/
  tag: ドキュメント
  text: Resource Catalog
title: Datadog 拡張機能
---
## 概要 {#overview}

OpenTelemetry Collector Contrib [モジュール v0.129.0][4] 以降では、Datadog Extension は OpenTelemetry Collector の [contrib ディストリビューション][5] に含まれています。また、OpenTelemetry Collector の [カスタムビルド][6] でも利用可能です。[DDOT Collector][8] では、この拡張機能は自動的に有効になります。

Datadog Extension を使用すると、[Fleet Automation][7]、[インフラストラクチャーリスト][2]、および [Resource Catalog][3] を使用して、Datadog で OpenTelemetry Collector の構成およびビルド情報を直接表示できます。この拡張機能は、推奨される OTLP HTTP エクスポーターのセットアップおよび Datadog Exporter と連携します。

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Fleet Automation の Pipeline Visualization で OTel Collector の構成を表示する" style="width:100%;" >}}

## 主な特徴 {#key-features}

- **Collector 構成の可視化**: インフラストラクチャーで任意の OTel Collector の完全な構成を表示します。
- **ビルド情報**: Collector のバージョン、ビルドの詳細、およびコンポーネント情報を確認します。
- **ローカル検査エンドポイント**: ローカルでのデバッグおよび構成検証に HTTP エンドポイントを使用します。
- **フリート管理**: Datadog UI から OpenTelemetry Collector フリートを監視および管理します。

## セットアップ {#setup}

<div class="alert alert-danger"><a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a> を使用している場合、Datadog Extension を手動で構成<strong>しない</strong>でください。すべての DDOT Collector バージョンで自動的に有効になります。</div>

### 1. Collector 構成に Datadog Extension を追加する {#1-add-the-datadog-extension-to-your-collector-configuration}

OpenTelemetry Collector 構成ファイルで Datadog Extension を構成します。

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match the hostname in exported telemetry

service:
  extensions: [datadog]
```

### 2. アクティブなテレメトリパイプラインを構成する {#2-configure-an-active-telemetry-pipeline}

少なくとも 1 つのアクティブなテレメトリパイプラインを構成し、そのデータを Datadog にエクスポートします。推奨される構成については、[OTLP HTTP エクスポーターのセットアップ][9] を使用してください。

この拡張機能は、Collector およびホストのメタデータを使用して、報告された構成を Datadog 内の対応するホストに関連付けます。

### 3. (オプション) カスタムリソース属性を追加する {#3-optional-add-custom-resource-attributes}

Datadog Extension は、Collector の内部テレメトリからリソース属性を自動的に収集し、Datadog に送信するメタデータペイロードにそれらを含めます。デプロイメント環境、チーム、Kubernetes クラスター名などのカスタム属性を添付するには、それらを `service.telemetry.resource` の下に設定します。

```yaml
service:
  telemetry:
    resource:
      deployment.environment.name: production
      team.name: platform
      k8s.cluster.name: prod-us-east1-cluster-a
```

Collector は、`service.name`、`service.version`、および `service.instance.id` (ランダムに生成された UUID) を内部テレメトリに自動的に添付します。これらを手動で設定する必要はありません。

### 4. (オプション) ゲートウェイトポロジ―を構成する (プレビュー) {#4-optional-configure-gateway-topology-preview}

Datadog Extension は、Datadog にリーチする前に 1 つ以上のゲートウェイ Collector を介してテレメトリを転送する OpenTelemetry Collector ゲートウェイセットアップがある場合、トポロジ―を公開して [Fleet Automation][7] で接続されたパイプライングラフとして表示されるようにすることができます。

{{< img src="opentelemetry/integrations/datadog_extension_gateway_topology.png" alt="DaemonSet Collector が 2 層のゲートウェイ Collector を介して Datadog に転送している様子が表示された、Fleet Automation でのゲートウェイトポロジ―ビュー。" style="width:100%;" >}}

このビューを有効にするには、パイプライン内の各 Collector を構成します。

- エージェントまたは DaemonSet Collector には `deployment_type` を `daemonset` に設定し、ゲートウェイ Collector には `gateway` を設定します。
- ダウンストリームのゲートウェイに転送する Collector に `gateway_destination` を設定します。値は受信ゲートウェイの Kubernetes サービスで、`<namespace>/<service>` 形式です。
- ゲートウェイ Collector で `gateway_service` を設定します。値はゲートウェイポッドの前面にある Kubernetes サービスです。
- マルチレイヤーパイプラインの**中間**ゲートウェイは、**両方**の `gateway_service` (自身のサービス) と `gateway_destination` (次のゲートウェイ) を設定します。
- パイプラインですべての Collector の `service.telemetry.resource` の下に `k8s.cluster.name` を設定します。これは**必須**です。`gateway_service` および `gateway_destination` と合わせて、Fleet Automation がパイプライングラフを再構築するために使用する結合キーを形成します。
- Collector の内部メトリクスを有効にすると、拡張機能は**トラフィックを表示**トグルを使用して、グラフの各エッジにログ、メトリクス、またはトレースのボリュームデータを関連付けることができます。[OpenTelemetry Collector Health Metrics][10] を参照してください。

以下の例は、一般的な 2 層のケースを扱っています。ノードローカルの DaemonSet がゲートウェイ Deployment に転送し、それが Datadog Exporter を使用して Datadog に送信します。

各 Collector は、`service.telemetry.metrics` を介して Prometheus プルエンドポイントで独自の健全性メトリクスを公開し、`prometheus/internal` レシーバーでそのエンドポイントをスクレイピングし、アプリケーションテレメトリと同じメトリクスパイプラインを通じて結果をルーティングします。これは、トポロジ―ビューの各ノードとエッジを構成する要素です。

#### DaemonSet Collector {#daemonset-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  otlp:
    endpoint: otelcol-gateway.monitoring.svc.cluster.local:4317
    tls:
      insecure: true

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: daemonset
    gateway_destination: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      exporters: [otlp]
```

DaemonSet の `metrics` パイプラインには `prometheus/internal` が含まれているため、Collector 自身の健全性メトリクスはアプリケーションのテレメトリとともに OTLP 経由でゲートウェイに送信され、ゲートウェイの Datadog エクスポーターを通じて Datadog にリーチします。

#### ゲートウェイ Collector {#gateway-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    metrics:
      resource_attributes_as_tags: true
    sending_queue:
      batch:
        flush_timeout: 10s

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

ゲートウェイの `metrics` パイプラインは、転送されたテレメトリ (DaemonSet から OTLP 経由) と `prometheus/internal` からの独自の内部メトリクスの両方を受け入れ、すべてを Datadog にエクスポートします。

#### マルチレイヤーゲートウェイパイプライン {#multi-layer-gateway-pipelines}

ゲートウェイレイヤーが複数あるパイプラインの場合は、中間レイヤーで `gateway_service` と `gateway_destination` を一緒に設定します。たとえば、DaemonSet とレイヤー 1 ゲートウェイの間にレイヤー 2 ゲートウェイがある 3 レイヤー構成のトポロジーでは、レイヤー 2 ゲートウェイ拡張機能は次のように構成されます。

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway-l2
    gateway_destination: monitoring/otelcol-gateway-l1
```

DaemonSet は `monitoring/otelcol-gateway-l2` に転送し、レイヤー 2 ゲートウェイは `monitoring/otelcol-gateway-l1` に転送し、レイヤー 1 ゲートウェイは Datadog に送信します。各 Collector は同じ `k8s.cluster.name` を報告します。

## 構成オプション {#configuration-options}

| パラメーター | 説明 | デフォルト |
|-----------|-------------|---------|
| `api.key` | Datadog API キー (必須)。| - |
| `api.site` | Datadog サイト (例: `us5.datadoghq.com`)。| `datadoghq.com` |
| `api.fail_on_invalid_key` | API キーが無効な場合は起動時に終了します。| `true` |
| `hostname` | Collector のカスタムホスト名。| 自動検出 |
| `http.endpoint` | ローカル HTTP サーバーエンドポイント。| `localhost:9875` |
| `http.path` | メタデータの HTTP サーバーパス。| `/metadata` |
| `deployment_type` | Collector のデプロイ方法を識別します。この値は [Fleet Automation][7] に表示され、[ゲートウェイトポロジー](#4-optional-configure-gateway-topology-preview)に必要です。次のいずれか: `gateway`、`daemonset`、または `unknown`。デフォルトの `unknown` は、デプロイメントタイプが設定されていないことを意味します。| `unknown` |
| `installation_method` | Collector のインストール方法。次のいずれか: `kubernetes`、`bare-metal`、`docker`、`ecs-fargate`、`eks-fargate`、または unset。Collector v0.148.0 以降で利用可能です。| unset |
| `gateway_service` | **ゲートウェイ** Collector でのみ設定します。ゲートウェイ Collector ポッドの前面にある Kubernetes サービス。形式: `service` または `namespace/service`。Collector v0.150.0 以降で利用可能です。| - |
| `gateway_destination` | テレメトリをダウンストリームゲートウェイに転送する Collector で設定します。この Collector がテレメトリを転送する Kubernetes サービス。受信ゲートウェイ Collector の `gateway_service` と一致する必要があります。形式: `service` または `namespace/service`。Collector v0.150.0 以降で利用可能です。| - |
| `proxy_url` | アウトバウンドリクエストの HTTP プロキシ URL。| - |
| `timeout` | HTTP リクエストのタイムアウト。| `30s` |
| `tls.insecure_skip_verify` | TLS 証明書の検証をスキップします。| `false` |

<div class="alert alert-danger">
<strong>ホスト名の照合</strong>: Datadog Extension でカスタム <code>hostname</code> を指定する場合は、エクスポートされたテレメトリのホスト名と一致している必要があります。この拡張機能は、パイプラインのアプリケーションテレメトリからホスト名を推測しません。ホスト名は、システムまたはクラウドプロバイダー API、手動構成から取得されます。Datadog Exporter を使用する場合、その <code>hostname</code> 値も一致している必要があります。一致していない場合、Datadog がテレメトリを正しいホストに関連付けられず、ホストが重複して表示される可能性があります。
</div>

### Datadog Exporter を使用した完全な構成例 {#complete-configuration-example-with-the-datadog-exporter}

次の例では Datadog Exporter を使用します。拡張機能自体はこれを必要としません。推奨されるパイプラインについては、[OpenTelemetry Collector をセットアップする][9] の OTLP HTTP エクスポーター構成を使用してください。

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    http:
      endpoint: "localhost:9875"
      path: "/metadata"
    proxy_url: "http://proxy.example.com:8080"
    timeout: 30s
    tls:
      insecure_skip_verify: false

exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    sending_queue:
      batch:
        flush_timeout: 10s

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      exporters: [datadog/exporter]
```

## Collector 構成の表示 {#viewing-collector-configuration}

構成が完了すると、OpenTelemetry Collector 構成とビルド情報を以下のさまざまな場所で表示できます。

### Fleet Automation {#fleet-automation}
1. [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}][7] に移動します。
2. Collector ファセットを使用して OTel Collector ホストをフィルタリングし、ホストをクリックします。
3. サイドパネルで {{< ui >}}Info{{< /ui >}} タブを選択し、ビルド情報を表示します。
4. {{< ui >}}Configurations{{< /ui >}} タブを選択して、OTel Collector 構成の完全な YAML ファイルまたはパイプラインの可視化を表示します。

{{< img src="/agent/fleet_automation/fleet-automation-yaml-view.png" alt="Fleet Automation で OTel Collector 構成の YAML を表示する" style="width:100%;" >}}

### インフラストラクチャーリスト (ホストリスト) {#infrastructure-list-host-list}

1. [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][2] に移動します。
2. OpenTelemetry Collector を実行しているホストをクリックします (**注**: `field:apps:otel` でフィルタリングして Collector インスタンスのみを表示します)。
3. ホスト詳細パネルで {{< ui >}}OTel Collector{{< /ui >}} タブを選択し、ビルド情報と完全な Collector 構成を確認します。

### Resource Catalog {#resource-catalog}

1. Datadog アカウントの [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Resource Catalog{{< /ui >}}][3] に移動します
2. ホストをフィルタリングするか、Collector インスタンスを検索します。
3. OpenTelemetry Collector を実行しているホストをクリックします。
4. {{< ui >}}Collector{{< /ui >}} まで下にスクロールして、ビルド情報と完全な Collector 構成を確認します。

## ローカル HTTP サーバー {#local-http-server}

Datadog 拡張機能には、デバッグおよび検査用のローカル HTTP サーバーが含まれています。

```bash
# Access collector metadata locally
curl http://localhost:9875/metadata
```

このエンドポイントは以下を提供します。
- Collector 構成 (機密情報は削除済み)
- ビルド情報およびバージョン詳細
- アクティブなコンポーネントリスト
- 拡張機能ステータス

## トラブルシューティング {#troubleshooting}

### Datadog に表示されない構成 {#configuration-not-appearing-in-datadog}

1. **ホスト名の照合をチェックする**: Datadog 拡張機能のホスト名がエクスポートされたテレメトリのホスト名と一致していることを確認します。Datadog Exporter を使用している場合は、そのホスト名も一致していることを確認してください。
2. **API キーを検証する**: API キーが有効であり、適切な権限を持っていることを確認します。
3. **Collector ログをチェックする**: 拡張機能の初期化およびデータ送信のログをチェックします。
4. **拡張機能が有効になっていることを確認する**: 拡張機能がサービス構成にリストされていることを確認します。

### HTTP サーバーの問題 {#http-server-issues}

1. **ポートの競合**: ポート 9875 が使用可能であることを確認するか、別のポートを構成します。
2. **ネットワークアクセス**: デバッグ場所から HTTP サーバーにアクセスできることを確認します。
3. **ログをチェックする**: HTTP サーバーの起動に関する問題がないか、拡張機能のログを確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/catalog
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.129.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.129.1
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/fleet
[8]: /ja/opentelemetry/setup/ddot_collector/
[9]: /ja/opentelemetry/setup/collector_exporter/
[10]: /ja/opentelemetry/integrations/collector_health_metrics/