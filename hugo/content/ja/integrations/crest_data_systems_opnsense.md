---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-opnsense
app_uuid: 0adf83e0-cc01-4d1e-aa88-1a48d6eac7a3
assets:
  dashboards:
    OPNsense - DHCP: assets/dashboards/crest_data_systems_opnsense_dhcp.json
    OPNsense - Firewall Details: assets/dashboards/crest_data_systems_opnsense_firewall_details.json
    OPNsense - Intrusion Detection: assets/dashboards/crest_data_systems_opnsense_intrusion_detection.json
    OPNsense - Overview: assets/dashboards/crest_data_systems_opnsense_overview.json
    OPNsense - Unbound DNS: assets/dashboards/crest_data_systems_opnsense_unbound_dns.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31831185
    source_type_name: crest_data_systems_opnsense
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- ネットワーク
- ログの収集
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_opnsense
integration_id: crest-data-systems-opnsense
integration_title: OPNsense
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_opnsense
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: opnsense
  short_description: OPNsense インテグレーションの月額定額料金。
  unit_price: 95.0
public_title: OPNsense
short_description: OPNsense から転送されたログを監視します
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
  - Category::Security
  - Category::Network
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: OPNsense から転送されたログを監視します
  media:
  - caption: OPNsense Overview
    image_url: images/crest_data_systems_opnsense_overview.png
    media_type: image
  - caption: OPNsense Firewall Details
    image_url: images/crest_data_systems_opnsense_firewall_details.png
    media_type: image
  - caption: OPNsense DHCP
    image_url: images/crest_data_systems_opnsense_dhcp.png
    media_type: image
  - caption: OPNsense Unbound DNS
    image_url: images/crest_data_systems_opnsense_unbound_dns.png
    media_type: image
  - caption: OPNsense IDS
    image_url: images/crest_data_systems_opnsense_ids.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: OPNsense
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

OPNsense は FreeBSD ベースのオープン ソース ファイアウォールおよびルーティング プラットフォームで、高度なネットワーク セキュリティとトラフィック管理を目的に設計されています。

この統合は、UDP を介してネットワーク経由で OPNsense から受信した Firewalls, DHCP, Unbound DNS, Intrusion Detection のログを解析し、Datadog で監視・可視化します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: datadog.integrations@crestdata.ai
- 営業メール: datadog-sales@crestdata.ai
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][10]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.opnsense.org/manual/settingsmenu.html#logging
[6]: mailto:datadog.integrations@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/OPNsense.pdf
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-opnsense" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。