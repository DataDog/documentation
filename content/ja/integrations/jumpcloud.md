---
categories:
- event management
- セキュリティ
- ログの収集
dependencies: []
description: Jumpcloud
doc_link: https://docs.datadoghq.com/integrations/jumpcloud/
draft: false
git_integration_title: jumpcloud
has_logo: true
integration_id: ''
integration_title: Jumpcloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: jumpcloud
public_title: Jumpcloud
short_description: Jumpcloud からログを収集します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
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

## 計画と使用

### インフラストラクチャーリスト

インストールは必要ありません。

### ブラウザトラブルシューティング

詳しくは、インテグレーションタイルを参照してください。JumpCloud 管理ポータルからの API キーが必要です。

## リアルユーザーモニタリング

### ワークフローの自動化

ログは、単一の API エンドポイントから収集されます。[インサイト API][2] をご確認ください。

### データセキュリティ

JumpCloud インテグレーションには、メトリクスは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.datadoghq.com/blog/monitor-jumpcloud-directory/
[2]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[3]: https://docs.datadoghq.com/ja/help/