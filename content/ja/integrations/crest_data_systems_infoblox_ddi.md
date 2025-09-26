---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-infoblox-ddi
app_uuid: d497c205-6215-4fcc-87d3-bb17c66fbeb7
assets:
  dashboards:
    CDS Infoblox DDI - DHCP Details: assets/dashboards/cds_infoblox_ddi_dhcp_details.json
    CDS Infoblox DDI - DNS Details: assets/dashboards/cds_infoblox_ddi_dns_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10383
    source_type_name: crest_data_systems_infoblox_ddi
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- セキュリティ
- ネットワーク
- マーケットプレイス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_infoblox_ddi
integration_id: crest-data-systems-infoblox-ddi
integration_title: Infoblox DNS & DHCP
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_infoblox_ddi
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: infoblox-ddi
  short_description: Infoblox-DDI インテグレーションの月額定額料金。
  unit_price: 95.0
public_title: Infoblox DNS & DHCP
short_description: Infoblox DDI Syslog データを視覚化
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
  - Category::Security
  - Category::Network
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Infoblox DDI Syslog データを視覚化
  media:
  - caption: CDS Infoblox DDI - DHCP 詳細
    image_url: images/cds_infoblox_ddi_dhcp_details.png
    media_type: image
  - caption: CDS Infoblox DDI - DNS 詳細
    image_url: images/cds_infoblox_ddi_dns_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Infoblox DNS & DHCP
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

* Infoblox DDI はコアネットワークサービスを自動化および制御するプラットフォームです。
* 同社のソリューションは、企業が DNS、DHCP、IPAM の運用を効率的に管理し、ネットワーク管理タスクを簡素化し、ネットワーク全体の信頼性とセキュリティを強化するのに役立ちます。
* Infoblox DDI はセキュアな DNS および DHCP サービスの提供に重点を置き、脅威から保護し、ネッ トワークインフラストラクチャーの整合性を確保します。

このインテグレーションは、以下のデータソースを監視し、視覚化します。

* DHCP ログ
* DNS ログ

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][2]
- 営業メール: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][1]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][11]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-guide-vnios-deployment-on-vmware-vsphere
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.infoblox.com/space/NAG8/22252249/Using+a+Syslog+Server#Specifying-Syslog-Servers
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Infoblox_DDI.pdf
[10]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-infoblox-ddi" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。