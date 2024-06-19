---
categories:
- cloud
- google cloud
- data stores
- ログの収集
dependencies: []
description: Google Bigtable のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_bigtable/
draft: false
git_integration_title: google_cloud_bigtable
has_logo: true
integration_id: google-cloud-bigtable
integration_title: Google Bigtable
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_bigtable
public_title: Datadog-Google Bigtable インテグレーション
short_description: Google Bigtable のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Bigtable は Google が提供する NoSQL ビッグデータデータベースサービスです。検索、アナリティクス、マップ、Gmail など、Google の多数のコアサービスを支えているデータベースと同じです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Bigtable からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Bigtable のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Bigtable のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Bigtable のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_bigtable" >}}


### ヘルプ

Google Bigtable インテグレーションには、イベントは含まれません。

### ヘルプ

Google Bigtable インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_bigtable/google_cloud_bigtable_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/