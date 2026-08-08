---
app_id: traefik-mesh
app_uuid: 8ace5f4d-ba92-4b68-acf0-20275c8c2a2a
assets:
  dashboards:
    Traefik Mesh Overview: assets/dashboards/traefik_mesh_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: traefik_mesh.entrypoint.open_connections
      metadata_path: metadata.csv
      prefix: traefik_mesh.
    process_signatures:
    - traefik
    - traefik-mesh
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15633073
    source_type_name: Traefik Mesh
  monitors:
    Traefik Mesh entrypoint request count failures are high.: assets/monitors/high_request_count.json
  saved_views:
    Traefik Mesh Error Logs Overview: assets/saved_views/traefik_mesh_error_overview.json
    Traefik Mesh Logs Overview: assets/saved_views/traefik_mesh_log_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- ネットワーク
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/README.md
display_on_public_website: true
draft: false
git_integration_title: traefik_mesh
integration_id: traefik-mesh
integration_title: Traefik Mesh
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: traefik_mesh
public_title: Traefik Mesh
short_description: Traefik Mesh に関連するメトリクスを追跡します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: Traefik Mesh に関連するメトリクスを追跡します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik Mesh
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Traefik Mesh は、Traefik Proxy の機能を活用して、マイクロサービス アプリケーション向けに高度なトラフィック管理、セキュリティ、可観測性機能を提供する、軽量でデプロイが容易なサービス メッシュです。Datadog の Traefik インテグレーションにより、次のことが可能になります:
- サービス メッシュに入ってくるトラフィックに関するインサイトを得る。
- メッシュ内の各サービスのパフォーマンス、信頼性、セキュリティに関する重要なインサイトを得て、効率的な稼働を確認し、問題の迅速な特定と解決に役立てる。
- サービス メッシュ内部のトラフィック フローに関する詳細なインサイトを得て、パフォーマンスの監視と信頼性の確保に役立てる。

このチェックは、Datadog Agent を通じて [Traefik Mesh][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent リリース v7.55.0 以降、Traefik Mesh チェックは [Datadog Agent][3] パッケージに同梱されています。サーバー側での追加インストールは不要です。

**注**: このチェックを使用するには Agent v7.55.0 以降が必要です。

### 構成

Traefik Mesh は、Prometheus 形式のメトリクスを公開するよう構成できます。Datadog Agent は、以下のインテグレーションを使用してこれらのメトリクスを収集できます。Traefik Mesh インスタンスのデータ収集を構成するには、手順に従ってください。Prometheus メトリクスを公開するために必要な構成については、[公式 Traefik Mesh ドキュメントの Observability ページ][4] を参照してください。

さらに、いくつかの API エンドポイントにアクセスすることで、小規模なサブセットのメトリクスを収集できます。具体的には:
- `/api/version`: Traefik Proxy のバージョン情報。
- `/api/status/nodes`: Traefik [コントローラー][5] から見えるノードの Ready ステータス。
- `/api/status/readiness`: Traefik コントローラーの Ready ステータス。

**注**: このチェックでは、メトリクスの収集に [OpenMetrics][6] を使用しており、Python 3 が必要です。

#### コンテナ化
##### メトリクスの収集

Traefik Mesh クラスターで Prometheus 形式のメトリクスが公開されていることを確認してください。これらの公開の構成とカスタマイズは、[公式 Traefik Mesh ドキュメントの Observability ページ][4] の手順に従って実施できます。Agent がメトリクスの収集を開始するには、Traefik Mesh の Pod にアノテーションを付与する必要があります。アノテーションの詳細については、[Autodiscovery インテグレーション テンプレート][2] を参照してください。追加の構成オプションは、[`traefik_mesh.d/conf.yaml` のサンプル][7] を確認してください。

**注**: 次のメトリクスは、利用可能な場合にのみ収集できます。特定の操作を実行した場合にのみ生成されるメトリクスもあります。

Traefik Mesh チェックを構成する際は、次のパラメーターを使用できます:
- `openmetrics_endpoint`: Prometheus 形式のメトリクスを公開している場所を設定します。デフォルト ポートは `8082` ですが、`--entryPoints.metrics.address` で変更できます。コンテナ化された環境では、[ホストの自動検出][2] のために `%%host%%` を使用できます。
- `traefik_proxy_api_endpooint:` このパラメーターはオプションです。デフォルト ポートは `8080` で、`--entryPoints.traefik.address` で設定できます。コンテナ化された環境では、[ホストの自動検出][2] のために `%%host%%` を使用できます。
- `traefik_controller_api_endpoint`: このパラメーターはオプションです。デフォルト ポートは `9000` です。

#### Traefik Proxy
```yaml
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "traefik_mesh": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8082/metrics",
              "traefik_proxy_api_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME>
# (...)
```

#### Traefik Controller
```yaml
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "traefik_mesh": {
          "init_config": {},
          "instances": [
            {
              "traefik_controller_api_endpoint": "http://%%host%%:9000"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME>
# (...)
```

利用可能な構成オプションの一覧は、[traefik_mesh.d/conf.yaml のサンプル][7] を参照してください。

### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Traefik Mesh のログは、Kubernetes を通じて各種 Traefik Mesh Pod から収集できます。Datadog Agent ではログ収集はデフォルトで無効です。有効にするには、[Kubernetes ログ収集][8] を参照してください。

[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "traefik_mesh", "service": "<SERVICE_NAME>"}` |

### 検証

[Agent の status サブコマンドを実行][9] し、Checks セクションに `traefik_mesh` が表示されていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "traefik_mesh" >}}


### イベント

Traefik Mesh インテグレーションにはイベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "traefik_mesh" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://traefik.io/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik-mesh/api/
[6]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[7]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/datadog_checks/traefik_mesh/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/containers/kubernetes/log/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/