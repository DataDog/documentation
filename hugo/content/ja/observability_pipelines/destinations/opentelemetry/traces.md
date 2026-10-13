---
code_lang: traces
description: Observability Pipelines Workerを使用して、OpenTelemetry Collectorにトレースを送信する方法を学びます。
disable_toc: false
title: OpenTelemetry Traces送信先
type: multi-code-lang
weight: 2
---
## 概要{#overview}

Observability Pipelinesの {{< tooltip text="OpenTelemetry Traces destination" tooltip="アクセスをリクエストするには、アカウントマネージャーにお問い合わせください。" >}} OpenTelemetry (OTel) Collectorにトレースを送信するには。

<div class="alert alert-info">OpenTelemetry Traces送信先を使用するには、OpenTelemetryソースを使用する必要があります。</div>

## 送信先を設定する{#set-up-destination}

<div class="alert alert-danger">シークレット管理の場合：HTTP/SクライアントURIの識別子と、該当する場合はTLSキーパスのみを入力してください。実際の値を入力し<b>ない</b>でください</div>。

[パイプラインを設定する][3]際に、OpenTelemetry Traces送信先を設定します。このセクションでは[UI][1]での設定方法を説明しますが、[API][4]や[Terraform][5]を使用してパイプラインを設定することも可能です。

パイプラインUIでOpenTelemetry Traces送信先を選択した後、HTTP/SクライアントURIキーの識別子を入力します。識別子が参照するURIエンドポイントの例：`http://localhost:4319/v1/traces`。識別子フィールドを空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定{#optional-settings}

#### TLSを有効にする{#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

## 順序外のサンプルを許可する{#allow-out-of-order-samples}

Workerはメトリクスを並べ替えないため、特定の系列に対して常に正しい順序でメトリクスを送信するとは限りません。例えば、最初のメトリクスのバッチにタイムスタンプ `10:03`、`10:04`、`10:05` のメトリクスが含まれ、2番目のバッチにタイムスタンプ `10:01`、`10:02`、`10:06` のメトリクスが含まれている場合、Worker はそれらのメトリクスを送信する前に順序を並べ替えることはありません。

OTLP レシーバーは順序が不正なサンプルを拒否するため、Worker は Bad Request (`400`) エラーをログに記録し、バッチ内の有効なメトリクスの一部を OTLP レシーバーが受け入れた場合でも、2番目のメトリクスバッチ全体が破棄されます。

Datadog では、順序が不正なサンプルが破棄されるのを防ぐため、OTLP レシーバーで順序が不正なサンプルを許可するように設定することを推奨しています。

## トラブルシューティング {#troubleshooting}

### デバッグエラーログ {#debug-error-logs}

この送信先から `400` または `500` のエラーログが表示される場合は、デバッグログを有効にして、サーバーから返されたレスポンスを確認できます。すべての Worker モジュールではなく、この HTTP ベースの送信先のみのログを有効にするには、`VECTOR_LOG` を `info,vector::sinks::util::http=debug` に設定します。

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

完全なデバッグログを有効にする手順については、[Enable debug logs][6] を参照してください。

## シークレットのデフォルト {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP/S クライアント URI エンドポイント識別子:
  - Worker が OpenTelemetry データを送信する HTTP/S URI エンドポイントを参照します。識別子が参照する URI エンドポイントの例: `http://localhost:4319/v1/traces`。
	- デフォルトの識別子は `DESTINATION_OTEL_HTTP_CLIENT_URI` です。
- OpenTelemetry Traces TLS パスフレーズ識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_OTEL_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_traces %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs