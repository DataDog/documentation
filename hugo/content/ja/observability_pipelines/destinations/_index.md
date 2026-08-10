---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
title: 送信先
---
## 概要 {#overview}

Observability Pipelines Worker を使用して、処理済みのログおよびメトリクス ({{< tooltip glossary="プレビュー" case="title" >}}) をさまざまな送信先に送信します。ほとんどの Observability Pipelines の送信先は、イベントをバッチとして下流のインテグレーションに送信します。詳細については、[イベントのバッチ処理](#event-batching)を参照してください。一部の Observability Pipelines の送信先では、テンプレート構文をサポートするフィールドがあり、特定のフィールドの値に基づいてそれらを設定することができます。詳細については、[テンプレート構文](#template-syntax)を参照してください。

左側のナビゲーションメニューから送信先を選択して詳細情報を確認します。

## 送信先 {#destinations}

以下が利用可能な送信先です。

{{< tabs >}}
{{% tab "ログ" %}}

- [Amazon OpenSearch][1]
- [Amazon S3][22]
- [Amazon Security Lake][3]
- [Azure Storage][4]
- [CrowdStrike Next-Gen SIEM][6]
- [Databricks (Zerobus)][23]
- [Datadog Archives][2]
- [Datadog BYOC Logs][5]
- [Datadog Logs][7]
- [Elasticsearch][8]
- [Google Cloud Storage][10]
- [Google Pub/Sub][11]
- [Google SecOps][9]
- [HTTP Client][12]
- [Kafka][13]
- [Microsoft Sentinel][14]
- [New Relic][15]
- [OpenSearch][16]
- [SentinelOne][17]
- [Socket][18]
- [Splunk HTTP Event Collector (HEC)][19]
- [Sumo Logic Hosted Collector][20]
- [Syslog][21]

[1]: /ja/observability_pipelines/destinations/amazon_opensearch/
[2]: /ja/observability_pipelines/destinations/datadog_archives/
[3]: /ja/observability_pipelines/destinations/amazon_security_lake/
[4]: /ja/observability_pipelines/destinations/azure_storage/
[5]: /ja/observability_pipelines/destinations/datadog_byoc_logs/
[6]: /ja/observability_pipelines/destinations/crowdstrike_ng_siem/
[7]: /ja/observability_pipelines/destinations/datadog_logs/
[8]: /ja/observability_pipelines/destinations/elasticsearch/
[9]: /ja/observability_pipelines/destinations/google_secops/
[10]: /ja/observability_pipelines/destinations/google_cloud_storage/
[11]: /ja/observability_pipelines/destinations/google_pubsub/
[12]: /ja/observability_pipelines/destinations/http_client/
[13]: /ja/observability_pipelines/destinations/kafka/
[14]: /ja/observability_pipelines/destinations/microsoft_sentinel/
[15]: /ja/observability_pipelines/destinations/new_relic/
[16]: /ja/observability_pipelines/destinations/opensearch/
[17]: /ja/observability_pipelines/destinations/sentinelone/
[18]: /ja/observability_pipelines/destinations/socket/
[19]: /ja/observability_pipelines/destinations/splunk_hec/
[20]: /ja/observability_pipelines/destinations/sumo_logic_hosted_collector/
[21]: /ja/observability_pipelines/destinations/syslog/
[22]: /ja/observability_pipelines/destinations/amazon_s3/
[23]: /ja/observability_pipelines/destinations/databricks/

{{% /tab %}}

{{% tab "メトリクス" %}}

- [Datadog Metrics][1]
- [Elasticsearch][2]
- [HTTP/S Client][3]

[1]: /ja/observability_pipelines/destinations/datadog_metrics/
[2]: /ja/observability_pipelines/destinations/elasticsearch/
[3]: /ja/observability_pipelines/destinations/http_client/

{{% /tab %}}
{{< /tabs >}}

## テンプレート構文 {#template-syntax}

ログは、サービスや環境、または他のログ属性に基づいて、別々のインデックスに保存されることがよくあります。Observability Pipelines では、特定のログフィールドに基づいてログを異なるインデックスにルーティングするためにテンプレート構文を使用できます。

Observability Pipelines Worker がテンプレート構文でフィールドを解決できない場合、Worker はその送信先に対して指定された動作をデフォルトで実行します。例: テンプレート `{{application_id}}` for the Datadog Archives destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/` を使用しており、そこにログを公開する場合。

次のテーブルは、テンプレート構文をサポートする送信先とフィールド、および Observability Pipelines Worker がフィールドを解決できない場合に何が起こるかを示しています。

| 送信先       | テンプレート構文をサポートするフィールド | フィールドが解決できない場合の動作                                                                                 |
|-------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | インデックス                               | Worker は `datadog-op`インデックスにログを書き込みます。                                                                         |
| Datadog Archives  | プレフィックス                              | Worker は `OP_UNRESOLVED_TEMPLATE_LOGS/` という名前のフォルダーを作成し、そこにログを書き込みます。                               |
| Azure Blob        | プレフィックス                              | Worker は `OP_UNRESOLVED_TEMPLATE_LOGS/` という名前のフォルダーを作成し、そこにログを書き込みます。                               |
| Elasticsearch     | インデックス                               | Worker は `datadog-op` インデックスにログを書き込みます。                                                                         |
| Google Chronicle  | ログタイプ                            | デフォルトは `DATADOG` ログタイプです。                                                                                           |
| Google Cloud      | プレフィックス                              | Worker は `OP_UNRESOLVED_TEMPLATE_LOGS/` という名前のフォルダーを作成し、そこにログを書き込みます。                               |
| Opensearch        | インデックス                               | Worker は `datadog-op` インデックスにログを書き込みます。                                                                         |
| Splunk HEC        | インデックス<br>ソースタイプ                | Worker は Splunk で構成されたデフォルトのインデックスにログを送信します。<br>Worker のデフォルトは `httpevent` ソースタイプです。|

#### 例 {#example}

ログのアプリケーション ID フィールド (例: `application_id`) に基づいてログを Datadog Archives のリンク先にルーティングしたい場合は、**プレフィックスのイベントフィールド構文を使用してすべてのオブジェクトキー** フィールドに適用します。

{{< img src="observability_pipelines/amazon_s3_prefix_20250709.png" alt="イベントフィールド構文 /application_id={{ application_id }}/ を使用したプレフィックスフィールドの例を示す Datadog Archives のリンク先" style="width:40%;" >}}

### 構文 {#syntax}

#### イベントフィールド {#event-fields}

`{{ <field_name> }}` を使用して個々のログイベントフィールドにアクセスします。例:

```
{{ application_id }}
```

#### Strftime 指定子 {#strftime-specifiers}

日付と時刻に [strftime 指定子][3]を使用します。例:

```
year=%Y/month=%m/day=%d
```

#### エスケープ文字 {#escape-characters}

文字の前に `\` を付けてその文字をエスケープします。この例ではイベントフィールド構文をエスケープします。

```
\{{ field_name }}
```

この例では strftime 指定子をエスケープします。

```
year=\%Y/month=\%m/day=\%d/
```

## イベントのバッチ処理 {#event-batching}

Observability Pipelines の送信先は、イベントをバッチとして下流のインテグレーションに送信します。次のいずれかのパラメーターが満たされると、イベントのバッチがフラッシュされます。

- イベントの最大数
- バイトの最大数
- タイムアウト (秒)

例えば、送信先のパラメーターが次のようになっている場合:

- イベントの最大数 = 2
- バイトの最大数 = 100,000
- タイムアウト (秒) = 5

送信先が 5 秒の時間枠内に 1 つのイベントを受信した場合、5 秒のタイムアウト時にバッチがフラッシュされます。

送信先が 2 秒以内に 3 つのイベントを受信した場合、2 つのイベントを含むバッチをフラッシュし、5 秒後に残りのイベントを含む 2 つ目のバッチをフラッシュします。送信先が 100,000 バイトを超える 1 つのイベントを受信した場合、このバッチを 1 つのイベントとともにフラッシュします。

{{% observability_pipelines/destination_batching %}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers