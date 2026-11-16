---
description: Observability Pipelines Worker の HTTP/S Server ソースを使用して HTTP クライアントログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: HTTP/S Server ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の HTTP/S Server ソースを使用して HTTP クライアントログを収集します。

[Datadog Lambda Forwarder を使用して AWS ベンダーログを Observability Pipelines に送信する](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines)こともできます。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/http_server %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: HTTP/S Server アドレスの識別子のみを入力してください。該当する場合は、プレーン (ベーシックとも呼ばれる) 認証のユーザー名とパスワード、および TLS キーパスも入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][3] する際に、このソースをセットアップします。パイプラインのセットアップは、[UI][1] で、[API][4] を使用して、または [Terraform][5] で行えます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で HTTP/S Server ソースを選択した後:

1. HTTP/S Server アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
    - **注**: アドレスの識別子のみを入力してください。実際のアドレスは入力**しないでください**。
1. 認証戦略を選択します。{{< ui >}}Plain{{< /ui >}} を選択した場合:
    - HTTP/S Server のユーザー名とパスワードの識別子を入力してください。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. (オプション) 認証トークンをセットアップします。詳細については、[認証トークンの構成](#configure-authentication-tokens)を参照してください。
1. HTTP メッセージで使用するデコーダーを選択します。HTTP クライアントログはこの形式でなければなりません。**注**: `bytes` デコーディングを選択した場合、生のログは `message` フィールドに保存されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### 認証トークンの構成 {#configure-authentication-tokens}

トークンを HTTP リクエストの認証ヘッダーに資格情報として保存する場合、Worker が受信 HTTP リクエストに有効なトークンが含まれているかをチェックするように構成できます。有効なトークンを持たないリクエストイベントは破棄されます。Worker は、ヘッダーの代わりにエンドポイントパスや IP アドレスを検索することもできます。

**注**: {{< ui >}}Plain{{< /ui >}} 認証戦略では認証トークンを構成できません。

{{% observability_pipelines/configure_authentication_tokens %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP/S サーバーアドレス識別子:
	- Observability Pipelines Worker が HTTP クライアントログをリッスンする `0.0.0.0:9997` などのソケットアドレスを参照します。
	- デフォルトの識別子は `SOURCE_HTTP_SERVER_ADDRESS` です。
- HTTP/S サーバー TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_HTTP_SERVER_KEY_PASS` です。
- プレーン認証を使用している場合:
	- HTTP/S Server のユーザー名識別子:
		- デフォルトの識別子は `SOURCE_HTTP_SERVER_USERNAME` です。
	- HTTP/S Server のパスワード識別子:
		- デフォルトの識別子は `SOURCE_HTTP_SERVER_PASSWORD` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Lambda Forwarder を使用して AWS ベンダーログを Observability Pipelines に送信する {#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines}

HTTP/S Server ソースを使用して AWS ベンダーログを Observability Pipelines に送信するには、以下の手順を実行します。

- [HTTP/S Server ソースを使用してパイプラインをセットアップします](#set-up-a-pipeline)。
- [Datadog Forwarder をデプロイします](#deploy-the-datadog-lambda-forwarder)。

**注**: これは Worker バージョン 2.15 以降で使用可能です。

### パイプラインをセットアップする {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Datadog Lambda Forwarder をデプロイする {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline