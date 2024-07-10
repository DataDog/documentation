---
categories:
- cloud
- data stores
- google cloud
- ログの収集
dependencies: []
description: Google Cloud Memorystore for Redis のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_redis/
draft: false
git_integration_title: google_cloud_redis
has_logo: true
integration_id: google-cloud-redis
integration_title: Google Cloud Memorystore for Redis
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_redis
public_title: Datadog-Google Cloud Memorystore for Redis インテグレーション
short_description: Google Cloud Memorystore for Redis のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Memorystore for Redis は、拡張性、安全性、可用性に優れたインフラストラクチャー上に構築されたフルマネージド型のインメモリデータストアサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Memorystore for Redis からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud Memorystore for Redis のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Memorystore for Redis のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Memorystore for Redis のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_redis" >}}


### ヘルプ

Google Cloud Memorystore for Redis インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Memorystore for Redis インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_redis/google_cloud_redis_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/