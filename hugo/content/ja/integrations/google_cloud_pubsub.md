---
categories:
- cloud
- google cloud
- log collection
- message queues
custom_kind: integration
dependencies: []
description: Google Cloud PubSub の主要メトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
draft: false
git_integration_title: google_cloud_pubsub
has_logo: true
integration_id: google-cloud-pubsub
integration_title: Google Pub/Sub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_pubsub
public_title: Datadog-Google Pub/Sub インテグレーション
short_description: Google Cloud PubSub の主要メトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Pub/Sub は、エンタープライズメッセージ指向ミドルウェアの拡張性、柔軟性、信頼性をクラウドにもたらします。

Google Pub/Sub からメトリクスを取得して、以下のことができます。

- Pub/Sub のトピックおよびサブスクリプションのパフォーマンスを視覚化。
- Pub/Sub のトピックおよびサブスクリプションのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### 構成

カスタム Pub/Sub ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

### 収集データ

Google Cloud Pub/Sub のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Pub/Sub のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Pub/Sub のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-cloud-pubsub" >}}


### イベント

Google Cloud Pub/Sub インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Pub/Sub インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/
