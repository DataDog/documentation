---
app_id: isdown
app_uuid: 22560cfe-27cc-492f-a978-64dfcdc3b3c0
assets:
  dashboards:
    IsDown: assets/dashboards/isdown_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10323
    source_type_name: IsDown
  oauth: assets/oauth_clients.json
author:
  homepage: https://isdown.app
  name: IsDown
  sales_email: sales@isdown.app
  support_email: support@isdown.app
categories:
- notifications
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/isdown/README.md
display_on_public_website: true
draft: false
git_integration_title: isdown
integration_id: isdown
integration_title: IsDown
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: isdown
public_title: IsDown
short_description: IsDown helps companies monitor all third-party status pages in
  one place
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Offering::Integration
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: IsDown helps companies monitor all third-party status pages in one
    place
  media:
  - caption: IsDown and Datadog Flow
    image_url: images/isdown_datadog_flow.jpg
    media_type: image
  - caption: IsDown Dashboards
    image_url: images/isdown_dashboards.jpg
    media_type: image
  - caption: Datadog Dashboard
    image_url: images/isdown_datadog_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/track-provider-outages-isdown-datadog/
  support: README.md#Support
  title: IsDown
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[IsDown][1] は、企業が依存関係を監視するのに役立つ、ステータスページの集計と障害監視ツールです。すべてのツールやクラウドプロバイダーにおける障害のリアルタイム監視と即時通知をチームに提供することができます。IsDown は 2000 以上のステータスページを監視します。

このインテグレーションにより、Datadog でサードパーティの依存関係からアラートを受信し、ビジネスに不可欠なサービスを監視し、障害の頻度を把握することが、すぐに使えるダッシュボード内で可能になります。

## セットアップ

1. 既存のアカウントを使用するか、[IsDown][1] で新規に作成します。
2. アカウントにログインし、**Notifications** ページに移動します。
3. チェックボックスをクリックして Datadog を選択し、**Connect to Datadog** をクリックします。
4. その後、アプリケーションを認可するために Datadog にリダイレクトされます。IsDown が Datadog にイベントやサービスチェックを送信するために必要なものにのみアクセスできる API キーを作成します。
5. 認可後、IsDown にリダイレクトされます。
6. 監視するサービスを選択します。
7. 各サービスに必要な通知設定を行います。


### アンインストール

1. IsDown の **Notifications** ページに移動します。
2. Datadog の選択を解除し、**Save** をクリックします。
3. Datadog の [API キー管理ページ][2]で IsDown を検索し、このインテグレーションに関連するすべての API キーが無効化されていることを確認します。


## 収集データ

### サービスチェック
{{< get-service-checks-from-git "isdown" >}}


### イベント

IsDown は、監視するサービスで障害が発生するたびに、イベントを送信します。イベントは 2 種類送信され、1 つは障害開始時、もう 1 つは障害終了時です。イベントは、以下の属性で送信されます。
- Title: 障害が発生したサービス名。
- Text: 障害の説明。
- Tags: `isdown` と `isdown:service_name`。

## トラブルシューティング

ご不明な点は、[IsDown のサポートチーム][4]までお問い合わせください。

## 参考資料

お役に立つドキュメント、リンクや記事:

[Track service provider outages with IsDown and Datadog][5]

[1]: https://isdown.app
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: assets/service_checks.json
[4]: mailto:support@isdown.app
[5]: https://www.datadoghq.com/blog/track-provider-outages-isdown-datadog/