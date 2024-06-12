---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-infoblox
app_uuid: 7712bdf0-a2eb-487c-8d1e-595c74b99e47
assets:
  dashboards:
    Infoblox Overview Dashboard: assets/dashboards/infoblox_overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.infoblox.utilization
      metadata_path: metadata.csv
      prefix: rapdev.infoblox.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10432
    source_type_name: RapDev Infoblox
  monitors:
    Infoblox DHCP Monitor: assets/monitors/infoblox_dhcp_monitor.json
    Infoblox DNS Monitor: assets/monitors/infoblox_dns_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- セキュリティ
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_infoblox
integration_id: rapdev-infoblox
integration_title: Infoblox
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_infoblox
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: infoblox
  short_description: このインテグレーションの定額料金
  unit_price: 100
public_title: Infoblox
short_description: Infoblox ノードと IPAM システムの健全性をメトリクスとして監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Infoblox ノードと IPAM システムの健全性をメトリクスとして監視する
  media:
  - caption: RapDev Infoblox 概要ダッシュボード
    image_url: images/infoblox_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Infoblox
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Infoblox はクラウドファーストのネットワーキングおよびセキュリティソリューションを提供しています。DNS、DHCP、およびIPアドレス管理 (IPAM) などのコアネットワークサービスに重点を置いています。Infoblox のソリューションは、これらの重要なネットワーキング機能の自動化とセキュリティの確保を支援します。

Network Identity Operating System (NIOS) は Infoblox のコアネットワークサービスを強化するオペレーティングシステムです。NIOS は Next Level Networking の基盤であり、ネットワークインフラストラクチャーのノンストップオペレーションを保証します。NIOS は、継続的なネットワークの可用性とビジネスのアップタイムに必要な DNS、 DHCP、IP アドレス管理 (IPAM) のデプロイと管理に関連する、エラーが発生しやすく時間のかかる手 動タスクを自動化します。

このインテグレーションでは、Infoblox が作成するサマリーレポートでメトリクスとサービスチェックを報告することで、Infoblox ノードの健全性と IPAM パフォーマンスを監視します。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][6]
- 営業: [sales@rapdev.io][7]
- チャット: [rapdev.io][5]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織にとって重要な機能が欠けていますか？[こちら][6]から RapDev にメッセージをお送りいただければ、我々が作成いたします！*

[1]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-infoblox-rest-api
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-infoblox" target="_blank">こちらをクリック</a>してください。