---
app_id: harness-cloud-cost-management
app_uuid: 3eb2e9ef-2c9c-45b6-8f1c-8a900910f948
assets:
  dashboards:
    harness_cloud_cost_management_overview: assets/dashboards/harness_cloud_cost_management_overview.json
author:
  homepage: https://www.harness.io
  name: Harness IO
  sales_email: akash.bhardwaj@harness.io
  support_email: akash.bhardwaj@harness.io
categories:
- コスト管理
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/harness_cloud_cost_management/README.md
display_on_public_website: true
draft: false
git_integration_title: harness_cloud_cost_management
integration_id: harness-cloud-cost-management
integration_title: Harness クラウドコストマネジメント
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: harness_cloud_cost_management
public_title: Harness クラウドコストマネジメント
short_description: Harness のクラウドとクラスターのコストメトリクスを日付範囲で表示する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Harness のクラウドとクラスターのコストメトリクスを日付範囲で表示する
  media:
  - caption: クラウドコストマネジメントビデオ概要
    image_url: images/ccm_dashboard_video_thumbnail.png
    media_type: ビデオ
    vimeo_id: 637675885
  - caption: Datadog のクラウドコストマネジメントダッシュボード
    image_url: images/ccm_dashboard_on_datadog.png
    media_type: image
  - caption: Harness のクラウドコストマネジメントダッシュボード
    image_url: images/ccm_dashboard_on_harness.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Harness クラウドコストマネジメント
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Harness は、インフラストラクチャー、エンジニアリング、ファイナンスの各チームにまたがるクラウドコストマネジメントと透明性、強固なビジネスインテリジェンスを提供し、Intelligent Cloud AutoStopping と機械学習ベースの推奨機能により、無駄なクラウドコストの削減を実現します。

Datadog と Harness を使えば、以下のことが可能です。

- Harness のクラウドおよびクラスタコストデータを可視化
- コスト動向の把握とコスト予測
- リソースの適正化に関する推奨事項を取得する
- 支出上位のリソースを見直す


## 計画と使用

1. まだ Harness クラウドコストマネジメントの利用を開始していない場合は、14 日間のトライアルに[サインアップ][1]してください。

2. インテグレーションをインストールします。
3. Harness クラウドコストマネジメントダッシュボードにアクセスし、Harness のユーザー ID でログインして、いずれかのウィジェットに接続します。これにより、すべてのウィジェットで認証されます。

### ヘルプ

Harness クラウドコストマネジメントチェックには、イベントは含まれません。

### ヘルプ

Harness クラウドコストマネジメントチェックには、サービスのチェック機能は含まれません。

## Agent

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://app.harness.io/auth/#/signup/
[2]: https://docs.datadoghq.com/ja/help/