---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-jira
app_uuid: 745eddf9-460c-4189-a7d1-00c297371519
assets:
  dashboards:
    RapDev Jira Overview Dashboard: assets/dashboards/rapdev_jira_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.jira.user.count
      metadata_path: metadata.csv
      prefix: rapdev.jira
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10428
    source_type_name: RapDev Jira
  logs: {}
  monitors:
    Jira Integration Unable to Run: assets/monitors/jira_api.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 開発ツール
- マーケットプレイス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_jira
integration_id: rapdev-jira
integration_title: Jira
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_jira
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: jira
  short_description: このインテグレーションの定額料金
  unit_price: 100
public_title: Jira
short_description: Jira Cloud の課題とユーザーを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Jira Cloud の課題とユーザーを監視します。
  media:
  - caption: 概要ダッシュボード
    image_url: images/overview_sample_tvmode.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Jira
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Jira は、クラウドベースまたはセルフホスト型のサービスで、ソフトウェアプロジェクトの計画、追跡、管理を行うことができます。これは、チームがコラボレーションし、優れた製品を提供するためのツールを提供する Atlassian 社の製品です。Jira Software は、スクラム、カンバン、DevOps を利用するアジャイルチームをサポートします。

Jira インテグレーションにより、サマリーレポート、ワークフロー、課題メトリクスのレポートを通じて、組織はシステム全体の健全性を監視できます。このインテグレーションは、Atlassian がホスティングする Jira Cloud、自己ホスティングの Jira Data Center (9.x.x)、および従来の Jira Server (7.6.1以降、8.x.x、9.x.x) をサポートしています。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][6]
- 営業: [sales@rapdev.io][7]
- チャット: [rapdev.io][5]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][6]から RapDev にメッセージをお送りいただければ、導入をサポートいたします！*

[1]: https://confluence.atlassian.com/adminjiraserver/create-edit-or-remove-a-user-938847025.html
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-jira" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。