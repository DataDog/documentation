---
app_id: zoom-activity-logs
app_uuid: 2297e963-5129-4711-bf04-767d5c929f5e
assets:
  dashboards:
    zoom-activity-logs: assets/dashboards/zoom_activity_logs_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10394
    source_type_name: Zoom アクティビティログ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zoom_activity_logs
integration_id: zoom-activity-logs
integration_title: Zoom アクティビティログ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zoom_activity_logs
public_title: Zoom アクティビティログ
short_description: Zoomからオペレーションログおよびアクティビティログを収集する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Zoomからオペレーションログおよびアクティビティログを収集する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zoom アクティビティログ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要
このインテグレーションを使用すると、Zoom アカウント内のアクティビティを把握するための Zoom アクティビティログを収集できます。これにより、次のことが可能になります。

- Zoom イベントを環境内の他のサービスのデータと相互参照できます。 
- Zoom イベントデータを使ってカスタムウィジェットやダッシュボードを構築できます。 
- 標準のログパイプラインを使用して [Cloud SIEM][1] の検出ルールを設定できます。

Datadog の Zoom インテグレーションでは、[サインインおよびサインアウトのアクティビティ][1]と[オペレーションログ][2]を使用してログを収集し、管理者およびユーザーのアクティビティに関する洞察を提供します。これには以下が含まれます。
  - 新しいユーザーの追加
  - アカウント設定の変更
  - 録画の削除
  - サインインおよびサインアウトアクティビティ


## セットアップ

### インストール

1. Integrations ページに移動して、「Zoom Activity Log」インテグレーションを検索します。 
3. タイルをクリックします。 
4. インテグレーションをインストールするためにアカウントを追加するには、「Add Account」ボタンをクリックします。 
5. モーダルに表示された手順を確認したら、「Authorize」ボタンをクリックします。Zoom のログインページにリダイレクトされます。 
6. Zoom の管理者アカウントを使用して Zoom にログインします。 
7. Datadog が監査レポートデータを閲覧できるようにする
`report:read:admin` スコープへのアクセスを求める画面が表示されます。「Accept」をクリックします。
8. 新しいアカウントが追加された状態で、Datadog の Zoom Activity Log タイルにリダイレクトされます。「Account Name」を覚えやすい名称に変更することをおすすめします。 


## 権限

Datadog for Zoom は以下の OAuth スコープを必要とします。詳細については、[Zoom OAuth スコープのドキュメント][3]を参照してください。

### ユーザーレベルのスコープ

| スコープ                   | リクエスト理由                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `report:read:admin`          | 新しいユーザーの追加、アカウント設定の変更、録画の削除などのイベントを含む、監査用の管理者およびユーザーアクティビティログを読み取ります。また、Zoom アカウントに属するユーザーのサインイン/サインアウトアクティビティログも読み取ります。                        |


### アプリの削除
Zoom Activity Log インテグレーションをアンインストールするには、Zoom Activity Log タイルに移動し、アカウントテーブルに表示されている既存のアカウントを削除してください。


## 収集データ

### メトリクス

Zoom アクティビティログにはメトリクスは含まれていません。

### サービスチェック

Zoom アクティビティログにはサービスチェックは含まれていません。

### Logs
Zoom アクティビティログは、Zoom の [Sign In and Out Activity Log][1] および [Operation Log][2] エンドポイントからデータを収集します。

### イベント

Zoom アクティビティログにはイベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportSignInSignOutActivities
[2]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportOperationLogs
[3]: https://developers.zoom.us/docs/integrations/oauth-scopes-granular/#reports
[4]: https://docs.datadoghq.com/ja/help/