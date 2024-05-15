---
app_id: mailgun
app_uuid: 40d251a6-a42d-42e2-8d06-75f7aac35dc7
assets:
  dashboards:
    mailgun: assets/dashboards/mailgun_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mailgun.emails.accepted.total
      metadata_path: metadata.csv
      prefix: mailgun.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 623
    source_type_name: Mailgun
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- モニター
dependencies: []
description: Datadog で Mailgun のメール配信とエンゲージメントの統計情報を監視します。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/mailgun/
draft: false
git_integration_title: mailgun
has_logo: false
integration_id: mailgun
integration_title: Mailgun
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: mailgun
public_title: Mailgun
short_description: 開発者のメール送信、追跡、受信を支援するクラウドベースのメールサービス
supported_os: []
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Metrics
  configuration: README.md#Setup
  description: 開発者のメール送信、追跡、受信を支援するクラウドベースのメールサービス
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Mailgun
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Mailgun は API ベースのメール配信プラットフォームで、これにより以下のことが可能になります。

- 大規模なメールマーケティングアプリケーションを構築し、管理する。
- トランザクションメッセージを送信し、追跡する。
- 無効なメールアドレスをリストから削除する。
- 配信率を向上させ、コンバージョン率を高める。

Datadog とインテグレーションすることで、メール配信やエンゲージメントのメトリクスやログを収集し、Mailgun サービスのパフォーマンスを追跡することができます。

## 計画と使用

### ドメインの追加と確認

1. [Mailgun アカウント][1]にログインします。
2. 左側のサイドバーで、**Sending** をクリックします。メニューが展開されます。**Domains** を選択します。
3. 右上の **Add New Domain** をクリックします。
4. ドメイン名とリージョンを入力し、**Add Domain** をクリックします。
5. [Mailgun ドキュメントの指示][2]に従って、ドメインを確認します。

### Mailgun API キーの表示

Mailgun にサインアップすると、プライマリアカウントの API キーがあなたのために作成されます。
このキーは、私たちの様々な API エンドポイントを通して、そしてあなたの送信ドメインのいずれに対しても、すべての CRUD 操作を実行することができます。

1. [Mailgun アカウント][1]にログインします。
2. 右上の自分の名前をクリックし、ドロップダウンを開きます。
3. **API Keys** をクリックします。
4. **Private API Key** の横にある目のアイコンをクリックします。

### メトリクスの収集を有効にする

1. Datadog の [Mailgun インテグレーションタイル][3]内のコンフィギュレーションタブに移動します。
2. ドメイン名とドメインのリージョンを入力します。
3. 上記の手順で確認した API キーを貼り付けます。
4. オプションで、カスタムタグを追加して、このインテグレーションのために収集されたすべてのメトリクスにタグを関連付けます。

### ログ収集の有効化

イベントをログとして Datadog に転送するように Mailgun を構成することができます。詳しくは、[Mailgun ドキュメント][4]の**メッセージの追跡 - Webhooks** のセクションをご覧ください。

1. [Mailgun インテグレーションタイル][3]の説明から、生成された URL をコピーします。
2. Mailgun アカウントにログインします。
3. 左側列の **Sending** をクリックします。
4. ドロップダウンの **Webhooks** をクリックします。
5. 右上の **Add webhook** をクリックします。
6. 追跡したいイベントの種類を選択します。
7. ステップ 1 で生成した URL を **URL** に貼り付けます。
8. **Create Webhook** をクリックします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "mailgun" >}}


### ワークフローの自動化

Mailgun のイベントは、ソース `mailgun` の下にログとして表示されます。

### ヘルプ

Mailgun インテグレーションには、イベントは含まれません。

### ヘルプ

Mailgun インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://login.mailgun.com/login/
[2]: https://help.mailgun.com/hc/en-us/articles/360026833053
[3]: https://app.datadoghq.com/integrations/mailgun
[4]: https://documentation.mailgun.com/en/latest/user_manual.html#webhooks-1
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/mailgun/mailgun_metadata.csv
[6]: https://docs.datadoghq.com/ja/help