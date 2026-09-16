---
description: Observability Pipelines Worker を使用して、ログ記録プラットフォームや SIEM などの HTTP クライアントにログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: HTTP クライアント送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の HTTP クライアント送信先を使用して、ログ記録プラットフォームや SIEM などの HTTP クライアントにログを送信します。

## 送信先の設定 {#set-up-destination}

<div class="alert alert-danger">シークレット管理の場合: HTTP クライアント URI の識別子と、該当する場合は基本認証のユーザー名とパスワードおよび TLS キーパスのみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインを設定][3] する際に、HTTP クライアント送信先を設定します。[UI][1]、[API][4]、または [Terraform][5] を使用してパイプラインを設定できます。このセクションの手順では、UI で設定します。

パイプライン UI で HTTP クライアント送信先を選択したら、次のようにします。

1. HTTP クライアント URI の識別子を入力します。空白のままにした場合は、[デフォルト](#secret-defaults)が使用されます。
1. 認証戦略 ([{{< ui >}}None{{< /ui >}}] (なし)、[{{< ui >}}Basic{{< /ui >}}] (基本)、または [{{< ui >}}Bearer{{< /ui >}}]) を選択します。選択した項目に応じて、次のようにします。
	- {{< ui >}}Basic{{< /ui >}}:
		- HTTP クライアントのユーザー名の識別子を入力します。空白のままにした場合は、[デフォルト](#secret-defaults)が使用されます。
		- HTTP クライアントのパスワードの識別子を入力します。空白のままにした場合は、[デフォルト](#secret-defaults)が使用されます。
	- {{< ui >}}Bearer{{< /ui >}}:
		- HTTP クライアントのトークンの識別子を入力します。空白のままにした場合は、[デフォルト](#secret-defaults)が使用されます。
1. JSON が唯一利用可能なエンコーダーです。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### 圧縮の有効化 {#enable-compression}

スイッチを [{{< ui >}}Enable Compression{{< /ui >}}] (圧縮の有効化) に切り替えます。有効にしたら、次のようにします。
1. GZIP が唯一利用可能な圧縮アルゴリズムです。
1. 使用する圧縮レベルを選択します。

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP クライアント URI エンドポイントの識別子:
	- デフォルトの識別子は `DESTINATION_HTTP_CLIENT_URI` です。
- HTTP クライアント TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_HTTP_CLIENT_KEY_PASS` です。
- 基本認証を使用している場合:
	- HTTP クライアントのユーザー名の識別子:
		- デフォルトの識別子は `DESTINATION_HTTP_CLIENT_USERNAME` です。
	- HTTP クライアントのパスワードの識別子:
		- デフォルトの識別子は `DESTINATION_HTTP_CLIENT_PASSWORD` です。
- Bearer 認証を使用している場合:
	- HTTP クライアントの Bearer トークンの識別子:
		- デフォルトの識別子は `DESTINATION_HTTP_CLIENT_BEARER_TOKEN` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

## 正常性メトリクス {#health-metrics}

すべての送信先から送信される [コンポーネントメトリクス][6] および [送信先バッファメトリクス][7] については、[Pipelines 使用状況メトリクス][8] のドキュメントを参照してください。HTTP クライアント送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:http` を使用します。

## 送信先の動作 {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、以下のいずれかの条件が発生したときに起動されます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| 1,000          | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/