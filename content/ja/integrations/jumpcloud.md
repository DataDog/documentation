---
app_id: jumpcloud
app_uuid: 37f8026f-e2ac-4a71-9270-0b03fab814cc
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 613
    source_type_name: Jumpcloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- event management
- セキュリティ
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: jumpcloud
integration_id: jumpcloud
integration_title: Jumpcloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jumpcloud
public_title: Jumpcloud
short_description: Datadog で Jumpcloud イベントを表示する
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog で Jumpcloud イベントを表示する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jumpcloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

JumpCloud は、ユーザー認証とネットワーク管理を中心とした Active Directory と LDAP サービスの統合アプローチを提供するクラウドベースのディレクトリプラットフォームです。

JumpCloud を使用すると、企業は、ソフトウェア、システム、およびネットワークへのユーザーアクセスを管理およびプロビジョニングし、監査証跡でコンプライアンスを実施し、シングルサインオン (SSO) を介して統一されたログインエクスペリエンスを提供することができます。クラウドネイティブプラットフォームである JumpCloud は、従来のディレクトリニーズにドメインレスセキュリティソリューションを提供することで、リモートで柔軟な IT 管理を可能にします。

JumpCloud インテグレーションにより、以下のアクセスが提供されます。

- ディレクトリイベント: ポータル内のアクティビティのログ（ディレクトリの管理者および
  ポータルへの管理者/ユーザー認証の変更を含む）

- SAML イベント: SAML アプリケーションへのユーザー認証のログ

- RADIUS イベント: WiFi および VPN に使用された RADIUS へのユーザー認証のログ

- MacOS、Windows、Linux イベント: システムへのユーザー認証に関するログ
  （ロックアウト時の Agent 関連のイベント、パスワード変更、
  ファイルディスク暗号化キーの更新などを含む）

- LDAP イベント: LDAP へのユーザー認証に関するログ（LDAP バインドおよび
  検索イベントタイプを含む）

- MDM イベント: MDM コマンドの結果に関するログ

詳細については、[Datadog で JumpCloud ディレクトリを監視する][1]および [Insights API リファレンス][2]を参照してください。

## セットアップ

### インストール

インストールは必要ありません。

### 構成

詳しくは、インテグレーションタイルを参照してください。JumpCloud 管理ポータルからの API キーが必要です。

## 収集データ

### Logs

ログは、単一の API エンドポイントから収集されます。[インサイト API][2] をご確認ください。

### メトリクス

JumpCloud インテグレーションには、メトリクスは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.datadoghq.com/blog/monitor-jumpcloud-directory/
[2]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[3]: https://docs.datadoghq.com/ja/help/
