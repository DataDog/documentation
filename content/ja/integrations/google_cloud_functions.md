---
categories:
- cloud
- google cloud
- log collection
custom_kind: integration
dependencies: []
description: 関数実行時間の最小、最大、平均を追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_functions/
draft: false
git_integration_title: google_cloud_functions
has_logo: true
integration_id: google-cloud-functions
integration_title: Google Cloud Functions
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_functions
public_title: Datadog-Google Cloud Functions インテグレーション
short_description: 関数実行時間の最小、最大、平均を追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。

Google Functions からメトリクスを取得して、以下のことができます。

- 関数のパフォーマンスを視覚化。
- 関数のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud Function のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Function のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Function のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-cloud-functions" >}}


### イベント

Google Cloud Functions インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/
