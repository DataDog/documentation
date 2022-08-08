---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OpenStack Controller Overview: assets/dashboards/openstack-controller.json
  logs:
    source: openstack
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- ログの収集
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md
display_name: Openstack_controller
draft: false
git_integration_title: openstack_controller
guid: 49979592-9096-460a-b086-f173f26c6626
integration_id: openstack-controller
integration_title: OpenStack Controller
integration_version: 2.1.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openstack.
metric_to_check: openstack.controller
name: openstack_controller
public_title: OpenStack Controller
short_description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

**注**: このインテグレーションは、OpenStack v13+ (コンテナ化された OpenStack) にのみ適用されます。OpenStack v12 以下 (コンテナ化されていない OpenStack) からメトリクスを収集する場合は、[OpenStack インテグレーション][1]を使用してください。

このチェックは、コントローラーノードから [OpenStack][2] を監視します。

## セットアップ

### インストール

OpenStack Controller チェックは [Datadog Agent][3] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

OpenStack Controller インテグレーションは、すべてのコンピュートノードおよびそれを実行しているサーバーから情報を収集するように設計されています。また、単一の Agent から実行して OpenStack 環境を監視します。このインテグレーションは、コントローラーノード、または Keystone および Nova エンドポイントにアクセスできる隣接サーバーでデプロイできます。

#### OpenStack の準備

`openstack_controller.d/conf.yaml` ファイルで使用される `datadog` ユーザーを作成します。このユーザーには、環境全体に対する管理読み取り専用アクセス許可が必要です。これにより、単一のノードから実行して、すべてのノードとサーバーに関する高レベルなシステム情報を読み取ることができます。

#### Agent の構成

1. OpenStack Controller のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `openstack_controller.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openstack_controller.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## Password authentication is the only auth method supported
       ## User expects username, password, and user domain id
       ## `user` should resolve to a structure like
       ## {'password': '<PASSWORD>', 'name': '<USER_NAME>', 'domain': {'id': '<DOMAIN_ID>'}}
       ## The check uses the Unscoped token method to collect information about
       ## all available projects to the user.
       #
       user:
         password: "<PASSWORD>"
         name: "<USER_NAME>"
         domain:
           id: "<DOMAIN_ID>"
   ```

2. [Agent を再起動します][5]。

##### ログの収集

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "openstack_controller" >}}


### イベント

OpenStack Controller には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "openstack_controller" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://docs.datadoghq.com/ja/integrations/openstack/
[2]: https://www.openstack.org
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/