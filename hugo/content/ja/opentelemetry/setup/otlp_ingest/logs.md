---
aliases:
- /ja/opentelemetry/otlp_logs
- /ja/opentelemetry/setup/intake_endpoint/otlp_logs
- /ja/opentelemetry/setup/agentless/logs
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: 外部サイト
  text: 一般的な OpenTelemetry SDK の構成
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: 外部サイト
  text: OpenTelemetry の環境変数の仕様
- link: https://opentelemetry.io/docs/reference/specification/protocol/exporter/
  tag: 外部サイト
  text: OpenTelemetry Protocol Exporter
title: Datadog OTLP ログ取り込みエンドポイント
---
## 概要 {#overview}

Datadog の OpenTelemetry Protocol (OTLP) ログ取り込み API エンドポイントを使用すると、アプリケーション、マネージドプラットフォーム、および OpenTelemetry Collector から OTLP HTTP 経由で Datadog にログを送信できます。

[Datadog Agent][2] や OpenTelemetry Collector を使用せずにログを送信する必要がある場合は、このページの直接構成を使用してください。本番環境の Collector デプロイメントについては、[OpenTelemetry Collector のセットアップ][1]を参照してください。

<div class="alert alert-info">マネージドプラットフォーム (Cloudflare、Vercel、Heroku など) からログを送信する場合は、<a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">マネージドプラットフォーム</a>で正しいエンドポイント構成を確認してください。</div>

## 構成 {#configuration}

Datadog OTLP ログ取り込みエンドポイントに OTLP データを送信するには、OTLP HTTP Protobuf エクスポーターを構成する必要があります。OpenTelemetry の自動インスツルメンテーションと手動インスツルメンテーションのどちらを使用しているかによってプロセスが異なります。

<div class="alert alert-info">利用している <a href="/getting_started/site/">Datadog サイト</a>である次に基づく: {{< region-param key=dd_datacenter code="true" >}}: 次の例では <code>${YOUR_ENDPOINT}</code> を {{< region-param key="otlp_logs_endpoint" code="true" >}} に置き換えます。</div>

#### 自動インスツルメンテーション {#automatic-instrumentation}

[OpenTelemetry 自動インスツルメンテーション][3]を使用している場合は、次の環境変数を設定してください。

```shell
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT="${YOUR_ENDPOINT}" // Replace this with the correct endpoint
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY}"
```

#### 手動インスツルメンテーション {#manual-instrumentation}

OpenTelemetry SDK で手動インスツルメンテーションを使用している場合は、次の例を使用して OTLP HTTP Protobuf エクスポーターをプログラムで構成してください。

<div class="alert alert-info">JavaScript および Python の OpenTelemetry SDK ログサポートは開発中です。最新のステータスについては、<a href="https://opentelemetry.io/docs/languages/#status-and-releases">OpenTelemetry のステータスとリリース</a>を参照してください。</div>

{{< tabs >}}
{{% tab "Java" %}}
Java エクスポーターは `OtlpHttpLogRecordExporter` です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .build();
```
{{% /tab %}}

{{% tab "Go" %}}
Go エクスポーターは `otlploghttp` です。エクスポーターを構成するには、次のコードスニペットを使用してください。

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"

logExporter, err := otlploghttp.New(
    ctx,
    otlploghttp.WithEndpointURL("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint, minus the URL path
    otlploghttp.WithURLPath("/v1/logs"),
    otlploghttp.WithHeaders(
        map[string]string{
            "dd-api-key": os.Getenv("DD_API_KEY"),
        }),
)
```
{{% /tab %}}
{{< /tabs >}}

## OpenTelemetry Collector {#opentelemetry-collector}

お使いの OpenTelemetry Collector ディストリビューションに Datadog が推奨する Collector セットアップで使用されるすべてのコンポーネントが含まれていない場合は、独自のディストリビューションで OTLP HTTP エクスポーターを構成してください。

これらの例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。他のバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用してください。

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlp_http]
```

Collector ディストリビューションで必要なレシーバーとプロセッサーを追加してください。

OpenTelemetry Collector Contrib を使用した本番環境へのデプロイでは、[推奨される OpenTelemetry Collector セットアップ][1]を使用してください。また、送信キューのバッチ処理、リソース検出、ホストメタデータのエンリッチメントも構成します。

## ログ処理を構成する (オプション) {#configure-log-processing-optional}

`dd-otel-log-config` ヘッダーを使用して、取り込み時に Datadog が OTLP ログレコードをどのように処理するかを構成します。ヘッダーの値は以下のフィールドを含む JSON オブジェクトです。

`keep_raw_message`
: **タイプ**: ブール値<br>
**デフォルト**: `false`<br>
**説明**: デフォルトでは、Datadog は JSON ログ本文をログ属性にパースするため、メッセージに対して全文検索を実行する代わりに個々のフィールド (例: `@key:value`) を検索できます。`keep_raw_message` が `true` に設定されている場合、Datadog は本文をパースせず、`message` 属性に文字列として保持します。ログパイプラインでログメッセージのカスタムパースを行う場合、または JSON 本文内のフィールドが既存のログ属性と競合する場合は、このオプションを使用してください。

たとえば、JSON ログ本文を未加工の文字列として保持するには、次のようにします。

```json
{
  "keep_raw_message": true
}
```

`dd-api-key` と併せて OTLP リクエストにヘッダーを設定します。たとえば、自動インスツルメンテーションの場合は以下のようになります。

```shell
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY},dd-otel-log-config={\"keep_raw_message\":true}"
```

手動インスツルメンテーションの場合は、エクスポーター設定でヘッダーを追加してください。たとえば、Java の場合は以下のようになります。

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}")
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-log-config", "{\"keep_raw_message\": true}")
    .build();
```

OpenTelemetry Collector では、`otlp_http` エクスポーターの `headers` にヘッダーを追加します。

```yaml
exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-log-config: '{"keep_raw_message": true}'
```

## トラブルシューティング {#troubleshooting}

### エラー: 403 Forbidden {#error-403-forbidden}

Datadog OTLP ログ取り込みエンドポイントにログを送信する際に `403 Forbidden` エラーが発生した場合、以下の潜在的な問題が考えられます。

- 組織に対して誤ったエンドポイント URL を使用している。 
   **解決策**: 自分の組織の正しいエンドポイント URL を使用してください。ご利用のサイトは {{< region-param key=dd_datacenter code="true" >}}であるため、 {{< region-param key="otlp_logs_endpoint" code="true" >}} エンドポイントを使用する必要があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/collector_exporter/
[2]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation