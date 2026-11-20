---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-cisco-asa
app_uuid: 384341e7-e5b4-42a0-917d-a52db20ce507
assets:
  dashboards:
    CDS Cisco ASA - Application Firewall Details: assets/dashboards/cds_cisco_asa_application_firewall_details.json
    CDS Cisco ASA - Identity-Based Firewall Details: assets/dashboards/cds_cisco_asa_identity_based_firewall_details.json
    CDS Cisco ASA - Overview: assets/dashboards/cds_cisco_asa_overview.json
    CDS Cisco ASA - Transparent Firewall Details: assets/dashboards/cds_cisco_asa_transparent_firewall_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10384
    source_type_name: crest_data_systems_cisco_asa
author:
  homepage: https://crestdata.ai
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
git_integration_title: crest_data_systems_cisco_asa
integration_id: crest-data-systems-cisco-asa
integration_title: Cisco ASA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_asa
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-asa
  short_description: Cisco-ASA インテグレーションの月額定額料金。
  unit_price: 1995.0
public_title: Cisco ASA
short_description: Cisco ASA Syslog データを視覚化
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
  description: Cisco ASA Syslog データを視覚化
  media:
  - caption: CDS Cisco ASA - 概要
    image_url: images/cds_cisco_asa_overview.png
    media_type: image
  - caption: CDS Cisco ASA - アイデンティティベースファイアウォールの詳細
    image_url: images/cds_cisco_asa_identity_based_firewall_details.png
    media_type: image
  - caption: CDS Cisco ASA - 透過型ファイアウォールの詳細
    image_url: images/cds_cisco_asa_transparent_firewall_details.png
    media_type: image
  - caption: CDS Cisco ASA - アプリケーションファイアウォールの詳細
    image_url: images/cds_cisco_asa_application_firewall_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ASA
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

* Cisco ASA (Adaptive Security Appliance) は、Cisco Systems が製造する多機能ネットワークセキュリティデバイスです。ファイアウォール、VPN (仮想プライベートネットワーク) 機能、侵入防御、コンテンツセキュリティなど、さまざまなセキュリティ機能を兼ね備えています。
* Cisco ASA は、不正アクセス、悪意のある脅威、データ侵害からネットワークを保護することで、ネットワークの主要な防御ラインとして機能します。
* Cisco ASA は、中小企業から大企業まで、さまざまな規模のネットワークに堅牢な保護を提供する汎用的なセキュリティ アプライアンスです。複数のセキュリティ機能を 1 台のデバイスに統合することで、ネットワーク セキュリティ管理を簡素化し、安全で信頼性の高いネットワークインフラストラクチャーを実現します。

このインテグレーションは、以下のデータソースを監視し、視覚化します。
* アプリケーションファイアウォール
* 透過型ファイアウォール
* アイデンティティベースファイアウォール
* ユーザー認証
* ユーザーセッション
* 侵入検出システム
* System
* コマンドインターフェイス

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][2]
- 営業メール: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][1]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][10]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://www.cisco.com/c/en/us/td/docs/security/asa/asa916/configuration/firewall/asa-916-firewall-config/access-sfr.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ASA.pdf
[9]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-asa" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。