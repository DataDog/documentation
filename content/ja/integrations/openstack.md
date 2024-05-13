---
app_id: openstack
app_uuid: 38f1f51e-9f6a-49fc-84d5-358bde9e3782
assets:
  dashboards:
    openstack: assets/dashboards/openstack_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openstack.nova.hypervisor_load.1
      metadata_path: metadata.csv
      prefix: openstack.
    process_signatures:
    - stack.sh
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 125
    source_type_name: OpenStack
  logs:
    source: openstack
  saved_views:
    openstack_processes: assets/saved_views/openstack_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- log collection
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openstack/README.md
display_on_public_website: true
draft: false
git_integration_title: openstack
integration_id: openstack
integration_title: OpenStack (レガシー)
integration_version: 2.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: openstack
public_title: OpenStack (レガシー)
short_description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::ログの収集
  - Category::ネットワーク
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: ハイパーバイザーおよび VM レベルのリソース使用状況と Neutron メトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenStack (レガシー)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![OpenStack のデフォルトのダッシュボード][1]

## 概要

**注**: このインテグレーションは OpenStack v12 以下に限定されます。OpenStack v13 以上からメトリクスを収集する場合は、[OpenStack Controller インテグレーション][2]を使用してください。

OpenStack サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- OpenStack の状態を視覚化および監視できます。
- OpenStack のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

OpenStack メトリクスをキャプチャするには、ハイパーバイザーを実行しているホストに [Agent をインストール][3]します。

### ブラウザトラブルシューティング

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

1. Datadog Agent が Keystone サーバーに接続するように構成し、監視するプロジェクトを個別に指定します。以下の構成で [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `openstack.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openstack.d/conf.yaml][5] を参照してください。

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

2. [Agent を再起動します][6]。

##### 収集データ

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

    `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル openstack.d/conf.yaml][5] を参照してください。


### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `openstack` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "openstack" >}}


### ヘルプ

OpenStack チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "openstack" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [OpenStack Nova の監視][11]
- [開発/テスト用の 2 つのコマンドを使用した OpenStack のインストール][12]
- [OpenStack: ホストアグリゲート、フレーバー、アベイラビリティーゾーン][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png
[2]: https://docs.datadoghq.com/ja/integrations/openstack_controller
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/openstack/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/openstack-monitoring-nova
[12]: https://www.datadoghq.com/blog/install-openstack-in-two-commands
[13]: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones