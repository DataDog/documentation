---
app_id: census
app_uuid: 7f4f3919-5b0a-4b4b-93e5-7f0c035f3887
assets:
  dashboards:
    Census Overview: assets/dashboards/census_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check:
      - census.syncs.rows_processed
      - census.syncs.sync_completed
      metadata_path: metadata.csv
      prefix: census
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10336
    source_type_name: Census
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.getcensus.com/
  name: Census
  sales_email: sales@getcensus.com
  support_email: support@getcensus.com
categories:
- 自動化
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/census/README.md
display_on_public_website: true
draft: false
git_integration_title: census
integration_id: census
integration_title: Census
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: census
public_title: Census
short_description: Census 同期のメトリクスとイベントを Datadog に送信します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Census 同期のメトリクスとイベントを Datadog に送信します。
  media:
  - caption: Census 同期の概要 - ダッシュボード
    image_url: images/census_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Census
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Census][1] は、データウェアハウスをマーケティングとビジネスオペレーションのハブにするリバース ETL プラットフォームで、信頼性の高い実用的なデータでチームを強化します。データウェアハウスのような信頼できるソースから、CRM、広告プラットフォーム、その他の SaaS アプリのようなアクションのシステムへデータを同期し、データを運用化することができます。

Census は Datadog と統合し、開発者が Census のワークフローを監視し、成功した同期と失敗した同期の数を追跡する機能を提供します。このインテグレーションは、Census から Datadog に[メトリクス](#metrics)とイベントを送信します。

## 要件

このインテグレーションを有効にするには、Census Platform Tier (またはそれ以上) のサブスクリプションが必要です。

## セットアップ

1. [Census アカウント][2]にログインします。
2. Datadog アカウントに接続したい Census ワークスペースに移動します。
3. ワークスペースの設定タブに移動し、Datadog タイルの **Configure** をクリックします。
4. **Connect** をクリックし、OAuth2 を通じて Datadog アカウントに接続します。
5. Datadog に戻り、すぐに使える Census ダッシュボードを開きます。

### 検証

Census ワークスペース上で同期を実行し、Datadog アカウントの Census ダッシュボード上で対応するメトリクスとイベントを確認します。同期のイベントとメトリクスは、同期完了後に Datadog に送信されるまでに数分かかる場合があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "census" >}}


### サービスチェック

Census には、サービスのチェック機能は含まれません。

### イベント

このインテグレーションは、Datadog に同期完了イベントを送信します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://www.getcensus.com/
[2]: https://app.getcensus.com/
[3]: https://github.com/DataDog/integrations-extras/blob/master/census/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/
