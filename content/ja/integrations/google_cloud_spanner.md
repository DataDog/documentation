---
categories:
- cloud
- data stores
- google cloud
- log collection
dependencies: []
description: Spanner インスタンスのリソースの使用状況を追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_spanner/
draft: false
git_integration_title: google_cloud_spanner
has_logo: true
integration_id: google-cloud-spanner
integration_title: Google Spanner
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_spanner
public_title: Datadog-Google Spanner インテグレーション
short_description: Spanner インスタンスのリソースの使用状況を追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Spanner は、初めて強力な一貫性と水平方向の拡張性を兼ね備えた唯一のリレーショナルデータベースサービスです。

Google Spanner からメトリクスを取得して、以下のことができます。

- Spanner データベースのパフォーマンスを視覚化。
- Spanner データベースのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### メトリクスの収集

#### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud Spanner のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Spanner のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Spanner のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_spanner" >}}


### ヘルプ

Google Cloud Spanner インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Spanner インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_spanner/google_cloud_spanner_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/