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

ログが Syslog ソースでサポートされていない形式を使用している場合は、[パース](#parsing)を参照してください。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/syslog %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: syslog アドレスの識別子と、該当する場合は TLS キーパスのみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][1] する際に、このソースをセットアップします。パイプラインのセットアップは、[UI][7] で、[API][8] を使用して、または [Terraform][9] で行えます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Syslog ソースを選択した後:

1. syslog アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. {{< ui >}}Socket Type{{< /ui >}} ドロップダウンメニューで、使用する通信プロトコル（{{< ui >}}TCP{{< /ui >}} または {{< ui >}}UDP{{< /ui >}}）を選択します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## パース {#parsing}

Observability Pipelines Worker は、以下の syslog 形式を可能な限りパースします。

- [RFC 6587][10]
- [RFC 5424][11]
- [RFC 3164][12]
- NGINX syslog スタイルなど、その他の一般的なバリエーション

Worker がログをパースできない場合、エラーがログに記録されます。

### サポートされていない syslog 形式をパースする {#parse-unsupported-syslog-formats}

ログが Syslog ソースでサポートされていない形式を使用している場合、またはパースが頻繁に失敗する場合:

1. Syslog ソースの代わりに [Socket ソース][13] を使用してログを受信します。
1. パイプラインに [カスタムプロセッサ][14] を追加して、VRL でログをパースします。たとえば、次のようになります。
    - `parse_regex` を使用して、独自のパースルールを作成します。
    - `parse_syslog` を使用して、パースエラーを自分で処理します。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- rsyslog または syslog-ng アドレス識別子:
	- Syslog フォワーダーからログを受信するために Observability Pipelines Worker がリッスンするバインドアドレス（`0.0.0.0:9997` など）を参照します。
	- デフォルトの識別子は `SOURCE_SYSLOG_ADDRESS` です。
- rsyslog または syslog-ng TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_SYSLOG_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## syslog を介して Observability Pipelines Worker にログを送信する {#send-logs-to-the-observability-pipelines-worker-over-syslog}

{{% observability_pipelines/log_source_configuration/syslog %}}

## サードパーティのログを Observability Pipelines Worker に転送する {#forward-third-party-logs-to-the-observability-pipelines-worker}

Syslog は、ネットワークログを中央サーバーに送信するために広く使用されているログプロトコルです。多くのネットワークデバイスが syslog 出力をサポートしているため、サードパーティのログを Observability Pipelines の syslog ソースに転送して、処理やルーティングを行うことができます。これらのサードパーティサービスの例を以下に示します。

### Fortinet {#fortinet}
- [ログ転送の設定][2]
- [Configuring syslog settings][3]

### Palo Alto Networks {#palo-alto-networks}
- [ログ転送の設定][4]
- [トラフィックログを syslog サーバーに転送する][5]

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ja/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: https://datatracker.ietf.org/doc/html/rfc6587
[11]: https://datatracker.ietf.org/doc/html/rfc5424
[12]: https://datatracker.ietf.org/doc/html/rfc3164
[13]: /ja/observability_pipelines/sources/socket/
[14]: /ja/observability_pipelines/processors/custom_processor/