---
categories:
  - ログの収集
  - security
ddtype: crawler
dependencies: []
description: G Suite の監査およびセキュリティログを Datadog へインポートします。
doc_link: 'https://docs.datadoghq.com/integrations/gsuite/'
draft: false
git_integration_title: gsuite
has_logo: true
integration_id: ''
integration_title: G Suite
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: gsuite
public_title: Datadog-G Suite インテグレーション
short_description: G Suite の監査およびセキュリティログを Datadog へインポート
version: '1.0'
---
## 概要

G Suite のセキュリティログを Datadog へインポートします。このインテグレーションを有効にすると、以下の G Suite サービスに対しログが自動的に Datadog に取り込まれます。

| G Suite サービス     | 説明                                                                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| アクセスの透明性 | G Suite アクセスの透明性アクティビティレポートは、さまざまな種類のアクセスの透明性アクティビティイベントの情報を返します。                                                          |
| 管理者               | 管理者コンソールアプリケーションのアクティビティレポートは、さまざまな種類の管理者アクティビティイベントのアカウント情報を返します。                                                        |
| カレンダー            | G Suite カレンダーアプリケーションのアクティビティレポートは、カレンダーのさまざまなアクティビティイベントの情報を返します。                                                                             |
| ドライブ               | Google ドライブアプリケーションのアクティビティレポートは、さまざまな種類の Google ドライブイベントの情報を返します。このアクティビティレポートは、G Suite Business をご利用のお客様のみ使用可能です。 |
| Gplus               | Google+ アプリケーションのアクティビティレポートは、Google+ アクティビティのさまざまなイベントの情報を返します。                                                                                       |
| グループ               | Google グループアプリケーションのアクティビティレポートは、グループアクティビティのさまざまなイベントの情報を返します。                                                                                  |
| グループ              | Enterprise: Enterprise グループのアクティビティレポートは、Enterprise グループのさまざまなアクティビティイベントの情報を返します。                                                                      |
| ログイン               | G Suite ログインアプリケーションのアクティビティレポートは、さまざまな種類のログインアクティビティイベントのアカウント情報を返します。                                                                |
| モバイル              | G Suite モバイル監査アクティビティレポートは、さまざまな種類のモバイル監査アクティビティイベントの情報を返します。                                                                         |
| ルール               | G Suite ルールアクティビティレポートは、さまざまな種類のルールアクティビティイベントの情報を返します。                                                                                       |
| トークン               | G Suite トークンアプリケーションのアクティビティレポートは、さまざまな種類のトークンアクティビティイベントのアカウント情報を返します。                                                                |
| ユーザーアカウント       | G Suite ユーザーアカウントアプリケーションのアクティビティレポートは、さまざまな種類のユーザーアカウントアクティビティイベントのアカウント情報を返します。                                                 |

## セットアップ
### インストール

Datadog G Suite インテグレーションを構成するには、 [Datadog G Suite インテグレーションタイル][1] で *Connect a new G Suite domain* ボタンをクリックし、Datadog の G Suite 管理者 API へのアクセスを許可します。

## 収集データ
### ログ

収集されたログとそのコンテンツの全リストは、[G Suite 管理者 SDK 文書][2] を参照してください。

**注**: G Suite のセキュリティログは、Google のログポーリング頻度に制限があるため 90 分のクローリングとなっています。このインテグレーションのログは、1.5～2 時間おきに転送されます。

### メトリクス

G Suite インテグレーションにメトリクスは含まれません。

### イベント

G Suite インテグレーションにイベントは含まれません。

### サービスチェック

G Suite インテグレーションにサービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/gsuite
[2]: https://developers.google.com/admin-sdk/reports/v1/reference/activities/list
[3]: https://docs.datadoghq.com/ja/help/