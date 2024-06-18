---
app_id: sendgrid
app_uuid: 828968b6-254c-4c82-8736-998004d6e607
assets:
  dashboards:
    Sendgrid-Overview: assets/dashboards/Sendgrid-Overview_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: sendgrid.emails.requests
      metadata_path: metadata.csv
      prefix: sendgrid.emails.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 620
    source_type_name: SendGrid
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- ログの収集
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sendgrid
integration_id: sendgrid
integration_title: SendGrid
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sendgrid
public_title: SendGrid
short_description: Sendgrid のメトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Log Collection
  configuration: README.md#Setup
  description: Sendgrid のメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SendGrid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/sendgrid/sendgrid_dashboard_overview.png" alt="Datadog の Sendgrid ダッシュボード" popup="true">}}

## 概要

Twilio SendGrid は、企業がトランザクションメールやマーケティングメールの送信に使用するメールプラットフォームです。このインテグレーションを使用して、SendGrid のメール配信とエンゲージメントのメトリクスとログを収集します。

## 計画と使用

### SendGrid の API キーを生成する

1. [SendGrid アカウント][1]にログインします。
2. **Settings** ドロップダウンを開きます。
3. **API Keys** をクリックします。
4. 右上の **Create API Key** をクリックします。
5. _API Key Name_ を記入します。**Full Access**、またはアクセス制限のある場合は、**Stats** - **Read Access** および **User Account** - **Read Access** を選択します。
6. API キーを安全な場所にコピーします。API キーは、Datadog のユーザーインターフェイスで SendGrid インテグレーションを設定する際に必要になります。

### ブラウザトラブルシューティング

#### メトリクスの送信

1. Datadog の [SendGrid インテグレーションタイル][2]内のコンフィギュレーションタブに移動します。
2. Datadog の SendGrid アカウントに固有の識別名を入力します。
3. 上記の手順で生成した API キーを貼り付けます。
4. オプションで、カスタムタグを追加して、このインテグレーションのために収集されたすべてのメトリクスにタグを関連付けます。

#### ログを送信する

1. Datadog の [SendGrid インテグレーションタイル][2]内に、生成された URL をコピーします。
2. [SendGrid アカウント][1]に移動します。
3. **Settings** ドロップダウンを開きます。
4. **Mail Settings** をクリックします。
5. **Event Webhook** の設定の **Edit** をクリックします。
6. ステップ 1 で生成した URL を、**HTTP Post URL** に貼り付けます。
7. **Authorization Method** を _None_ に設定したままにします。
8. 受け取る配信やエンゲージメントイベントの内容を選択します。
9. **Event Webhook Status** を有効にします。
10. **Save** をクリックします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "sendgrid" >}}


### ワークフローの自動化

Sendgrid の配信とエンゲージメントイベントは、ソース `sendgrid` の下にログとして表示されます。

### ヘルプ

SendGrid インテグレーションには、イベントは含まれません。

### ヘルプ

SendGrid インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.sendgrid.com/
[2]: https://app.datadoghq.com/account/settings#integrations/sendgrid
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/sendgrid/metadata.csv
[4]: https://docs.datadoghq.com/ja/help