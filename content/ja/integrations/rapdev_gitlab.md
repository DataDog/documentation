---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-gitlab
app_uuid: 629973c5-63ac-4f17-a9c2-5bda5b6677b4
assets:
  dashboards:
    RapDev GitLab Overview: assets/dashboards/RapDevGitLabDashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.gitlab.users
      metadata_path: metadata.csv
      prefix: rapdev.gitlab.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10300
    source_type_name: RapDev GitLab
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- クラウド
- メトリクス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_gitlab
integration_id: rapdev-gitlab
integration_title: GitLab
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gitlab
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.gitlab
  product_id: gitlab
  short_description: プロジェクト 1 件あたりの単価
  tag: project_name
  unit_label: GitLab プロジェクト
  unit_price: 1
public_title: GitLab
short_description: GitLab のプロジェクト、アプリケーション、インスタンスを監視します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: GitLab のプロジェクト、アプリケーション、インスタンスを監視します。
  media:
  - caption: GitLab API ステータス、プロジェクトメトリクス、Sidekiq に関する一般的なメトリクス
    image_url: images/RapDevGitLab_DB1.jpg
    media_type: image
  - caption: あらゆるインスタンスに関するメトリクス
    image_url: images/RapDevGitLab_DB2.jpg
    media_type: image
  - caption: 特定のランナーと問題に関するメトリクス
    image_url: images/RapDevGitLab_DB3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitLab
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
GitLab は、ソフトウェアの開発、セキュリティ、運用の機能を 1 つのアプリケーションに統合した DevOps ソフトウェアパッケージです。このインテグレーションは、GitLab API の異なるエンドポイントを通じて、以下の GitLab メトリクスを収集し、レポートします。
+ プロジェクトメトリクス
+ Sidekiq の統計
+ インスタンスメトリクス
+ インストールしたランナー
+ 合計および未解決の問題

### ライブラリ
このインテグレーションは、**RapDev GitLab Dashboard** と呼ばれるすぐに使えるダッシュボードを提供します。これは、Datadog に送信されたデータを表示し、特定のプロジェクトやホストの検索をさらに絞り込むための環境変数が含まれています。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][2]から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*

[1]: https://docs.datadoghq.com/ja/getting_started/agent/
[2]: mailto:support@rapdev.io

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-gitlab" target="_blank">こちらをクリック</a>してください。