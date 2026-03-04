---
app_id: github-costs
app_uuid: fb5e121a-6cdc-4a2a-b85a-850134c50693
assets:
  dashboards:
    GitHub-Costs-Overview: assets/dashboards/GitHub-Costs-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38026450
    source_type_name: GitHub Costs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- コスト管理
- コラボレーション
- developer tools
- ソースコントロール
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: github_costs
integration_id: github-costs
integration_title: GitHub Costs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: github_costs
public_title: GitHub Costs
short_description: GitHub Costs と Datadog Cloud Cost を統合することで、リポジトリおよび企業全体の利用コストを最適化し、レポートを作成することができます。
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
  - Offering::Integration
  - Category::Cost Management
  - Category::Collaboration
  - Category::Developer Tools
  - カテゴリ::ソースコントロール
  configuration: README.md#Setup
  description: GitHub Costs と Datadog Cloud Cost を統合することで、リポジトリおよび企業全体の利用コストを最適化し、レポートを作成することができます。
  media:
  - caption: GitHub Costs ダッシュボード
    image_url: images/dashboard-redacted.png
    media_type: image
  - caption: GitHub Costs エクスプローラー
    image_url: images/explorer-redacted.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub Costs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Datadog の GitHub Costs インテグレーションを利用することで、GitHub の費用 (Actions から Storage、Copilot まで) を組織全体で包括的に把握できます。このインテグレーションにより、GitHub のコストを [Cloud Cost Management][1] で他のコストと一緒に表示したり、リポジトリ単位でコスト データをフィルタリングしたり、企業全体でクラウド支出を最適化したりすることができます。

## セットアップ

Datadog が GitHub から企業の課金情報を読み取るには、[GitHub のドキュメント][2]で説明されているように、`manage_billing:enterprise` と `repo` のスコープを持つ個人用アクセス トークン (classic) が必要です。また、[企業設定ページ][3]に記載されている企業名を入力する必要があります。


### インストール

1. Datadog [GitHub Costs タイル][4]に移動します。
2. **Add New** をクリックします。
3. アカウント名、個人用アクセス トークン、企業名 (`enterprise-name` 形式)、および適切なタグを入力します。
4. チェック マーク ボタンをクリックして、このアカウントを保存します。

### 検証

インテグレーションのセットアップが完了すると、通常は約 24 時間以内に [Cloud Cost Management][1] のプロバイダー名「GitHub Costs」の配下にデータが表示されます。収集されるデータのリストについては、[SaaS コスト インテグレーション][5] を参照してください。

## 収集データ

### Cloud Cost Management

GitHub Costs インテグレーションは、定価と利用データに基づいてコストを推定し、利用可能な場合は割引額を含めます。交渉に基づく料金は考慮されません。

### メトリクス

GitHub Costs にはメトリクスは含まれません。

### ログ収集

GitHub Costs にはログは含まれません。

### イベント

GitHub Costs にはイベントは含まれません。

### サービス チェック

GitHub Costs にはサービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/cost
[2]: https://docs.github.com/en/enterprise-cloud@latest/rest/enterprise-admin/billing?apiVersion=2022-11-28
[3]: https://github.com/settings/enterprises
[4]: https://app.datadoghq.com/integrations/github-costs
[5]: https://docs.datadoghq.com/ja/cloud_cost_management/saas_costs/?tab=githubcosts#data-collected
[6]: https://docs.datadoghq.com/ja/help/