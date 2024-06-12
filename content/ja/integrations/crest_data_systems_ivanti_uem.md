---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-ivanti-uem
app_uuid: dcebef22-7079-4ba8-b741-ad90fe0b9138
assets:
  dashboards:
    Ivanti UEM (Cloud) - Device: assets/dashboards/crest_data_systems_ivanti_uem_cloud_device.json
    Ivanti UEM (Cloud) - User: assets/dashboards/crest_data_systems_ivanti_uem_cloud_user.json
    Ivanti UEM (On-Prem) - Device Details: assets/dashboards/crest_data_systems_ivanti_uem_onprem_device_details.json
    Ivanti UEM (On-Prem) - Overview: assets/dashboards/crest_data_systems_ivanti_uem_onprem_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.crest_data_systems.ivanti.uem
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_ivanti_uem
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: datadog-sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- 自動化
- event management
- マーケットプレイス
- モバイル
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_ivanti_uem
integration_id: crest-data-systems-ivanti-uem
integration_title: Ivanti UEM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_ivanti_uem
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.ivanti.uem
  product_id: ivanti-uem
  short_description: Devices(Endpoints) あたり/月。
  tag: デバイス
  unit_label: Ivanti Device
  unit_price: 1.0
public_title: Ivanti UEM
short_description: Ivanti UEM デバイスのパフォーマンスと使用量の監視
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
  - Category::Automation
  - Category::Event Management
  - Category::Marketplace
  - Category::Mobile
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Ivanti UEM デバイスのパフォーマンスと使用量の監視
  media:
  - caption: Ivanti UEM (On-Prem) - 概要
    image_url: images/ivanti-uem-on-prem-overview.png
    media_type: image
  - caption: Ivanti UEM (On-Prem) - デバイス詳細
    image_url: images/ivanti-uem-on-prem-device-details.png
    media_type: image
  - caption: Ivanti UEM (Cloud) - デバイス
    image_url: images/ivanti-uem-cloud-device.png
    media_type: image
  - caption: Ivanti UEM (Device) - ユーザー
    image_url: images/ivanti-uem-cloud-user.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ivanti UEM
  uninstallation: README.md#Uninstallation
---



## 概要

[Ivanti UEM][7] は、Ivanti が開発した包括的な統合エンドポイント管理 (UEM) ソリューションです。UEM とは、デスクトップ、ラップトップ、モバイルデバイス、仮想マシンなど、あらゆる種類のエンドポイントを単一のプラットフォームで管理することを指します。

Ivanti UEM は、組織内のエンドポイント管理を簡素化および合理化するために設計されています。さまざまなデバイスやオペレーティングシステムにわたって、ユーザープロファイル、アプリケーション、データ、セキュリティポリシーを一元管理するためのツールと機能を IT 管理者に提供します。

このインテグレーションは、Ivanti EPM としても知られる Ivanti UEM (On-Prem) の登録 `Devices` と、Ivanti MDM としても知られる Ivanti UEM (Cloud) の `Devices` と `Users` を監視します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

-   サポートメール: [datadog.integrations@crestdatasys.com][5]
-   営業メール: [datadog-sales@crestdatasys.com][6]
-   Web サイト: [crestdatasys.com][3]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdatasys.com/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdatasys.com
[6]: mailto:datadog-sales@crestdatasys.com
[7]: https://www.ivanti.com/solutions/unified-endpoint-management
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-ivanti-uem" target="_blank">こちらをクリック</a>してください。