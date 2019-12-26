---
categories:
  - cloud
  - monitoring
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Stackdriver に収集されたログのサイズを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_stackdriver_logging/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/'
    tag: ブログ
    text: Datadog を使用した Google Stackdriver ログの収集
git_integration_title: google_stackdriver_logging
has_logo: true
integration_title: Google Stackdriver Logging
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_stackdriver_logging
public_title: Datadog-Google Stackdriver Logging インテグレーション
short_description: Google Stackdriver に収集されたログのサイズを追跡
version: '1.0'
---
## 概要
Google の Stackdriver Logging 製品を使用すると、Google Cloud Platform からのログデータやイベントを保存、検索、分析、監視、およびアラートすることができます。

Datadog は Google Stackdriver Logging から**メトリクス**をプルして、以下のことができます。

* Stackdriver ログのパフォーマンスを視覚化できます。
* Stackdriver ログのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

Stackdriver ログのメトリクスは、[Google Cloud Platform インテグレーション][1]に含まれています。追加のインストール手順は必要ありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_stackdriver_logging" >}}


**注**: Datadog は、プレフィックス `gcp.logging.user` を使用して Google Stackdriver の[ユーザー定義のメトリクス][3]を収集します。

### イベント
Google Stackdriver Logging インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Stackdriver Logging インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[3]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}