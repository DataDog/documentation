---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-veeam
app_uuid: 2d85c606-5d60-11ee-8c99-0242ac120002
assets:
  dashboards:
    RapDev Veeam Overview Dashboard: assets/dashboards/overview_dashboard.json
    RapDev Veeam Session Dashboard: assets/dashboards/session_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.veeam.overview.backup_servers
      metadata_path: metadata.csv
      prefix: rapdev.veeam.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10404
    source_type_name: RapDev Veeam
  monitors:
    Backup Job Session Failed: assets/monitors/veeam_backup_job_failed.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- 開発ツール
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_veeam
integration_id: rapdev-veeam
integration_title: Veeam Backup
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_veeam
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.veeam
  product_id: veeam
  short_description: VM 1 台あたりの単価
  tag: vm
  unit_label: VM
  unit_price: 1
public_title: Veeam Backup
short_description: Veeam Enterprise サマリーレポート、システムおよびバックアップジョブセッションの監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Veeam Enterprise サマリーレポート、システムおよびバックアップジョブセッションの監視
  media:
  - caption: 概要ダッシュボード - 一般および VM
    image_url: images/general_vms_overview.png
    media_type: image
  - caption: 概要ダッシュボード - ジョブおよびリポジトリ
    image_url: images/job_repo_overview.png
    media_type: image
  - caption: セッションダッシュボード - システムセッション
    image_url: images/system_sessions.png
    media_type: image
  - caption: セッションダッシュボード - バックアップジョブセッション
    image_url: images/backup_job_sessions.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Veeam Backup
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Veeam Backup Enterprise Manager は、単一の Web コンソールから複数の Veeam Backup &amp; Replication インストールを管理できる管理およびレポートコンポーネントです。Veeam Backup Enterprise Manager は、リモートオフィス/支店オフィス (ROBO) や大規模展開におけるパフォーマンスの最適化と、仮想環境全体の監視を支援します。

Veeam インテグレーションにより、Veeam 内で生成されたサマリーレポートのメトリクス、システムバックアップジョブセッションのステータスと期間、バックアップファイルに関するレポートを通じて、組織は Veeam Backup の全体的な健全性を監視できます。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][6]
- 営業: [sales@rapdev.io][7]
- チャット: [rapdev.io][5]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][6]から RapDev にメッセージをお送りいただければ、導入をサポートいたします！*

[1]: https://helpcenter.veeam.com/docs/backup/em/em_managing_accounts.html?ver=120#add
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-veeam" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。