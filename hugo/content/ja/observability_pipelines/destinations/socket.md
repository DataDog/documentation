---
description: Observability Pipelines Worker を使用してソケットエンドポイントにログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Socket 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Socket 送信先を使用して、エンドポイントにログを送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: ソケットアドレスの識別子と、該当する場合はキーパスのみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][2]する際に、Socket 送信先を構成します。パイプラインは、[UI][1]、[API][3]、または [Terraform][4] を使用してセットアップできます。このセクションの手順では、UI で設定します。

パイプライン UI で Socket 送信先を選択したら、次のようにします。

1. アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1.  ドロップダウンメニュー{{< ui >}}Mode{{< /ui >}}で、使用するソケットタイプを選択します。
1.  ドロップダウンメニュー{{< ui >}}Encoding{{< /ui >}}で、出力形式として {{< ui >}}JSON{{< /ui >}} または {{< ui >}}Raw message{{< /ui >}} を選択します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- ソケットアドレスの識別子:
	- Observability Pipelines Worker が処理済みログを送信するアドレスを参照します。
	- デフォルトの識別子は `DESTINATION_SOCKET_ADDRESS` です。
- ソケット TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_SOCKET_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の動作 {#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

Socket 送信先はイベントをバッチ処理しません。

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: /ja/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline