---
app_id: openstack-controller
app_uuid: f5c2cc69-1efc-40b2-8dcd-61e1215b237d
assets:
  dashboards:
    OpenStack Controller Overview: assets/dashboards/openstack-controller.json
    OpenStack Controller Overview [Default Microversion]: assets/dashboards/openstack_controller_overview_[default_microversion].json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openstack.controller
      metadata_path: metadata.csv
      prefix: openstack.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10226
    source_type_name: Openstack_controller
  logs:
    source: openstack
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- ログの収集
- プロビジョニング
- オーケストレーション
- 構成とデプロイ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: openstack_controller
integration_id: openstack-controller
integration_title: OpenStack Controller
integration_version: 6.5.0
is_public: true
manifest_version: 2.0.0
name: openstack_controller
public_title: OpenStack Controller
short_description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::Log Collection
  - Category::Provisioning
  - Category::Orchestration
  - Category::Configuration & Deployment
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenStack Controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

**注**: このインテグレーションは OpenStack v13 以上に限定されます。OpenStack v12 以下からメトリクスを収集する場合は、[OpenStack インテグレーション][1]を使用してください。

このチェックは、コントローラーノードから [OpenStack][2] を監視します。

## セットアップ

### インストール

OpenStack Controller チェックは [Datadog Agent][3] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### 構成

OpenStack Controller インテグレーションは、すべてのコンピュートノードおよびそれを実行しているサーバーから情報を収集するように設計されています。また、単一の Agent から実行して OpenStack 環境を監視します。このインテグレーションは、コントローラーノード、または Keystone、Nova、Neutron、Cinder、Ironic、Octavia エンドポイントにアクセスできる隣接サーバーでデプロイできます。

#### OpenStack の準備

`openstack_controller.d/conf.yaml` ファイルで使用される `datadog` ユーザーを作成します。このユーザーには、環境全体に対する管理読み取り専用アクセス許可が必要です。これにより、単一のノードから実行して、すべてのノードとサーバーに関する高レベルなシステム情報を読み取ることができます。

#### Agent の構成

1. OpenStack Controller のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `openstack_controller.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openstack_controller.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:

   instances:
     - keystone_server_url: "<AUTH_URL>"
       password: "<PASSWORD>"
       username: "<USER_NAME>"
       domain_id: "<DOMAIN_ID>"
   ```

2. [Agent を再起動します][5]。

**注**: インテグレーションを v5.0.0 以前から v6.0.0 以降にアップグレードする場合、新しい機能を使用するために `use_legacy_check_version` フラグを有効にする必要があります。また、互換性を維持するためには、構成を変更する必要が生じる場合もあります。詳しくは [openstack controller.d/conf.yaml のサンプル][4]を参照してください。 

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にできます。

   ```yaml
   logs_enabled: true
   ```

2. Openstack ログの収集を開始するには、次のコンフィギュレーションブロックを `openstack_controller.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル openstack_controller.d/conf.yaml][4] を参照してください。


### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `openstack_controller` を探します。

## データ収集

### メトリクス
{{< get-metrics-from-git "openstack_controller" >}}


### イベント

OpenStack Controller には、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "openstack_controller" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した OpenStack コンポーネントの監視][10]


[1]: https://docs.datadoghq.com/ja/integrations/openstack/
[2]: https://www.openstack.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/openstack-controller-integration/