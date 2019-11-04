---
categories:
  - cloud
  - data store
  - google cloud
  - log collection
ddtype: クローラー
dependencies: []
description: Spanner インスタンスのリソース使用状況を追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_spanner/'
git_integration_title: google_cloud_spanner
has_logo: true
integration_title: Google Spanner
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_spanner
public_title: Datadog-Google Spanner インテグレーション
short_description: Spanner インスタンスのリソース使用状況を追跡
version: '1.0'
---
## 概要
Google Cloud Spanner は、初めて強力な一貫性と水平方向の拡張性を兼ね備えた唯一のリレーショナルデータベースサービスです。

Google Spanner からメトリクスを取得して、以下のことができます。

* Spanner データベースのパフォーマンスを視覚化できます。
* Spanner データベースのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### メトリクスの収集
#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

### ログの収集

Google Cloud Spanner のログは、Stackdriver を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][4]してください。

これが完了したら、Google Cloud Spanner のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][5]に移動し、Google Cloud Spanner のログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

{{< img src="integrations/google_cloud_spanner/export_spanner_instance.png" alt="Export Google Cloud Spanner Logs to Pub Sub" responsive="true">}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_spanner" >}}


### イベント
Google Cloud Spanner インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Spanner インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_spanner/google_cloud_spanner_metadata.csv
[3]: https://docs.datadoghq.com/ja/help
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer


{{< get-dependencies >}}