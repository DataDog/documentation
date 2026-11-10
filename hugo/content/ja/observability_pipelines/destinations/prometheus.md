---
description: Observability Pipelines Worker を使用して Prometheus にメトリクスを送信する方法を学びます。
disable_toc: false
products:
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Prometheus 送信先
---
{{< product-availability >}}

## 概要{#overview}

Observability Pipelines の Prometheus 送信先を使用して、Prometheus にメトリクスを送信します。

## 送信先のセットアップ {#set-up-destination}

<div class="alert alert-danger">シークレット管理の場合: エンドポイント URL の識別子と、必要に応じてベーシック認証のユーザー名とパスワード、ベアラートークン、TLS キーパスの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインのセットアップ][1]時に、Prometheus 送信先を構成します。パイプラインのセットアップは、[UI][2] で、[API][3] を使用して、または [Terraform][4] で行えます。このセクションの手順は UI で構成されます。

パイプライン UI で Prometheus 送信先を選択した後:

1. {{< ui >}}Remote Write Endpoint URL{{< /ui >}} の識別子を入力してください。識別子が参照するエンドポイント URL の例: `http://localhost:9090/api/v1/write`。識別子フィールドを空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. 認証戦略 ({{< ui >}}None{{< /ui >}}、{{< ui >}}Basic{{< /ui >}}、または {{< ui >}}Bearer{{< /ui >}}) を選択してください。選択内容に応じて、次のいずれかを行います。
    - {{< ui >}}Basic{{< /ui >}}: ユーザー名とパスワードの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
    - {{< ui >}}Bearer{{< /ui >}}: ベアラートークンの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### デフォルトの名前空間 {#default-namespace}

送信するメトリクスのデフォルトの名前空間を入力します。この名前空間は、メトリクスに既存の名前空間がない場合にのみ使用されます。これはメトリクス名のプレフィックスとして追加され、アンダースコア (`_`) で区切られます。名前空間は [Prometheus の命名規則][5]に従う必要があります。

#### テナント ID {#tenant-id}

送信リクエストに追加するテナント ID を入力します。このフィールドは [テンプレート構文][6] をサポートしていますが、テンプレートには prefix-{{ tenant_id }} や prefix/{{ tenant_id }} のようなリテラルプレフィックスが必要です。{{ tenant_id }} などのリテラルプレフィックスがないテンプレートは拒否されます。Worker はエラーをログに記録し、パイプラインは開始されません。

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}
- (オプション) 証明書の検証に使用するサーバー名を入力します。空白のままにすると、エンドポイント URL のホスト名が使用されます。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 順序が前後したサンプルを許可する{#allow-out-of-order-samples}

Worker はメトリクスを並べ替えないため、特定の系列について常に正しい順序でメトリクスを送信するとは限りません。たとえば、メトリクスの最初のバッチにタイムスタンプ `10:03`、`10:04`、`10:05` のメトリクスが含まれ、2 番目のバッチにタイムスタンプ `10:01`、`10:02`、`10:06` のメトリクスが含まれている場合、Worker はそれらのメトリクスを送信前に並べ替えません。

Prometheus remote write レシーバーは順序が前後したサンプルを拒否するため、Worker は Bad Request (`400`) エラーをログに記録し、remote write レシーバーがバッチ内の有効なメトリクスの一部を受け入れた場合でも、2 番目のバッチのメトリクス全体が破棄されます。

Datadog では、順序が前後したサンプルが破棄されないように、remote write レシーバーで順序が前後したサンプルを許可する設定を推奨しています。

## トラブルシューティング {#troubleshooting}

### デバッグエラーログ {#debug-error-logs}

この送信先から `400` または `500` のエラーログが表示される場合は、デバッグログを有効にしてサーバーから返されたレスポンスを確認できます。すべての Worker モジュールではなく、この HTTP ベースの送信先に対してのみログを有効にするには、`VECTOR_LOG` を `info,vector::sinks::util::http=debug` に設定します。

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

完全なデバッグログを有効にする手順については、[デバッグログを有効にする][7]を参照してください。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Remote Write エンドポイント URL 識別子:
	- Remote Write エンドポイント URL を参照します。識別子が参照するエンドポイント URL の例: `http://localhost:9090/api/v1/write`。
	- デフォルトの識別子は `DESTINATION_PROMETHEUS_REMOTE_WRITE_ENDPOINT` です。
- Prometheus TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_PROMETHEUS_REMOTE_WRITE_KEY_PASS` です。
- Basic 認証を使用している場合:
	- Prometheus ユーザー名識別子:
		- デフォルトの識別子は `DESTINATION_PROMETHEUS_REMOTE_WRITE_USERNAME` です。
	- Prometheus パスワード識別子:
		- デフォルトの識別子は `DESTINATION_PROMETHEUS_REMOTE_WRITE_PASSWORD` です。
- Bearer 認証を使用している場合:
	- Prometheus ベアラートークン識別子:
		- デフォルトの識別子は `DESTINATION_PROMETHEUS_REMOTE_WRITE_BEARER_TOKEN` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://prometheus.io/docs/practices/naming/
[6]: /ja/observability_pipelines/destinations/#template-syntax
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs