---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較。
doc_link: 'https://docs.datadoghq.com/integrations/google_app_engine/'
draft: false
git_integration_title: google_app_engine
has_logo: true
integration_id: google-app-engine
integration_title: Google App Engine
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_app_engine
public_title: Datadog-Google App Engine インテグレーション
short_description: プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較。
version: '1.0'
---
## 概要

Google App Engine インテグレーションをプロジェクトにインストールして、以下のことができます。

- Google App Engine サービスのメトリクス (メモリキャッシュ、タスクキュー、データストア) を確認できます。
- リクエストに関するメトリクス (表示パーセンタイル、レイテンシー、コスト) を確認できます。
- Google App Engine のメトリクスをバージョンごとにタグ付けし、異なるバージョンのパフォーマンスを比較できます。

Datadog にカスタムメトリクスを送信することもできます。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログの収集

Google App Engine のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

これが完了したら、Google App Engine のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][3]に移動し、Google App Engine のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_app_engine" >}}


### イベント

Google App Engine インテグレーションには、イベントは含まれません。

### サービスのチェック

Google App Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/