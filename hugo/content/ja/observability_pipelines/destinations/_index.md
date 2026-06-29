---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
title: 送信先
---

## 概要

Observability Pipelines Worker を使用して、処理済みのログをさまざまな宛先に送信します。

宛先は、[パイプラインのセットアップ][1]時に選択して設定します。これは、パイプラインセットアッププロセスのステップ 4 です。

1. [Observability Pipelines][2] に移動します。
1. テンプレートを選択します。
1. ソースを選択してセットアップします。
1. 宛先を選択してセットアップします。
1. プロセッサをセットアップします。
1. Observability Pipelines Worker をインストールします。

{{< whatsnext desc="詳細情報を確認するには、宛先を選択してください。" >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_s3" >}}Amazon S3{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/azure_storage" >}}Azure Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/datadog_logs" >}}Datadog Logs{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_cloud_storage" >}}Google Cloud Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/syslog" >}}rsyslog または syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/splunk_hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sumo_logic_hosted_collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}


## イベントのバッチ処理

Observability Pipelines の宛先は、イベントをバッチとして下流のインテグレーションに送信します。イベントのバッチは、以下のパラメーターのいずれかが満たされたときにフラッシュされます。

- イベントの最大数
- バイトの最大数
- タイムアウト (秒)

例えば、宛先のパラメーターが次のようになっている場合:

- イベントの最大数 = 2
- バイトの最大数 = 100,000
- タイムアウト (秒) = 5

宛先が 5 秒の時間枠内に 1 つのイベントを受信した場合、5 秒のタイムアウト時にバッチがフラッシュされます。

宛先が 2 秒以内に 3 つのイベントを受信した場合、2 つのイベントを含むバッチをフラッシュし、5 秒後に残りのイベントを含む 2 つ目のバッチをフラッシュします。宛先が 100,000 バイトを超える 1 つのイベントを受信した場合、このバッチを 1 つのイベントとともにフラッシュします。

{{% observability_pipelines/destination_batching %}}

[1]: /ja/observability_pipelines/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines