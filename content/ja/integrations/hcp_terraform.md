---
app_id: hcp-terraform
app_uuid: 0b997b89-e3c5-4c82-ab23-fd964cceaf8c
assets:
  dashboards:
    HCP-Terraform-Overview: assets/dashboards/hcp_terraform_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21176406
    source_type_name: HCP Terraform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 構成とデプロイ
- 開発ツール
- ログの収集
- オーケストレーション
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: hcp_terraform
integration_id: hcp-terraform
integration_title: HCP Terraform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hcp_terraform
public_title: HCP Terraform
short_description: 組織の HCP Terraform 監査イベントを可視化する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Log Collection
  - Category::Orchestration
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 組織の HCP Terraform 監査イベントを可視化する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HCP Terraform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

このインテグレーションを使用すると、Datadog の [Cloud SIEM][1] 用に HCP Terraform (旧 Terraform Cloud) の監査トレイルログデータを収集できます。
- HCP Terraform のデータ保持を管理できます。
- カスタムウィジェットやカスタムダッシュボードを構築する。
- [すぐに使えるログパイプライン][2]を使って [Cloud SIEM][1] の検出ルールをセットアップする。
- 他のサービスからのデータと HCP Terraform イベントを相互参照できます。

HCP Terraform のログが解析されると、Datadog は[あらかじめ用意された HCP Terraform 概要ダッシュボード][3]に、HCP Terraform の値、アイテム、ユーザーに関するセキュリティイベントのインサイトを自動的に追加します。ウィジェットには、発生頻度の高い/低いイベントを示すトップリストや、サインイン試行元の国を示すジオロケーションマップが含まれます。

HCP Terraform のログを確認するには、Datadog ログで `source:hcp-terraform` を検索してください。正しくインストールされていれば、HCP Terraform のイベントが表示されます。

## セットアップ

### インストール

**ステップ 1: HCP Terraform 用の組織トークンを作成する**
1. [HashiCorp アカウント](https://app.terraform.io/)にログインし、該当する組織を選択して **Settings** をクリックします。
2. **Security** の下にある **API tokens** をクリックします。
3. **Create an organization token** をクリックします。
4. 必要に応じて有効期限を設定します。
5. **Generate token** をクリックします。
6. 作成された組織トークンをコピーし、保存しておきます。

**ステップ 2: Datadog インテグレーションを作成する**
1. 下記の **Organization Token** フィールドに上記で作成したトークンを貼り付けます。
2. アカウント名を入力します。

### 構成

ログが受信されていない場合は、[組織のエンタイトルメントセット][4]にある **audit-logging** 属性を **true** に設定していることを確認してください。

### 検証

インテグレーションがインストールされると、Datadog のログで `source:hcp-terraform` と入力して検索することで、HCP Terraform 監査ログが利用可能になります。

## 収集データ

### メトリクス

hcp-terraform にはメトリクスは含まれていません。

### サービスチェック

hcp-terraform にはサービスチェックは含まれていません。

### イベント

hcp-terraform にはイベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/security/siem/home
[2]: https://app.datadoghq.com/logs/pipelines?search=hcp-terraform
[3]: https://app.datadoghq.com/dash/integration/31325/hcp-terraform-overview
[4]: https://developer.hashicorp.com/terraform/cloud-docs/api-docs/organizations#show-the-entitlement-set
[5]: https://docs.datadoghq.com/ja/help/