---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md'
display_name: Openstack_controller
draft: false
git_integration_title: openstack_controller
guid: 49979592-9096-460a-b086-f173f26c6626
integration_id: openstack-controller
integration_title: Openstack_controller
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openstack.
metric_to_check: openstack.controller
name: openstack_controller
public_title: Datadog-Openstack_controller インテグレーション
short_description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
<div class="alert alert-warning">
<b>重要</b>: このインテグレーションは、OpenStack バージョン 13 以降 (コンテナ化 OpenStack) にのみ適用されます。OpenStack v12 以前 (非コンテナ化 OpenStack) からメトリクスを収集する場合は、<a href="https://docs.datadoghq.com/integrations/openstack/">OpenStack インテグレーション</a>をご利用ください。
</div>

## 概要

このチェックは、コントローラーノードから [OpenStack][1] を監視します。

## セットアップ

### インストール

OpenStack Controller チェックは [Datadog Agent][2] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

OpenStack Controller インテグレーションは、すべてのコンピュートノードおよびそれを実行しているサーバーから情報を収集するように設計されています。また、単一の Agent から実行して OpenStack 環境を監視します。このインテグレーションは、コントローラーノード、または Keystone および Nova エンドポイントにアクセスできる隣接サーバーでデプロイできます。

#### OpenStack の準備

`openstack_controller.d/conf.yaml` ファイルで使用される `datadog` ユーザーを作成します。このユーザーには、環境全体に対する管理読み取り専用アクセス許可が必要です。これにより、単一のノードから実行して、すべてのノードとサーバーに関する高レベルなシステム情報を読み取ることができます。

#### Agent 構成

1. OpenStack Controller のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `openstack_controller.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openstack_controller.d/conf.yaml][2] を参照してください。

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

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `openstack_controller` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "openstack_controller" >}}


### サービスのチェック

**openstack.neutron.api.up**:<br>
Agent が Neutron API をクエリできない場合は `CRITICAL` を、Keystone API に問題がある場合は `UNKNOWN` を返します。それ以外の場合は、`OK` を返します。

**openstack.nova.api.up**:<br>
Agent が Nova API をクエリできない場合は `CRITICAL` を、Keystone API に問題がある場合は `UNKNOWN` を返します。それ以外の場合は、`OK` を返します。

**openstack.keystone.api.up**:<br>
Agent が Keystone API をクエリできない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**openstack.nova.hypervisor.up**:<br>
Agent がハイパーバイザーの状態を取得できない場合は `UNKNOWN`、ハイパーバイザーがダウンしている場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**openstack.neutron.network.up**:<br>
ネットワークがダウンしている場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

OpenStack Controller には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.openstack.org
[2]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/