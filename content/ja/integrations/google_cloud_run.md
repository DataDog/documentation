---
categories:
- cloud
- コンテナ
- google cloud
- ログの収集
- オーケストレーション
dependencies: []
description: クラスターからメトリクス、トレース、ログを収集し、Datadog で分析します。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-google-cloud-run-with-datadog/
  tag: ブログ
  text: Datadog を使用した Google Cloud Run の監視
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: ドキュメント
  text: Google Cloud Run for Anthos
git_integration_title: google_cloud_run
has_logo: true
integration_id: google-cloud-run
integration_title: Google Cloud Run
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_run
public_title: Datadog-Google Cloud Run インテグレーション
short_description: クラスターからメトリクス、トレース、ログを収集し、Datadog で分析します。
version: '1.0'
---

## 概要

Cloud Run は、HTTP リクエストを使って呼び出し可能なステートレスコンテナを実行できるマネージド型のコンピューティングプラットフォームです。

このインテグレーションを有効にしてコンテナをインスツルメンテーションすると、Cloud Run のメトリクス、トレース、ログのすべてを Datadog に表示できます。

Cloud Run for Anthos の詳細については、[Google Cloud Run for Anthos ドキュメント][1]を参照してください。

## セットアップ

### メトリクスの収集

#### APM に Datadog Agent を構成する

[Google Cloud Platform インテグレーション][2]をセットアップして、すぐに使えるメトリクスの収集を開始します。カスタムメトリクスを設定するには、[Serverless ドキュメント][3]を参照してください。

### ログの収集

#### インテグレーション
Google Cloud Run は、[監査ログ][4]も公開します。
Google Cloud Run のログは、Google Cloud Logging を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][5]してください。

これが完了したら、Google Cloud Run のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][6]に移動し、Google Cloud Run のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

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

### サービスのチェック

Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

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