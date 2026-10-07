---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-cyberark-identity
app_uuid: 20b047e7-182f-4a90-b250-ba4405d3bc15
assets:
  dashboards:
    CyberArk Identity Application Dashboard: assets/dashboards/cds_cyberark_identity_application_overview.json
    CyberArk Identity MFA Dashboard: assets/dashboards/cds_cyberark_identity_mfa_details_security_overview.json
    CyberArk Identity User and Endpoint Dashboard: assets/dashboards/cds_cyberark_identity_user_and_endpoint_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.cyberark.identity.device.available_device_capacity
      metadata_path: metadata.csv
      prefix: cds.cyberark.identity
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10377
    source_type_name: crest_data_systems_cyberark_identity
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- セキュリティ
- イベント管理
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cyberark_identity
integration_id: crest-data-systems-cyberark-identity
integration_title: CyberArk Identity
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cyberark_identity
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cyberark_identity
  product_id: cyberark-identity
  short_description: CyberArk Identity 1 ユーザーあたり/月
  tag: user_id
  unit_label: CyberArk Identity ユーザー
  unit_price: 1.0
public_title: CyberArk Identity
short_description: CyberArk Identity の MFA、デバイス、ユーザー、アプリケーション情報を監視します。
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
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: CyberArk Identity の MFA、デバイス、ユーザー、アプリケーション情報を監視します。
  media:
  - caption: CyberArk Identity MFA ダッシュボード
    image_url: images/crest_data_systems_cyberark_identity_mfa_details.png
    media_type: image
  - caption: CyberArk Identity ユーザーおよびエンドポイントダッシュボード
    image_url: images/crest_data_systems_cyberark_identity_user_and_endpoint_details.png
    media_type: image
  - caption: CyberArk Identity アプリケーションダッシュボード
    image_url: images/crest_data_systems_cyberark_identity_application_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CyberArk Identity
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

CyberArk Identity は、アプリケーションへのアクセス、エンドポイント、ネットワークインフラを管理するためのセキュアなプラットフォームを提供します。また、適応型分析、ユーザーアクティビティの監査、ビルトインおよびカスタムのレポート機能も提供しており、これらの機能は Identity Administration ポータルを通じて利用可能です。

**CyberArk Identity の機能には、以下のようなものが含まれます:**

* **自動アクセスプロビジョニング:** 企業リソースへのアクセス権の付与・取り消しを動的に行います。
* **アイデンティティオーケストレーション:** アイデンティティ関連の複雑なプロセスを簡素化し、自動化します。
* **コンプライアンス管理:** 組織全体のコンプライアンスとアクセス認証管理を確立します。
* **包括的なレポート:** 監査レポートと詳細なダッシュボードを使用して、アクセス許可と権限を可視化します。

* このインテグレーションでは、CyberArk Identity をソースとして使用し、CyberArk Identity の redrock クエリエンドポイントを利用して、ポータルからユーザー、デバイス、アプリケーション、MFA 情報に関連するデータを収集します。


## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][5]
- 営業メール: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][12]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.cyberark.com/Product-Doc/OnlineHelp/Idaptive/Latest/en/Content/Integrations/SIEM/SIEM.htm?TocPath=Administrator%7CIntegrations%7C_____4#Step1AddandconfiguretheOAuth2ClientAppintheIdentityAdministrationportal
[8]: https://docs.cyberark.com/Product-Doc/OnlineHelp/Idaptive/Latest/en/Content/Integrations/SIEM/SIEM.htm?TocPath=Administrator%7CIntegrations%7C_____4#Step2CreateaSIEMuserandaserviceaccountrole
[9]: https://docs.crestdata.ai/datadog-integrations-readme/CyberArk_Identity.pdf
[10]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-identity" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。