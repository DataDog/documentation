---
app_id: split
app_uuid: 690989fe-dca5-4394-b38a-86f9770dd470
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: split.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10008
    source_type_name: Split
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Split
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- notifications
- event management
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split/README.md
display_on_public_website: true
draft: false
git_integration_title: split
integration_id: split
integration_title: Split
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: split
public_title: Split
short_description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::構成 & デプロイ
  - Category::Notifications
  - Category::Event Management
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Split
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Split][1] は、[ロールアウトを制御して行う][2]ためのプラットフォームです。目的の機能を簡単かつ安全な方法で顧客に提供でき、ビジネスの規模に関係なく、極めて優れたユーザーエクスペリエンスを実現すると共にリスクを軽減します。

Split を Datadog と統合すると、以下のことができます。

- イベントストリームに Split の changelog を追加することで、機能の変更の前後関係を確認できます。
- 機能の影響をアプリケーションのパフォーマンスと関連付けることができます。
- 重要な問題が発生する前にそれを回避できます。Datadog のメトリクスとアラートに基づいて、機能を事前に無効にできます。

Real User Monitoring (RUM) データを Split 機能フラグで充実させ、パフォーマンスや動作の変化を可視化するには、[Split-RUM インテグレーションページ][3]を参照してください。

## セットアップ

- **Datadog で**: API キー <span class="hidden-api-key">\${api_key}</span>を作成

- **Split で**: **Admin Settings** で **Integrations** をクリックし、Marketplace に移動します。Datadog の横にある Add をクリックします。<br/>

![Split のスクリーンショット][4]

- Datadog API キーを貼り付け、Save をクリックします。

![Split のスクリーンショット][5]

Split のデータが Datadog に届きます。

### 機能フラグ追跡インテグレーション

RUM Browser SDK での機能フラグ追跡のセットアップについては、[Split-RUM インテグレーションページ][3]を参照してください。

## 収集データ

### メトリクス

Split チェックには、メトリクスは含まれません。

### イベント

Split リスト/リスト除外イベントを [Datadog のイベントストリーム][6]にプッシュします。

### サービスチェック

Split チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://docs.datadoghq.com/ja/integrations/split-rum/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[6]: https://docs.datadoghq.com/ja/events/
[7]: https://docs.datadoghq.com/ja/help/
