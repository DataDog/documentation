---
categories:
- cloud
- 構成 & デプロイ
- google cloud
- ログの収集
dependencies: []
description: Google Cloud Composer のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_composer/
draft: false
git_integration_title: google_cloud_composer
has_logo: true
integration_id: google-cloud-composer
integration_title: Google Cloud Composer
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_composer
public_title: Datadog-Google Cloud Composer インテグレーション
short_description: Google Cloud Composer のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Composer は、複数のクラウドやオンプレミスデータセンターにまたがるパイプラインの作成、スケジューリング、監視を可能にする、フルマネージド型のワークフローオーケストレーションサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Composer からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud Composer のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Composer のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Composer のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_composer" >}}


### ヘルプ

Google Cloud Composer インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Composer インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_composer/google_cloud_composer_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/