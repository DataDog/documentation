---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-github
app_uuid: 37a265a0-fb4a-463b-aaea-653f5d950c2c
assets:
  dashboards:
    RapDev GitHub Overview: assets/dashboards/RapDevGitHubDashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.github.users.count
      metadata_path: metadata.csv
      prefix: rapdev.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10289
    source_type_name: RapDev GitHub
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- クラウド
- コラボレーション
- マーケットプレイス
- メトリクス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_github
integration_id: rapdev-github
integration_title: GitHub
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_github
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.github
  product_id: github
  short_description: リポジトリ 1 個あたりの単価
  tag: repo_name
  unit_label: GitHub リポジトリ
  unit_price: 1
public_title: GitHub
short_description: GitHub の組織やエンタープライズを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Collaboration
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: GitHub の組織やエンタープライズを監視する
  media:
  - caption: GitHub の組織やエンタープライズに関する一般的なメトリクス
    image_url: images/RapDevGitHub_DB1.jpg
    media_type: image
  - caption: あらゆるランナーに関するメトリクス
    image_url: images/RapDevGitHub_DB2.jpg
    media_type: image
  - caption: 特定のリポジトリに関するメトリクス
    image_url: images/RapDevGitHub_DB3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
このインテグレーションは、GitHub のメトリクスを収集し、GitHub API の異なるエンドポイントを通じて Datadog にレポートします。送信されるメトリクスは以下の種類です。
+ Organization/Enterprise Stats
+ レポジトリのメトリクス
+ セルフホストランナーとインストール型ランナー
+ GitHub ワークフローモニタリング

### ライブラリ
このインテグレーションは、**RapDev GitHub Dashboard** と呼ばれるすぐに使えるダッシュボードを提供します。このダッシュボードは、データが Datadog に送信されるたびにポップアップし、特定のリポジトリや作成者の検索をさらに絞り込むための環境変数が含まれています。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-github" target="_blank">こちらをクリック</a>してください。