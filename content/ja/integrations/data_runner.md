---
app_id: data-runner
app_uuid: ad7b5a3c-497d-45e0-9bcf-50f2d1365247
assets: {}
author:
  homepage: https://datadoghq.com
  name: Datadog
  sales_email: sales@datadog.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/data_runner/README.md
display_on_public_website: true
draft: false
git_integration_title: data_runner
integration_id: data-runner
integration_title: The Data Runner
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: data_runner
public_title: The Data Runner
short_description: メトリクスを探す Datadog ダッシュボードの放置ゲーム。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::UI Extension
  configuration: README.md#Setup
  description: メトリクスを探す Datadog ダッシュボードの放置ゲーム。
  media:
  - caption: The Data Runner
    image_url: images/data-runner.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: The Data Runner
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Data Runner は、プレイヤーが指定したメトリクスを、キャラクターがライブラリ環境から探し出すゲームです。キャラクターが指定されたメトリクスを見つけると、メトリクスの値がプレイヤーのスコアに加算されます。Data Runner はウィジェットとして Datadog のダッシュボードに追加することができます。

この拡張機能は、ネイティブではサポートされていないサードパーティコンテンツでユーザーインターフェイスを拡張する [Datadog アプリ][1]によって実現されます。もし、ビジネスや遊びで Datadog の体験を拡張することに興味があれば、[独自のアプリやゲームを作り上げる][1]ことが可能です。

Data Runner の詳細については、GitHub の [stuartlangridge/data-runner][2] を参照してください。

## 計画と使用

1. Data Runner をダッシュボードに表示するには、ウィジェットを追加したい[ダッシュボード][3]を開きます。

2. **+ Add Widgets** ボタンで、利用可能なウィジェットの一覧を表示します。Data Runner ウィジェットをダッシュボード上の希望の位置にドラッグアンドドロップします。

3. ゲームキャラクターが探すメトリクスを選びます。

## リアルユーザーモニタリング

### データセキュリティ

Data Runner は、メトリクスを提供しません。

### ヘルプ

Data Runner には、イベントは含まれません。

### ヘルプ

Data Runner には、サービスのチェック機能は含まれません。

## Agent

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

独自の Datadog アプリを構築するには、[Datadog アプリの開発者向けドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/developers/datadog_apps
[2]: https://github.com/stuartlangridge/data-runner
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://www.datadoghq.com/support/