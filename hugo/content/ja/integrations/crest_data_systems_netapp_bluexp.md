---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-netapp-bluexp
app_uuid: 3f01fc26-b405-4956-9b64-f7fa2c7ee05c
assets:
  dashboards:
    'NetApp BlueXP: Aggregate': assets/dashboards/crest_data_netapp_bluexp_aggregate.json
    'NetApp BlueXP: Cluster': assets/dashboards/crest_data_netapp_bluexp_cluster.json
    'NetApp BlueXP: Disk': assets/dashboards/crest_data_netapp_bluexp_disk.json
    'NetApp BlueXP: Inventory': assets/dashboards/crest_data_netapp_bluexp_inventory.json
    'NetApp BlueXP: Network': assets/dashboards/crest_data_netapp_bluexp_network.json
    'NetApp BlueXP: Node': assets/dashboards/crest_data_netapp_bluexp_node.json
    'NetApp BlueXP: Volume': assets/dashboards/crest_data_netapp_bluexp_volume.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.bluexp.cluster.dc
      metadata_path: metadata.csv
      prefix: cds.netapp.bluexp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11493382
    source_type_name: crest_data_systems_netapp_bluexp
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- data stores
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netapp_bluexp
integration_id: crest-data-systems-netapp-bluexp
integration_title: NetApp BlueXP
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_bluexp
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_bluexp
  product_id: netapp-bluexp
  short_description: Netapp インスタンスあたり/月
  tag: netapp_bluexp_serial_number
  unit_label: NetApp BlueXP のサーバーシリアル番号
  unit_price: 495.0
public_title: NetApp BlueXP
short_description: NetApp BlueXP のインベントリとデジタルアドバイザーのログやメトリクスを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Data Stores
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: NetApp BlueXP のインベントリとデジタルアドバイザーのログやメトリクスを監視する
  media:
  - caption: 'NetApp BlueXP: 集約'
    image_url: images/crest_data_netapp_bluexp_aggregate.png
    media_type: image
  - caption: 'NetApp BlueXP: クラスター'
    image_url: images/crest_data_netapp_bluexp_cluster.png
    media_type: image
  - caption: 'NetApp BlueXP: インベントリ'
    image_url: images/crest_data_netapp_bluexp_inventory.png
    media_type: image
  - caption: 'NetApp BlueXP: ディスク'
    image_url: images/crest_data_netapp_bluexp_disk.png
    media_type: image
  - caption: 'NetApp BlueXP: ネットワーク'
    image_url: images/crest_data_netapp_bluexp_network.png
    media_type: image
  - caption: 'NetApp BlueXP: ノード'
    image_url: images/crest_data_netapp_bluexp_node.png
    media_type: image
  - caption: 'NetApp BlueXP: ボリューム'
    image_url: images/crest_data_netapp_bluexp_volume.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp BlueXP
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

NetApp BlueXP は、組織に単一のコントロールプレーンを提供し、オンプレミスおよびクラウド環境全体でデータの構築、保護、管理を支援します。BlueXP SaaS プラットフォームには、ストレージ管理、データモビリティ、データ保護、データ分析と制御を提供するサービスが含まれています。

NetApp BlueXP の Datadog インテグレーションは、サーバーおよびコンポーネントの統計情報を取得し、定期的に Datadog に送信します。クラスター、ノード、ネットワーク、集約、ボリューム、ディスク、ファームウェアのバージョンに加えて、Digital Advisor リファレンスもサポートします。また、リソース、ワークスペース、ユーザー、監査などのインベントリデータも含まれており、あらかじめ構成されたダッシュボードとモニターを活用して、迅速な洞察と効率的なデータ管理が可能です。

### データの種類

Netapp BlueXP の Datadog インテグレーションで収集されるデータの種類は次の通りです。

| データの種類                   | 取得される詳細                         |
| -------------------------- | ------------------------------------ |
| インベントリ                  | アカウント、ワークスペース、リソース、監査 | 
| Digital Advisory           | クラスター、ノード、集約、ディスク、ボリューム、ネットワークインターフェイス、ネットワークポート  | 

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: datadog.integrations@crestdata.ai
- 営業メール: datadog-sales@crestdata.ai
- Web サイト: [crestdata.ai][8]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][9]

[1]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[2]: https://docs.netapp.com/us-en/bluexp-setup-admin/task-managing-netapp-accounts.html#manage-a-workspace-admins-workspaces
[3]: https://docs.netapp.com/us-en/active-iq/task_generate_tokens_API_services.html
[4]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[6]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: https://www.crestdata.ai/
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_BlueXP.pdf

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-bluexp" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。