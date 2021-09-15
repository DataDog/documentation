---
categories:
  - ログの収集
  - security
ddtype: crawler
dependencies: []
description: Google Workspace の監査およびセキュリティログを Datadog へインポートします。
doc_link: https://docs.datadoghq.com/integrations/gsuite/
draft: false
git_integration_title: gsuite
has_logo: true
integration_id: ''
integration_title: Google Workspace
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: gsuite
public_title: Datadog-Google Workspace インテグレーション
short_description: Google Workspace の監査およびセキュリティログを Datadog へインポート
version: '1.0'
---
## 概要

Google Workspace のセキュリティログを Datadog へインポートします。このインテグレーションを有効にすると、以下の Google Workspace サービスに対しログが自動的に Datadog に取り込まれます。

| サービス             | 説明                                                                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| アクセスの透明性 | Google Workspace アクセスの透明性アクティビティレポートは、さまざまな種類のアクセスの透明性アクティビティイベントの情報を返します。                                                          |
| 管理者               | 管理者コンソールアプリケーションのアクティビティレポートは、さまざまな種類の管理者アクティビティイベントのアカウント情報を返します。                                                        |
| カレンダー            | Google カレンダーアプリケーションのアクティビティレポートは、カレンダーのさまざまなアクティビティイベントの情報を返します。                                                                             |
| ドライブ               | Google ドライブアプリケーションのアクティビティレポートは、さまざまな種類の Google ドライブイベントの情報を返します。このアクティビティレポートは、Google Workspace Business をご利用のお客様のみ使用可能です。 |
| Gplus               | Google+ アプリケーションのアクティビティレポートは、Google+ アクティビティのさまざまなイベントの情報を返します。                                                                                       |
| グループ              | Google グループアプリケーションのアクティビティレポートは、グループアクティビティのさまざまなイベントの情報を返します。                                                                                  |
| Enterprise グループ   | Enterprise グループのアクティビティレポートは、Enterprise グループのさまざまなアクティビティイベントの情報を返します。                                                                      |
| ログイン               | ログインアプリケーションのアクティビティレポートは、さまざまな種類のログインアクティビティイベントのアカウント情報を返します。                                                                |
| モバイル              | モバイル監査アクティビティレポートは、さまざまな種類のモバイル監査アクティビティイベントの情報を返します。                                                                         |
| ルール               | ルールアクティビティレポートは、さまざまな種類のルールアクティビティイベントの情報を返します。                                                                                       |
| トークン               | トークンアプリケーションのアクティビティレポートは、さまざまな種類のトークンアクティビティイベントのアカウント情報を返します。                                                                |
| ユーザーアカウント    | ユーザーアカウントアプリケーションのアクティビティレポートは、さまざまな種類のユーザーアカウントアクティビティイベントのアカウント情報を返します。                                                 |

## セットアップ
### インストール

Datadog と Google Workspace のインテグレーションを構成するには、[Datadog-Google Workspace インテグレーションタイル][1] で *Connect a new Google Workspace domain* ボタンをクリックし、Datadog に Google Workspace 管理者 API へのアクセスを許可します。

## 収集データ
### ログ

収集されたログとそのコンテンツの全リストは、[Google Workspace 管理者 SDK ドキュメント][2] を参照してください。

**注**: Google Workspace のセキュリティログは、Google のログポーリング頻度に制限があるため 90 分のクローリングとなっています。このインテグレーションのログは、1.5～2 時間おきに転送されます。

### メトリクス

Google Workspace インテグレーションには、メトリクスは含まれません。

### イベント

Google Workspace インテグレーションには、イベントは含まれません。

### サービスチェック

Google Workspace インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/gsuite
[2]: https://developers.google.com/admin-sdk/reports/v1/reference/activities/list
[3]: https://docs.datadoghq.com/ja/help/