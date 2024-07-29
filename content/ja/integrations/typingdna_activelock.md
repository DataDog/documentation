---
app_id: typingdna-activelock
app_uuid: e4eb4314-400c-4c30-8842-60d74e7f455a
assets:
  dashboards:
    TypingDNA ActiveLock: assets/dashboards/TypingDNAActiveLock.json
  integration:
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: TypingDNA ActiveLock
author:
  homepage: https://www.typingdna.com/contact
  name: TypingDNA
  sales_email: datadog.support@typingdna.com
  support_email: datadog.support@typingdna.com
categories:
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/typingdna_activelock/README.md
display_on_public_website: true
draft: false
git_integration_title: typingdna_activelock
integration_id: typingdna-activelock
integration_title: TypingDNA ActiveLock
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: typingdna_activelock
public_title: TypingDNA ActiveLock
short_description: TypingDNA ActiveLock のログを閲覧・分析することができます。
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: TypingDNA ActiveLock のログを閲覧・分析することができます。
  media:
  - caption: Datadog のカスタムダッシュボードで TypingDNA ActiveLock のログを閲覧・分析することができます。
    image_url: images/TypingDNAActiveLock.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: TypingDNA ActiveLock
---




## 概要

[TypingDNA ActiveLock][1] は、タイピングパターンを検出し、コンピューターをロックして機密データを保護することで、会社のコンピューターへの不正アクセスを防止するための継続的エンドポイント認証アプリです。

このインテグレーションにより、ActiveLock アプリから Datadog にログを送信し、すぐに使えるダッシュボードで組織のコンピューターを監視することができます。

Datadog でデータを視覚化するためには、カスタム ActiveLock アプリを構成してインストールする必要があります。これは、会社のすべてのコンピューターに同じようにインストールします。


## セットアップ

### コンフィギュレーション

Datadog API キーを生成するには

1. Datadog アカウントの [Organization settings > API keys][2] に移動します。
2. API キーを生成するには、**+ New Key** をクリックします。

カスタムインストールアプリを入手するには

1. [このカスタムインストールフォーム][3]に、新しく生成された API キー、[Datadog サイト][4]、会社情報を送信します。
2. 会社のコンピューターにインストールする ActiveLock カスタムアプリと、インストール方法をメールでお知らせします。
    a. このインストールでは、初期に 10 席の制限があり、デフォルトで 30 日間の試用期間が設けられています。試用制限を解除するには、完全な商用ライセンスが必要です。商用ライセンスをお持ちでない場合は、ライセンスについて [TypingDNA][5] にお問い合わせいただくか、弊社をご紹介いただいた販売店/パートナーにお問い合わせください。
3. インストール後、ActiveLock のログが[ログエクスプローラー][6]に表示されるようになるはずです。

なお、販売店/パートナー経由で購入された場合は、その指示に従ってカスタムインストールアプリ (および商用ライセンス) を入手してください。


### 検証

Datadog で ActiveLock のログを見るには、[ログエクスプローラー][6]に移動して、検索クエリに `source:typingdna` または `service:activelock` を入力します。

ダッシュボードにアクセスするには、[ダッシュボードリスト][7]に移動して、**TypingDNA ActiveLock** ダッシュボードを検索します。


## 収集データ

### ログの収集

TypingDNA ActiveLock のログは、各アプリケーションから直接 Datadog に収集され送信されます。

## トラブルシューティング

ヘルプが必要ですか？[Datadog][8] または [TypingDNA サポート][5]にご連絡ください。

[1]: https://www.typingdna.com/activelock
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://www.typingdna.com/clients/altrial
[4]: https://docs.datadoghq.com/ja/getting_started/site/#access-the-datadog-site
[5]: https://www.typingdna.com/contact
[6]: https://app.datadoghq.com/logs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://docs.datadoghq.com/ja/help/