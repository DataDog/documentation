---
categories:
  - cloud
  - google cloud
  - ログの収集
ddtype: crawler
dependencies: []
description: Google Cloud Load Balancing のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/'
draft: false
git_integration_title: google_cloud_loadbalancing
has_logo: true
integration_title: Google Cloud Load Balancing
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_loadbalancing
public_title: Datadog-Google Cloud Load Balancing インテグレーション
short_description: Google Cloud Load Balancing のキーメトリクスを追跡
version: '1.0'
---
## 概要

Google Cloud Load Balancing を使用すると、負荷分散されたコンピューティングリソースを単一または複数のリージョンに分配し、高可用性要件を満たすことができます。また、1 つのエニーキャスト IP の背後にリソースを置き、インテリジェントなオートスケーリング機能を使用してリソースをスケーリングできます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Load Balancing からメトリクスを収集できます。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

### ログの収集

Google Cloud HTTP ロードバランサーのログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Cloud HTTP ロードバランサーのログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud HTTP ロードバランサーのログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_loadbalancing" >}}


### イベント

Google Cloud Load Balancing インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Load Balancing インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_loadbalancing/google_cloud_loadbalancing_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/