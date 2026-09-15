---
description: Observability Pipelines Worker を使用して、rsyslog または syslog-ng に送信されたログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Syslog ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の rsyslog または syslog-ng を使用して、rsyslog または syslog-ng に送信されたログを受信します。

[サードパーティのログを syslog に転送](#forward-third-party-logs-to-syslog)し、それを Observability Pipelines Worker に送信することもできます。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/syslog %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: syslog アドレス (該当する場合は TLS キーパスも含む) の識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

このソースは、[パイプラインをセットアップ][1]する際にセットアップします。パイプラインは、[UI][7]、[API][8]、または [Terraform][9] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップする場合のものです。

パイプライン UI で Syslog ソースを選択した後:

1. syslog アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. {{< ui >}}Socket Type{{< /ui >}} ドロップダウンメニューで、使用する通信プロトコル ({{< ui >}}TCP{{< /ui >}} または {{< ui >}}UDP{{< /ui >}}) を選択します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- rsyslog または syslog-ng のアドレス識別子:
	- Observability Pipelines Worker が Syslog フォワーダーからログを受信するためにリッスンするバインドアドレス (例: `0.0.0.0:9997`) を参照します。
	- デフォルトの識別子は `SOURCE_SYSLOG_ADDRESS` です。
- rsyslog または syslog-ng の TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_SYSLOG_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## ログを syslog 経由で Observability Pipelines Worker に送信する {#send-logs-to-the-observability-pipelines-worker-over-syslog}

{{% observability_pipelines/log_source_configuration/syslog %}}

## サードパーティのログを Observability Pipelines Worker に転送する {#forward-third-party-logs-to-the-observability-pipelines-worker}

Syslog は、ネットワークログを中央サーバーに送信するために広く使用されているロギングプロトコルです。多くのネットワークデバイスが syslog 出力をサポートしているため、サードパーティのログを Observability Pipelines の Syslog ソースに転送して、処理やルーティングを行うことができます。これらのサードパーティサービスの例を次に示します。

### Fortinet {#fortinet}
- [Configure log forwarding][2]
- [Configuring syslog settings][3]

### Palo Alto Networks {#palo-alto-networks}
- [Configure log forwarding][4]
- [Forward traffic logs to a syslog server][5]

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ja/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline