---
categories:
  - cloud
  - google cloud
  - ログの収集
ddtype: crawler
dependencies: []
description: Google Cloud Dataflow のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_dataflow/'
git_integration_title: google_cloud_dataflow
has_logo: true
integration_title: Google Cloud Dataflow
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_dataflow
public_title: Datadog-Google Cloud Dataflow インテグレーション
short_description: Google Cloud Dataflow のキーメトリクスを追跡
version: '1.0'
---
## 概要

Google Cloud Dataflow は、ストリーム (リアルタイム) モードとバッチ (履歴) モードのどちらでも、同等の信頼性と表現力でデータを変換し、強化することができる、フルマネージド型のサービスです。

Datadog Google Cloud インテグレーションを使用して、Google Cloud Dataflow からメトリクスを収集できます。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

### ログの収集

Google Cloud Dataflow のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

これが完了したら、Google Cloud Dataflow のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud Dataflow のログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

    {{< img src="integrations/google_cloud_dataflow/export_dataflow_step.png" alt="Dataflow のログを Pub Sub にエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_dataflow" >}}


### イベント

Google Cloud Dataflow インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Dataflow インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/