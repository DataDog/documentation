---
description: Observability Pipelines Worker を使用して Prometheus クライアントからプッシュされたメトリクスを収集する方法について説明します。
disable_toc: false
products:
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Prometheus ソース
---
{{< product-availability >}}

## 概要{#overview}

Observability Pipelines の Prometheus ソースを使用して、Prometheus クライアントからプッシュされたメトリクスを受信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Prometheus アドレスの識別子と、該当する場合はプレーン (ベーシックとも呼ばれる) 認証のユーザー名とパスワードの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][1] する際に、このソースをセットアップします。パイプラインのセットアップは、[UI][2] で、[API][3] を使用して、または [Terraform][4] で行えます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Prometheus ソースを選択した後、

1. Prometheus アドレスの識別子を入力します。識別子が参照するソケットアドレスの例: `0.0.0.0:9091`。識別子フィールドを空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. メトリクスの POST リクエストを受け付ける URL パス (例: `/api/v1/write`) を入力します。
1. 認証戦略を選択します。{{< ui >}}Plain{{< /ui >}} を選択した場合:
    - Prometheus のユーザー名とパスワードの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### 認証トークンの構成 {#configure-authentication-tokens}

Prometheus クライアントの認証ヘッダーに認証情報としてトークンを保存する場合、有効なトークンが含まれているかを受信リクエストで確認するように Worker を構成できます。有効なトークンを持たないリクエストイベントは破棄されます。Worker は、ヘッダーの代わりにエンドポイントパスや IP アドレスを検索することもできます。認証トークンを設定できるのは、認証戦略が **None** に設定されている場合のみです。

{{% observability_pipelines/configure_authentication_tokens %}}

#### keepalive の構成 {#configure-keepalive}

ソースへのコネクションの keepalive 設定を構成するには、{{< ui >}}Configure keepalive{{< /ui >}} トグルを有効にします。

- {{< ui >}}Max connection age{{< /ui >}}: コネクションが閉じられるまでの最大秒数。デフォルトは `300` 秒です。
- {{< ui >}}Max connection age jitter factor{{< /ui >}}: すべてのコネクションが同時に切断されないよう、最大コネクション有効期間をランダム化するために使用される係数。デフォルトは `0.1` です。

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Prometheus アドレスの識別子:
	- Observability Pipelines Worker が Prometheus メトリクスをリッスンするソケットアドレスを参照します。識別子が参照するソケットアドレスの例: `0.0.0.0:9091`。
	- デフォルトの識別子は `SOURCE_PROMETHEUS_REMOTE_WRITE_ADDRESS` です。
- プレーン認証を使用している場合:
	- Prometheus ユーザー名識別子:
		- デフォルトの識別子は `SOURCE_PROMETHEUS_REMOTE_WRITE_USERNAME` です。
	- Prometheus パスワード識別子:
		- デフォルトの識別子は `SOURCE_PROMETHEUS_REMOTE_WRITE_PASSWORD` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline