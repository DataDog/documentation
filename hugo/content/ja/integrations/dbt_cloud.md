---
app_id: dbt-cloud
app_uuid: b237cca3-e51e-400b-ae1d-960d0cab286b
assets:
  dashboards:
    dbt Cloud Overview: assets/dashboards/dbt_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - dbt_cloud.runs.total
      metadata_path: metadata.csv
      prefix: dbt_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24633362
    source_type_name: DBT Cloud
  monitors:
    High runs error rate: assets/monitors/high_runs_error_rate.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- developer tools
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: dbt_cloud
integration_id: dbt-cloud
integration_title: dbt Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dbt_cloud
public_title: dbt Cloud
short_description: dbt Cloud アカウントから、実行の統計、ジョブ パフォーマンスなどを取得します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Developer Tools
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: dbt Cloud アカウントから、実行の統計、ジョブ パフォーマンスなどを取得します。
  media:
  - caption: dbt Cloud ダッシュボード
    image_url: images/dbt-dashboard-screenshot.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
  support: README.md#Support
  title: dbt Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Datadog の [dbt Cloud][1] インテグレーションを利用すると、dbt の実行、モデル、テストに関する主要なメトリクスを収集し、可視化できます。dbt Cloud を Datadog と統合することで、次のことが可能になります。

- dbt の実行のパフォーマンスと健全性を監視する
- 実行、モデル、テストの実行時間、コンパイル時間、ステータス コードを可視化する
- スタック内の他サービスのデータと dbt メトリクスを関連付ける

## セットアップ

### 前提条件

- dbt Cloud アカウント
- 必要な権限を持つ API トークン

### ステップ 1: dbt Cloud で API Token を生成する

1. dbt Cloud で **User Profile** > **API Tokens** > **Service Tokens** を開きます。
2. **+ Create Service Token** をクリックします。
3. トークンの名前を入力します。
4. トークンの権限を次のように設定します。
   - Administrative API メトリクスの場合は、トークンに runs と jobs へのアクセス権があることを確認します。
   - Discovery API メトリクスの場合 (任意) は、トークンに **Metadata API** の権限があり、プロジェクトで [Discovery API を有効化][2] 済みであることを確認します。
5. **Save** をクリックし、生成された **API Token** をコピーします。

### ステップ 2: dbt Cloud アカウントを Datadog に接続する

1. Datadog プラットフォームで **Integrations** に移動します。
2. **dbt Cloud** を検索し、インテグレーションを選択します。
3. アカウント ドメイン、metadata ドメイン (任意)、API トークンを入力します。
4. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "dbt_cloud" >}}


### サービス チェック

dbt Cloud インテグレーションには、サービス チェックは含まれません。

### イベント

dbt Cloud インテグレーションには、イベントは含まれません。

## 参考資料

お役に立つドキュメント、リンクや記事:
- [Datadog で dbt Cloud を監視する][3]

## トラブルシューティング

お困りの際は、[Datadog サポート][4] までお問い合わせください。

[1]: https://www.getdbt.com/product/dbt-cloud
[2]: https://docs.getdbt.com/docs/dbt-cloud-apis/discovery-api
[3]: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
[4]: https://docs.datadoghq.com/ja/help/