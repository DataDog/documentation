---
app_id: gsuite
app_uuid: a1ec70d4-dbe1-4e76-8e40-062df1fff1a5
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 601
    source_type_name: Google Workspace
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- コラボレーション
- セキュリティ
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: gsuite
integration_id: gsuite
integration_title: Google Workspace
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: gsuite
public_title: Google Workspace
short_description: Google Workspace の監査およびセキュリティログを Datadog へインポート
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Collaboration
  - Category::Security
  configuration: README.md#Setup
  description: Google Workspace の監査およびセキュリティログを Datadog へインポート
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Workspace
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Workspace のセキュリティログを Datadog へインポートします。このインテグレーションを有効にすると、以下の Google Workspace サービスに対しログが自動的に Datadog に取り込まれます。

|サービス|説明|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|アクセスの透明性|Google Workspace アクセスの透明性アクティビティレポートは、さまざまな種類のアクセスの透明性アクティビティイベントの情報を返します。|
|管理者|管理者コンソールアプリケーションのアクティビティレポートは、さまざまな種類の管理者アクティビティイベントのアカウント情報を返します。|
|カレンダー|Google カレンダーアプリケーションのアクティビティレポートは、カレンダーのさまざまなアクティビティイベントの情報を返します。|
|Chrome|Chrome アクティビティ レポートは、アカウントの全ユーザーの ChromeOS アクティビティに関する情報を返します。各レポートは基本的なエンドポイントリクエストを使用し、ログイン、ユーザーの追加または削除、安全でない閲覧イベントなど、レポート固有のパラメーターを提供します。|
|コンテキストアウェアアクセス|コンテキストアウェアアクセスアクティビティレポートは、アカウントのユーザーに対するアプリケーションアクセスの拒否に関する情報を返します。基本的なレポートエンドポイントリクエストを使用し、デバイス ID やアクセスが拒否されたアプリケーションなどの特定のパラメーターを提供します。|
|ドライブ|Google ドライブアプリケーションのアクティビティレポートは、さまざまな種類の Google ドライブイベントの情報を返します。このアクティビティレポートは、Google Workspace Business をご利用のお客様のみ使用可能です。|
|Google Chat|Chat アクティビティレポートは、アカウントのユーザーが Spaces をどのように使用および管理しているかについての情報を返します。各レポートは、アップロードやメッセージ操作などのレポート固有のパラメーターを持つ基本的なエンドポイントリクエストを使用します。|
|ガイド|Google Cloud アクティビティレポートは、Cloud OS Login API に関連する様々なアクティビティイベントに関する情報を返します。|
|Google Keep|Keep アクティビティレポートは、アカウントのユーザーがノートをどのように管理および変更したかに関する情報を返します。各レポートは、添付ファイルのアップロード情報やノート操作などのレポート固有のパラメーターを持つ基本的なエンドポイントリクエストを使用します。|
|Google Meet|Meet アクティビティレポートは、コールイベントの様々な側面に関する情報を返します。各レポートは、不正使用レポートデータやライブストリーム視聴データなどのレポート固有のパラメーターを持つ基本的なエンドポイントリクエストを使用します。|
|Gplus|Google+ アプリケーションのアクティビティレポートは、Google+ アクティビティのさまざまなイベントの情報を返します。|
|グループ|Google グループアプリケーションのアクティビティレポートは、グループアクティビティのさまざまなイベントの情報を返します。|
|Enterprise グループ|Enterprise グループのアクティビティレポートは、Enterprise グループのさまざまなアクティビティイベントの情報を返します。|
|Jamboard|Jamboard アクティビティレポートは、Jamboard デバイス設定の変更に関する情報を返します。各レポートは、ライセンスやデバイスのペアリング設定などのレポート固有のパラメーターを持つ基本的なエンドポイントリクエストを使用します。|
|ログイン|ログインアプリケーションのアクティビティレポートは、さまざまな種類のログインアクティビティイベントのアカウント情報を返します。|
|送信 - DogStatsD|モバイル監査アクティビティレポートは、さまざまな種類のモバイル監査アクティビティイベントの情報を返します。|
|ブラウザテスト|ルールアクティビティレポートは、さまざまな種類のルールアクティビティイベントの情報を返します。|
|トークン|トークンアプリケーションのアクティビティレポートは、さまざまな種類のトークンアクティビティイベントのアカウント情報を返します。|
|SAML|SAML アクティビティレポートは、SAML ログインの試行結果に関する情報を返します。各レポートは、失敗のタイプや SAML アプリケーション名などのレポート固有のパラメーターを持つ基本的なエンドポイントリクエストを使用します。|
|ユーザーアカウント|ユーザーアカウントアプリケーションのアクティビティレポートは、さまざまな種類のユーザーアカウントアクティビティイベントのアカウント情報を返します。|

## 計画と使用
### インフラストラクチャーリスト

Datadog と Google Workspace のインテグレーションを構成する前に、Google Workspace Admin SDK [Reports API: Prerequisites][1] のドキュメントに従ってください。

**注**: セットアップには特定の OAuth スコープが必要になる場合があります。Google Workspace Admin SDK [Authorize Requests][2] のドキュメントをご覧ください。

Datadog と Google Workspace のインテグレーションを構成するには、[Datadog-Google Workspace インテグレーションタイル][3]で *Connect a new Google Workspace domain* ボタンをクリックし、Datadog に Google Workspace 管理者 API へのアクセスを許可します。

## リアルユーザーモニタリング
### ワークフローの自動化

収集されたログとそのコンテンツの全リストは、[Google Workspace 管理者 SDK ドキュメント][4]を参照してください。

**注**: Groups、Enterprise Groups、Login、Token、Calendar のログは、Google のログポーリング頻度に制限があるため 90 分のクローリングとなっています。このインテグレーションのログは、1.5～2 時間おきに転送されます。

### データセキュリティ

Google Workspace インテグレーションには、メトリクスは含まれません。

### ヘルプ

Google Workspace インテグレーションには、イベントは含まれません。

### ヘルプ

Google Workspace インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites
[2]: https://developers.google.com/admin-sdk/reports/v1/guides/authorizing#OAuth2Authorizing
[3]: https://app.datadoghq.com/account/settings#integrations/gsuite
[4]: https://developers.google.com/admin-sdk/reports/v1/reference/activities/list
[5]: https://docs.datadoghq.com/ja/help/