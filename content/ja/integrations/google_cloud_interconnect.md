---
categories:
  - cloud
  - google cloud
  - ログの収集
ddtype: crawler
dependencies: []
description: Google Cloud Interconnect のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_interconnect/
draft: false
git_integration_title: google_cloud_interconnect
has_logo: true
integration_id: google-cloud-interconnect
integration_title: Google Cloud Interconnect
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_interconnect
public_title: Datadog-Google Cloud Interconnect インテグレーション
short_description: Google Cloud Interconnect のキーメトリクスを追跡
version: '1.0'
---
## 概要

Google Cloud Interconnect は、高可用性かつ低レイテンシーの接続により、オンプレミスのネットワークを Google のネットワークに拡張します。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Interconnect からメトリクスを収集できます。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログの収集

Google Cloud Interconnect のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

セットアップが完了したら、Google Cloud Interconnect のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver ページ][3]に移動し、Google Cloud Interconnect のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_interconnect" >}}


### イベント

Google Cloud Interconnect インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Interconnect インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_interconnect/google_cloud_interconnect_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/