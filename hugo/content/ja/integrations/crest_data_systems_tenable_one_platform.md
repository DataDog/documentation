---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-tenable-one-platform
app_uuid: c6836683-9283-4e9e-ab31-c74998a0667b
assets:
  dashboards:
    CDS Tenable One Platform - IO - Asset Overview: assets/dashboards/cds_tenable_one_platform_io_asset_overview.json
    CDS Tenable One Platform - IO - Plugins Overview: assets/dashboards/cds_tenable_one_platform_io_plugin_overview.json
    CDS Tenable One Platform - IO - Vulnerability Overview: assets/dashboards/cds_tenable_one_platform_io_vulnerability_overview.json
    CDS Tenable One Platform - SC - Asset Overview: assets/dashboards/cds_tenable_one_platform_sc_asset_overview.json
    CDS Tenable One Platform - SC - Vulnerability Overview: assets/dashboards/cds_tenable_one_platform_sc_vulnerability_overview.json
    CDS Tenable One Platform - Sc - Plugins Overview: assets/dashboards/cds_tenable_one_platform_sc_plugin_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10358
    source_type_name: crest_data_systems_tenable_one_platform
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- ネットワーク
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_tenable_one_platform
integration_id: crest-data-systems-tenable-one-platform
integration_title: Tenable One プラットフォーム
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_tenable_one_platform
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.tenable_one_platform
  product_id: tenable-one-platform
  short_description: Tenable One プラットフォームのアセット 1 件あたり/月
  tag: asset_id
  unit_label: アクティブ アセット
  unit_price: 1.0
public_title: Tenable One プラットフォーム
short_description: Tenable (io および sc) の脆弱性、プラグイン、アセットを監視します
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
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Tenable (io および sc) の脆弱性、プラグイン、アセットを監視します
  media:
  - caption: CDS Tenable One プラットフォーム - IO - 脆弱性の概要
    image_url: images/cds_tenable_one_platform_io_vulnerability_overview.png
    media_type: image
  - caption: CDS Tenable One プラットフォーム - IO - アセットの概要
    image_url: images/cds_tenable_one_platform_io_asset_overview.png
    media_type: image
  - caption: CDS Tenable One プラットフォーム - IO - プラグインの概要
    image_url: images/cds_tenable_one_platform_io_plugin_overview.png
    media_type: image
  - caption: CDS Tenable One プラットフォーム - SC - 脆弱性の概要
    image_url: images/cds_tenable_one_platform_sc_vulnerability_overview.png
    media_type: image
  - caption: CDS Tenable One プラットフォーム - SC - アセットの概要
    image_url: images/cds_tenable_one_platform_sc_asset_overview.png
    media_type: image
  - caption: CDS Tenable One プラットフォーム - SC - プラグインの概要
    image_url: images/cds_tenable_one_platform_sc_plugin_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Tenable One プラットフォーム
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Tenable は、組織によるサイバーリスクの管理と低減を支援するさまざまな製品およびサービスを提供するサイバーセキュリティ企業です。

このインテグレーションは、Tenable.io と Tenable.sc をサポートしています。

**Tenable.io** は、オンプレミスおよびクラウドの両方で、組織のアセットの継続的な可視化と監視を可能にするクラウドベースのプラットフォームです。脆弱性の管理、Web アプリケーションのスキャン、コンテナのセキュリティ、その他の機能を組み合わせ、包括的なセキュリティ監視とリスク評価を可能にします。

**Tenable.sc** は、継続的なネットワーク監視、脆弱性評価、レポート機能を提供する包括的な脆弱性管理プラットフォームです。組織が IT インフラ全体で脆弱性を特定、評価し、優先順位付けを行うのに役立ち、効果的に修正に取り組むことを可能にします。

このインテグレーションは、以下のデータを収集します。
* 脆弱性
* アセット
* プラグイン

## サポート

サポートまたは機能リクエストについては、以下の方法で Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][5]
- 営業メール: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][12]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.tenable.com/vulnerability-management/Content/Settings/my-account/GenerateAPIKey.htm
[8]: https://docs.tenable.com/security-center/6_1/Content/GenerateAPIKey.htm
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Tenable_One_Platform.pdf
[10]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-tenable-one-platform" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。