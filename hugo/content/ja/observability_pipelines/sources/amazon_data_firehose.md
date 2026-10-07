---
description: Observability Pipelines Worker を使用して Amazon Data Firehose からログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon Data Firehose ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Amazon Data Firehose ソースを使用して、Amazon Data Firehose からログを受信します。

## 前提条件{#prerequisites}

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Amazon Data Firehose アドレスの識別子と、該当する場合は TLS キーパスの識別子のみを入力してください。実際の値を<b>入力しないで</b>ください</div>。

[パイプラインをセットアップ][1]する際に、このソースを設定します。パイプラインは、[UI][3]、[API][4]、または [Terraform][5] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Amazon Data Firehose ソースを選択した後、Amazon Data Firehose アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

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

- Amazon Data Firehose アドレス識別子:
	- Observability Pipelines Worker がログを受信するためにリッスンするソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_AWS_DATA_FIREHOSE_ADDRESS` です
- Amazon Data Firehose TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_AWS_DATA_FIREHOSE_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{< /tabs >}}

## Amazon Data Firehose 経由で Observability Pipelines Worker にログを送信する {#send-logs-to-the-observability-pipelines-worker-over-amazon-data-firehose}

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## AWS 認証 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### 権限 {#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## Health メトリクス {#health-metrics}

すべてのソースから出力される[コンポーネントメトリクス][6]および[ソースバッファメトリクス][7]については、[Pipelines 使用状況メトリクス][8]のドキュメントを参照してください。Amazon Data Firehose ソースメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:aws_kinesis_firehose` を使用してください。

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/