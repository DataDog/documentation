---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-ha-github
app_uuid: c4bdf039-4223-4505-80dc-d2564dbc8368
assets:
  dashboards:
    RapDev GitHub Hosted Agent Issues: assets/dashboards/github_issues_dashboard.json
    RapDev GitHub Hosted Agent Overview: assets/dashboards/github_overview_dashboard.json
    RapDev GitHub Hosted Agent Pull Request: assets/dashboards/github_pull_requests_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.hosted_agent.github.repository
      metadata_path: metadata.csv
      prefix: rapdev.hosted_agent.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 82741
    source_type_name: RapDev HA GitHub
  monitors:
    GitHub Issue for Repository is Stale: assets/monitors/github_issue_is_stale_repo.json
    GitHub Issue is Stale: assets/monitors/github_issue_is_stale_org.json
    GitHub Pull Request Has Not Been Updated: assets/monitors/github_pr_is_stale_org.json
    GitHub Pull Request for Repository Has Not Been Updated: assets/monitors/github_pr_is_stale_repo.json
  oauth: assets/oauth_clients.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- クラウド
- コラボレーション
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ha_github
integration_id: rapdev-ha-github
integration_title: GitHub Hosted Agent
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ha_github
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.hosted_agent.github
  product_id: rapdev-ha-github
  short_description: リポジトリ 1 個あたりの単価
  tag: repo_id
  unit_label: GitHub リポジトリ
  unit_price: 1
public_title: GitHub Hosted Agent
short_description: Rapdev Hosted Agent を使用して GitHub リポジトリを監視する
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
  - Category::Cloud
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Rapdev Hosted Agent を使用して GitHub リポジトリを監視する
  media:
  - caption: GitHub Overview 1
    image_url: images/github_overview_dashboard_1.jpg
    media_type: image
  - caption: GitHub Overview 2
    image_url: images/github_overview_dashboard_2.jpg
    media_type: image
  - caption: GitHub Pull Request 1
    image_url: images/github_pull_request_dashboard_1.jpg
    media_type: image
  - caption: GitHub Pull Request 2
    image_url: images/github_pull_request_dashboard_2.jpg
    media_type: image
  - caption: GitHub Issues 1
    image_url: images/github_issues_dashboard_1.jpg
    media_type: image
  - caption: GitHub Issues 2
    image_url: images/github_issues_dashboard_2.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub Hosted Agent
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

GitHub 用 Hosted Agent は、リポジトリ全体の開発活動に関する洞察を提供します。GitHub は世界有数のソフトウェア開発、コラボレーション、およびセキュリティプラットフォームです。古くなったリポジトリやプルリクエスト、問題などを特定し、マージ作業を作成者、マージ担当者、割り当てられた担当者と調整します。

Hosted Agent は、既存の [RapDev GitHub Marketplace インテグレーション][4]による、より簡単なインストールと構成をサポートします。Datadog の Marketplace OAuth 機能を活用して、Hosted Agent は RapDev Connection Manager ポータルを通じたガイド付きの GitHub アプリのインストールプロセスを提供し、Datadog で統一された可観測性を実現するために、複数の GitHub 組織およびユーザーをサポートします。

GitHub 用 Hosted Agent インテグレーションには、GitHub リポジトリのアクティビティに即時の可観測性を提供するための Datadog ダッシュボードと推奨モニターが含まれています。

## サポート
サポートまたは機能リクエストについては、以下のチャンネルを通じて RapDev に連絡してください。

- サポート: [support@rapdev.io][1]
- 営業: [sales@rapdev.io][3]
- チャット: [rapdev.io][2]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に必要な重要な機能が欠けていますか？RapDev へ[お問い合わせ][1]ください。私たちがその機能を構築します！*

[1]: mailto:support@rapdev.io
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: https://app.datadoghq.com/marketplace/app/rapdev-github/overview
[5]: https://app.datadoghq.com/organization-settings/api-keys

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-ha-github" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。