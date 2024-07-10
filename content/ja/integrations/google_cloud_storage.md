---
categories:
- cloud
- data stores
- google cloud
- log collection
dependencies: []
description: Google Cloud Storage の主要メトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_storage/
draft: false
git_integration_title: google_cloud_storage
has_logo: true
integration_id: google-cloud-storage
integration_title: Google Storage
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_storage
public_title: Datadog-Google Storage インテグレーション
short_description: Google Cloud Storage の主要メトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Storage は、ライブデータの提供からデータ分析/ML、データアーカイブまで、さまざまな機能を備えた開発者/企業向けの統合型オブジェクトストレージです。

Google Storage からメトリクスを取得して、以下のことができます。

- Storage サービスのパフォーマンスを視覚化。
- Storage サービスのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### ブラウザトラブルシューティング

カスタム Cloud Storage ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

### 収集データ

Google Cloud Storage のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Storage のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Storage のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_storage" >}}


### ヘルプ

Google Cloud Storage インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Storage インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/