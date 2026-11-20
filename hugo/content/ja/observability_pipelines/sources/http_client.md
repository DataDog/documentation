---
description: Observability Pipelines Worker を使用してアップストリームの HTTP/S サーバーからログを取得する方法を説明します。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: HTTP/S Client ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の HTTP/S Client ソースを使用して、アップストリームの HTTP/S サーバーからログを取得します。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/http_client %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: HTTP/S Client エンドポイント URL の識別子と、該当する場合は認証戦略のシークレットおよび TLS キーパスの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][1] する際に、このソースをセットアップします。パイプラインは、[UI][3]、[API][4]、または [Terraform][5] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で HTTP/S Client ソースを選択した後、

1. HTTP/S Client エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. 認証戦略を選択します。選択内容に応じて、次のいずれかを行います。
   - {{< ui >}}Basic{{< /ui >}}:
      - HTTP/S Client ユーザー名の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
      - HTTP/S Client パスワードの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
   - {{< ui >}}Bearer{{< /ui >}}: ベアラートークンの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. HTTP メッセージで使用するデコーダーを選択します。HTTP ソースから取得されたログは、このフォーマットである必要があります。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### スクレイプ設定 {#scrape-settings}

- スクレイプの間隔を入力します。
   - お使いの HTTP サーバーは、この間隔で GET リクエストを処理できる必要があります。
   - リクエストは並行して実行されるため、スクレイプに指定された間隔以上の時間がかかると、新しいスクレイプが開始されて追加のリソースが消費される可能性があります。これを防ぐには、タイムアウトをスクレイプ間隔よりも小さい値に設定します。
- 各スクレイプリクエストのタイムアウトを入力します。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP/S Client エンドポイント URL の識別子:
	- Observability Pipelines Worker がログイベントを収集するエンドポイントを参照します。
	- デフォルトの識別子は `SOURCE_HTTP_CLIENT_ENDPOINT_URL` です。
- HTTP/S Client TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_HTTP_CLIENT_KEY_PASS` です。
- Basic 認証を使用している場合:
	- HTTP/S Client ユーザー名の識別子:
		- デフォルトの識別子は `SOURCE_HTTP_CLIENT_USERNAME` です。
	- HTTP/S Client パスワードの識別子:
		- デフォルトの識別子は `SOURCE_HTTP_CLIENT_PASSWORD` です。
- Bearer 認証を使用している場合:
	- HTTP/S Client ベアラートークンの識別子:
		- デフォルトの識別子は `SOURCE_HTTP_CLIENT_BEARER_TOKEN` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline