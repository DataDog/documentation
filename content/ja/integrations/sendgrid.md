---
categories:
- web
dependencies: []
description: Datadog で Sendgrid のメール配信とエンゲージメントの統計情報を監視します。
doc_link: https://docs.datadoghq.com/integrations/sendgrid/
draft: false
git_integration_title: sendgrid
has_logo: true
integration_id: ''
integration_title: SendGrid
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: sendgrid
public_title: Datadog-SendGrid
short_description: Sendgrid のメトリクスを収集します。
team: web-integrations
version: '1.0'
---

## 概要

SendGrid のメール配信およびエンゲージメントのメトリクスとログを収集します。

## セットアップ

### SendGrid の API キーを生成する

1. [SendGrid アカウント][1]にログインします。
2. **Settings** ドロップダウンを開きます。
3. **API Keys** をクリックします。
4. 右上の **Create API Key** をクリックします。
5. *API Key Name* を入力します。**Full Access** または制限付きアクセスの場合は **Stats** - **Read Access** を選択します。
6. API キーを安全な場所にコピーします。API キーは、Datadog のユーザーインターフェイスで SendGrid インテグレーションを設定する際に必要になります。

### コンフィギュレーション

#### メトリクス
{{< get-metrics-from-git "sendgrid" >}}


### ログ管理

Sendgrid の配信とエンゲージメントイベントは、ソース `sendgrid` の下にログとして表示されます。

### イベント

SendGrid インテグレーションには、イベントは含まれません。

### サービスのチェック

SendGrid インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.sendgrid.com/
[2]: https://app.datadoghq.com/account/settings#integrations/sendgrid
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/sendgrid/sendgrid_metadata.csv
[4]: https://docs.datadoghq.com/ja/help