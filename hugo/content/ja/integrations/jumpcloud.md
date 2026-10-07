---
app_id: jumpcloud
categories:
- event management
- セキュリティ
custom_kind: インテグレーション
description: Datadog で Jumpcloud イベントを表示する
media: []
title: Jumpcloud
---
## 概要

JumpCloud は、ユーザー認証とネットワーク管理を中心とした Active Directory と LDAP サービスの統合アプローチを提供するクラウド ベースのディレクトリ プラットフォームです。

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

詳細については、[Datadog で JumpCloud ディレクトリを監視する](https://www.datadoghq.com/blog/monitor-jumpcloud-directory/)および [Insights API リファレンス](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html)を参照してください。

## セットアップ

### インストール

インストールは必要ありません。

### 設定

詳しくは、インテグレーションタイルを参照してください。JumpCloud 管理ポータルからの API キーが必要です。

## 収集データ

### ログ

ログは、単一の API エンドポイントから収集されます。[Insights API](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html) を参照してください。

### メトリクス

JumpCloud インテグレーションには、メトリクスは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。