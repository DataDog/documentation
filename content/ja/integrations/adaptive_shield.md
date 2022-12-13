---
app_id: adaptive-shield
app_uuid: 0c72bf61-1de6-4408-8a24-86f8e3413e07
assets:
  dashboards:
    adaptive_shield_overview: assets/dashboards/adaptive_shield_overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: adaptive_shield
author:
  homepage: https://www.adaptive-shield.com/
  name: Adaptive Shield
  sales_email: info@adaptive-shield.com
  support_email: support@adaptive-shield.com
categories:
- アラート設定
- クラウド
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/adaptive_shield/README.md
display_on_public_website: true
draft: false
git_integration_title: adaptive_shield
integration_id: adaptive-shield
integration_title: Adaptive Shield
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: adaptive_shield
public_title: Adaptive Shield
short_description: SaaS のポスチャアラートの追跡
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Alerting
  - Category::Cloud
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: SaaS のポスチャアラートの追跡
  media:
  - caption: Adaptive Shield における SaaS 環境のポスチャ
    image_url: images/posture.png
    media_type: image
  - caption: Adaptive Shield における SaaS の構成に対するセキュリティチェック
    image_url: images/security_checks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Adaptive Shield
---

## 概要
Office 365、Slack、Zoom、Salesforce などの SaaS アプリは、企業の日常業務に欠かせないものですが、しばしば新たなセキュリティ上の問題が発生することがあります。Adaptive Shield の SaaS セキュリティポスチャ管理ソリューション (SSPM) は、ビジネスに不可欠な SaaS アプリケーションをプロアクティブに、深く、継続的に、そして自動的に監視・管理することを特徴としています。SaaS アプリとインテグレーションすることで、Adaptive Shield はセキュリティチームが SaaS アプリをコントロールできるようにし、セキュリティポリシーを強固にしてリスクを低減することを可能にします。

Adaptive Shield とのインテグレーションにより、構成ドリフト、インテグレーション失敗、セキュリティチェックの劣化などの SaaS ポスチャアラートを Datadog イベントとして追跡・監視することが可能です。

## セットアップ

1. **Connect Accounts** をクリックし、このインテグレーションの認可を開始します。その後、[Adaptive Shield][1] にリダイレクトされます。
2. エイリアス名を入力します。
3. 該当する Datadog サイトを選択します。
4. 認可するには **OAuth** をクリックします。


### アンインストール

このインテグレーションをアンインストールすると、それまでの認可はすべて取り消されます。

さらに、このインテグレーションに関連するすべての API キーが無効になっていることを、[API キー管理ページ][2]でインテグレーション名を検索して確認してください。


## サポート
ご不明な点は、[Adaptive Shield のサポートチーム][3]までお問い合わせください。

[1]: https://dashboard.adaptive-shield.com/settings/alerts/add/63230b73c9624b93dadf38d4
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: mailto:support@adaptive-shield.com