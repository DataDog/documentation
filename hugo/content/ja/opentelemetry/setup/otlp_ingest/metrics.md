---
aliases:
- /ja/opentelemetry/otlp_metrics
- /ja/opentelemetry/setup/intake_endpoint/otlp_metrics
- /ja/opentelemetry/setup/agentless/metrics
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: 外部サイト
  text: 一般的な OpenTelemetry SDK の構成
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: 外部サイト
  text: OpenTelemetry の環境変数の仕様
- link: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
  tag: 外部サイト
  text: OpenTelemetry Protocol エクスポーター
- link: 'https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/ '
  tag: 外部サイト
  text: OTLP メトリクスエクスポーター
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: ドキュメント
  text: OpenTelemetry でデルタ一時性を構成する
- link: /metrics/otlp/?tab=summary#mapping
  tag: ドキュメント
  text: Datadog における OTLP メトリクスマッピング
- link: https://www.datadoghq.com/blog/otlp-metrics-api/
  tag: ブログ
  text: 新しい OTLP メトリクス API を使用して、OTLP メトリクスを Datadog に直接取り込む
title: Datadog OTLP メトリクスインテークエンドポイント
---
## 概要{#overview}

Datadog の OTLP (OpenTelemetry Protocol) メトリクスインテーク API エンドポイントを使用すると、アプリケーション、マネージドプラットフォーム、および OpenTelemetry Collector から OTLP HTTP 経由で Datadog にメトリクスを送信できます。

[Datadog Agent][2] や OpenTelemetry Collector を使用せずにメトリクスを送信する必要がある場合は、このページの直接構成を使用してください。本番環境の Collector デプロイメントについては、[OpenTelemetry Collector のセットアップ][1] を参照してください。

このエンドポイントは、特に以下のシナリオで役立ちます。

- **OTLP エクスポーターを使用する OpenTelemetry ディストリビューション**: [ADOT (AWS Distro for OpenTelemetry)][8] などの一部の OpenTelemetry ディストリビューションは、統合された OTLP エクスポーターを使用します。OTLP メトリクスエンドポイントを使用すると、これらのディストリビューションから Datadog にメトリクスを送信できます。

- **Agent または Collector を使用する際の技術的な制約**: 直接取り込みでは、サードパーティのマネージドサービス、顧客デバイス上のアプリケーション、および追加のソフトウェアを実行することが現実的ではないその他の環境がサポートされます。

<div class="alert alert-info">マネージドプラットフォーム (Cloudflare、Vercel、Heroku など) からメトリクスを送信する場合は、「<a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">マネージドプラットフォーム</a>」で正しいエンドポイント構成を確認してください。</div>

## 構成 {#configuration}

Datadog OTLP メトリクスインテークエンドポイントに OTLP メトリクスデータをエクスポートするには、以下の手順を実行します。

1. [デルタメトリクスのみが送信されるようにします](#ensure-only-delta-metrics-are-sent)。
1. [OTLP HTTP エクスポーターを構成します](#configure-the-exporter)。
   - Datadog OTLP メトリクスインテークエンドポイントを設定します。
   - 必要な HTTP ヘッダーを構成します。
1. (オプション) [メトリクストランスレーターの動作を構成するには、`dd-otel-metric-config` HTTP ヘッダー](#optional-configure-the-metric-translator)を設定します。

<div class="alert alert-info">2026 年 9 月 1 日以降、OTLP メトリクスインテークエンドポイントは明示的バケットヒストグラムと指数ヒストグラムをネイティブに保存し、元のバケットを保持します。Datadog はそれらのバケットからパーセンタイルを計算します。Metrics Summary と Metrics Explorer には、各ヒストグラムのタイプ (明示的ヒストグラムまたは指数ヒストグラム) が表示されます。ヒストグラムメトリクスの分散クエリは、変更なしで機能します。エンドポイントは、 <code>histograms</code> と <code>summaries</code> フィールドを<a href="#optional-configure-the-metric-translator"><code>dd-otel-metric-config</code> ヘッダー</a>で無視します。</div>

### エクスポーターを構成する {#configure-the-exporter}

OTLP データを Datadog OTLP メトリクスインテークエンドポイントに送信するには、OTLP HTTP エクスポーターを使用します。メトリクスについては、エクスポーターは HTTP Protobuf と HTTP JSON の両方をサポートしています。パフォーマンス向上のためには、HTTP Protobuf が推奨されます。

OpenTelemetry の自動インスツルメンテーションと手動インスツルメンテーションのどちらを使用しているかによってプロセスが異なります。

<div class="alert alert-info">利用している <a href="/getting_started/site/">Datadog サイト</a>である {{< region-param key=dd_datacenter code="true" >}}に応じて: 次の例でエンドポイントを {{< region-param key="otlp_metrics_endpoint" code="true" >}} に置き換えます。</div>

#### デルタメトリクスのみが送信されるようにする {#ensure-only-delta-metrics-are-sent}

Datadog OTLP メトリクスインテークエンドポイントは、**デルタ**メトリクスのみを受け入れます。**累積**メトリクス (ほとんどの SDK でのデフォルト) を送信しようとすると、エラーが発生します。OpenTelemetry SDK または Collector がデルタメトリクスを生成するように構成してください。

- [サポートされている言語][7]については、`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` 環境変数を `delta` に設定します。
- それ以外の場合は、コード内で一時性の設定を行います。詳細については、「[OpenTelemetry でデルタ一時性を構成する][5]」を参照してください。

#### 自動インスツルメンテーション {#automatic-instrumentation}

[OpenTelemetry 自動インスツルメンテーション][3] を使用している場合は、次の環境変数を設定してください。

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="{{< region-param key="otlp_metrics_endpoint" >}}"
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### 手動インスツルメンテーション {#manual-instrumentation}

OpenTelemetry SDK で手動インスツルメンテーションを使用している場合は、OTLP HTTP Protobuf エクスポーターをプログラムで構成してください。

{{< tabs >}}
{{% tab "JavaScript" %}}

JavaScript エクスポーターは [`@opentelemetry/exporter-metrics-otlp-proto`][100] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```javascript
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');

const exporter = new OTLPMetricExporter({
  url: 'https://otlp.datadoghq.com/v1/metrics',
  temporalityPreference: AggregationTemporalityPreference.DELTA, // Ensure delta temporality
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-metric-config': '{"resource_attributes_as_tags": true}',
  },
});
```

[100]: https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

Java エクスポーターは [`OtlpHttpMetricExporter`][200] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```java
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;

OtlpHttpMetricExporter exporter = OtlpHttpMetricExporter.builder()
    .setEndpoint("https://otlp.datadoghq.com/v1/metrics")
    .setAggregationTemporalitySelector(
      AggregationTemporalitySelector.deltaPreferred()) // Ensure delta temporality
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-metric-config", "{\"resource_attributes_as_tags\": true}")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/

{{% /tab %}}

{{% tab "Go" %}}

Go エクスポーターは [`otlpmetrichttp`][300] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"

metricExporter, err := otlpmetrichttp.New(
  ctx,
  otlpmetrichttp.WithEndpoint("otlp.datadoghq.com"),
  otlpmetrichttp.WithURLPath("/v1/metrics"),
      otlpmetrichttp.WithTemporalitySelector(deltaSelector), // Ensure delta temporality
  otlpmetrichttp.WithHeaders(
    map[string]string{
      "dd-api-key": os.Getenv("DD_API_KEY"),
      "dd-otel-metric-config": "{\"resource_attributes_as_tags\": true}",
    }),
)
```

[300]: https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp

{{% /tab %}}

{{% tab "Python" %}}

Python エクスポーターは [`OTLPMetricExporter`][400] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```python
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

exporter = OTLPMetricExporter(
    endpoint="https://otlp.datadoghq.com/v1/metrics",
    preferred_temporality=deltaTemporality, # Ensure delta temporality
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-metric-config": '{"resource_attributes_as_tags": true}',
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (オプション) メトリクストランスレーターを設定する {#optional-configure-the-metric-translator}

`dd-otel-metric-config` ヘッダーを使用して、メトリクスがどのように変換され、Datadog に送信されるかを設定します。JSON ヘッダーには、次のフィールドが含まれます。

`resource_attributes_as_tags`
: **型**: Boolean <br>
**デフォルト**: `false` <br>
`true` に設定すると、すべてのリソース属性がメトリクスラベルに変換され、それがタグに変換されます。

`instrumentation_scope_metadata_as_tags`
: **型**: Boolean <br>
**デフォルト**: `false` <br>
`true` に設定すると、メトリクスを作成したインスツルメンテーションのスコープの名前とバージョンがメトリクスタグに追加されます。

`histograms.mode`
: **型**: 文字列 <br>
**非推奨**: 2026 年 9 月 1 日以降は無視されます。Datadog は、この設定に関係なくヒストグラムをネイティブに保存します。<br>
ヒストグラムをエクスポートするためのモード。有効な値は次のとおりです。
  - `distributions`: ヒストグラムを Datadog ディストリビューションとして送信します。
  - `counters`: ヒストグラムを Datadog カウントとして送信します (バケットごとに 1 つのメトリクス)。
  - `nobuckets`: バケットヒストグラムメトリクスを送信しません。

`histograms.send_aggregation_metrics`
: **型**: Boolean <br>
**非推奨**: 2026 年 9 月 1 日以降は無視されます。Datadog は、個別の `.sum`、`.count`、`.min`、および `.max` メトリクスを書き込みません。代わりに、`count:<METRIC_NAME>{*}.as_count()` のような一致する集計を使用してヒストグラムメトリクスをクエリしてください。<br>
`true` に設定すると、ヒストグラム用の追加の `.sum`、`.count`、`.min`、および `.max` メトリクスが書き込まれます。

`summaries.mode`
: **型**: 文字列 <br>
**非推奨**: 2026 年 9 月 1 日以降は無視されます。<br>
OTLP サマリーをエクスポートするためのモード。有効な値は次のとおりです。
  - `noquantiles`: `.quantile` メトリクスを送信しません。`.sum` および `.count` メトリクスは引き続き送信されます。
  - `gauges`: `.quantile` メトリクスを分位点でタグ付けされたゲージとして送信します。

例:

```json
{
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": true
}
```

## OpenTelemetry Collector {#opentelemetry-collector}

お使いの OpenTelemetry Collector ディストリビューションに Datadog が推奨する Collector セットアップで使用されるすべてのコンポーネントが含まれていない場合は、独自のディストリビューションで OTLP HTTP エクスポーターを構成してください。

これらの例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。ほかのバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用してください。

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

processors:
  cumulativetodelta: {}

exporters:
  otlp_http:
    metrics_endpoint: {{< region-param key="otlp_metrics_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: '{"resource_attributes_as_tags": true}'

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [cumulativetodelta]
      exporters: [otlp_http]
```

この例では、累積メトリクスをインテークエンドポイントで必要とされるデルタ一時性に変換します。Collector ディストリビューションで必要なレシーバーとプロセッサーを追加してください。

OpenTelemetry Collector Contrib を使用した本番環境へのデプロイでは、[推奨される OpenTelemetry Collector セットアップ][1]を使用してください。また、送信キューのバッチ処理、リソース検出、メトリクスタグ付け、ホストメタデータのエンリッチメントも構成します。

## トラブルシューティング{#troubleshooting}

### エラー: 403 Forbidden {#error-403-forbidden}

Datadog OTLP メトリクスインテークエンドポイントにメトリクスを送信した際に `403 Forbidden` エラーが発生する場合、次のいずれかの問題が考えられます。

- 組織に対して誤ったエンドポイント URL を使用している。 
   **解決策**: 自分の組織の正しいエンドポイント URL を使用してください。ご利用のサイトは {{< region-param key=dd_datacenter code="true" >}}であるため、 {{< region-param key="otlp_metrics_endpoint" code="true" >}} エンドポイントを使用してください。

### エラー: 413 Request Entity Too Large {#error-413-request-entity-too-large}

Datadog OTLP メトリクスインテークエンドポイントにメトリクスを送信した際に `413 Request Entity Too Large` エラーが発生する場合は、OTLP エクスポーターが送信したペイロードのサイズが Datadog メトリクスインテークエンドポイントの上限である 512 KiB (圧縮) を超えています。

このエラーは通常、OpenTelemetry SDK が単一のリクエストペイロードに大量のテレメトリデータをまとめて送信した場合に発生します。

**解決策**: SDK のバッチプロセッサーのエクスポートバッチサイズを減らしてください。たとえば、OpenTelemetry Java SDK では、`BatchMetricExportProcessor` を調整できます。

### 問題: データポイントが欠落しているか、メトリクス値が予期した値より低い {#issue-missing-datapoints-or-lower-than-expected-metric-values}

データポイントが欠落している場合や、メトリクス値が予期した値より低い場合、これは、同じタイムスタンプ (秒単位) と同じディメンションを持つメトリクスに対して複数のデータポイントを送信していることが原因である可能性があります。このような場合、Datadog は最後のデータポイントのみを受け入れ、それより前のデータポイントは破棄されます (最後の書き込みを優先 (last-write-wins))。Datadog では、{タイムスタンプ + ディメンション} のコンテキストにおいてメトリクスの時系列データが一意である必要があります。

**解決策**: あるタイムスタンプにおける特定のメトリクスのデータポイントに一意のタグが付けられていることを確認します。たとえば、複数の AWS Lambda 呼び出しからメトリクスの複数のデータポイントを同時に送信する場合は、必ずメトリクスに一意の識別子 (Lambda ARN など) をリソース属性として含めてください。`resource_attributes_as_tags` オプションを使用して、これらのリソース属性をメトリクスタグとして追加します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/collector_exporter/
[2]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation
[5]: /ja/opentelemetry/guide/otlp_delta_temporality/
[6]: /ja/metrics/otlp/?tab=summary#mapping
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
[8]: https://aws-otel.github.io/docs/getting-started/lambda