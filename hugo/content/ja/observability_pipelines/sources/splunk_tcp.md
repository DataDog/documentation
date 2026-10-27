---
description: Observability Pipelines Worker を使用して、TCP 経由で Splunk Heavy または Universal
  Forwarders からログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Splunk Heavy または Universal Forwarders (TCP) ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Splunk Heavy および Universal Forwarders (TCP) ソースを使用して、Splunk Forwarders に送信されたログを受信します。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Splunk TCP アドレスの識別子、および該当する場合は TLS キーパスの識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][1] する際に、このソースをセットアップします。パイプラインのセットアップは、[UI][2] で、[API][3] を使用して、または [Terraform][4] で行えます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Splunk TCP ソースを選択した後、Splunk TCP アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

**注**:
- デフォルトでは、Splunk TCP ソースはイベントのサイズを制限しません。形式が正しくない接続や無期限に開いたままの接続など、無制限のメモリ消費を防ぐには、環境変数 `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` を使用して最大フレーム長をバイト単位で設定します。
- シークレット識別子を入力してから環境変数を使用することを選択した場合、環境変数は入力された識別子となり、`DD_OP_` が前に付加されます。たとえば、パスワード識別子に <code>PASSWORD_1</code> と入力した場合、そのパスワードの環境変数は `DD_OP_PASSWORD_1` となります。

### オプション設定 {#optional-settings}

#### 最大接続時間 {#maximum-connection-duration}

接続を開いたままにする最大秒数を入力します。設定しない場合、接続が無期限に開いたままになる可能性があります。

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Splunk TCP アドレス識別子:
	- Observability Pipelines Worker が Splunk Forwarder からログを受信するためにリッスンする、`0.0.0.0:9997` などのソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_SPLUNK_TCP_ADDRESS` です。
- Splunk TCP TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_SPLUNK_TCP_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline