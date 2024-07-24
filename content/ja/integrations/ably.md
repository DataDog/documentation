---
app_id: ably
app_uuid: 4596cd59-d3f2-4921-8133-3a448ccaea61
assets:
  dashboards:
    Ably: assets/dashboards/ably.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - ably.channels.mean
      - ably.channels.min
      - ably.channels.peak
      - ably.connections.all.mean
      - ably.connections.all.min
      - ably.connections.all.peak
      metadata_path: metadata.csv
      prefix: ably.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10340
    source_type_name: Ably
  oauth: assets/oauth_clients.json
author:
  homepage: https://ably.com
  name: Ably
  sales_email: sales@ably.com
  support_email: support@ably.com
categories:
- クラウド
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ably/README.md
display_on_public_website: true
draft: false
git_integration_title: ably
integration_id: ably
integration_title: Ably
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ably
public_title: Ably
short_description: Ably メトリクスの収集とグラフ化
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
  - Category::Cloud
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Ably メトリクスの収集とグラフ化
  media:
  - caption: Ably - ダッシュボード
    image_url: images/ably-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ably
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要
[Ably][1] プラットフォームは、世界中の拡張性の高い Web およびモバイルアプリケーションで、マルチプレイ、チャット、データ同期、データ放送、通知などのリアルタイムのユースケースを実現するために使用されています。Ably の API を利用することで、エンジニアはサーバーやクラウドインフラストラクチャーの準備や保守をする必要がなく、コア機能の構築に集中することができます。

Ably Datadog インテグレーションは、[Ably 統計][2]メトリクスを Datadog アカウントに直接送信します。

Ably の Datadog インテグレーションを使用すると、次のことができます。
- [Ably 統計][2]を Datadog の他のキーメトリクスと並べて使う
- Ably メッセージ、チャンネル、接続の使用状況を相関させ、Datadog ダッシュボードで共同分析を行う
- Datadog で Ably の利用統計を表示・追跡する

## 計画と使用

- **Datadog で**: **Integrations** に移動し、Ably タイルを選択し、**Install Integration** をクリックします。

- **Connect Accounts** をクリックし、このインテグレーションの認可を開始します。[Ably][1] にリダイレクトされます。

- **Ably で**: ログインして、**Your Apps** に移動します。

![Ably のスクリーンショット][3]

- **Datadog Integration** を設定したい **Ably App** を選択し、**Integrations** をクリックします。

![Ably のスクリーンショット][4]

- **Connect to Datadog** ボタンをクリックし、このインテグレーションの認可を開始します。

- Datadog の認可ページにリダイレクトされます。

- **Authorise** ボタンをクリックすると、設定が完了し、Ably のサイトに戻ります。

![Ably のスクリーンショット][5]

Ably App の統計情報が Datadog に表示されるようになりました。

## リアルユーザーモニタリング

Ably 統計の詳細については、[アプリケーション統計ドキュメント][2]をお読みください。

### データセキュリティ
{{< get-metrics-from-git "ably" >}}


### ヘルプ

Ably インテグレーションには、イベントは含まれません。

### ヘルプ

Ably インテグレーションには、サービスのチェック機能は含まれません。

## アンインストール

- **Ably で**: https://ably.com にアクセスし、ログインして、**Your Apps** に移動します。

- **Datadog Integration** をアンインストールしたい Ably App を選択します。

- **Datadog Integration** セクションの **Remove** ボタンをクリックします。

![Ably のスクリーンショット][7]

Ably App の統計情報は Datadog に送信されなくなりました。

- **Datadog で**: **Integrations** に移動し、Ably タイルを選択し、**Uninstall Integration** をクリックします。

このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。

また、[API Keys ページ][8]でインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。

## Agent
ご不明な点は、[Ably のサポートチーム][9]までお問い合わせください。

[1]: https://ably.com
[2]: https://ably.com/docs/general/statistics
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/your-apps.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/integrations.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/setup-integration.png
[6]: https://github.com/DataDog/integrations-extras/blob/master/ably/metadata.csv
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/uninstall-integration.png
[8]: https://app.datadoghq.com/organization-settings/api-keys?filter=Ably
[9]: https://ably.com/support