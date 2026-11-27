---
aliases:
- /ja/opentelemetry/interoperability/environment_variable_support
further_reading:
- link: /tracing/trace_collection/library_config/dotnet-core
  tag: ドキュメント
  text: .NET Core SDK 構成
- link: /tracing/trace_collection/library_config/dotnet-framework
  tag: ドキュメント
  text: .NET Framework SDK 構成
- link: /tracing/trace_collection/library_config/go
  tag: ドキュメント
  text: Go SDK 構成
- link: /tracing/trace_collection/library_config/java
  tag: ドキュメント
  text: Java SDK 構成
- link: /tracing/trace_collection/library_config/nodejs
  tag: ドキュメント
  text: Node.js SDK 構成
- link: /tracing/trace_collection/library_config/php
  tag: ドキュメント
  text: PHP SDK 構成
- link: /tracing/trace_collection/library_config/python
  tag: ドキュメント
  text: Python SDK 構成
- link: /tracing/trace_collection/library_config/ruby
  tag: ドキュメント
  text: Ruby SDK 構成
title: OpenTelemetry 環境変数の相互運用性
---
DDOT SDK は、トレース、メトリクス、ログの OpenTelemetry API を実装し、標準の OpenTelemetry SDK 環境変数 (`OTEL_*`) を読み取ります。DDOT SDK を採用する際、既存の OpenTelemetry 構成を維持し、Datadog 固有の機能に対してのみ少数の Datadog (`DD_*`) 設定を使用できます。

このページでは、言語ごとのサポートの違いを含め、DDOT SDK を構成するための環境変数について説明します。また、Ruby および PHP 用の Datadog SDK についても説明します。これらは OpenTelemetry Metrics API と Logs API のためにこれらの OpenTelemetry 環境変数を読み取りますが、DDOT SDK ではありません。

このページの優先順位ルールは、*DDOT SDK* が構成をどのように OpenTelemetry リソース属性 (たとえば、`service.name`、`deployment.environment.name`、`service.version`) に解決するかを説明しています。

<div class="alert alert-danger">
  Datadog で同じタグキーに対して値が重複するのを避けるため、同じ概念に対して Datadog (<code>DD_*</code>) と OpenTelemetry (<code>OTEL_*</code>) の両方の環境変数を設定しないでください。どちらか一方の方式にしてください。
  <br>
  デフォルト値や詳細については、関連する <a href="/tracing/trace_collection/library_config/">SDK 構成ページ</a>を参照してください。
</div>

## ネットワーク要件{#network-requirements}

{{% otel-network-requirements %}}

## シグナルを構成する {#configure-signals}

以下の環境変数を使用して、DDOT SDK でトレース、メトリクス、ログを構成します。収集するシグナルの値を明示的に設定します。設定手順については、[OpenTelemetry API サポート][14]を参照してください。

言語固有のデフォルト設定および追加設定については、以下を参照してください。

| SDK 言語 | 構成リファレンス |
|---|---|
| .NET | [.NET Core][1] または [.NET Framework][2] |
| Go | [Go SDK 構成][3] |
| Java | [Java SDK 構成][4] |
| Node.js | [Node.js SDK 構成][5] |
| PHP | [PHP SDK 構成][6] |
| Python | [Python SDK 構成][7] |
| Ruby | [Ruby SDK 構成][8] |

`DD_TRACE_OTEL_ENABLED`
: **説明**: OpenTelemetry Traces API のサポートを有効にします。<br>
**構成**: `DD_TRACE_OTEL_ENABLED=true` を設定して、API サポートを有効にします。OTLP を介してトレースをエクスポートする場合は、`OTEL_TRACES_EXPORTER=otlp` も設定します。API サポートを有効にするだけでは、トレースエクスポーターは変更されません。設定手順については、[DDOT SDK OTLP トレースのエクスポート][17]を参照してください。

`DD_TRACE_OTEL_SEMANTICS_ENABLED`
: **説明**: トレースの OpenTelemetry セマンティック規約を有効にします。<br>
**デフォルト**: `false`<br>
**注**: HTTP インスツルメンテーションと SDK バージョンのガイダンスについては、[OpenTelemetry トレースセマンティクス][21]を参照してください。

`DD_METRICS_OTEL_ENABLED`
: **説明**: OpenTelemetry Metrics API によって生成されたメトリクスの収集と OTLP エクスポートを有効にします。<br>
**構成**: `DD_METRICS_OTEL_ENABLED=true` を設定してメトリクスのサポートを有効にし、`OTEL_METRICS_EXPORTER=otlp` を設定して OTLP エクスポートを選択します。

`DD_LOGS_OTEL_ENABLED`
: **説明**: SDK で、サポートされているロギング API およびライブラリからログを収集し、OTLP 形式でエクスポートできるようにします。<br>
**構成**: `DD_LOGS_OTEL_ENABLED=true` を設定してログ収集を有効にします。自動ログ収集を無効にする場合は、`DD_LOGS_OTEL_ENABLED=false` と設定します。

### OTLP を介してランタイムメトリクスをエクスポートする {#export-runtime-metrics-over-otlp}

ランタイムメトリクスを収集して OTLP を介してエクスポートするには、[ランタイムメトリクスの前提条件][20]を満たす SDK を使用し、以下のように設定します。

```text
DD_RUNTIME_METRICS_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
OTEL_METRICS_EXPORTER=otlp
```

この構成により、ランタイムメトリクスの収集が有効になり、構成された OTLP メトリクスエンドポイントにメトリクスが送信されます。エンドポイントの設定については、[メトリクス固有の OTLP 構成][18]を参照してください。

## 一般的な SDK 構成{#general-sdk-configuration}
Datadog SDK は、以下の一般的な OpenTelemetry SDK オプションをサポートしています。詳細については、関連する [OpenTelemetry ドキュメント][9]を参照してください。

`OTEL_SERVICE_NAME`
: **Datadog 規則**: `DD_SERVICE`<br>
`service.name` リソース属性を設定します<br>
**注**: 最終的な `service.name` リソース属性を決定する際、SDK はこの変数を入力として使用して最終的な `service.name` を決定します。優先順位の完全なリストについては、`OTEL_RESOURCE_ATTRIBUTES` の下の `service.name` の注を参照してください。<br>

`OTEL_LOG_LEVEL`
: **Datadog 規則**: `DD_LOG_LEVEL`<br>
SDK ロガーで使用されるログレベル<br>
**注**: デバッグのログレベルは次の変数にもマップされます: `DD_TRACE_DEBUG=true`<br>
Node.js および PHP SDK では、`DD_TRACE_LOG_LEVEL` にマップされます<br>
Go SDK では、`OTEL_LOG_LEVEL` と `DD_TRACE_DEBUG` の間でマッピングされた値のみがサポートされます<br>
  - `info`|`false`
  - `debug`|`true`<br>
**サポート対象外**: Python、.NET、Ruby、および Go SDK<br>

`OTEL_PROPAGATORS`
: **Datadog 規則**: `DD_TRACE_PROPAGATION_STYLE`<br>
使用するプロパゲーターをカンマ区切りのリストで指定<br>
**注**: ほとんどの Datadog SDK でサポートされる値は、`tracecontext`、`b3`、`b3multi`、`none`、`datadog` のみです。`xray` は Java SDK でもサポートされます<br>
`Propagator` を一度だけ登録するため、値の重複を排除する必要があります<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: **Datadog 規則**: `DD_TRACE_SAMPLE_RATE`<br>
`OTEL_TRACES_SAMPLER`: トレースに使用するサンプラー、`OTEL_TRACES_SAMPLER_ARG`: サンプラーの引数として使用する文字列値<br>
**注**: 指定された値が使用されるのは、`OTEL_TRACES_SAMPLER` が設定されている場合のみです。サンプラーの種類によって、入力が必要な場合、その入力に求められる条件が決まります。無効または認識されない入力は、ログに記録され、それ以外の点では無視されることが必要です。そのような場合、実装は `OTEL_TRACES_SAMPLER_ARG` が設定されていないかのように動作する必要があります<br>
`OTEL_TRACES_SAMPLER` と `DD_TRACE_SAMPLE_RATE` の対応する値:<br>
  - `parentbased_always_on`|`1.0`
  - `parentbased_always_off`|`0.0`
  - `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
  - `always_on`|`1.0`
  - `always_off`|`0.0`
  - `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: **説明**: トレースエクスポーターを選択します。<br>
**構成**: `otlp` を設定して、OTLP を介してトレースをエクスポートします。Datadog トレースを無効にする場合は、`DD_TRACE_ENABLED=false` と設定します。[DDOT SDK OTLP トレースエクスポート][17]の説明に従って、OTLP トレースエクスポートを構成します。

`OTEL_METRICS_EXPORTER`
: **説明**: 使用するメトリクスエクスポーターを指定します。<br>
**注**: 指定できる値は `otlp` と `none` のみです。`none` の値を指定すると、OTel メトリクスと APM ランタイムメトリクスの出力が無効になります (`DD_RUNTIME_METRICS_ENABLED=false` と同じ)<br>
**デフォルト**: `otlp`

`OTEL_RESOURCE_ATTRIBUTES`
: **Datadog 規則**: `DD_TAGS` <br>
**説明**: OpenTelemetry のリソース属性として使用するキーと値のペア。<br>
**注**: SDK は、Datadog (`DD_*`) の構成を優先して、重複する設定を解決します。
    - `service.name` (`DD_SERVICE` にマップされる): SDK は以下の優先順位で値を解決します。<br>
        1. `DD_SERVICE` の値<br>
        2. `OTEL_SERVICE_NAME` の値<br>
        3. `DD_TAGS` 内の `service` キーの値<br>
        4. `OTEL_RESOURCE_ATTRIBUTES` 内の `service.name` キーの値
    - `deployment.environment.name` (`DD_ENV` にマップされる): SDK は以下の優先順位で値を解決します。<br>
        1. `DD_ENV` の値<br>
        2. `DD_TAGS` 内の `env` キーの値<br>
        3. `OTEL_RESOURCE_ATTRIBUTES` 内の `deployment.environment.name` キーの値<br>
        4. `OTEL_RESOURCE_ATTRIBUTES` 内の `deployment.environment` の値
    - `service.version` (`DD_VERSION` にマップされる): SDK は以下の優先順位で値を解決します。<br>
        1. `DD_VERSION` の値<br>
        2. `DD_TAGS` 内の `version` キーの値<br>
        3. `OTEL_RESOURCE_ATTRIBUTES` 内の `service.version` キーの値
    - **追加属性**: `DD_TAGS` 構成を通じて、または `DD_TAGS` が設定されていない場合は `OTEL_RESOURCE_ATTRIBUTES` を通じて追加できます。

  <div class="alert alert-danger">
    SDK は出力されるテレメトリに対してこれらの設定を内部的に解決しますが、Datadog Agent は構成されたすべてのソースから上書きなしでタグを収集します。サービス、環境、バージョンを複数の入力 (たとえば、 <code>DD_ENV</code> フィールドと <code>OTEL_RESOURCE_ATTRIBUTES</code>の両方) で構成すると、Datadog で複数の値 (たとえば、<code>env:prod</code> フィールドと <code>env:dev</code>) ではサポートされていません。
    重複を避けるため、各項目は一つの方式のみで構成してください。
  </div>

`OTEL_SDK_DISABLED`
: **説明**: トレース、メトリクス、ログの OpenTelemetry サポートを無効にします。<br>
**注**: `true`に設定すると、`DD_TRACE_OTEL_ENABLED=false`、`DD_LOGS_OTEL_ENABLED=false`、および `DD_METRICS_OTEL_ENABLED=false` が設定されたことになります。<br>
**Ruby および Go SDK**: OpenTelemetry SDKはインポートおよび構成時に自動的にアクティブ化されるため、この設定は適用されません。

## OTLP エクスポーターの構成{#otlp-exporter-configuration}
DDOT SDK は、以下の [OpenTelemetry OTLP エクスポーター][13]のオプションをサポートします。

シグナル固有の変数 (`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` など) は、常に一般的な変数 (`OTEL_EXPORTER_OTLP_PROTOCOL` など) よりも優先されます。

### 一般的な OTLP 構成{#general-otlp-configuration}

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **説明**: オーバーライドされない限り、すべてのシグナルに使用するトランスポートプロトコルを指定します。<br>
**指定可能な値**: `grpc`、`http/protobuf`、`http/json`。<br>
**デフォルト**: SDK により異なります。Datadog SDK は、その言語の対応する公式 OpenTelemetry SDK のデフォルトプロトコルに合わせることを目指しています。

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **説明**: オーバーライドされない限り、すべてのシグナルの OTLP データを送信するためのベース URL を指定します。<br>
**デフォルト (gRPC)**: `http://localhost:4317`。<br>
**デフォルト (HTTP)**: `http://localhost:4318`。

`OTEL_EXPORTER_OTLP_HEADERS`
: **説明**: すべての送信 OTLP リクエストのヘッダーとして使用されるキーと値のペアのカンマ区切りリスト (たとえば、`api-key=key,other-config=value`) を指定します。

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **説明**: オーバーライドされない限り、すべての送信 OTLP リクエストのタイムアウト (ミリ秒単位) を指定します。<br>
**デフォルト**: `10000` (10 秒)。

### メトリクス固有の OTLP 設定{#metrics-specific-otlp-configuration}

これらの変数の公式仕様の詳細については、[OpenTelemetry の OTLP メトリクスエクスポーターのドキュメント][15]を参照してください。

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **説明**: メトリクスデータに使用する OTLP トランスポートプロトコルを指定します。一般的な `OTEL_EXPORTER_OTLP_PROTOCOL` よりも優先されます。<br>
**指定可能な値**: `grpc`、`http/protobuf`、`http/json`。<br>
**デフォルト**: SDK により異なります。Datadog SDK は、その言語の対応する公式 OpenTelemetry SDK のデフォルトプロトコルに合わせることを目指しています。

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **説明**: OTLP メトリクスデータを送信するための URL を指定します。一般的な `OTEL_EXPORTER_OTLP_ENDPOINT` よりも優先されます。<br>
**デフォルト (gRPC)**: `http://localhost:4317`。<br>
**デフォルト (HTTP)**: `http://localhost:4318/v1/metrics`。<br>
**注**: HTTP プロトコルの場合、一般的な `OTEL_EXPORTER_OTLP_ENDPOINT` がフォールバックとして使用されていると、SDK は自動的に `/v1/metrics` を追加します。

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **説明**: 送信される OTLP メトリクスリクエストのヘッダーとして使用するキーと値のペアのカンマ区切りリスト (たとえば、`api-key=key,other-config=value`) を指定します。一般的な `OTEL_EXPORTER_OTLP_HEADERS` よりも優先されます。

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **説明**: 単一の送信 OTLP メトリクスリクエストのタイムアウト (ミリ秒単位) を指定します。一般的な `OTEL_EXPORTER_OTLP_TIMEOUT` よりも優先されます。<br>
**デフォルト**: `10000` (10 秒)。

### ログ固有の OTLP 構成{#logs-specific-otlp-configuration}

`OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
: **説明**: ログの OTLP トランスポートプロトコルを指定します。`OTEL_EXPORTER_OTLP_PROTOCOL` よりも優先されます。
: **指定可能な値**: `grpc`、`http/protobuf`、`http/json` <br>
: **デフォルト**: SDK により異なります。Datadog SDK は、その言語の対応する公式 OpenTelemetry SDK のデフォルトプロトコルに合わせることを目指しています。

`OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`
: **説明**: OTLP ログを送信するための URL を指定します。`OTEL_EXPORTER_OTLP_ENDPOINT` よりも優先されます。
: **デフォルト (gRPC)**: `http://localhost:4317`
: **デフォルト (HTTP)**: `http://localhost:4318/v1/logs`

`OTEL_EXPORTER_OTLP_LOGS_HEADERS`
: **説明**: 送信される OTLP ログリクエストのヘッダーとして使用する、キーと値のペアのカンマ区切りリストを指定します。一般的な `OTEL_EXPORTER_OTLP_HEADERS` よりも優先されます。

`OTEL_EXPORTER_OTLP_LOGS_TIMEOUT`
: **説明**: 単一の送信 OTLP ログリクエストのタイムアウト (ミリ秒単位) を指定します。一般的な `OTEL_EXPORTER_OTLP_TIMEOUT` よりも優先されます。<br>
**デフォルト**: `10000` (10 秒)。

## OpenTelemetry Metrics SDK 構成{#opentelemetry-metrics-sdk-configuration}

Datadog SDK は、以下の OpenTelemetry Metrics SDK オプションをサポートします。

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **説明**: インスツルメントの種類ごとに使用する集計の `temporality` を指定します。<br>
**指定可能な値**: `Cumulative`、`Delta`、`LowMemory`。詳細については、[OpenTelemetry 仕様][15]を参照してください。<br>
**デフォルト**: `delta` <br>
**注**: このデフォルト値 `delta` は [Datadog が推奨する構成][16]であり、OpenTelemetry 仕様のデフォルトとは異なります。

`OTEL_METRIC_EXPORT_INTERVAL`
: **説明**: メトリクスのエクスポート試行間の時間間隔 (ミリ秒単位) を指定します。<br>
**デフォルト**: `10000` (10 秒)<br>
**注**: このデフォルト値は Datadog が推奨する設定であり、OpenTelemetry 仕様のデフォルトである 60000 ミリ秒とは異なります。

`OTEL_METRIC_EXPORT_TIMEOUT`
: **説明**: メトリクスの収集およびエクスポートに許可される最大時間 (ミリ秒単位) を指定します。<br>
**デフォルト**: `7500` (7.5 秒)<br>
**注**: このデフォルト値は Datadog が推奨する設定であり、OpenTelemetry 仕様のデフォルトである 30000 ミリ秒とは異なります。

## OpenTelemetry Logs SDK 構成{#opentelemetry-logs-sdk-configuration}

Datadog SDK は、以下の OpenTelemetry Logs SDK オプションをサポートします。

`OTEL_LOGS_EXPORTER`
: **説明**: OpenTelemetry ログエクスポーターを構成します。<br>
**構成**: [OpenTelemetry API サポート][14]の説明に従って、ログエクスポートを構成します。自動ログ収集を無効にする場合は、`DD_LOGS_OTEL_ENABLED=false` と設定します。

`OTEL_BLRP_MAX_QUEUE_SIZE`
: **説明**: メモリ内に保持するログレコードの最大数。制限に達すると、新しいレコードは破棄されます。<br>
**デフォルト**: `2048`

`OTEL_BLRP_SCHEDULE_DELAY`
: **説明**: 2 つの連続するエクスポート操作間の時間間隔 (ミリ秒単位)。<br>
**デフォルト**: `1000` (1 秒)

`OTEL_BLRP_EXPORT_TIMEOUT`
: **説明**: 1 回のエクスポートがキャンセルされるまでに許容される最大時間 (ミリ秒単位)。<br>
**デフォルト**: `30000` (30 秒)

`OTEL_BLRP_MAX_EXPORT_BATCH_SIZE`
: **説明**: 単一の OTLP ペイロード内のログレコードの最大数。<br>
**デフォルト**: `512`

## Java 固有の構成{#java-specific-configuration}
Datadog SDK は、以下の Java 固有の OpenTelemetry 構成オプションをサポートします。詳細については、[Java エージェント構成に関する OpenTelemetry ドキュメント][10]を参照してください。

`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: **Datadog 規則**: `!DD_INTEGRATIONS_ENABLED` <br>
Agent 内のすべてのインスツルメンテーションを無効にするには、`false` に設定してください<br>
**注**: `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` と `DD_INTEGRATIONS_ENABLED` の間でマッピングされる値:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **説明**: 指定された OTel ドロップインインスツルメンテーションを有効または無効にします<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: **Datadog 規則**: `DD_TRACE_CONFIG` <br>
エージェント構成を格納する有効な Java プロパティファイルへのパス<br>
**注**: OTEL_JAVAAGENT_CONFIGURATION_FILE と DD_TRACE_CONFIG の両方が設定されている場合、両方のファイルの設定が適用されます。これは、Datadog の設定が OTel の設定を上書きするという通常の規則の例外です<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: **Datadog 規則**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP クライアントインスツルメンテーションは、構成されたすべてのヘッダー名について HTTP リクエストヘッダー値をキャプチャします<br>
**注**: OTel 環境変数を使用して構成されたヘッダーのタグ付けは、OTel のタグ名規則である `http.request.header.<header-name>` に従います。Datadog の次の規則ではありません: `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: **Datadog 規則**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP クライアントインスツルメンテーションは、構成されたすべてのヘッダー名について HTTP レスポンスヘッダー値をキャプチャします<br>
**注**: OTel 環境変数を使用して構成されたヘッダーのタグ付けは、OTel のタグ名規則である `http.response.header.<header-name>` に従います。Datadog の次の規則ではありません: `http.response.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: **Datadog 規則**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP サーバーインスツルメンテーションは、設定されたすべてのヘッダー名について HTTP リクエストヘッダー値をキャプチャします<br>
**注**: OTel 環境変数を使用して構成されたヘッダーのタグ付けは、OTel のタグ名規則である `http.request.header.<header-name>` に従います。Datadog の次の規則ではありません: `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: **Datadog 規則**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP サーバーインスツルメンテーションは、構成されたすべてのヘッダー名について HTTP レスポンスヘッダー値をキャプチャします<br>
**注**: OTel 環境変数を使用して構成されたヘッダーのタグ付けは、OTel のタグ名規則である `http.response.header.<header-name>` に従います。Datadog の次の規則ではありません: `http.response.headers.<header-name>`<br>

`OTEL_JAVAAGENT_EXTENSIONS`
: **Datadog 規則**: `DD_TRACE_EXTENSIONS_PATH` <br>
拡張 jar ファイルへのパス、または jar ファイルを格納するフォルダーのカンマ区切りリスト。フォルダーを指定した場合、そのフォルダー内のすべての jar ファイルが、個別の独立した拡張機能として扱われます。<br>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/library_config/dotnet-core
[2]: /ja/tracing/trace_collection/library_config/dotnet-framework
[3]: /ja/tracing/trace_collection/library_config/go
[4]: /ja/tracing/trace_collection/library_config/java
[5]: /ja/tracing/trace_collection/library_config/nodejs
[6]: /ja/tracing/trace_collection/library_config/php
[7]: /ja/tracing/trace_collection/library_config/python
[8]: /ja/tracing/trace_collection/library_config/ruby
[9]: https://opentelemetry.io/docs/specs/otel/configuration/SDK-environment-variables/#general-SDK-configuration
[10]: https://opentelemetry.io/docs/zero-code/java/agent/configuration/#configuring-the-agent
[11]: https://opentelemetry.io/docs/specs/semconv/resource/#semantic-attributes-with-dedicated-environment-variable
[12]: /ja/tracing/trace_collection/library_config/_index
[13]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[14]: /ja/opentelemetry/instrument/ddot_sdks/api_support/
[15]: https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/#additional-environment-variable-configuration
[16]: /ja/opentelemetry/guide/otlp_delta_temporality/
[17]: /ja/opentelemetry/instrument/ddot_sdks/#enable-otlp-trace-export
[18]: #metrics-specific-otlp-configuration
[20]: /ja/tracing/metrics/runtime_metrics/#export-runtime-metrics-over-otlp
[21]: /ja/opentelemetry/instrument/ddot_sdks/#opentelemetry-trace-semantics