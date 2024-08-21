---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-pfsense
app_uuid: 39d6eaf5-ff21-4fd6-a3c5-cbbad9b8a449
assets:
  dashboards:
    pfSense - DHCP: assets/dashboards/crest_data_systems_pfsense_DHCP_Details.json
    pfSense - Firewall: assets/dashboards/crest_data_systems_pfsense_Firewall_Details.json
    pfSense - NGINX: assets/dashboards/crest_data_systems_pfsense_NGINX_Details.json
    pfSense - OpenVPN: assets/dashboards/crest_data_systems_pfsense_OpenVPN_Details.json
    pfSense - Overview: assets/dashboards/crest_data_systems_pfsense_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.pfsense.packet_length
      metadata_path: metadata.csv
      prefix: cds.pfsense
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10347
    source_type_name: crest_data_systems_pfsense
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- セキュリティ
- ネットワーク
- ログの収集
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_pfsense
integration_id: crest-data-systems-pfsense
integration_title: pfSense
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_pfsense
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.pfsense
  product_id: pfsense
  short_description: pfSense インスタンスあたり/月
  tag: cds_pfsense_host
  unit_label: pfSense インスタンス
  unit_price: 95.0
public_title: pfSense
short_description: pfSense からの転送ログを監視
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
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: pfSense からの転送ログを監視
  media:
  - caption: pfSense - 概要ダッシュボード
    image_url: images/crest_data_systems_pfsense_overview.png
    media_type: image
  - caption: pfSense - ファイアウォールダッシュボード
    image_url: images/crest_data_systems_pfsense_Firewall_Details.png
    media_type: image
  - caption: pfsense - OpenVPN ダッシュボード
    image_url: images/crest_data_systems_pfsense_OpenVPN_Details.png
    media_type: image
  - caption: pfSense - DHCP ダッシュボード
    image_url: images/crest_data_systems_pfsense_DHCP_Details.png
    media_type: image
  - caption: pfSense - NGINX ダッシュボード
    image_url: images/crest_data_systems_pfsense_NGINX_Details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: pfSense
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

pfSense はオープンソースでカスタマイズされた FreeBSD のディストリビューションで、Web インターフェイスで管理できるファイアウォールやルーターとして使用するために特別に調整されています。

このインテグレーションは、pfSense CE からファイアウォール、OpenVPN、NGINX、および DHCP のログを監視します。このインテグレーションはまた、メトリクスをキャプチャし、収集したログからリクエストごとのパケット長や送信バイトに関する洞察を提供します。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: datadog.integrations@crestdata.ai
- Sales Email: datadog-sales@crestdata.ai
- Web サイト: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.netgate.com/pfsense/en/latest/monitoring/logs/settings.html
[6]: https://docs.netgate.com/pfsense/en/latest/config/general.html#localization
[7]: mailto:datadog.integrations@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/pFsense.pdf
[9]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-pfsense" target="_blank">こちらをクリック</a>してください。