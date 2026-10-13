---
description: Observability Pipelines Worker を使用して Fluentd エージェントまたは Fluent Bit エージェントからログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fluentd ソースと Fluent Bit ソース
---
{{< product-availability >}}

## 概要{#overview}

Observability Pipelines の Fluentd ソースまたは Fluent Bit ソースを使用して、Fluentd エージェントまたは Fluent Bit エージェントからログを受信します。

## 前提条件{#prerequisites}

{{% observability_pipelines/prerequisites/fluent %}}

## セットアップ{#setup}

<div class="alert alert-danger">シークレット管理の場合: Fluent アドレスと TLS キーパス (該当する場合) の識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

このソースは、[パイプラインを設定][1]する際に設定します。パイプラインは、[UI][3]、[API][4]、または [Terraform][5] を使用して設定できます。このセクションの手順は、このソースを UI で設定するためのものです。

パイプライン UI で Fluent ソースを選択した後、Fluent アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの設定 {#optional-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Fluent アドレスの識別子:
	- Observability Pipelines Worker が受信ログメッセージをリッスンするアドレスを参照します。
	- デフォルトの識別子は `SOURCE_FLUENT_ADDRESS` です。
- Fluent TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_FLUENT_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

{{% /tab %}}
{{< /tabs >}}

## Fluent 経由で Observability Pipelines Worker にログを送信する{#send-logs-to-the-observability-pipelines-worker-over-fluent}

{{% observability_pipelines/log_source_configuration/fluent %}}

## ヘルスメトリクス {#health-metrics}

すべてのソースから出力される[コンポーネントメトリクス][6]および[ソースバッファメトリクス][7]については、[パイプライン使用状況メトリクス][8]のドキュメントを参照してください。Fluent ソースメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:fluent` を使用します。

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/