---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud TPU のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_tpu/'
git_integration_title: google_cloud_tpu
has_logo: true
integration_title: Google Cloud TPU
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_tpu
public_title: Datadog-Google Cloud TPU インテグレーション
short_description: Google Cloud TPU のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud TPU 製品は、スケーラブルで使いやすいクラウドコンピューティングリソースを通じて Tensor Processing Unit (TPU) を利用できるようにします。ML 研究者、ML エンジニア、開発者、データサイエンティストの誰もが最先端の ML (機械学習) モデルを実行できます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud TPU からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_tpu" >}}


### イベント
Google Cloud TPU インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud TPU インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tpu/google_cloud_tpu_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}