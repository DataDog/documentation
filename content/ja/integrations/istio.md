---
app_id: istio
app_uuid: de5b5443-5038-46cf-a052-0484348776d6
assets:
  dashboards:
    Istio Overview 1.5: assets/dashboards/istio_1_5_overview.json
    Istio Overview 1.5 (OpenMetrics): assets/dashboards/istio_1_5_openmetrics_overview.json
    Istio base dashboard: assets/dashboards/istio_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - istio.mixer.process.cpu_seconds_total
      - istio.mesh.request.count
      - istio.galley.endpoint_no_pod
      metadata_path: metadata.csv
      prefix: istio.
    process_signatures:
    - pilot-agent proxy router
    - envoy envoy-rev0.json
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10017
    source_type_name: Istio
  logs:
    source: istio
  monitors:
    Failed sidecar injections: assets/monitors/failed_sidecar_injection.json
  saved_views:
    Istio Error Overview: assets/saved_views/istio_error_overview.json
    Istio Overview: assets/saved_views/istio_overview.json
    Istio Pilot Error Logs: assets/saved_views/istio_pilot_errors.json
    Istio Pilot Logs: assets/saved_views/istio_pilot_logs.json
    Istio Proxyv2 Error Logs: assets/saved_views/istio_proxyv2_errors.json
    Istio Proxyv2 Logs: assets/saved_views/istio_proxyv2_logs.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- network
- tracing
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/istio/README.md
display_on_public_website: true
draft: false
git_integration_title: istio
integration_id: istio
integration_title: Istio
integration_version: 6.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: istio
public_title: Istio
short_description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Category::ネットワーク
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Istio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog は、Istio 環境のあらゆる側面を監視するため、以下を実現できます。
- [ログ](#log-collection)を使用して、Envoy および Istio の Control Plane の健全性を評価。
- [リクエスト、帯域幅、リソース消費のメトリクス](#metrics)でサービスメッシュのパフォーマンスを詳しく確認。
- [ネットワークパフォーマンスモニタリング][1]で、コンテナ、ポッド、サービス間のネットワークコミュニケーションをメッシュ状にマッピング。
- [APM[[2] でメッシュを実行してアプリケーションの分散型トレースの詳細を確認。

Istio 環境での Datadog の使用について、詳細は[モニターのブログ記事をご参照ください][3]。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照してこの手順を行ってください。

この OpenMetrics ベースのインテグレーションには、最新モード (`use_openmetrics`: true) とレガシーモード (`use_openmetrics`: false) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。詳しくは、[OpenMetrics ベースのインテグレーションにおける最新バージョニングとレガシーバージョニング][5]を参照してください。

Istio メトリクスを収集する Datadog のインスタンスが複数ある場合は、すべてのインスタンスで同じモードを使用していることを確認してください。そうしないと、Datadog サイトでメトリクスデータが変動する可能性があります。

`[OpenMetrics V1]`、`[OpenMetrics V2]`、または `[OpenMetrics V1 and V2]` とマークされたメトリクスは、Istio インテグレーションの対応するモードでのみ利用可能です。`Istio v1.5+` とマークされたメトリクスは Istio バージョン 1.5 以降で収集されます。

### インフラストラクチャーリスト

Istio は Datadog Agent に含まれています。Istio サーバーまたはクラスターに [Datadog Agent をインストール][6]し、Istio で Agent を指定します。

#### Envoy

Envoy プロキシ を Istioで監視する場合は、[Envoy インテグレーション][7]を構成します。

### ブラウザトラブルシューティング

Istio に接続するには、`istio.d/conf.yaml` ファイル ([Agent のコンフィギュレーションディレクトリ][8]のルートにある `conf.d/` フォルダー内) を編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル istio.d/conf.yaml][9] を参照してください。

#### メトリクスの収集
Istio `v1.5+` の `istiod` デプロイメントと `istio-proxy` を監視するために、Prometheus 形式のメトリクスを収集するための 2 つの主要なコンポーネントがあります。[Istio アーキテクチャ][10]に沿って、**データプレーン** (`istio-proxy` サイドカーコンテナ) と**コントロールプレーン** (プロキシを管理する `istiod` サービス) が存在します。これらは両方とも `istio` Agent チェックとして実行されますが、異なる責任を負っており、以下に説明するように別々に構成されます。

##### データプレーン構成
Istio データプレーンを監視するために、Agent は [`istio.d/auto_conf.yaml`][11] ファイルを含み、`istio-proxy` サイドカーコンテナごとに監視を自動的にセットアップするようになっています。Agent は、自動的に検出した各サイドカーコンテナに対してこのチェックを初期化します。この構成により、各サイドカーコンテナから公開されるデータの `istio.mesh.*` メトリクスをレポートすることができます。

インテグレーションのデータプレーン部分をカスタマイズするには、Istio 用に同等の[コンフィギュレーションファイル][12]を作成します。`ad_identifiers` と `istio_mesh_endpoint` を適切に設定し、`istio-proxy` サイドカーコンテナが検出された場合のインテグレーションをセットアップします。利用可能なすべての構成オプションは、提供されている [`istio.d/auto_conf.yaml`][11] と[コンフィギュレーションファイル例][9]を参照してください。カスタマイズの際には、`use_openmetrics: true` と `exclude_labels` を以下の構成に設定します。
```yaml
    exclude_labels:
      - source_version
      - destination_version
      - source_canonical_revision
      - destination_canonical_revision
      - source_principal
      - destination_principal
      - source_cluster
      - destination_cluster
      - source_canonical_service
      - destination_canonical_service
      - source_workload_namespace
      - destination_workload_namespace
      - request_protocol
      - connection_security_policy
```

##### コントロールプレーン構成
Istio のコントロールプレーンを監視し、`mixer`、`galley`、`pilot`、`citadel` のメトリクスをレポートするには、`istiod` デプロイメントを監視するように Agent を構成する必要があります。Istio v1.5 以降では、`istio-system` ネームスペースにある `istiod` デプロイメントのポッドアノテーションとして、以下のオートディスカバリーアノテーションを適用してください。

```yaml
ad.datadoghq.com/discovery.check_names: '["istio"]'
ad.datadoghq.com/discovery.init_configs: '[{}]'
ad.datadoghq.com/discovery.instances: |
     [
       {
         "istiod_endpoint": "http://%%host%%:15014/metrics",
         "use_openmetrics": "true"
       }
     ]
```
これらのアノテーションの適用方法は、使用する [Istio のデプロイメント戦略 (Istioctl、Helm、Operator)][13] によって異なります。これらのポッドアノテーションを適用するための適切な方法については、[Istio のドキュメント][10]を参照してください。

これらのアノテーションは、`discovery` を `<CONTAINER_IDENTIFIER>` として参照し、`istiod` デプロイメントのポッドのデフォルトコンテナ名と一致するようにします。もし、コンテナ名が異なる場合は、適宜調整してください。

#### Datadog Agent ポッドのサイドカーインジェクションを無効化

[コンテナに Datadog Agent][14] をインストールする場合は、その前に Istio のサイドカーインジェクションを無効にすることをお勧めします。

_Istio バージョン >= 1.10:_

`sidecar.istio.io/inject: "false"` **ラベル**を `datadog-agent` DaemonSet に追加します。

```yaml
# (...)
spec:
  template:
    metadata:
      labels:
        sidecar.istio.io/inject: "false"
    # (...)
```

これは、`kubectl patch` コマンドでも実行できます。

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"labels":{"sidecar.istio.io/inject":"false"}}}}}'
```

_Istio バージョン <= 1.9:_

`sidecar.istio.io/inject: "false"` **アノテーション**を `datadog-agent` DaemonSet に追加します。

```yaml
# (...)
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    # (...)
```

`kubectl patch` コマンドを使用します。

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### 収集データ

Istio には 2 種類のログがあります。[Envoy インテグレーション][15]、あるいは [Istio logs][16] で収集される Envoy アクセスログです。 

_Agent バージョン 6.0 以降で利用可能_

[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照して、次のパラメーターを適用してください。
Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][17]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "istio", "service": "<サービス名>"}`   |

### 検証

[Agent の `info` サブコマンドを実行][18]し、Checks セクションで `istio` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "istio" >}}


### ヘルプ

Istio チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "istio" >}}


## ヘルプ

### 無効なチャンク長のエラー
Istio インテグレーション (Istio インテグレーションバージョン `3.13.0` 以前) のレガシーモードで以下のエラーが表示された場合

```python
  Error: ("Connection broken: InvalidChunkLength(got length b'', 0 bytes read)",
  InvalidChunkLength(got length b'', 0 bytes read))
```

このエラーを解決するには、OpenMetrics ベースの Istio インテグレーションの最新モードを使用できます。

最低でも Agent `7.31.0` と Python 3 にアップグレードする必要があります。OpenMetrics を有効にするには、[構成](#configuration)のセクションを参照してください。

### Istio のデプロイメントで一般的な OpenMetrics インテグレーションを使用する

Istio のプロキシサイドカーインジェクションが有効な場合、`istio_mesh_endpoint` と同じメトリクスエンドポイントで [OpenMetrics インテグレーション][21]を使用して他の Prometheus メトリクスを監視すると、カスタムメトリクス使用量が多く、メトリクス収集が二重になることがあります。

OpenMetrics の構成により、メトリクスの収集が重複しないようにするためには、以下のどちらかを行います。

1. 構成オプション `metrics` で特定のメトリクスのマッチングを使用するか、または
2. `metrics` にワイルドカード `*` 値を使用する場合、以下の OpenMetrics インテグレーションオプションを使用して、Istio および Envoy インテグレーションで既にサポートされているメトリクスを除外することを検討します。

#### 汎用的なメトリクス収集を使用した OpenMetrics の最新モード構成

カスタムメトリクスの高額請求を避けるため、必ず Istio と Envoy のメトリクスを構成から除外してください。`openmetrics_endpoint` が有効になっている場合は `exclude_metrics` を使用します。

```yaml
## 各インスタンスは、他のインスタンスとは独立してスケジュールされます。
#
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    metrics: [*]
    exclude_metrics:
      - istio_*
      - envoy_*

```

#### 汎用的なメトリクス収集を使用した OpenMetrics のレガシーモード構成

カスタムメトリクスの高額請求を避けるため、必ず Istio と Envoy のメトリクスを構成から除外してください。`prometheus_url` が有効になっている場合は `ignore_metrics` を使用します。

```yaml
instances:
  - prometheus_url: <PROMETHEUS_URL>
    metrics:
      - *
    ignore_metrics:
      - istio_*
      - envoy_*
```

ご不明な点は、[Datadog のサポートチーム][22]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Istio サービスメッシュの監視][23]
- [Datadog でキーメトリクスを収集して Istio を監視する][24]
- [Datadog を使用した Istio の監視方法][3]

[1]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[2]: https://docs.datadoghq.com/ja/tracing/setup_overview/proxy_setup/?tab=istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/integrations-core/tree/master/envoy#istio
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[10]: https://istio.io/latest/docs/ops/deployment/architecture/
[11]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[12]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=file#configuration
[13]: https://istio.io/latest/docs/setup/install/
[14]: https://docs.datadoghq.com/ja/agent/kubernetes/
[15]: https://docs.datadoghq.com/ja/integrations/envoy/#log-collection
[16]: https://istio.io/v1.4/docs/tasks/observability/logs/collecting-logs/
[17]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[18]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[19]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/assets/service_checks.json
[21]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[22]: https://docs.datadoghq.com/ja/help/
[23]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[24]: https://www.datadoghq.com/blog/istio-metrics/