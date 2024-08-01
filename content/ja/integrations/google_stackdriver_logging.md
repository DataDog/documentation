---
categories:
- cloud
- google cloud
dependencies: []
description: Google Cloud Logging に収集されたログのサイズを追跡。
doc_link: https://docs.datadoghq.com/integrations/google_stackdriver_logging/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/
  tag: ブログ
  text: Datadog を使用した Google Cloud ログの収集。
git_integration_title: google_stackdriver_logging
has_logo: true
integration_id: google-stackdriver-logging
integration_title: Google Cloud Logging
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_stackdriver_logging
public_title: Datadog-Google Cloud Logging インテグレーション
short_description: Google Stackdriver に収集されたログのサイズを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google の Cloud Logging 製品を使用すると、Google Cloud Platform からのログデータやイベントを保存、検索、分析、監視、およびアラートすることができます。

Datadog は Google Cloud Logging から**メトリクス**をプルして、以下を実行します。

- Google Cloud ログのパフォーマンスを視覚化。
- Google Cloud ログのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

Google Cloud ログのメトリクスは、[Google Cloud Platform インテグレーション][1]に含まれています。追加のインストール手順は必要ありません。

### 収集データ

Google Cloud のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_stackdriver_logging" >}}


**注**: Datadog は、プレフィックス `gcp.logging.user` を使用して Google Cloud Logging の[ユーザー定義のメトリクス][4]を収集します。

### ヘルプ

Google Cloud Logging インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Logging インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[4]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[5]: https://docs.datadoghq.com/ja/help/