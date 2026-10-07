---
description: Observability Pipelines Worker を使用して Amazon S3 からログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon S3 ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Amazon S3 ソースを使用して、Amazon S3 からログを受信します。

## 前提条件{#prerequisites}

{{% observability_pipelines/prerequisites/amazon_s3 %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Amazon S3 URL の識別子と、該当する場合は TLS キーパスの識別子のみを入力してください。実際の値を<b>入力しないで</b>ください</div>。

[パイプラインをセットアップ][1]する際に、このソースを設定します。パイプラインは、[UI][3]、[API][4]、または [Terraform][5] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Amazon S3 ソースを選択した後、

1. Amazon S3 URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. AWS リージョンを入力します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### AWS 認証 {#aws-authentication}

{{< ui >}}AWS authentication{{< /ui >}} オプションを選択します。{{< ui >}}Assume role{{< /ui >}} を選択した場合、
1. 引き受ける IAM ロールの ARN を入力します。
1. 必要に応じて、引き受けロールのセッション名と外部 ID を入力します。

#### TLS を有効にする {#enable-tls}

{{% observability_pipelines/tls_settings %}}

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Amazon S3 URL 識別子:
	- S3 バケットが通知イベントを送信する SQS キューの URL を参照します。
	- デフォルトの識別子は `SOURCE_AWS_S3_SQS_URL` です。
- Amazon S3 TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_AWS_S3_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## AWS 認証 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### 権限 {#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## Health メトリクス {#health-metrics}

すべてのソースから出力される[コンポーネントメトリクス][6]および[ソースバッファメトリクス][7]については、[Pipelines 使用状況メトリクス][8]のドキュメントを参照してください。Amazon S3 ソース メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:aws_s3` を使用します。

### Amazon S3 メトリクス {#amazon-s3-metrics}

- `component_id` タグを使用して、個々のコンポーネントごとにフィルタリングまたはグループ化します。
- ソース タイプでフィルタリングまたはグループ化するには、`component_type` タグを使用します。

`pipelines.sqs_message_received_messages_total`
: **説明**: 受信した SQS メッセージの数。
: **メトリクスタイプ**: カウント

`pipelines.sqs_message_processing_succeeded_total`
: **説明**: 正常に処理された SQS メッセージの数。
: **メトリクスタイプ**: カウント

`pipelines.sqs_message_delete_succeeded_total`
: **説明**: SQS メッセージの削除に成功した数。
: **メトリクスタイプ**: カウント

`pipelines.sqs_message_defer_succeeded_total`
: **説明**: 可視性タイムアウトの延期に成功した SQS メッセージの数。
: **メトリクスタイプ**: カウント

`pipelines.sqs_s3_event_record_ignored_total`
: **説明**: `ObjectCreated` イベントの種類ではないため無視された、SQS メッセージ内の S3 イベントレコードの数。
: **メトリクスタイプ**: カウント

`pipelines.s3_object_processing_succeeded_duration_seconds`
: **説明**: S3 オブジェクトの処理に成功するまでにかかった時間 (秒)。
: **メトリクスタイプ**: 分布

`pipelines.s3_object_processing_failed_duration_seconds`
: **説明**: 処理に失敗した S3 オブジェクトの処理にかかった時間 (秒)。
: **メトリクスタイプ**: 分布

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/