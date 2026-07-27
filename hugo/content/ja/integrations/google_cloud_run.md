---
app_id: google-cloud-run
app_uuid: 20ba733c-60a3-4c78-9c54-0f86025d6ea6
assets:
  dashboards:
    gcp_cloudrun: assets/dashboards/gcp_cloudrun.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.run.container.cpu.allocation_time
      metadata_path: metadata.csv
      prefix: gcp.run.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 233
    source_type_name: Google Cloud Run
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- コンテナ
- google cloud
- ログの収集
- オーケストレーション
custom_kind: インテグレーション
dependencies: []
description: クラスターからメトリクス、トレース、ログを収集し、Datadog で分析します。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  tag: ブログ
  text: Datadog で Cloud Run を監視する
- link: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  tag: ブログ
  text: Google Cloud Run メトリクスの収集方法
- link: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  tag: ブログ
  text: Google Cloud Run を監視するための主要メトリクス
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: ドキュメント
  text: Google Cloud Run for Anthos
git_integration_title: google_cloud_run
has_logo: true
integration_id: google-cloud-run
integration_title: Google Cloud Run
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_run
public_title: Google Cloud Run
short_description: マネージド コンピューティング プラットフォーム上で、 HTTP リクエストにより呼び出されるステートレス コンテナを実行します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Containers
  - Category::Google Cloud
  - Category::Log Collection
  - Category::Orchestration
  - Offering::Integration
  configuration: README.md#Setup
  description: マネージド コンピューティング プラットフォーム上で、 HTTP リクエストにより呼び出されるステートレス コンテナを実行します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  support: README.md#Support
  title: Google Cloud Run
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Cloud Run は、HTTP リクエストを使って呼び出し可能なステートレスコンテナを実行できるマネージド型のコンピューティングプラットフォームです。

このインテグレーションを有効にしてコンテナをインスツルメンテーションすると、Cloud Run のメトリクス、トレース、ログのすべてを Datadog に表示できます。

Cloud Run for Anthos の詳細については、[Google Cloud Run for Anthos ドキュメント][1]を参照してください。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][2]をセットアップして、すぐに使えるメトリクスの収集を開始します。カスタムメトリクスを設定するには、[Serverless ドキュメント][3]を参照してください。

### ログ収集

#### インテグレーション
Google Cloud Run は[監査ログ][4]も公開します。
Google Cloud Run のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][5]。

これが完了したら、Google Cloud Run のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][6]に移動し、Google Cloud Run のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

#### 直接ロギング
Cloud Run サービスから Datadog へのアプリケーションの直接ロギングについては、[Serverless ドキュメント][3]を参照してください。

### トレーシング

フルマネージド Google Cloud Run に特化した Agent の設定手順については、[Serverless ドキュメント][3]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_run" >}}


### イベント

Google Cloud Functions インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_run_for_anthos/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[3]: https://docs.datadoghq.com/ja/serverless/google_cloud_run
[4]: https://cloud.google.com/run/docs/audit-logging
[5]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/logs/viewer
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/