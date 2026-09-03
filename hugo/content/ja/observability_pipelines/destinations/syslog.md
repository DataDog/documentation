---
description: Observability Pipelines Worker を使用して rsyslog または syslog-ng にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Syslog 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の syslog 送信先を使用して、rsyslog または syslog-ng にログを送信します。

**注**: rsyslog および syslog-ng の送信先は、[RFC5424][5] 形式をサポートしています。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: syslog エンドポイント URL (該当する場合はキーパスも含む) の識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][2]する際に、rsyslog または syslog-ng の送信先を設定します。パイプラインは、[UI][1]、[API][3]、または [Terraform][4] を使用して設定できます。このセクションの手順は、UI で設定します。

パイプライン UI で rsyslog または syslog-ng の送信先を選択した後、エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

フィールドの対応については、[ログフィールドと syslog フィールドの対応付け](#matching-log-fields-to-syslog-fields)を参照してください。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定{#optional-settings}

#### TLS の有効化{#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### TCP キープアライブプローブの待機時間{#wait-time-for-tcp-keepalive-probes}

アイドル接続で TCP キープアライブプローブを送信する前に待機する秒数を入力します。

#### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

## ログフィールドと syslog フィールドの対応付け {#matching-log-fields-to-syslog-fields}

rsyslog および syslog-ng の送信先は、ログフィールドと syslog フィールドを次のように対応付けます。

| ログイベント       | SYSLOG フィールド | デフォルト                    |
|-----------------|--------------|----------------------------|
| log["message"]  | MESSAGE      | `NIL`                      |
| log[\"procid\"]   | PROCID       | 実行中の Worker のプロセス ID。 |
| log["appname"]  | APP-NAME     | `observability_pipelines`  |
| log["facility"] | FACILITY     | `8 (log_user)`             |
| log["msgid"]    | MSGID        | `NIL`                      |
| log["severity"] | SEVERITY     | `info`                     |
| log["host"]     | HOSTNAME     | `NIL`                      |
| log[\"timestamp\"]| TIMESTAMP    | 現在の UTC 時刻。         |

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- rsyslog または syslog-ng エンドポイント URL 識別子:
	- Observability Pipelines Worker がログを送信するアドレスとポートを参照します。例: `127.0.0.1:9997`。
	- デフォルトの識別子は `DESTINATION_SYSLOG_ENDPOINT_URL` です。
- rsyslog または syslog-ng TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_SYSLOG_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

rsyslog および syslog-ng の送信先は、イベントをバッチ処理しません。

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: /ja/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://datatracker.ietf.org/doc/html/rfc5424