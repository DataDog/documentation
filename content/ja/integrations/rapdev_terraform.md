---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-terraform
app_uuid: d7240832-9c24-4fc0-9a02-916bc57882c1
assets:
  dashboards:
    RapDev Terraform Dashboard: assets/dashboards/rapdev_terraform_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.terraform.org.count
      metadata_path: metadata.csv
      prefix: rapdev.terraform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10193
    source_type_name: RapDev Terraform
  logs: {}
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 構成 & デプロイ
- developer tools
- マーケットプレイス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_terraform
integration_id: rapdev-terraform
integration_title: Terraform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_terraform
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: terraform
  short_description: このインテグレーションの定額料金
  unit_price: 100
public_title: Terraform
short_description: terraform アカウントと失敗した実行を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: terraform アカウントと失敗した実行を監視する
  media:
  - caption: Terraform の組織とワークスペースの実行
    image_url: images/1.jpg
    media_type: image
  - caption: Terraform の組織トークンと権限
    image_url: images/2.jpg
    media_type: image
  - caption: Terraform の権限監査と Agent
    image_url: images/3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Terraform
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Terraform とのインテグレーションにより、組織は Terraform のアカウントをアクティブに監視し、その動作状況や使用頻度をよりよく理解することができます。このインテグレーションはさらに権限の監査も提供します。

### ダッシュボード

1. RapDev Terraform ダッシュボード

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://www.terraform.io/docs/cloud/users-teams-organizations/users.html#api-tokens
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-terraform" target="_blank">こちらをクリック</a>してください。