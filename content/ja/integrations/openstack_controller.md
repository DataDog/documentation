---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - クラウド
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md'
display_name: Openstack_controller
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
## 概要

このチェックは、コントローラーノードから [Openstack][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]のガイドを参照してこの手順を行ってください。

### インストール

Openstack_controller チェックは [Datadog Agent][2] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

### コンフィグレーション

#### OpenStack の準備

`openstack_controller.d/conf.yaml` ファイルで使用される `datadog` ユーザーを作成します。このユーザーには、環境全体に対する管理読み取り専用アクセス許可が必要です。これにより、単一のノードから実行して、すべてのコンピュートノードとサーバーに関する高レベルなシステム情報を読み取ることができます。

#### デプロイ戦略

openstack_controller インテグレーションは、すべてのコンピュートノードおよびそこで実行されているサーバーから情報を収集するように設計されています。また、単一の Agent から実行して OpenStack 環境を監視するように設計されています。このインテグレーションは、コントローラーノード、または Keystone および Nova エンドポイントにアクセスできる隣接サーバーでデプロイできます。

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `openstack_controller.d/conf.yaml` ファイルを編集して、
   openstack_controller のパフォーマンスデータの収集を開始してください。
   使用可能なすべての構成オプションの詳細については、[サンプル openstack_controller.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `openstack_controller` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "openstack_controller" >}}


### サービスのチェック
**openstack.neutron.api.up**

Agent が Neutron API をクエリできない場合は `CRITICAL` を、Keystone API に問題がある場合は `UNKNOWN` を返します。それ以外の場合は、`OK` を返します。

**openstack.nova.api.up**

Agent が Nova API をクエリできない場合は `CRITICAL` を、Keystone API に問題がある場合は `UNKNOWN` を返します。それ以外の場合は、`OK` を返します。

**openstack.keystone.api.up**

Agent が Keystone API をクエリできない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**openstack.nova.hypervisor.up**

Agent がハイパーバイザーの状態を取得できない場合は `UNKNOWN`、ハイパーバイザーがダウンしている場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**openstack.neutron.network.up**

ネットワークがダウンしている場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。


### イベント

Openstack_controller には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.openstack.org
[2]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help
[6]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[7]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}