---
app_id: oceanbase-cloud
app_uuid: a42252f6-63f8-4da8-bce9-c765f30e7771
assets:
  dashboards:
    OceanBase Cloud Overview: assets/dashboards/oceanbasecloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: oceanbase_cloud.sql_all_count
      metadata_path: metadata.csv
      prefix: oceanbase_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15206722
    source_type_name: OceanBase Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://en.oceanbase.com
  name: OceanBase
  sales_email: OceanBaseSales@oceanbase.com
  support_email: eco-products@service.oceanbase.com
categories:
- cloud
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/oceanbasecloud/README.md
display_on_public_website: true
draft: false
git_integration_title: oceanbasecloud
integration_id: oceanbase-cloud
integration_title: OceanBase Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oceanbasecloud
public_title: OceanBase Cloud
short_description: Datadog で OceanBase Cloud クラスターを監視する
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
  - Offering::Integration
  - Category::Cloud
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Datadog で OceanBase Cloud クラスターを監視する
  media:
  - caption: OceanBase Cloud Datadog ダッシュボードの概要
    image_url: images/ob-dashboard.jpg
    media_type: image
  - caption: OceanBase Cloud Datadog ダッシュボードからのホスト パフォーマンス メトリクス
    image_url: images/ob-host.jpg
    media_type: image
  - caption: OceanBase Cloud Datadog ダッシュボードからの SQL パフォーマンス メトリクス
    image_url: images/ob-sql.jpg
    media_type: image
  - caption: OceanBase Cloud Datadog ダッシュボードからのトランザクション メトリクス
    image_url: images/ob-transaction.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: OceanBase Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[OceanBase データベース][1] は 分散リレーショナル データベースです。OceanBase データベースは、分散アーキテクチャのスケーラビリティと集中型アーキテクチャの高いパフォーマンスを兼ね備えた 独自開発の統合アーキテクチャを採用しています。

[OceanBase Cloud][2] は、グローバル クラウド インフラストラクチャー上で、弾力的なスケーラビリティ、超高速 パフォーマンス、高い互換性を備えた フル マネージド データベース サービスを提供します。

OceanBase Cloud インテグレーションを使用すると、Datadog で OceanBase Cloud 上に作成したデータベース クラスターの稼働状況、クラスター パフォーマンス、クラスター ヘルスなど、さまざまな監視データを収集できます。

## セットアップ

OceanBase Cloud クラスター用に Datadog integration を設定するには、次の手順を参照してください。
1. Datadog コンソールにログインします。
    a. [Datadog Sites][3] から適切な Site を選択します。
    b. Datadog 資格情報でログインします。
2. OceanBase Cloud の資格情報で OceanBase Cloud コンソールにログインし、[Integrations][4] ページへ移動して Datadog インテグレーションを検索します。
3. Connect をクリックします。Datadog 認可ページへリダイレクトされます。事前に Datadog へログインしていない場合は Site を選択し、表示された認可ページでログインする必要があります。
4. Authorize をクリックします。その後、OceanBase Cloud コンソールへ戻り、認可に成功したことを示す通知が表示されます。エラーが発生した場合は OceanBase Cloud テクニカル サポートへ連絡してください。
5. Datadog コンソールで OceanBase を検索し、Install をクリックします。数分後に Datadog Dashboards ページに OceanBase Cloud インスタンスの監視データが表示されます。

## アンインストール

1. OceanBase Cloud コンソールにログインし、[OceanBase Cloud Integrations][4] へ移動して Datadog 製品を検索します。
2. Remove ボタンをクリックすると、成功した場合は通知が表示されます。

このインテグレーションをアンインストールすると、以前のすべての認可が取り消されます。さらに、API Keys ページでインテグレーション名を検索し、このインテグレーションに関連するすべての API キーが無効化されていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oceanbase-cloud" >}}


### サービス チェック

OceanBase Cloud インテグレーションには サービス チェックは含まれません。

### イベント

OceanBase Cloud integration には イベントは含まれません。

## トラブルシューティング

お困りの際は、[OceanBase サポート][6] へお問い合わせください。

[1]: https://en.oceanbase.com
[2]: https://en.oceanbase.com/product/cloud
[3]: https://docs.datadoghq.com/ja/getting_started/site
[4]: https://cloud.oceanbase.com/integrations
[5]: https://github.com/DataDog/integrations-extras/blob/master/oceanbasecloud/metadata.csv
[6]: https://en.oceanbase.com/docs/oceanbase-cloud
