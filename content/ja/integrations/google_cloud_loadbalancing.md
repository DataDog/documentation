---
categories:
  - クラウド
  - google cloud
  - ログの収集
ddtype: クローラー
dependencies: []
description: Google Cloud Load Balancing のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/'
git_integration_title: google_cloud_loadbalancing
has_logo: true
integration_title: Google Cloud Load Balancing
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_loadbalancing
public_title: Datadog-Google Cloud Load Balancing インテグレーション
short_description: Google Cloud Load Balancing のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Load Balancing を使用すると、負荷分散されたコンピューティングリソースを単一または複数のリージョンに分配し、高可用性要件を満たすことができます。また、1 つのエニーキャスト IP の背後にリソースを置き、インテリジェントなオートスケーリング機能を使用してリソースをスケーリングできます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Load Balancing からメトリクスを収集できます。

## セットアップ
### メトリクスの収集
#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

### ログの収集

Google Cloud の HTTP ロードバランサーのログは、Stackdriver を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][4]してください。

これが完了したら、Google Cloud の HTTP ロードバランサーのログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][5]に移動し、Google Cloud の HTTP ロードバランサーのログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

{{< img src="integrations/google_cloud_loadbalancing/export_http_lb.png" alt="Export Google Cloud HTTP Loadbalancer Logs to Pub Sub" responsive="true">}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_loadbalancing" >}}


### イベント
Google Cloud Load Balancing インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Load Balancing インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_loadbalancing/google_cloud_loadbalancing_metadata.csv
[3]: https://docs.datadoghq.com/ja/help
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer


{{< get-dependencies >}}