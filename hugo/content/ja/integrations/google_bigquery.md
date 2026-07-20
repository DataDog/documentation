---
aliases:
- /ja/integrations/google_cloud_big_query/
categories:
- クラウド
- Google Cloud
- data stores
- ログの収集
custom_kind: インテグレーション
dependencies: []
description: クエリ数、実行回数、アップロードされたバイト数および行数などを追跡
doc_link: https://docs.datadoghq.com/integrations/google_bigquery/
draft: false
git_integration_title: google_bigquery
has_logo: true
integration_id: google-cloud-bigquery
integration_title: Google BigQuery
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_bigquery
public_title: Google BigQuery インテグレーション
short_description: クエリ数、実行回数、アップロードされたバイト数および行数などを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="プレビューに参加する！" >}}
   高度な BigQuery 監視はプレビュー中です。クエリ パフォーマンスへのインサイトを得るために、こちらのフォームから登録してください。
{{< /callout >}}


## 概要

BigQuery は、Google が提供するフルマネージド型の企業向け分析用データウェアハウスです。ペタバイト規模の処理を低コストで行うことができます。

Google BigQuery からメトリクスを取得して、以下のことができます。

- BigQuery クエリのパフォーマンスを視覚化。
- BigQuery クエリのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### ログ収集

Google BigQuery のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google BigQuery のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google BigQuery のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_bigquery" >}}


### イベント

Google BigQuery インテグレーションには、イベントは含まれません。

### サービスチェック

Google BigQuery インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/