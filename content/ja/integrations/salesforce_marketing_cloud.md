---
categories:
- ログの収集
dependencies: []
description: Salesforce Marketing Cloud
doc_link: https://docs.datadoghq.com/integrations/salesforce_marketing_cloud/
draft: false
git_integration_title: salesforce_marketing_cloud
has_logo: false
integration_id: ''
integration_title: Salesforce Marketing Cloud
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: salesforce_marketing_cloud
public_title: Salesforce Marketing Cloud
short_description: Salesforce Marketing Cloud からログを収集します。
team: web-integrations
version: '1.0'
---

## 概要

Salesforce Marketing Cloud は、クラウドベースのマーケティングプラットフォームです。Salesforce Marketing Cloud と Datadog をインテグレーションし、[Datadog Logs][1] を使ってログを表示・パースします。

## セットアップ

### APM に Datadog Agent を構成する

インストールは必要ありません。

### コンフィギュレーション

Salesforce Marketing Cloud から Datadog にイベントを送信するように構成するためには、Salesforce Marketing Cloud Setup ページでコールバック URL を作成し、サブスクリプションを作成する必要があります。

#### アカウント設定

1. Salesforce Marketing Cloud にログインします。
2. アカウントに移動して、**Settings/Setup** をクリックします。
3. ユーザーアカウントが属する、`Event Notifications`、`Callbacks`、`Subscriptions` を許可するロールを作成または変更します。

#### コールバックの設定

1. Setup ページで、**Feature Settings** > **Event Notifications** に移動し、**URL Callbacks** を選択します。
2. **Register New** をクリックします。
3. Datadog インテグレーションタイルで提供される URL をコピーします。
5. コールバック URL に名前を付けて、URL を貼り付けます。
6. **Match Batch Size** を 1000 のままにして、**Register** をクリックします。
7. Datadog のエンドポイントに検証ペイロードが送信されます。Datadog インテグレーションタイルを再読み込みすると、検証ペイロードが表示されます。
8. Verification Key をコピーし、Salesforce Marketing Cloud URL Callback Setup ページの **Verification** セクションに貼り付けます。

#### サブスクリプション設定

1. **Feature Settings** で、**Event Notifications** > **Subscriptions** をクリックします。
2. `Subscribe New` を選択し、登録する名前を指定します。
3. 受信したいイベントをすべて選択し、フィルターを追加します。
4. **Subscribe** をクリックします。イベントが Datadog に送信されます。

## 収集データ

### メトリクス

Salesforce Marketing Cloud インテグレーションには、メトリクスは含まれません。

### ログ管理

Salesforce Marketing Cloud インテグレーションでは、[サブスクリプション設定](#subscription-setup)で選択したイベントからログイベントが収集されます。

### サービスのチェック

Salesforce Marketing Cloud インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://docs.datadoghq.com/ja/logs/
[2]: https://docs.datadoghq.com/ja/help/