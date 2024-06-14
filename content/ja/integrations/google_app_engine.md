---
categories:
- cloud
- configuration & deployment
- google cloud
dependencies: []
description: プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較。
doc_link: https://docs.datadoghq.com/integrations/google_app_engine/
draft: false
git_integration_title: google_app_engine
has_logo: true
integration_id: google-app-engine
integration_title: Google App Engine
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_app_engine
public_title: Datadog-Google App Engine インテグレーション
short_description: プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google App Engine インテグレーションをプロジェクトにインストールして、以下のことができます。

- Google App Engine サービスのメトリクス (メモリキャッシュ、タスクキュー、データストア) を確認できます。
- リクエストに関するメトリクス (表示パーセンタイル、レイテンシー、コスト) を確認できます。
- Google App Engine のメトリクスをバージョンごとにタグ付けし、異なるバージョンのパフォーマンスを比較できます。

また、[API][1] や [DogStatsD][2] を使って、Datadog にカスタムメトリクスを送信することも可能です。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google App Engine のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][4]。

これが完了したら、Google App Engine のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][5]に移動し、Google App Engine のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_app_engine" >}}


### ヘルプ

Google App Engine インテグレーションには、イベントは含まれません。

### ヘルプ

Google App Engine インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/