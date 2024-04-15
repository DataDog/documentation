---
categories:
- event management
- セキュリティ
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

manifest_version: '1.0'
name: jumpcloud
public_title: Jumpcloud
short_description: Jumpcloud からログを収集します。
team: web-integrations
version: '1.0'
---

## 概要

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

詳細については、[インサイト API 参照][1]をご覧ください。

## セットアップ

### インストール

インストールは必要ありません。

### コンフィギュレーション

詳しくは、インテグレーションタイルを参照してください。JumpCloud 管理ポータルからの API キーが必要です。

## 収集データ

### ログ管理

ログは、単一の API エンドポイントから収集されます。[インサイト API][1] をご確認ください。

### メトリクス

JumpCloud インテグレーションには、メトリクスは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[2]: https://docs.datadoghq.com/ja/help/
