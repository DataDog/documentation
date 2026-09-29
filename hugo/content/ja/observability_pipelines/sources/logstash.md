---
description: Observability Pipelines Worker を使用して Logstash エージェントからログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Logstash ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Logstash ソースを使用して、Logstash エージェントからログを受信します。

Logstash ソースを使用して [Filebeat を使用して Observability Pipelines にログを送信する][2] こともできます。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/logstash%}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Logstash アドレスの識別子と、該当する場合は TLS キーパスの識別子のみを入力してください。<b>実際の値は</b>入力しないでください。</div>

このソースは、[パイプラインをセットアップ][1]する際に設定します。パイプラインは、[UI][4]、[API][5]、または [Terraform][6] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Logstash ソースを選択した後、Logstash アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Logstash アドレスの識別子:
	- Observability Pipelines Worker がログメッセージの受信を待機するアドレスを参照します。
	- デフォルトの識別子は `SOURCE_LOGSTASH_ADDRESS` です。
- Logstash TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_LOGSTASH_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{< /tabs >}}

## Logstash を介して Observability Pipelines Worker にログを送信する {#send-logs-to-the-observability-pipelines-worker-over-logstash}

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: /ja/observability_pipelines/sources/filebeat/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ja/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline