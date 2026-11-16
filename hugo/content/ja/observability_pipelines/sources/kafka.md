---
description: Observability Pipelines Worker を使用して Kafka トピックからログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Kafka ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Kafka ソースを使用して、Kafka トピックからログを受信します。Kafka ソースは [librdkafka][2] を使用します。

[Kafka ソースを使用して Azure Event Hub ログを Observability Pipelines に送信][6] することもできます。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/kafka %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Kafka サーバー、ユーザー名、パスワード、および該当する場合は TLS キーパスの識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][1] する際に、このソースをセットアップします。パイプラインのセットアップは、[UI][7] で、[API][8] を使用して、または [Terraform][9] で行えます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Kafka ソースを選択した後、

1. Kafka サーバーの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. Kafka ユーザー名の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. Kafka パスワードの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. グループ ID を入力します。
1. トピック名を入力します。トピックが複数ある場合は、{{< ui >}}Add Field{{< /ui >}} をクリックしてトピックを追加します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### SASL 認証を有効にする {#enable-sasl-authentication}

1. スイッチを切り替えて {{< ui >}}SASL Authentication{{< /ui >}} を有効にします。
1. ドロップダウンメニューからメカニズム ({{< ui >}}PLAIN{{< /ui >}}、{{< ui >}}SCHRAM-SHA-256{{< /ui >}}、または {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) を選択します。

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### librdkafka オプションを追加する {#add-additional-librdkafka-options}

1. {{< ui >}}Advanced{{< /ui >}}、続いて {{< ui >}}Add Option{{< /ui >}} をクリックします。
1. ドロップダウンメニューでオプションを選択します。
1. そのオプションの値を入力します。
1. [librdkafka ドキュメント][4] で値を確認し、正しい型であり、設定された範囲内であることを確認してください。
1. 別の librdkafka オプションを追加するには、{{< ui >}}Add Option{{< /ui >}}をクリックします。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Kafka ブートストラップサーバー識別子:
	- クライアントが Kafka クラスターに接続し、クラスター内の他のすべてのホストを検出するために使用するブートストラップサーバーを参照します。
	- シークレットマネージャーでは、ホストとポートを `host:port` の形式 (例: `10.14.22.123:9092`) で入力する必要があります。サーバーが複数ある場合は、コンマで区切ってください。
	- デフォルトの識別子は `SOURCE_KAFKA_BOOTSTRAP_SERVERS` です。
- Kafka SASL ユーザー名識別子:
	- デフォルトの識別子は `SOURCE_KAFKA_SASL_USERNAME` です。
- Kafka SASL パスワード識別子:
	- デフォルトの識別子は `SOURCE_KAFKA_SASL_PASSWORD` です。
- Kafka TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_KAFKA_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka オプション {#librdkafka-options}

利用可能な librdkafka オプションは以下のとおりです。

- auto.offset.reset
- auto.commit.interval.ms
- client.id
- coordinator.query.interval.ms
- enable.auto.commit
- enable.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- group.instance.id
- heartbeat.interval.ms
- queued.min.messages
- session.timeout.ms
- socket.timeout.ms

詳細については、[librdkafka ドキュメント][3] を参照し、値が正しい型であり、範囲内であることを確認してください。

## 健全性メトリクス {#health-metrics}

すべてのソースから送信される [コンポーネントメトリクス][10] および [ソースバッファメトリクス][11] については、[パイプライン使用状況メトリクス][12] のドキュメントを参照してください。

### Kafka メトリクス {#kafka-metrics}

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- `component_type` タグは、これらのメトリクスに対して `kafka` です。

`pipelines.kafka_consumer_lag`
: **説明**: トピックおよびパーティションごとの Kafka コンシューマーラグ。値が高い場合、ソースが着信メッセージレートに追いついていないことを示します。
: **メトリクスタイプ**: ゲージ

`pipelines.kafka_consumed_messages_total`
: **説明**: Worker が Kafka ブローカーから消費したメッセージ数。
: **メトリクスタイプ**: count

`pipelines.kafka_consumed_messages_bytes_total`
: **説明**: Worker が Kafka ブローカーから消費したメッセージのバイト数。
: **メトリクスタイプ**: count

`pipelines.kafka_requests_total`
: **説明**: Worker が Kafka ブローカーに送信したリクエスト数。
: **メトリクスタイプ**: count

`pipelines.kafka_requests_bytes_total`
: **説明**: Worker が Kafka ブローカーに送信したバイト数。
: **メトリクスタイプ**: count

`pipelines.kafka_responses_total`
: **説明**: Worker が Kafka ブローカーへの書き込み後に受信したレスポンス数。
: **メトリクスタイプ**: count

`pipelines.kafka_responses_bytes_total`
: **説明**: Worker が Kafka ブローカーへの書き込み後に受信したバイト数。
: **メトリクスタイプ**: count

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[6]: /ja/observability_pipelines/sources/azure_event_hubs/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ja/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[12]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/