---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-spacelift
app_uuid: 6d7f8c87-ddef-4210-ba7c-7509ff92cf50
assets:
  dashboards:
    RapDev Spacelift Dashboard: assets/dashboards/rapdev_spacelift_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.spacelift.usage.used_seats
      metadata_path: metadata.csv
      prefix: rapdev.spacelift.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10382
    source_type_name: RapDev Spacelift
  monitors:
    '[RapDev Spacelift] Spacelift Stack Run Failed': assets/monitors/spacelift_stack_run_failed.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- 開発ツール
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_spacelift
integration_id: rapdev-spacelift
integration_title: Spacelift
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_spacelift
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: spacelift
  short_description: このインテグレーションの定額料金
  unit_price: 100
public_title: Spacelift
short_description: Spacelift のスタック、実行、ワーカープール、および使用状況を監視
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
  description: Spacelift のスタック、実行、ワーカープール、および使用状況を監視
  media:
  - caption: Spacelift ダッシュボード - スタック
    image_url: images/dashboard1.png
    media_type: image
  - caption: Spacelift ダッシュボード - スタック実行
    image_url: images/dashboard2.png
    media_type: image
  - caption: Spacelift ダッシュボード - ワーカプールと使用状況
    image_url: images/dashboard3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Spacelift
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Spacelift は、Infrastructure as Code ワークフローを自動化し、状態管理、プレビュー環境、コンプライアンスチェックを提供する CI/CD プラットフォームです。Spacelift インテグレーションにより、組織は Spacelift アカウントをアクティブに監視して、スタック、実行、ワーカープール、および課金データを追跡することが可能になります。これは、スタックの請求とブロック、スタックの実行ステータス、ワーカープールのステータス、およびライセンス消費に関連するメトリクスを送信することによって実現します。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io][5]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][6]から RapDev にメッセージをお送りいただければ、導入をサポートいたします！*

[1]: https://docs.spacelift.io/integrations/api#spacelift-api-key-token
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-spacelift" target="_blank">こちらをクリック</a>してください。