---
categories:
  - cloud
  - google cloud
  - web
  - log collection
ddtype: crawler
dependencies: []
description: Firebase サービスに関するネットワークとデータストアの使用状況を追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_firebase/
draft: false
git_integration_title: google_cloud_firebase
has_logo: true
integration_id: google-cloud-firebase
integration_title: Google Cloud Firebase
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_firebase
public_title: Datadog-Google Cloud Firebase インテグレーション
short_description: Firebase サービスに関するネットワークとデータストアの使用状況を追跡。
version: '1.0'
---
## 概要

Firebase は、高品質のアプリを迅速に開発し、ユーザー基盤を成長させ、収益の増大を可能にするモバイルプラットフォームです。

Google Firebase からメトリクスを取得して、以下のことができます。

- Firebase のデータベースおよびホスティングサービスのパフォーマンスを視覚化。
- Firebase ツールのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### ログの収集

Google Firebase のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用した Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用して Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Firebase のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Firebase のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_firebase" >}}


### イベント

Google Firebase インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Firebase インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/