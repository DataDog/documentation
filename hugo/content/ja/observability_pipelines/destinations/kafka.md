---
description: Observability Pipelines Worker を使用して Kafka トピックにログを送信する方法について説明します。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Kafka 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Kafka 送信先を使用して、Kafka トピックにログを送信します。

### この送信先を使用するタイミング {#when-to-use-this-destination}

この送信先を使用する一般的なシナリオ:
- 次の送信先にログをルーティングする場合:
    - [Clickhouse][1]: 大量のログを分析するために使用される、オープンソースの列指向データベース管理システム。
    - [Snowflake][2]: ストレージおよびクエリに使用されるデータウェアハウス。
        - Snowflake の API 統合では、プラットフォームにログを取り込むための手法として Kafka を利用します。
    - [Databricks][3]: 分析およびストレージ用のデータレイクハウス。
    - [Azure Event Hub][4]: Microsoft および Azure エコシステムにおけるインジェストおよび処理サービス。
- データを Kafka にルーティングし、Kafka Connect エコシステムを使用する場合。
- Observability Pipelines でデータを処理および正規化した後、Kafka を使って Apache Spark にルーティングし、データ分析や機械学習ワークロードを実行します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Kafka ブートストラップサーバーの識別子のみを入力します。該当する場合は、SASL ユーザー名とパスワード、および TLS キーパスの識別子も入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][10]する際に、Kafka 送信先を構成します。パイプラインは、[UI][5]、[API][11]、または [Terraform][12] を使用してセットアップできます。このセクションの手順は UI で構成されます。

パイプライン UI で Kafka 送信先を選択したら、次のようにします。

1. Kafka ブートストラップサーバーの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ログの送信先となるトピックの名前を入力します。
1. {{< ui >}}Encoding{{< /ui >}} ドロップダウンメニューで、出力形式として {{< ui >}}JSON{{< /ui >}} または {{< ui >}}Raw message{{< /ui >}} を選択します。

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="サンプル値を含む Kafka 送信先" style="width:30%;" >}}

{{% observability_pipelines/secrets_env_var_note %}}

#### オプション設定 {#optional-settings}

##### TLS の有効化{#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### SASL 認証の有効化 {#enable-sasl-authentication}

1. スイッチを切り替えて {{< ui >}}SASL Authentication{{< /ui >}} を有効にします。
1. Kafka SASL ユーザー名とパスワードの識別子を入力してください。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ドロップダウンメニューからメカニズム ({{< ui >}}PLAIN{{< /ui >}}、{{< ui >}}SCHRAM-SHA-256{{< /ui >}}、または {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) を選択します。

##### 圧縮の有効化 {#enable-compression}

1. スイッチを切り替えて {{< ui >}}Enable Compression{{< /ui >}} にします。
1. {{< ui >}}Compression Algorithm{{< /ui >}} ドロップダウンメニューで、圧縮アルゴリズム ({{< ui >}}gzip{{< /ui >}}、{{< ui >}}zstd{{< /ui >}}、{{< ui >}}lz4{{< /ui >}}、または {{< ui >}}snappy{{< /ui >}}) を選択します。
1. (オプション) ドロップダウンメニューで {{< ui >}}Compression Level{{< /ui >}} を選択します。レベルが指定されていない場合は、アルゴリズムのデフォルトレベルが使用されます。

##### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

##### 高度なオプション {#advanced-options}

以下のフィールドのいずれかを設定する場合は、{{< ui >}}Advanced{{< /ui >}} をクリックします。

1. {{< ui >}}Message Key Field{{< /ui >}}: パーティショニング、グループ化、および順序付けのためのメッセージキーが含まれるログフィールドを指定します。
1. {{< ui >}}Headers Key{{< /ui >}}: Kafka ヘッダーが含まれるログフィールドを指定します。空白のままにすると、ヘッダーは書き込まれません。
1. {{< ui >}}Message Timeout (ms){{< /ui >}}: ローカルメッセージのタイムアウト (ミリ秒単位)。デフォルト: `300,000 ms`。
1. {{< ui >}}Socket Timeout (ms){{< /ui >}}: ネットワークリクエストのデフォルトのタイムアウト (ミリ秒単位)。デフォルト: `60,000 ms`。
1. {{< ui >}}Rate Limit Events{{< /ui >}}: レート制限時間枠内に Kafka クライアントが送信できるリクエストの最大数。デフォルトではレート制限はありません。
1. {{< ui >}}Rate Limit Time Window (secs){{< /ui >}}: レート制限オプションに使用される時間枠。
    - イベントのレート制限が設定されていない場合、この設定は無効です。
    - {{< ui >}}Rate Limit Events{{< /ui >}} が設定されているが {{< ui >}}Rate Limit Time Window{{< /ui >}} が設定されていない場合、デフォルトは `1 second` です。
1. 追加の [librdkafka オプション](#librdkafka-options) を追加するには、{{< ui >}}Add Option{{< /ui >}} をクリックし、ドロップダウンメニューからオプションを選択します。
    1. そのオプションの値を入力します。
    1. [librdkafka ドキュメント][7]で値を確認し、正しい型であり、設定された範囲内であることを確認してください。
    1. 別の librdkafka オプションを追加するには、{{< ui >}}Add Option{{< /ui >}}をクリックします。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Kafka ブートストラップサーバー識別子:
    - クライアントが Kafka クラスターに接続し、クラスター内の他のすべてのホストを検出するために使用するブートストラップサーバーを参照します。
	- シークレットマネージャーでは、ホストとポートを `host:port` の形式 (例: `10.14.22.123:9092`) で入力する必要があります。サーバーが複数ある場合は、コンマで区切ってください。
	- デフォルトの識別子は `DESTINATION_KAFKA_BOOTSTRAP_SERVERS` です。
- Kafka TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_KAFKA_KEY_PASS` です。
- SASL 認証 (有効な場合):
	- Kafka SASL ユーザー名識別子:
		- デフォルトの識別子は `DESTINATION_KAFKA_SASL_USERNAME` です。
	- Kafka SASL パスワード識別子:
		- デフォルトの識別子は `DESTINATION_KAFKA_SASL_PASSWORD` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{< img src="observability_pipelines/destinations/kafka_env_var.png" alt="Kafka 環境変数フィールドが表示されているインストールページ" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka オプション {#librdkafka-options}

利用可能な librdkafka オプションは以下のとおりです。

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

詳細については、[librdkafka ドキュメント][7]を参照し、値が正しい型であり、範囲内であることを確認してください。

## 健全性メトリクス{#health-metrics}

すべての宛先から出力される [コンポーネントメトリクス][13] および [宛先バッファメトリクス][14] については、[Pipelines 使用状況メトリクス][8] のドキュメントを参照してください。

### Kafka メトリクス {#kafka-metrics}

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- `component_type` タグは、Kafka 送信先メトリクスでは `kafka` です。

`pipelines.kafka_produced_messages_total`
: **説明**: Kafka ブローカーに対して生成および送信されたメッセージの数。
: **メトリクスタイプ**: カウント

`pipelines.kafka_produced_messages_bytes_total`
: **説明**: Kafka ブローカーに対して生成および送信されたメッセージのバイト数。
: **メトリクスタイプ**: カウント

`pipelines.kafka_queue_messages`
: **説明**: librdkafka プロデューサーキュー内の現在のメッセージ数。
: **メトリクスタイプ**: ゲージ

`pipelines.kafka_queue_messages_bytes`
: **説明**: librdkafka プロデューサーキュー内のメッセージの現在の合計サイズ (バイト単位)。
: **メトリクスタイプ**: ゲージ

`pipelines.kafka_requests_total`
: **説明**: Kafka ブローカーに送信されたリクエストの数。
: **メトリクスタイプ**: カウント

`pipelines.kafka_requests_bytes_total`
: **説明**: Kafka ブローカーに送信されたバイト数。
: **メトリクスタイプ**: カウント

`pipelines.kafka_responses_total`
: **説明**: Kafka ブローカーから受信したレスポンスの数。
: **メトリクスタイプ**: カウント

`pipelines.kafka_responses_bytes_total`
: **説明**: Kafka ブローカーから受信したバイト数。
: **メトリクスタイプ**: カウント

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先イベントのバッチ処理][9]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| 10,000         | 1                 | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /ja/observability_pipelines/destinations/#event-batching
[10]: /ja/observability_pipelines/configuration/set_up_pipelines/
[11]: /ja/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics