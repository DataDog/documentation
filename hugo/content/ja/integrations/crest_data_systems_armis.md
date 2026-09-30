---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-armis
app_uuid: a9673290-7000-49d9-9f19-bbf049e6b746
assets:
  dashboards:
    Armis - Alerts: assets/dashboards/crest_data_systems_armis_alerts.json
    Armis - Device Application: assets/dashboards/crest_data_systems_armis_device_applications.json
    Armis - Devices: assets/dashboards/crest_data_systems_armis_devices.json
    Armis - Overview: assets/dashboards/crest_data_systems_armis_overview.json
    Armis - Policies: assets/dashboards/crest_data_systems_armis_policies.json
    Armis - Users: assets/dashboards/crest_data_systems_armis_users.json
    Armis - Vulnerabilities: assets/dashboards/crest_data_systems_armis_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20667054
    source_type_name: crest_data_systems_armis
  logs:
    source: crest-data-systems-armis
  monitors:
    Total Critical Alerts Exceeds Limit: assets/monitors/crest_data_systems_total_critical_alerts_exceeds_limit.json
    Total Open Critical Vulnerabilities Exceeds Limit: assets/monitors/crest_data_systems_total_open_critical_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- cloud
- marketplace
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_armis
integration_id: crest-data-systems-armis
integration_title: Armis Centrix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_armis
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.armis
  product_id: armis
  short_description: テナントあたり (月額)
  tag: cds_armis_tenant
  unit_label: Armis tenant
  unit_price: 195.0
public_title: Armis Centrix
short_description: Armis から Alerts、Vulnerabilities、Devices、Device Applications、Policies、Users
  のログを収集します。
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
  - Category::Cloud
  - Category::Marketplace
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Armis から Alerts、Vulnerabilities、Devices、Device Applications、Policies、Users
    のログを収集します。
  media:
  - caption: Armis - Alerts
    image_url: images/crest-data-systems-armis-alerts.png
    media_type: image
  - caption: Armis - Devices
    image_url: images/crest-data-systems-armis-devices.png
    media_type: image
  - caption: Armis - Device Applications
    image_url: images/crest-data-systems-armis-device-applications.png
    media_type: image
  - caption: Armis - Policies
    image_url: images/crest-data-systems-armis-policies.png
    media_type: image
  - caption: Armis - Users
    image_url: images/crest-data-systems-armis-users.png
    media_type: image
  - caption: Armis - Vulnerabilities
    image_url: images/crest-data-systems-armis-vulnerabilities.png
    media_type: image
  - caption: Armis - Overview
    image_url: images/crest-data-systems-armis-overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Armis Centrix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

サイバー エクスポージャー管理プラットフォームである Armis CentrixTM は、Armis の AI 駆動型 Asset Intelligence Engine を基盤に、世界中の何十億もの資産をリアル タイムで可視化し、セキュアに保護し、管理します。クラウド ベースの同プラットフォームは、サイバー資産リスクを先回りして低減し、脆弱性の是正を支援し、脅威を遮断して、攻撃対象領域全体の保護につなげます。

このインテグレーションにより、サイバー リスクをリアル タイムで俯瞰し、先回りして運用できるようになります。その結果、デジタル資産を継続的に保護し、潜在的な脅威に対する防御を強化できます。Armis の Alerts、Activities、Vulnerabilities、Devices、Device Applications、Policies、Users を監視してください。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][2]
- 営業メール: [datadog-sales@crestdata.ai][3]
- Web サイト: [crestdata.ai][4]
- FAQ: [Crest Data Datadog Marketplace インテグレーション FAQ][12]


[1]: https://integration-crestdata.armis.com/settings/api-management
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Armis.pdf
[12]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-armis" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。