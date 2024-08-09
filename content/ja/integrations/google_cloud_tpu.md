---
categories:
- cloud
- google cloud
- ログの収集
- ai/ml
dependencies: []
description: Google Cloud TPU のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_tpu/
draft: false
git_integration_title: google_cloud_tpu
has_logo: true
integration_id: google-cloud-tpu
integration_title: Google Cloud TPU
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_tpu
public_title: Datadog-Google Cloud TPU インテグレーション
short_description: Google Cloud TPU のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud TPU 製品は、スケーラブルで使いやすいクラウドコンピューティングリソースを通じて Tensor Processing Unit (TPU) を利用できるようにします。ML 研究者、ML エンジニア、開発者、データサイエンティストの誰もが最先端の ML (機械学習) モデルを実行できます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud TPU からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud TPU のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud TPU のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud TPU のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_tpu" >}}


### ヘルプ

Google Cloud TPU インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud TPU インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tpu/google_cloud_tpu_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/