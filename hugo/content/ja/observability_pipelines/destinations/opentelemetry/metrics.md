---
disable_toc: false
products:
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: OpenTelemetry メトリクス送信先
---
{{< product-availability >}}

## 概要{#overview}

Observability Pipelines の OpenTelemetry 送信先を使用して、HTTP/S 経由で OpenTelemetry (OTel) コレクターまたはその他の OpenTelemetry Protocol (OTLP) 互換エンドポイントにメトリクスを送信します。

## 送信先をセットアップ{#set-up-destination}

<div class="alert alert-danger">シークレット管理の場合: HTTP/S Client URI の識別子と、該当する場合は TLS キーパスの識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップする][3]際に、OpenTelemetry 送信先を構成してください。パイプラインのセットアップは、[UI][1] で、[API][4] を使用して、または [Terraform][5] で行えます。このセクションの手順は UI で構成されます。

パイプライン UI で OpenTelemetry 送信先を選択した後、HTTP/S Client URI の識別子を入力します。識別子が参照する HTTP/S URI エンドポイントの例: `http://localhost:4319/v1/metrics`。識別子フィールドを空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

**注**:
- Worker が OpenTelemetry に送信できるのは、カウンター、ゲージ、およびヒストグラムメトリクスのみです。OpenTelemetry は他のメトリクスタイプをサポートしていないため、Worker はそれらを破棄します。詳細については、「[サポートされていないメトリクスを除外する](#filter-out-unsupported-metrics)」を参照してください。
- Worker がメトリクスを並べ替えず、一部の OTLP レシーバーが順序が前後したサンプルを拒否するため、Datadog は、順序が前後したサンプルを OTLP レシーバーが許可するように設定することを推奨します。詳しくは、「[順序が前後したサンプルを許可する](#allow-out-of-order-samples)」を参照してください。
- シークレット識別子を入力してから環境変数を使用することを選択した場合、環境変数は入力された識別子となり、`DD_OP_` が前に付加されます。たとえば、パスワード識別子に `PASSWORD_1` を入力した場合、そのパスワードの環境変数は `DD_OP_PASSWORD_1` になります。

### オプション設定 {#optional-settings}

#### TLS の有効化 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## サポートされていないメトリクスを除外する{#filter-out-unsupported-metrics}

Worker が OpenTelemetry に送信できるのは、カウンター、ゲージ、およびヒストグラムメトリクスのみです。以下の Datadog メトリクスは、OTLP 形式に変換できないためサポートされていません。

- StatsD タイプのメトリクス
- ディストリビューションメトリクス
- スケッチメトリクス

これらのメトリクスのいずれかがエンコードされて OpenTelemetry に送信されるバッチに含まれている場合、Worker はサポートされていないメトリクスを破棄し、エラーをログに記録して、`component_error_total` メトリクスを更新します。Datadog は、[フィルタープロセッサー][9]を使用してサポートされていないメトリクスタイプを除外することを推奨します。

## 順序が前後したサンプルを許可する{#allow-out-of-order-samples}

Worker はメトリクスを並べ替えないため、特定の系列に対して常に正しい順序でメトリクスを送信するとは限りません。たとえば、メトリクスの最初のバッチにタイムスタンプ `10:03`、`10:04`、`10:05` のメトリクスが含まれ、2 番目のバッチにタイムスタンプ `10:01`、`10:02`、`10:06` のメトリクスが含まれている場合、Worker はそれらのメトリクスを送信前に並べ替えません。

Prometheus OTLP レシーバーなど、一部の OTLP レシーバーは順序が前後したサンプルを拒否するため、2 番目のメトリクスバッチはレシーバーによって拒否されます。その結果、Worker は Bad Request (`400`) エラーをログに記録し、OTLP レシーバーがバッチ内の有効なメトリクスの一部を受け入れていても、拒否されたバッチ全体が破棄されます。

Datadog は、順序が前後したサンプルが破棄されるのを防ぐため、順序が前後したサンプルを許可するように OTLP レシーバーを設定することを推奨しています。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- HTTP/S Client URI エンドポイント識別子
  - Worker が OpenTelemetry データを送信する HTTP/S URI エンドポイントを参照します。識別子が参照する HTTP/S URI エンドポイントの例: `http://localhost:4319/v1/metrics`。
  - デフォルトの識別子は `DESTINATION_OTEL_HTTP_CLIENT_URI` です。
- HTTP/S Client TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_OTEL_HTTP_CLIENT_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## 健全性メトリクス {#health-metrics}

すべての送信先から出力されるメトリクスの詳細については、[コンポーネントメトリクス][6]および[送信先バッファメトリクス][7]を参照してください。OpenTelemetry 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:opentelemetry` を使用します。

## 送信先の動作 {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次の条件のいずれかが発生したときにフラッシュされます。詳細については、[イベントのバッチ処理][2]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| N/A            | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ja/observability_pipelines/scaling_and_performance/buffering_and_backpressure/?tab=destinations#buffer-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /ja/observability_pipelines/processors/filter/