---
app_id: split
app_uuid: 690989fe-dca5-4394-b38a-86f9770dd470
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: split.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Split
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split/README.md
display_on_public_website: true
draft: false
git_integration_title: split
integration_id: split
integration_title: Split
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: split
oauth: {}
public_title: Split
short_description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
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
  - Category::通知
  configuration: README.md#Setup
  description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Split
---



## 概要

[Split][1] は、[ロールアウトを制御して行う][2]ためのプラットフォームです。目的の機能を簡単かつ安全な方法で顧客に提供でき、ビジネスの規模に関係なく、極めて優れたユーザーエクスペリエンスを実現すると共にリスクを軽減します。

Split を Datadog と統合すると、以下のことができます。

- イベントストリームに Split の changelog を追加することで、機能の変更の前後関係を確認できます。
- 機能の影響をアプリケーションのパフォーマンスと関連付けることができます。
- 重要な問題が発生する前にそれを回避できます。Datadog のメトリクスとアラートに基づいて、機能を事前に無効にできます。

## セットアップ

- **Datadog で**: API キー <span class="hidden-api-key">\${api_key}</span>を作成

- **Split で**: **Admin Settings** で **Integrations** をクリックし、Marketplace に移動します。Datadog の横にある Add をクリックします。<br/>

![Split のスクリーンショット][3]

- Datadog API キーを貼り付け、Save をクリックします。

![Split のスクリーンショット][4]

Split のデータが Datadog に届きます。

## 収集データ

### メトリクス

Split チェックには、メトリクスは含まれません。

### イベント

Split リスト/リスト除外イベントを [Datadog のイベントストリーム][5]にプッシュします。

### サービスのチェック

Split チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[5]: https://docs.datadoghq.com/ja/events/
[6]: https://docs.datadoghq.com/ja/help/