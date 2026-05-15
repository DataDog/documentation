---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-lansweeper
app_uuid: bdf1e9ea-650d-45d9-875b-cc2dc0609d16
assets:
  dashboards:
    Lansweeper - Inventory: assets/dashboards/cds_lansweeper_inventory.json
    Lansweeper - Vulnerabilities: assets/dashboards/cds_lansweeper_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.crest_data_systems.lansweeper
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32856075
    source_type_name: crest_data_systems_lansweeper
  logs:
    source: crest_data_systems_lansweeper
author:
  homepage: https://www.crestdata.ai/
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- ネットワーク
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_lansweeper
integration_id: crest-data-systems-lansweeper
integration_title: Lansweeper
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_lansweeper
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.lansweeper
  product_id: lansweeper
  short_description: Lansweeper アセット 1 件あたり (月額)
  tag: asset_key
  unit_label: Lansweeper アセット
  unit_price: 0.03
public_title: Lansweeper
short_description: Lansweeper のインベントリ データと脆弱性データを監視します。
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
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Lansweeper のインベントリ データと脆弱性データを監視します。
  media:
  - caption: Lansweeper - Inventory
    image_url: images/cds_lansweeper_inventory.png
    media_type: image
  - caption: Lansweeper - Vulnerabilities
    image_url: images/cds_lansweeper_vulnerabilities.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Lansweeper
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[**Lansweeper**][1] は IT アセット管理とネットワーク スキャンのソリューションで、環境全体にわたってハードウェア、ソフトウェア、脆弱性に関する深い洞察を提供します。

このインテグレーションでは、Lansweeper のインベントリ データと脆弱性情報を収集し、可視化できます。Lansweeper の強力なスキャン機能を活用することで、次の内容を確認できます:

- **インベントリ データ**: サイト、アセット、ソフトウェア、承認済みアカウントのデータ
- **脆弱性**

このインテグレーションには、すぐに使える 2 つのダッシュボードが含まれます:

1. **Lansweeper Inventory**: ユーザーが定義した `interval_for_inventory` に基づいて収集されるサイト、アセット、ソフトウェア、承認済みアカウントのデータを監視し、可視化します。
2. **Lansweeper Vulnerabilities**: `min_collection_interval` で収集される脆弱性データを表示します。

> **注**: Lansweeper **Pro** のサブスクリプション プラン以上のサイトのみが脆弱性データにアクセスできます。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support email: [datadog.integrations@crestdata.ai][11]
- Sales email: [datadog-sales@crestdata.ai][12]
- Website: [crestdata.ai][13]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://www.lansweeper.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Lansweeper.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://app.lansweeper.com/my-profile/dev-tools/applications/all
[6]: https://developer.lansweeper.com/docs/data-api/reference/types/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: mailto:datadog.integrations@crestdata.ai
[12]: mailto:datadog-sales@crestdata.ai
[13]: https://www.crestdata.ai/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-lansweeper" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。