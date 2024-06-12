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
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ''
      metadata_path: metadata.csv
      prefix: datadog.marketplace.crest_data_systems_tenable_one_platform
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_tenable_one_platform
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: datadog-sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- ネットワーク
- セキュリティ
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
  unit_label: アセット
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

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: [datadog.integrations@crestdatasys.com][5]
- 営業メール: [datadog-sales@crestdatasys.com][6]
- Web サイト: [crestdatasys.com][3]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdatasys.com/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdatasys.com
[6]: mailto:datadog-sales@crestdatasys.com
[7]: https://docs.tenable.com/vulnerability-management/Content/Settings/my-account/GenerateAPIKey.htm
[8]: https://docs.tenable.com/security-center/6_1/Content/GenerateAPIKey.htm
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-tenable-one-platform" target="_blank">こちらをクリック</a>してください。