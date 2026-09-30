---
categories:
- cloud
- google cloud
- log collection
- ai/ml
custom_kind: integration
dependencies: []
description: Google Cloud Machine Learning の主要メトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_ml/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: ブログ
  text: 本番環境で ML モデルを監視するためのベストプラクティス
git_integration_title: google_cloud_ml
has_logo: true
integration_id: google-cloud-ml
integration_title: Google Machine Learning
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_ml
public_title: Datadog-Google Machine Learning インテグレーション
short_description: Google Cloud Machine Learning の主要メトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Machine Learning は、あらゆるサイズおよび種類のデータに対して機能する機械学習モデルを簡単に構築できるマネージド型のサービスです。

Google Machine Learning からメトリクスを取得して、以下のことができます。

- Machine Learning (ML) サービスのパフォーマンスを視覚化。
- Machine Learning (ML) サービスのパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### ログ収集

Google Cloud Machine Learning のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Machine Learning のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud  Machine Learning のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-cloud-ml" >}}


### イベント

Google Cloud Machine Learning インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/
