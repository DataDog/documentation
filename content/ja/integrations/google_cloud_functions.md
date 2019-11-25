---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: クローラー
dependencies: []
description: 関数の最小、最大、平均実行時間を追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_functions/'
git_integration_title: google_cloud_functions
has_logo: true
integration_title: Google Cloud Functions
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_functions
public_title: Datadog-Google Cloud Functions インテグレーション
short_description: 関数の最小、最大、平均実行時間を追跡
version: '1.0'
---
## 概要
Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。

Google Functions からメトリクスを取得して、以下のことができます。

* 関数のパフォーマンスを視覚化できます。
* 関数のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### メトリクスの収集
#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

### ログの収集

Google Cloud Function のログは、Stackdriver を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][4]してください。

これが完了したら、Google Cloud Function のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][5]に移動し、Google Cloud Function のログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

{{< img src="integrations/google_cloud_functions/export_cloud_function.png" alt="Export Google Cloud Function Logs to Pub Sub" responsive="true">}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_functions" >}}


### イベント
Google Cloud Functions インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[3]: https://docs.datadoghq.com/ja/help
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer


{{< get-dependencies >}}