---
categories:
- cloud
- google cloud
- ログの収集
dependencies: []
description: Google Cloud Dataflow のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: ブログ
  text: Datadog による Dataflow パイプラインの監視
git_integration_title: google_cloud_dataflow
has_logo: true
integration_id: google-cloud-dataflow
integration_title: Google Cloud Dataflow
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
monitors:
  job-backlog-time: assets/monitors/backlog_monitor.json
name: google_cloud_dataflow
public_title: Datadog-Google Cloud Dataflow インテグレーション
short_description: Google Cloud Dataflow のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Dataflow は、ストリーム (リアルタイム) モードとバッチ (履歴) モードのどちらでも、同等の信頼性と表現力でデータを変換し、強化することができる、フルマネージド型のサービスです。

Datadog Google Cloud インテグレーションを使用して、Google Cloud Dataflow からメトリクスを収集できます。

## 計画と使用

### メトリクスの収集

#### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### 収集データ

Google Cloud Dataflow のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Dataflow のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Dataflow のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_dataflow" >}}


<div class="alert alert-warning">
Google Cloud Dataflow を使って Apache Beam パイプラインのメトリクスを監視する場合、Gauge の静的メソッドから生成されたメトリクスは収集されないことに注意してください。これらのメトリクスを監視する必要がある場合は、<a href="https://micrometer.io/docs">Micrometer</a> を使用できます。
</div>


### ヘルプ

Google Cloud Dataflow インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Dataflow インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/