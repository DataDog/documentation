---
aliases:
- /ja/opentelemetry/otlp_endpoint
- /ja/opentelemetry/setup/intake_endpoint/otlp_traces
- /ja/opentelemetry/setup/agentless/traces
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: 外部サイト
  text: 一般的な OpenTelemetry SDK の構成
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: 外部サイト
  text: OpenTelemetry の環境変数の仕様
- link: 'https://opentelemetry.io/docs/reference/specification/protocol/exporter/ '
  tag: 外部サイト
  text: OpenTelemetry Protocol エクスポーター
title: Datadog OTLP トレースインテークエンドポイント
---
## 概要 {#overview}

Datadog の OpenTelemetry Protocol (OTLP) トレースインテーク API エンドポイントを使用すると、アプリケーション、マネージドプラットフォーム、および OpenTelemetry Collector から OTLP HTTP 経由で Datadog にトレースを送信できます。

[Datadog Agent][2] や OpenTelemetry Collector を使用せずにトレースを送信する必要がある場合は、このページの直接構成を使用してください。本番環境の Collector デプロイメントについては、[OpenTelemetry Collector のセットアップ][1] を参照してください。

サーバーレスワークロードについては、[Serverless の OTLP インテーク][8] を参照してください。Cloudflare、Vercel、Heroku などのマネージドプラットフォームについては、[マネージドプラットフォームの OTLP インテーク][9] を参照してください。

<div class="alert alert-info">OTLP トレースインテークエンドポイントは、 <code>http/protobuf</code> および <code>http/json</code> エンコーディングをサポートしています。<code>grpc</code> はサポートされていません。</div>

## 構成 {#configuration}

OTLP データを Datadog OTLP トレースインテークエンドポイントにエクスポートするには、以下の手順を実行します。

1. [OTLP HTTP Protobuf エクスポーターを構成します](#configure-the-exporter)。
   - Datadog OTLP トレースインテークエンドポイントを設定します。
   - 必要な HTTP ヘッダーを構成します。
1. (オプション) [`dd-otel-span-mapping` HTTP ヘッダー](#optional-map-or-filter-span-names)を設定して、スパンのマッピングおよびフィルタリングを行います。

### エクスポーターを構成する {#configure-the-exporter}

Datadog OTLP トレースインテークエンドポイントに OTLP データを送信するには、OTLP HTTP Protobuf エクスポーターを使用する必要があります。OpenTelemetry の自動インスツルメンテーションと手動インスツルメンテーションのどちらを使用しているかによってプロセスが異なります。

[トレースメトリクス][7] は、Datadog OTLP トレースインテークエンドポイントに直接送信されたトレースに対してはデフォルトで計算されません。以下の例には、トレースメトリクスを有効にするための `compute_stats=true` が含まれています。

#### 自動インスツルメンテーション {#automatic-instrumentation}

[OpenTelemetry 自動インスツルメンテーション][3] を使用している場合は、次の環境変数を設定してください。

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},compute_stats=true"
```

#### 手動インスツルメンテーション {#manual-instrumentation}

OpenTelemetry SDK で手動インスツルメンテーションを使用している場合は、OTLP HTTP Protobuf エクスポーターをプログラムで構成してください。

<div class="alert alert-info">利用している <a href="/getting_started/site/">Datadog サイト</a>である {{< region-param key=dd_datacenter code="true" >}}に基づいて、 <code>${YOUR_ENDPOINT}</code> を {{< region-param key="otlp_trace_endpoint" code="true" >}}に置き換えます。</div>

{{< tabs >}}
{{% tab "JavaScript" %}}

JavaScript エクスポーターは [`exporter-trace-otlp-proto`][100] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');  // OTLP http/protobuf exporter

const exporter = new OTLPTraceExporter({
  url: '${YOUR_ENDPOINT}', // Replace this with the correct endpoint
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-span-mapping': '{span_name_as_resource_name: true}',
    'compute_stats': 'true',
  },
});
```
[100]: https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

Java エクスポーターは [`OtlpHttpSpanExporter`][200] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;

OtlpHttpSpanExporter exporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-span-mapping", "{span_name_as_resource_name: true}")
    .addHeader("compute_stats", "true")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-trace/

{{% /tab %}}
{{% tab "Go" %}}

Go エクスポーターは [`otlptracehttp`][300] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

traceExporter, err := otlptracehttp.New(
	ctx,
	otlptracehttp.WithEndpoint("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint
	otlptracehttp.WithURLPath("/v1/traces"),
	otlptracehttp.WithHeaders(
		map[string]string{
			"dd-api-key": os.Getenv("DD_API_KEY"),
			"dd-otel-span-mapping": "{span_name_as_resource_name: true}",
			"compute_stats": "true",
		}),
)
```

[300]: http://go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp

{{% /tab %}}
{{% tab "Python" %}}

Python エクスポーターは [`OTLPSpanExporter`][400] です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

exporter = OTLPSpanExporter(
    endpoint="${YOUR_ENDPOINT}", # Replace this with the correct endpoint
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-span-mapping": "{span_name_as_resource_name: true}",
        "compute_stats": "true",
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (オプション) スパン名をマッピングまたはフィルタリングする {#optional-map-or-filter-span-names}

`dd-otel-span-mapping` ヘッダーを使用して、スパンのマッピングとフィルタリングを構成します。JSON ヘッダーには、次のフィールドが含まれます。

- `ignore_resources`: リソース名に基づいてトレースを無効にするための正規表現のリスト。
- `span_name_remappings`: Datadog スパン名から任意の名前へのマッピング。
- `span_name_as_resource_name`: OpenTelemetry スパン名を Datadog スパンのオペレーション名として使用するかどうかを指定します (デフォルト: true)。false の場合、オペレーション名はインスツルメンテーションスコープ名とスパン種別の組み合わせから派生します。

例:

```json
{
  "span_name_as_resource_name":false,
  "span_name_remappings":{
    "io.opentelemetry.javaagent.spring.client":"spring.client"
  },
  "ignore_resources":[
    "io.opentelemetry.javaagent.spring.internal"
  ]
}
```
## OpenTelemetry Collector {#opentelemetry-collector}

[推奨される OpenTelemetry Collector のセットアップ][10] を構成して、トレースがこのエンドポイントにエクスポートし、サンプリング前に APM トレースメトリクスを生成します。

## トラブルシューティング {#troubleshooting}

### エラー: 403 Forbidden {#error-403-forbidden}

Datadog OTLP トレースインテークエンドポイントへトレースを送信した際に `403 Forbidden` エラーが発生する場合は、エンドポイントが Datadog サイトと一致していることを確認してください。ご利用のサイトは {{< region-param key=dd_datacenter code="true" >}}です。 {{< region-param key="otlp_trace_endpoint" code="true" >}} エンドポイントを使用してください。

### エラー: 413 Request Entity Too Large {#error-413-request-entity-too-large}

Datadog OTLP トレースインテークエンドポイントへトレースを送信した際に `413 Request Entity Too Large` エラーが発生する場合は、OTLP エクスポーターが送信するペイロードのサイズが Datadog トレースインテークエンドポイントの上限の 15 MiB (非圧縮) を超えています。

このエラーは通常、OpenTelemetry SDK が単一のリクエストペイロードに大量のテレメトリデータをまとめて送信した場合に発生します。

**解決策**: SDK のバッチスパンプロセッサーのエクスポートバッチサイズを減らしてください。OpenTelemetry Java SDK で `BatchSpanProcessorBuilder` を変更する方法の例を以下に示します。

```java
CopyBatchSpanProcessor batchSpanProcessor =
    BatchSpanProcessor
        .builder(exporter)
        .setMaxExportBatchSize(10)  // Default is 512
        .build();
```
`setMaxExportBatchSize` の値は必要に応じて調整してください。値を小さくすると、より頻繁に小さいペイロードでエクスポートされるようになり、15 MiB の制限を超える可能性が低くなります。

### 警告: \"traces export: failed … 202 Accepted\" in Go {#warning-traces-export-failed-202-accepted-in-go}


OpenTelemetry Go SDK を使用していて、`traces export: failed … 202 Accepted` のような警告メッセージが表示される場合は、OpenTelemetry Go OTLP HTTP エクスポーターに存在する既知の問題が原因です。

OpenTelemetry Go OTLP HTTP エクスポーターは、エクスポートが成功しても 200 以外の HTTP ステータスコードをエラーとして扱います ([Issue 3706][5])。一方、他の OpenTelemetry SDK では 200 以上 300 未満のステータスコードを成功と見なします。Datadog OTLP トレースインテークエンドポイントは、エクスポートが成功した場合に ``202 Accepted` を返します。

OpenTelemetry コミュニティでは、他の `2xx` ステータスコードを成功として扱うべきかどうかについて、まだ議論が続いています ([Issue 3203][6])。

**解決策**: OpenTelemetry Go SDK と Datadog OTLP トレースインテークエンドポイントを組み合わせて使用している場合は、この警告メッセージを無視しても問題ありません。警告が出ていても、トレースは正しくエクスポートされています。

### 問題: 予期しないスパンのオペレーション名 {#issue-unexpected-span-operation-names}

Datadog OTLP トレースインテークエンドポイントを使用していると、Datadog Agent や OpenTelemetry Collector を使用した場合とは異なるスパンのオペレーション名が生成されることがあります。

Datadog OTLP トレースインテークエンドポイントでは、デフォルトで `span_name_as_resource_name` オプションが `true` に設定されています。つまり、Datadog は OpenTelemetry スパン名をオペレーション名として使用します。対照的に、Datadog Agent と OpenTelemetry Collector では、このオプションがデフォルトで `false` に設定されています。

`span_name_as_resource_name` が `false` に設定されている場合、オペレーション名はインスツルメンテーションスコープ名とスパン種別の組み合わせから派生します。たとえば、オペレーション名は `opentelemetry.client` と表示される場合があります。

**解決策**: Datadog OTLP トレースインテークエンドポイントで `span_name_as_resource_name` オプションを無効にし、Datadog Agent や OpenTelemetry Collector と同じ動作に合わせたい場合は、以下の手順を実行してください。

1. このドキュメントの[スパン名をマッピングまたはフィルタリングする](#optional-map-or-filter-span-names)を参照してください。
1. `dd-otel-span-mapping` ヘッダーで `span_name_as_resource_name` オプションを `false` に設定します。

例:

```json
jsonCopy{
  "span_name_as_resource_name": false,
  ...
}
```

これにより、Datadog OTLP トレースインテークエンドポイント、Datadog Agent、OpenTelemetry Collector でスパンのオペレーション名が一致するようになります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/collector_exporter/
[2]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[5]: https://github.com/open-telemetry/opentelemetry-go/issues/3706
[6]: https://github.com/open-telemetry/opentelemetry-specification/issues/3203
[7]: /ja/tracing/metrics/
[8]: /ja/opentelemetry/setup/otlp_ingest/serverless/
[9]: /ja/opentelemetry/setup/otlp_ingest/managed_platforms/
[10]: /ja/opentelemetry/setup/collector_exporter/