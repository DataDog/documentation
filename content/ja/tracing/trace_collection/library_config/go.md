---
title: Configuring the Go Tracing Library
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: ソースコード
  text: Source code
- link: "https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: 外部サイト
  text: Package page
- link: /tracing/glossary/
  tag: Documentation
  text: Explore your services, resources and traces
- link: /tracing/trace_collection/trace_context_propagation/go/
  tag: Documentation
  text: Propagating trace context
---

[コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成し、Go インテグレーションをアクティブ化][1]した後、オプションで、必要に応じてトレーシングライブラリを構成してください。

Datadog では、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用して、サービスの `env`、`service`、`version` を設定することを推奨します。

これらの環境変数の構成方法に関する推奨事項は、[統合サービスタグ付け][2]のドキュメントをお読みください。これらの変数は、Go トレーサーのバージョン 1.24.0 以降で利用可能です。

トレーサーの API を通じて、`env`、`service`、`version` を指定することもできます。

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // トレーサーが停止すると、終了する前にトレーサー内のすべてのデータが Datadog Agent にフラッシュされます。
    // この行は主要な関数内に残すようにしてください。
    defer tracer.Stop()
}
```

Go トレーサーは、コンフィギュレーション用の追加の環境変数と関数をサポートしています。
[コンフィギュレーションドキュメント][3]で利用可能なすべてのオプションを参照してください。

`DD_VERSION`
: アプリケーションのバージョン (例: `1.2.3`、`6c44da20`、 `2020.02.13`) を設定します。

`DD_SERVICE`
: このアプリケーションで使用されるサービス名。

`DD_ENV`
: アプリケーションの環境を設定します。例: prod、pre-prod、staging

`DD_AGENT_HOST`
: **デフォルト**: `localhost` <br>
トレース送信のためのデフォルトのトレース Agent ホストアドレスをオーバーライドします。

`DD_TRACE_AGENT_PORT`
: **デフォルト**: `8126` <br>
Datadog トレース送信のためのデフォルトのトレース Agent ポートをオーバーライドします。[Agent の構成][13]で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、ライブラリ構成の `DD_DOGSTATSD_PORT` はそれに合わせなければなりません。

`DD_DOGSTATSD_PORT`
: **デフォルト**: `8125` <br>
DogStatsD メトリクス送信のためのデフォルトのトレース Agent ポートをオーバーライドします。[Agent の構成][13]で `dogstatsd_port` や `DD_DOGSTATSD_PORT` をデフォルトの `8125` 以外に設定した場合、ライブラリ構成の `DD_DOGSTATSD_PORT` はそれに合わせなければなりません。

`DD_TRACE_SAMPLING_RULES`
: **Default**: `nil`<br>
A JSON array of objects. Each object must have a `"sample_rate"`. The `"name"`,`"service"`, `"resource"`, and `"tags"` fields are optional. The `"sample_rate"` value must be between `0.0` and `1.0` (inclusive). Rules are applied in configured order to determine the trace's sample rate.

  <div class="alert alert-info">Support for sampling by resource and tags is in beta.</div>

  For more information, see [Ingestion Mechanisms][4].<br>
  **Examples:**<br>
  - サンプルレートを 20% に設定: `'[{"sample_rate": 0.2}]'`
  - 'a' で始まるサービスとスパン名 'b' のサービスのサンプルレートを 10% に、それ以外のサービスのサンプルレートを 20% に設定: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`
  - Set the sample rate to 40% for services that have `HTTP GET` resource name: `'[{"resource": "HTTP GET", "sample_rate": 0.4}]'`.
  - Set the sample rate to 100% for services that have a `tier` tag with the value `premium`: `'[{"tags": {"tier":"premium"}, "sample_rate": 1}]'`.

`DD_TRACE_SAMPLE_RATE`
: インジェストレートコントロールを有効にします。

`DD_SPAN_SAMPLING_RULES`
: **Default**: `nil`<br>
A JSON array of objects. Each object must have a `"sample_rate"`. The `"name"`,`"service"`, `"resource"`, and `"tags"` fields are optional. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive).

  <div class="alert alert-info">Support for sampling by resource and tags is in beta.</div>

  For more information, see [Ingestion Mechanisms][5].<br>
  **Example:**<br>
  - サービス名 `my-service` と演算子名 `http.request` のスパンサンプリングレートを 50% に設定し、1 秒間に最大 50 トレースします: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`
  - Set the sample rate to 100% for services that have a `priority` tag with the value `high`: `'[{"tags": {"priority":"high"}, "sample_rate": 1}]'`.

`DD_TRACE_RATE_LIMIT`
: 1 秒あたり、Go プロセスごとにサンプリングするスパンの最大数。DD_TRACE_SAMPLE_RATE が設定されている場合、デフォルトは 100 です。それ以外の場合は、Datadog Agent にレート制限を委ねます。

`DD_TAGS`
: **デフォルト**: [] <br>
すべてのスパンとプロファイルに追加されるデフォルトタグのリスト。タグはカンマやスペースで区切ることができます。例えば、 `layer:api,team:intake,key:value` や `layer:api team:intake key:value` などです。

`DD_TRACE_STARTUP_LOGS`
: **デフォルト**: `true` <br>
スタートアップコンフィグレーションと診断ログを有効にします。

`DD_TRACE_DEBUG`
: **デフォルト**: `false`<br>
トレーサーでデバッグロギングを有効化します。

`DD_TRACE_ENABLED`
: **デフォルト**: `true`<br>
Web フレームワークとライブラリインスツルメンテーションを有効にします。false の場合、アプリケーションコードはトレースを生成しません。

`DD_SERVICE_MAPPING`
: **デフォルト**: `null` <br>
構成により、サービス名を動的に変更することができます。サービス名はカンマやスペースで区切ることができ、例えば `mysql:mysql-service-name,postgres:postgres-service-name`、`mysql:mysql-service-name postgres:postgres-service-name` のようにすることができます。

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **デフォルト**: `true` <br>
Datadog は、製品の改良のため、[システムの環境・診断情報][6]を収集することがあります。false の場合、このテレメトリーデータは収集されません。

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **デフォルト**: `false`<br>
Datadog Agent への大規模トレースのフラッシュをインクリメント形式で有効化し、Agent に拒否される可能性を低減します。保持期間が長いトレースまたは多数のスパンを持つトレースがある場合にのみ使用してください。有効な値は `true` または `false` です。
バージョン 1.54.0 で追加されました。Datadog Agent 7.26.0 以降とのみ互換性を有しています。

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **デフォルト**: `1000`<br>
Datadog Agent に部分的にフラッシュできるトレース内のスパン数。`DD_TRACE_PARTIAL_FLUSH_ENABLED` が `true` でないと、部分的なフラッシュは行われません。
バージョン 1.54.0 で追加されました。Datadog Agent 7.26.0 以降とのみ互換性を有しています。

`DD_TRACE_CLIENT_IP_ENABLED`
: **デフォルト**: `false` <br>
HTTP リクエストスパンの関連 IP ヘッダーからクライアント IP の収集を可能にします。
バージョン 1.47.0 で追加されました

`DD_TRACE_HEADER_TAGS`
: **Default**: `null` <br>
List of comma-separated HTTP headers to be used as span tags. Optionally specify a "mapped" field to rename the request header as a tag. Configuration can be set globally with this environment variable, or at the integration level using the options specified in the [Go documentation][15]. This feature is compatible with [HTTP1][16] headers.<br>
**Examples:**<br>
  - Capture request header `my-header`: `"DD_TRACE_HEADER_TAGS=my-header"`
  - Capture request headers `my-header-1` and `my-header-2`: `"DD_TRACE_HEADER_TAGS=my-header1,my-header-2"`
  - Capture request header `my-header` and rename it to `my-tag`: `"DD_TRACE_HEADER_TAGS=my-header:my-tag"`

## APM 環境名の構成

[APM 環境名][7]は、[Agent 内][8]またはトレーサーの [WithEnv][3] スタートオプションを使用して構成できます。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/go
[2]: /getting_started/tagging/unified_service_tagging
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[4]: /tracing/trace_pipeline/ingestion_mechanisms/
[5]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=go#pagetitle
[6]: /tracing/configure_data_security#telemetry-collection
[7]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[8]: /getting_started/tracing/#environment-name
[9]: https://github.com/openzipkin/b3-propagation
[13]: /agent/configuration/network/#configure-ports
[14]: https://github.com/w3c/trace-context
[15]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[16]: https://www.rfc-editor.org/rfc/rfc7230#section-3.2
