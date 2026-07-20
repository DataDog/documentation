---
app_id: rollbar
app_uuid: 63175032-65a1-4bc8-82da-251a27005f1f
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 137
    source_type_name: Rollbar
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- issue tracking
- notifications
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rollbar
integration_id: rollbar
integration_title: Rollbar
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rollbar
public_title: Rollbar
short_description: Datadog イベントストリームに、例外、エラー、コードデプロイを送信。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Category::問題の追跡
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog イベントストリームに、例外、エラー、コードデプロイを送信。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rollbar
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![Rollbar エラー イベント][1]

## 概要

Rollbar は、開発者がより優れたソフトウェアを迅速に構築できるように支援します。Rollbar を使用すると、開発に関連するすべてのフレームワーク、プラットフォーム、環境から生成された例外を 1 つの場所に表示できます。

Rollbar を Datadog に接続して、以下のことができます。

- イベントエクスプローラーで例外、エラー、コードのデプロイの通知を受けることができます。
- 重大度、環境、ホスト、ユーザーなどで通知を絞り込むことができます。
- グラフで例外を検索できます。
- 例外についてチームで議論できます。
- 問題のデバッグにかかる時間を短縮できます。

## セットアップ

### インストール

1. [Rollbar integration tile][2] に移動し、**Install Integration** をクリックします。
2. インテグレーションタイルから、既存の API キーをクリックして選択するか、このインテグレーション用に新しい API キーを作成します。

### 構成

構成は、Rollbar でプロジェクトごとに行います。

1. Rollbar で、Projects ページに移動します。
2. プラスボタン **\[ + \]** をクリックして、プロジェクトにインテグレーションを追加します。

   ![Rollbar プロジェクト ページ][3]

3. リストから Datadog を選択します。
4. Datadog の Rollbar インテグレーションタイルから API キーをコピーし、Rollbar の API キーボックスに貼り付けます。

ここで、設定が正しいことを確認するために **Send Test Notification** ボタンをクリックします。クリック後、[Events Explorer][4] に Rollbar からのイベントが表示されるはずです。

## 収集データ

### メトリクス

Rollbar インテグレーションには、メトリクスは含まれません。

### イベント

Rollbar インテグレーションは、例外、エラー、およびコードデプロイをイベントとして Datadog にプッシュします。

### サービスチェック

Rollbar インテグレーションには、サービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: images/rollbar_error.png
[2]: https://app.datadoghq.com/account/settings#integrations/rollbar
[3]: images/rollover_project.png
[4]: https://app.datadoghq.com/event/explorer
[5]: https://docs.datadoghq.com/ja/help/