---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-cisco-ise
app_uuid: 68dcc9fc-a128-42be-b122-28e68e04c4ed
assets:
  dashboards:
    CDS Cisco ISE - Authentication Details: assets/dashboards/cds_cisco_ise_authentication_details.json
    CDS Cisco ISE - Client Provisioning Details: assets/dashboards/cds_cisco_ise_client_provisioning_details.json
    CDS Cisco ISE - Compliance Details: assets/dashboards/cds_cisco_ise_compliance_details.json
    CDS Cisco ISE - Device Details: assets/dashboards/cds_cisco_ise_device_details.json
    CDS Cisco ISE - Overview: assets/dashboards/cds_cisco_ise_overview.json
    CDS Cisco ISE - Posture Details: assets/dashboards/cds_cisco_ise_posture_details.json
    CDS Cisco ISE - Profiler Details: assets/dashboards/cds_cisco_ise_profiler_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10364
    source_type_name: crest_data_systems_cisco_ise
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: datadog-sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- セキュリティ
- ログの収集
- プロビジョニング
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_ise
integration_id: crest-data-systems-cisco-ise
integration_title: Cisco ISE
integration_version: ''
is_public: true
kind: インテグレーション
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_ise
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-ise
  short_description: Cisco ISE インテグレーションの月額定額料金。
  unit_price: 1995.0
public_title: Cisco ISE
short_description: Cisco ISE Syslog データを視覚化
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
  - Category::Log Collection
  - Category::Provisioning
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Cisco ISE Syslog データを視覚化
  media:
  - caption: CDS Cisco ISE - 概要
    image_url: images/cds_cisco_ise_overview.png
    media_type: image
  - caption: CDS Cisco ISE - 認証情報
    image_url: images/cds_cisco_ise_authentication_details.png
    media_type: image
  - caption: CDS Cisco ISE - プロファイラー情報
    image_url: images/cds_cisco_ise_profiler_details.png
    media_type: image
  - caption: CDS Cisco ISE - デバイス情報
    image_url: images/cds_cisco_ise_device_details.png
    media_type: image
  - caption: CDS Cisco ISE - ポスチャ情報
    image_url: images/cds_cisco_ise_posture_details.png
    media_type: image
  - caption: CDS Cisco ISE - コンプライアンス情報
    image_url: images/cds_cisco_ise_compliance_details.png
    media_type: image
  - caption: CDS Cisco ISE - クライアントプロビジョニング情報
    image_url: images/cds_cisco_ise_client_provisioning_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ISE
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Cisco Identity Services Engine (ISE) は、企業がコンプライアンスを実行し、インフラストラクチャーのセキュリティを高め、サービスのオペレーションを効率化することを可能にする、次世代型のアイデンティティおよびアクセス管理ポリシープラットフォームです。Cisco ISE の独自のアーキテクチャにより、企業はネットワーク、ユーザー、およびデバイスからリアルタイムのコンテキスト情報を収集することができます。

管理者は、アクセススイッチ、無線 LAN コントローラー (WLC)、仮想プライベートネットワーク (VPN) ゲートウェイ、データセンタースイッチなど、さまざまなネットワーク要素にアイデンティティを紐づけることで、その情報を使ってプロアクティブなガバナンスの決定を下すことができます。

このインテグレーションは、以下のタイプのログを視覚化できます。
   * PHP
   * ポスチャ
   * タグ
   * クライアントプロビジョニング

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: [datadog.integrations@crestdatasys.com][2]
- 営業メール: [datadog-sales@crestdatasys.com][3]
- Web サイト: [crestdatasys.com][1]


[1]: https://www.crestdatasys.com/
[2]: mailto:datadog.integrations@crestdatasys.com
[3]: mailto:datadog-sales@crestdatasys.com
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://www.crestdatasys.com/datadog-integrations-readme/Cisco_ISE.pdf

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-ise" target="_blank">こちらをクリック</a>してください。