---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OpenStack Controller Overview: assets/dashboards/openstack-controller.json
    openstack: assets/dashboards/openstack_dashboard.json
  logs:
    source: openstack
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    openstack_processes: assets/saved_views/openstack_processes.json
  service_checks: assets/service_checks.json
categories:
  - cloud
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openstack/README.md'
display_name: OpenStack
draft: false
git_integration_title: openstack
guid: 944452d0-208e-4d1c-8adb-495f517ce2c2
integration_id: openstack
integration_title: OpenStack
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openstack.
metric_to_check: openstack.nova.hypervisor_load.1
name: openstack
process_signatures:
  - stack.sh
public_title: Datadog-OpenStack インテグレーション
short_description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
<div class="alert alert-warning">
<b>重要</b>: このインテグレーションは、OpenStack バージョン 12 以前（非コンテナ化 OpenStack）にのみ適用されます。OpenStack v13 以降（コンテナ化OpenStack）からのメトリクスを収集する場合は、<a href="https://docs.datadoghq.com/integrations/openstack_controller/">OpenStack コントローラーインテグレーション</a>をご利用ください。
</div>

![OpenStack のデフォルトのダッシュボード][1]

## 概要

OpenStack サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- OpenStack の状態を視覚化および監視できます。
- OpenStack のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

OpenStack メトリクスをキャプチャするには、ハイパーバイザーを実行しているホストに [Agent をインストール][2]します。

### コンフィギュレーション

#### OpenStack の準備

ID サーバーで Datadog のロールとユーザーを構成します。

```console
openstack role create datadog_monitoring
openstack user create datadog \
    --password my_password \
    --project my_project_name
openstack role add datadog_monitoring \
    --project my_project_name \
    --user datadog
```

次に、`policy.json` ファイルを更新して、必要なアクセス許可を付与します。`role:datadog_monitoring` には次の操作へのアクセスが必要です。

**Nova**

```json
{
  "compute_extension": "aggregates",
  "compute_extension": "hypervisors",
  "compute_extension": "server_diagnostics",
  "compute_extension": "v3:os-hypervisors",
  "compute_extension": "v3:os-server-diagnostics",
  "compute_extension": "availability_zone:detail",
  "compute_extension": "v3:availability_zone:detail",
  "compute_extension": "used_limits_for_admin",
  "os_compute_api:os-aggregates:index": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-aggregates:show": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-hypervisors": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-server-diagnostics": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-used-limits": "rule:admin_api or role:datadog_monitoring"
}
```

**Neutron**

```json
{
  "get_network": "rule:admin_or_owner or rule:shared or rule:external or rule:context_is_advsvc or role:datadog_monitoring"
}
```

**Keystone**

```json
{
  "identity:get_project": "rule:admin_required or project_id:%(target.project.id)s or role:datadog_monitoring",
  "identity:list_projects": "rule:admin_required or role:datadog_monitoring"
}
```

ポリシーの変更を有効にするには、Keystone、Neutron、および Nova API サービスを再起動する必要があります。

**注**: OpenStack インテグレーションをインストールすると、Datadog が監視する VM 数が増える可能性があります。これが課金にどのように影響するかについては、課金に関する FAQ を参照してください。

#### Agent の構成

1. Datadog Agent が Keystone サーバーに接続するように構成し、監視するプロジェクトを個別に指定します。以下の構成で [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `openstack.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openstack.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:
     ## @param keystone_server_url - string - required
     ## Where your identity server lives.
     ## Note that the server must support Identity API v3
     #
     keystone_server_url: "https://<KEYSTONE_SERVER_ENDPOINT>:<PORT>/"

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## User credentials
       ## Password authentication is the only auth method supported.
       ## `user` object expects the parameter `username`, `password`,
       ## and `user.domain.id`.
       ##
       ## `user` should resolve to a structure like:
       ##
       ##  {'password': '<PASSWORD>', 'name': '<USERNAME>', 'domain': {'id': '<DOMAINE_ID>'}}
       #
       user:
         password: "<PASSWORD>"
         name: datadog
         domain:
           id: "<DOMAINE_ID>"
   ```

2. [Agent を再起動します][5]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にできます。

   ```yaml
   logs_enabled: true
   ```

2. Openstack ログの収集を開始するには、次のコンフィギュレーションブロックを `openstack.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル openstack.d/conf.yaml][4] を参照してください。


### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `openstack` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "openstack" >}}


### イベント

OpenStack チェックには、イベントは含まれません。

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
Agent がネットワークの状態を取得できない場合は `UNKNOWN`、ネットワークがダウンしている場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

Nova OpenStack コンピューティングモジュールを Datadog と統合する方法 (または理由) について理解するには、Datadog の[一連のブログ記事][9]を参照してください。

Datadog の以下のブログ記事も参照してください。

- [開発/テスト用の 2 つのコマンドを使用した OpenStack のインストール][10]
- [OpenStack: ホストアグリゲート、フレーバー、アベイラビリティーゾーン][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/openstack-monitoring-nova
[10]: https://www.datadoghq.com/blog/install-openstack-in-two-commands
[11]: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones