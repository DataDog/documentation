---
categories:
- cloud
- google cloud
- ログの収集
dependencies: []
description: Google Cloud APIs のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_apis/
draft: false
git_integration_title: google_cloud_apis
has_logo: true
integration_id: google-cloud-apis
integration_title: Google Cloud APIs
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_apis
public_title: Datadog-Google Cloud APIs インテグレーション
short_description: Google Cloud APIs のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud APIs を使用すると、Google Cloud Platform 製品にコードからアクセスできます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud APIs からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud API のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud API のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud API のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_apis" >}}


### ヘルプ

Google Cloud APIs インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud APIs インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/