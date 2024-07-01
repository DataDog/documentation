---
categories:
- cloud
- google cloud
- log collection
dependencies: []
description: 関数実行時間の最小、最大、平均を追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_functions/
draft: false
git_integration_title: google_cloud_functions
has_logo: true
integration_id: google-cloud-functions
integration_title: Google Cloud Functions
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_functions
public_title: Datadog-Google Cloud Functions インテグレーション
short_description: 関数実行時間の最小、最大、平均を追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。

Google Functions からメトリクスを取得して、以下のことができます。

- 関数のパフォーマンスを視覚化。
- 関数のパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### メトリクスの収集

#### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud Function のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Firestore のログを Google Cloud Function から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Function のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_functions" >}}


### ヘルプ

Google Cloud Functions インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/