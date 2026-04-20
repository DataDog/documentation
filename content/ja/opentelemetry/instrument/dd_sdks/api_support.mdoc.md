---
aliases:
- /ja/opentelemetry/interoperability/api_support
- /ja/opentelemetry/interoperability/otel_api_tracing_interoperability/
- /ja/opentelemetry/instrument/api_support/dotnet/
- /ja/opentelemetry/instrument/api_support/dotnet/logs
- /ja/opentelemetry/instrument/api_support/dotnet/metrics
- /ja/opentelemetry/instrument/api_support/dotnet/traces
- /ja/opentelemetry/instrument/api_support/go
- /ja/opentelemetry/instrument/api_support/go/metrics
- /ja/opentelemetry/instrument/api_support/go/traces
- /ja/opentelemetry/instrument/api_support/java
- /ja/opentelemetry/instrument/api_support/nodejs/
- /ja/opentelemetry/instrument/api_support/nodejs/logs
- /ja/opentelemetry/instrument/api_support/nodejs/metrics
- /ja/opentelemetry/instrument/api_support/nodejs/traces
- /ja/opentelemetry/instrument/api_support/php
- /ja/opentelemetry/instrument/api_support/php/metrics
- /ja/opentelemetry/instrument/api_support/php/traces
- /ja/opentelemetry/instrument/api_support/python/
- /ja/opentelemetry/instrument/api_support/python/logs
- /ja/opentelemetry/instrument/api_support/python/metrics
- /ja/opentelemetry/instrument/api_support/python/traces
- /ja/opentelemetry/instrument/api_support/ruby/
- /ja/opentelemetry/instrument/api_support/ruby/metrics
- /ja/opentelemetry/instrument/api_support/ruby/traces
- /ja/opentelemetry/instrument/api_support/rust
- /ja/opentelemetry/instrument/api_support/rust/metrics
- /ja/opentelemetry/instrument/api_support/rust/traces
content_filters:
- label: Language
  option_group_id: otel_api_support_language_options
  trait_id: prog_lang
- label: Signal
  option_group_id: otel_api_support_signal_options
  trait_id: platform
description: OpenTelemetry APIを使用して、Datadog SDKを介してトレース、メトリクス、ログをDatadogに送信し、ベンダー中立の計測を維持します。
further_reading:
- link: tracing/guide/instrument_custom_method
  tag: Documentation
  text: ビジネスロジックの深い可視性を得るためにカスタムメソッドを計測します。
- link: tracing/connect_logs_and_traces
  tag: Documentation
  text: ログとトレースを接続します。
- link: tracing/visualization/
  tag: Documentation
  text: サービス、リソース、トレースを探索します。
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: DatadogとOpenTelemetryイニシアチブについてもっと学びましょう。
title: OpenTelemetry APIサポート
---
<!-- ============================================== -->
<!-- SIGNAL AVAILABILITY NOTICES -->
<!-- ============================================== -->

<!-- Languages with only traces: Java -->
{% if equals($prog_lang, "java") %}
{% if equals($platform, "metrics") %}
{% alert level="danger" %}
この言語ではメトリクスのためのOpenTelemetry APIサポートは利用できません。代わりに[DogStatsD][200]を使用してカスタムメトリクスを送信してください。
{% /alert %}
{% /if %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
この言語ではログのためのOpenTelemetry APIサポートは利用できません。代わりに[Datadog Log Collection][210]を使用してください。
{% /alert %}
{% /if %}
{% /if %}

<!-- PHP has traces and metrics only -->
{% if equals($prog_lang, "php") %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
PHPではログのためのOpenTelemetry APIサポートは利用できません。代わりに[Datadog Log Collection][210]を使用してください。
{% /alert %}
{% /if %}
{% /if %}

<!-- Ruby has traces and metrics only -->
{% if equals($prog_lang, "ruby") %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
RubyではログのためのOpenTelemetry APIサポートは利用できません。代わりに[Datadog Log Collection][210]を使用してください。
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- TRACES CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "traces") %}

## 概要

OpenTelemetryトレースAPIを使用して、Datadog SDKでカスタムスパンを作成し、タグを追加し、イベントを記録するなどします。

{% if equals($prog_lang, "java") %}
{% partial file="opentelemetry/traces/java.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="opentelemetry/traces/python.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "node_js") %}
{% partial file="opentelemetry/traces/nodejs.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="opentelemetry/traces/go.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="opentelemetry/traces/ruby.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "dot_net") %}
{% partial file="opentelemetry/traces/dotnet.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "php") %}
{% partial file="opentelemetry/traces/php.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "rust") %}
{% partial file="opentelemetry/traces/rust.mdoc.md" /%}
{% /if %}

{% /if %}
<!-- END TRACES CONTENT -->

<!-- ============================================== -->
<!-- METRICS CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "metrics") %}

<!-- Show content only for languages that support metrics -->
{% if includes($prog_lang, ["dot_net", "node_js", "python", "ruby", "go", "php", "rust"]) %}

## 概要

OpenTelemetryメトリクスAPIを使用して、Datadog SDKでカスタムアプリケーションメトリクスを送信します。これは[DogStatsD][200]の代替です。

<!-- Native implementation (.NET, Node.js, Go, Rust) -->
{% if includes($prog_lang, ["dot_net", "node_js", "go", "rust"]) %}

Datadog SDKはOpenTelemetry APIのネイティブ実装を提供します。これは、公式のOpenTelemetry SDKを必要とせずに標準のOTelインターフェースに対してコードを書くことができることを意味します。

{% alert level="info" %}
公式のOpenTelemetry SDKやOTLPエクスポーターパッケージをインストールしないでください。Datadog SDKはこの機能を提供します。両方をインストールすると、ランタイムの競合や重複データが発生する可能性があります。
{% /alert %}
{% /if %}

<!-- Exporter-based implementation (Python, Ruby, PHP) -->
{% if includes($prog_lang, ["python", "ruby", "php"]) %}

このアプローチは、既存のOpenTelemetry SDKと連携します。この機能を有効にすると、Datadog SDKはOTel SDKを検出し、そのOTLPエクスポーターを構成して、Datadogエージェントにメトリクスを送信します。
{% /if %}

##前提条件

{% if equals($prog_lang, "dot_net") %}
- **.NETランタイム**: .NET 6+（または`System.Diagnostics.DiagnosticSource` v6.0.0+）が必要です。サポートされている楽器のバージョンのリストについては、[バージョンと楽器のサポート](#net-version-and-instrument-support)を参照してください。
- **Datadog SDK**: dd-trace-dotnetバージョン3.30.0以降。
{% /if %}
{% if equals($prog_lang, "node_js") %}
- **Datadog SDK**: `dd-trace-js`バージョン5.81.0以降。
- **OpenTelemetry API**: `@opentelemetry/api`バージョン1.0.0から1.10.0まで。（Datadog SDKはこのAPIの実装を提供します）。
{% /if %}
{% if equals($prog_lang, "python") %}
- **Datadog SDK**: dd-trace-pyバージョン3.18.0以降。
{% /if %}
{% if equals($prog_lang, "ruby") %}
{% alert level="info" %}
Ruby用のOpenTelemetryメトリクスSDKは現在、[アルファ実装](https://github.com/open-telemetry/opentelemetry-ruby/tree/main/metrics_sdk)にあります。SDKに関する問題は、[opentelemetry-ruby/issues](https://github.com/open-telemetry/opentelemetry-ruby/issues)で報告してください。
{% /alert %}
- **Datadog SDK**: `datadog` gemバージョン2.23.0以降。
{% /if %}
{% if equals($prog_lang, "go") %}
- **Datadog SDK**: dd-trace-goバージョン2.6.0以降。
{% /if %}
{% if equals($prog_lang, "php") %}
- **Datadog SDK**: dd-trace-phpバージョン1.16.0以降。
- **OpenTelemetry PHP SDK**: バージョン1.0.0以降（`open-telemetry/sdk`）。
- **OpenTelemetry OTLPエクスポーター**: OTLPエクスポーターパッケージ（`open-telemetry/exporter-otlp`）。
{% /if %}
{% if equals($prog_lang, "rust") %}
- **Datadog SDK**: `datadog-opentelemetry`クレートバージョン0.3.0以降。
- **Rust**: MSRV 1.84以降。
{% /if %}
- **OTLP互換の宛先**: OTelメトリクスを受信するには、ポート4317（gRPC）または4318（HTTP）でリッスンしている宛先（エージェントまたはコレクター）が必要です。
{% if includes($prog_lang, ["dot_net", "node_js", "python", "ruby", "go"]) %}
- **DogStatsD（ランタイムメトリクス）**：Datadog [ランタイムメトリクス][201]を使用している場合は、Datadogエージェントがポート8125（UDP）でDogStatsDトラフィックをリッスンしていることを確認してください。OTelの設定は、ランタイムメトリクスをOTLP経由でルーティングしません。
{% /if %}

##セットアップ

アプリケーションでOTelメトリクスAPIサポートを有効にするための手順に従ってください。

{% if equals($prog_lang, "dot_net") %}
1.Datadog SDKをインストールしてください。ランタイムに応じたインストール手順に従ってください：
   - [.NET Framework][202]
   - [.NET Core][203]
2. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Datadog SDKをインストールします：
   ```sh
   npm install dd-trace
   ```
2. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
3. アプリケーションを計測します：
   ```javascript
   // On application start
   require('dd-trace').init();
   ```
{% /if %}

{% if equals($prog_lang, "python") %}
1. Datadog SDKをインストールします：
   ```sh
   pip install ddtrace
   ```
2. OTel SDKとエクスポーターをインストールします：
   ```sh
   pip install opentelemetry-sdk opentelemetry-exporter-otlp
   ```
3. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. アプリケーションを計測します：
   ```py
   ddtrace-run python my_app.py
   ```
{% /if %}

{% if equals($prog_lang, "ruby") %}
1. Datadog SDKとOTel gemを追加します：
   ```ruby
   # Add to your Gemfile
   gem 'datadog', '~> 2.23.0'
   gem 'opentelemetry-metrics-sdk', '~> 0.8'
   gem 'opentelemetry-exporter-otlp-metrics', '~> 0.4'
   ```
2. 依存関係をインストールします：
   ```sh
   bundle install
   ```
3. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. アプリケーションを設定します：
   ```ruby
   require 'opentelemetry/sdk'
   require 'datadog/opentelemetry'

   Datadog.configure do |c|
     # Configure Datadog settings here
   end

   # Call after Datadog.configure to initialize metrics
   OpenTelemetry::SDK.configure
   ```
{% /if %}

{% if equals($prog_lang, "go") %}
1. Datadog SDKをインストールします：
   ```sh
   go get github.com/DataDog/dd-trace-go/v2
   ```
2. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
3. アプリケーションを設定します：
   ```go
   import (
       "context"
       "time"

       "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"
       "go.opentelemetry.io/otel"
   )

   // Create MeterProvider with Datadog-specific defaults
   mp, err := metric.NewMeterProvider()
   if err != nil {
       panic(err)
   }

   // Set as global MeterProvider
   otel.SetMeterProvider(mp)

   // Your application code here...

   // Shutdown to flush remaining metrics
   ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
   defer cancel()
   metric.Shutdown(ctx, mp)
   ```
{% /if %}

{% if equals($prog_lang, "php") %}
1. [公式インストール手順][400]に従ってDatadog PHPトレーサーをインストールします。
2.必要なOpenTelemetryパッケージをインストールします：
   ```sh
   composer require open-telemetry/sdk
   composer require open-telemetry/exporter-otlp
   ```
3. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
   または、`php.ini`に設定します：
   ```ini
   datadog.metrics_otel_enabled = true
   ```
4. アプリケーションを設定します。Datadog SDKは、アプリケーションがロードされると自動的にOpenTelemetry MeterProviderを設定します。追加のコード設定は必要ありません。

   Datadogエージェントがデフォルト以外の場所で実行されている場合は、エンドポイントを設定してください：
   ```sh
   # Option 1: Using the Agent URL
   export DD_TRACE_AGENT_URL=http://your-agent-host:8126

   # Option 2: Using the Agent host
   export DD_AGENT_HOST=your-agent-host
   ```
   SDKは自動的に適切なOTLPエンドポイントを解決します（HTTPの場合はポート4318、gRPCの場合はポート4317）。
{% /if %}

{% if equals($prog_lang, "rust") %}
1.Datadog SDKを`Cargo.toml`に追加してください：
   ```toml
   [dependencies]
   datadog-opentelemetry = { version = "0.3.0" }
   opentelemetry = { version = "0.31", features = ["metrics"] }
   ```
2. 次の環境変数を設定してOTelメトリクスを有効にします：
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
3. アプリケーションを設定します：
   ```rust
   // Initialize metrics with default configuration
   let meter_provider = datadog_opentelemetry::metrics().init();

   // Your application code here...

   // Shutdown to flush remaining metrics
   meter_provider.shutdown().unwrap();
   ```
{% /if %}

## 例

標準のOpenTelemetry APIパッケージを使用してカスタムメトリクスを作成できます。

###カウンターを作成する

この例では、OTelメトリクスAPIを使用して、アイテムが処理されるたびにインクリメントされるカウンターを作成します：

{% if equals($prog_lang, "dot_net") %}

```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a counter instrument
Counter<long> requestsCounter = meter.CreateCounter<long>("http.requests_total");

// Perform work
// ...

// Record measurements
requestsCounter.Add(1, new("method", "GET"), new("status_code", "200"));
```
{% /if %}

{% if equals($prog_lang, "node_js") %}

```javascript
const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('my-service', '1.0.0');

// Counter - monotonically increasing values
const requestCounter = meter.createCounter('http.requests', {
  description: 'Total HTTP requests',
  unit: 'requests'
});
requestCounter.add(1, { method: 'GET', status: 200 });
```
{% /if %}

{% if equals($prog_lang, "python") %}

```python
import os
os.environ["DD_METRICS_OTEL_ENABLED"] = "true"
import ddtrace.auto # This must be imported before opentelemetry
from opentelemetry import metrics

# ddtrace automatically configures the MeterProvider
meter = metrics.get_meter(__name__)

# Counter - monotonically increasing values
counter = meter.create_counter("http.requests_total")
counter.add(1, {"method": "GET", "status_code": "200"})
```
{% /if %}

{% if equals($prog_lang, "ruby") %}

```ruby
require 'opentelemetry/api'

# dd-trace-rb automatically configures the MeterProvider
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Counter - monotonically increasing values
counter = meter.create_counter('http.requests_total')
counter.add(1, attributes: { 'method' => 'GET', 'status_code' => '200' })
```
{% /if %}

{% if equals($prog_lang, "go") %}

```go
import (
    "context"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"
    "go.opentelemetry.io/otel"
    otelmetric "go.opentelemetry.io/otel/metric"
    "go.opentelemetry.io/otel/attribute"
)

// Initialize MeterProvider (typically done once at startup)
mp, _ := metric.NewMeterProvider()
otel.SetMeterProvider(mp)

// Get a meter
meter := otel.Meter("my-service")

// Create a counter
counter, _ := meter.Int64Counter(
    "http.requests_total",
    otelmetric.WithDescription("Total number of HTTP requests"),
)

// Record measurements
counter.Add(context.Background(), 1,
    attribute.String("method", "GET"),
    attribute.String("status_code", "200"),
)
```
{% /if %}

{% if equals($prog_lang, "php") %}

```php
use OpenTelemetry\API\Globals;

// dd-trace-php automatically configures the MeterProvider
$meter = Globals::meterProvider()->getMeter('my-service');
$counter = $meter->createCounter('requests', 'requests', 'Total number of requests');
$counter->add(1, ['method' => 'GET', 'route' => '/api/users']);
```
{% /if %}

{% if equals($prog_lang, "rust") %}

```rust
use opentelemetry::global;
use opentelemetry::metrics::Counter;
use opentelemetry::KeyValue;

// datadog-opentelemetry automatically configures the MeterProvider
let meter = global::meter("my-service");
let counter: Counter<u64> = meter.u64_counter("requests").build();
counter.add(1, &[KeyValue::new("method", "GET")]);
```
{% /if %}

### ヒストグラムを作成する

この例では、OTelメトリクスAPIを使用してリクエストの所要時間を追跡するヒストグラムを作成します：

{% if equals($prog_lang, "dot_net") %}

```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a histogram instrument
Histogram<double> responseTimeHistogram = meter.CreateHistogram<double>("http.response.time");

// Perform work
var watch = System.Diagnostics.Stopwatch.StartNew();
await Task.Delay(1_000);
watch.Stop();

// Record measurements
responseTimeHistogram.Record(watch.ElapsedMilliseconds, new("method", "GET"), new("status_code", "200"));
```
{% /if %}

{% if equals($prog_lang, "node_js") %}

```javascript
const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('my-service', '1.0.0');

// Histogram - distribution of values
const durationHistogram = meter.createHistogram('http.duration', {
  description: 'HTTP request duration',
  unit: 'ms'
});
durationHistogram.record(145, { route: '/api/users' });
```
{% /if %}

{% if equals($prog_lang, "python") %}

```python
import os
os.environ["DD_METRICS_OTEL_ENABLED"] = "true"
import ddtrace.auto # This must be imported before opentelemetry
from opentelemetry import metrics
import time

# ddtrace automatically configures the MeterProvider
meter = metrics.get_meter(__name__)

# Histogram - distribution of values
histogram = meter.create_histogram(
    name="http.request_duration",
    description="HTTP request duration",
    unit="ms"
)

start_time = time.time()
# ... simulate work ...
time.sleep(0.05)
end_time = time.time()

duration = (end_time - start_time) * 1000 # convert to milliseconds
histogram.record(duration, {"method": "POST", "route": "/api/users"})
```
{% /if %}

{% if equals($prog_lang, "ruby") %}

```ruby
require 'opentelemetry/api'
require 'time'

# dd-trace-rb automatically configures the MeterProvider
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Histogram - distribution of values
histogram = meter.create_histogram('http.request_duration',
  description: 'HTTP request duration',
  unit: 'ms'
)

start_time = Time.now
# ... simulate work ...
sleep(0.05)
end_time = Time.now

duration = (end_time - start_time) * 1000 # convert to milliseconds
histogram.record(duration, attributes: { 'method' => 'POST', 'route' => '/api/users' })
```
{% /if %}

{% if equals($prog_lang, "go") %}

```go
import (
    "context"
    "time"

    "go.opentelemetry.io/otel"
    otelmetric "go.opentelemetry.io/otel/metric"
    "go.opentelemetry.io/otel/attribute"
)

// Get a meter (assuming MeterProvider is already configured)
meter := otel.Meter("my-service")

// Create a histogram
histogram, _ := meter.Float64Histogram(
    "http.request_duration",
    otelmetric.WithDescription("HTTP request duration"),
    otelmetric.WithUnit("ms"),
)

// Measure request duration
start := time.Now()
// ... perform work ...
time.Sleep(50 * time.Millisecond)
duration := float64(time.Since(start).Nanoseconds()) / 1e6

histogram.Record(context.Background(), duration,
    attribute.String("method", "POST"),
    attribute.String("route", "/api/users"),
)
```
{% /if %}

{% if equals($prog_lang, "php") %}

```php
use OpenTelemetry\API\Globals;

// dd-trace-php automatically configures the MeterProvider
$meter = Globals::meterProvider()->getMeter('my-service');
$histogram = $meter->createHistogram('http.request_duration', 'ms', 'HTTP request duration');

$start = microtime(true);
// ... perform work ...
usleep(50000);
$duration = (microtime(true) - $start) * 1000;

$histogram->record($duration, ['method' => 'POST', 'route' => '/api/users']);
```
{% /if %}

{% if equals($prog_lang, "rust") %}

```rust
use opentelemetry::global;
use opentelemetry::KeyValue;
use std::time::Instant;

// Get a meter (assuming MeterProvider is already configured)
let meter = global::meter("my-service");
let histogram = meter.f64_histogram("http.request_duration").build();

// Measure request duration
let start = Instant::now();
// ... perform work ...
std::thread::sleep(std::time::Duration::from_millis(50));
let duration = start.elapsed().as_secs_f64() * 1000.0;

histogram.record(duration, &[
    KeyValue::new("method", "POST"),
    KeyValue::new("route", "/api/users"),
]);
```
{% /if %}

## サポートされている設定

この機能を有効にするには、`DD_METRICS_OTEL_ENABLED=true`を設定する必要があります。

すべてのOTLPエクスポータ設定（エンドポイント、プロトコル、タイムアウトなど）、リソース属性、および時間的好みは、共有されたOpenTelemetry環境変数のセットを使用して構成されます。

{% if equals($prog_lang, "rust") %}
###トランスポート機能

デフォルトの機能にはgRPCトランスポートが含まれます。追加のトランスポートオプション：

- gRPCトランスポートの場合：`features = ["metrics-grpc"]`（デフォルト）
- HTTPトランスポートの場合：`features = ["metrics-http"]`

**注意**：HTTP/JSONプロトコルはサポートされていません。`grpc`または`http/protobuf`プロトコルのみを使用してください。
{% /if %}

すべての共有OTLP環境変数の完全なリストについては、[OpenTelemetry環境変数の相互運用性][204]を参照してください。

##他のセットアップから移行する

### 既存のOTelセットアップ

すでにOpenTelemetry SDKを手動OTLPエクスポータ設定で使用している場合は、次の手順に従って移行してください：

{% if equals($prog_lang, "dot_net") %}
1. Datadog SDK（`dd-trace-dotnet`）をプロジェクトに追加し、その計測を有効にします。
2.メトリクスのために`OtlpExporter`を手動で設定するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.プロジェクトの依存関係から`OpenTelemetry`および`OpenTelemetry.Exporter.OpenTelemetryProtocol`パッケージを削除してください。
4.`DD_METRICS_OTEL_ENABLED=true` 環境変数を設定してください。
{% /if %}

{% if equals($prog_lang, "node_js") %}
1.Datadog SDK（`dd-trace`）をプロジェクトに追加し、その計測を有効にします。
2.`OTLPMetricsExporter`を手動で設定するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.プロジェクトの依存関係から`@opentelemetry/sdk-node`および`@opentelemetry/exporter-otlp`パッケージを削除してください。
4.`DD_METRICS_OTEL_ENABLED=true` 環境変数を設定してください。
{% /if %}

{% if equals($prog_lang, "python") %}
1.Datadog SDK（`dd-trace-py`）をプロジェクトに追加し、その計測を有効にします（例えば、`ddtrace-run`）。
2.`OTLPMetricsExporter`を手動で設定するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.`DD_METRICS_OTEL_ENABLED=true` 環境変数を設定してください。
{% /if %}

{% if equals($prog_lang, "ruby") %}
1.Datadog SDK（`datadog`）をプロジェクトに追加し、その計測を有効にします。
2.`OTLPMetricsExporter`を手動で設定するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.`DD_METRICS_OTEL_ENABLED=true` 環境変数を設定してください。

{% alert level="warning" %}
ランタイムおよびトレースメトリクスは引き続きStatsDを使用して送信されます。OpenTelemetry Metrics APIを通じて作成されたカスタムメトリクスのみがOTLPを使用して送信されます。`dd-trace-rb`の実装は、OTLPメトリクスをDatadogエージェントまたはOpenTelemetryコレクターにのみエクスポートすることをサポートしています。複数のエクスポーターはサポートされていません。
{% /alert %}
{% /if %}

{% if equals($prog_lang, "go") %}
1.Datadog SDK（`dd-trace-go/v2`）をプロジェクトに追加し、その計測を有効にしてください。
2.`OTLPMetricsExporter`を手動で構成するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.`DD_METRICS_OTEL_ENABLED=true`環境変数を設定してください。

{% alert level="warning" %}
ランタイムおよびトレースメトリクスは引き続きStatsDを使用して送信されます。OpenTelemetry Metrics APIを通じて作成されたカスタムメトリクスのみがOTLPを使用して送信されます。`dd-trace-go`の実装は、OTLPメトリクスをDatadogエージェントまたはOpenTelemetryコレクターにのみエクスポートすることをサポートしています。複数のエクスポーターはサポートされていません。
{% /alert %}
{% /if %}

{% if equals($prog_lang, "php") %}
1.[公式インストール手順][400]に従ってDatadog PHPトレーサーをインストールしてください。
2.OTLPエクスポーターを手動で構成するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.`DD_METRICS_OTEL_ENABLED=true`環境変数を設定してください。
{% /if %}

{% if equals($prog_lang, "rust") %}
1.Datadog SDK（`datadog-opentelemetry`）をプロジェクトに追加し、その計測を有効にしてください。
2.`OTLPMetricsExporter`を手動で構成するコードを削除してください。Datadog SDKはこの設定を自動的に処理します。
3.`DD_METRICS_OTEL_ENABLED=true`環境変数を設定してください。

{% alert level="warning" %}
ランタイムおよびトレースメトリクスは引き続きStatsDを使用して送信されます。OpenTelemetry Metrics APIを通じて作成されたカスタムメトリクスのみがOTLPを使用して送信されます。`datadog-opentelemetry`の実装は、OTLPメトリクスをDatadogエージェントまたはOpenTelemetryコレクターにのみエクスポートすることをサポートしています。複数のエクスポーターはサポートされていません。
{% /alert %}
{% /if %}

###既存のDogStatsD設定

現在Datadog DogStatsDクライアントを使用していて、OpenTelemetryメトリクスAPIに移行したい場合は、計測コードを更新する必要があります。主な違いは、OTelメトリクスがコードではなく環境変数を使用して構成され、最初に`Instrument`オブジェクトを作成することです。

##トラブルシューティング

-が`DD_METRICS_OTEL_ENABLED`に設定されていることを確認してください。
-OTLPの宛先がメトリクスを受信するように正しく構成されていることを確認してください。
-Datadogエージェントにデータを送信している場合は、OTLPの取り込みが有効になっていることを確認してください。詳細については、[DatadogエージェントでのOTLP取り込みの有効化][205]を参照してください。
{% if equals($prog_lang, "dot_net") %}
-Datadogの自動計測が有効であることを確認してください。この機能は、Datadogの自動計測に依存しています。メトリックデータを取得するためには、.NET計測フックを有効にするためのすべてのセットアップ手順を完了していることを確認してください。
-OpenTelemetry SDKパッケージを削除した後、[System.Diagnostics.Metrics名前空間][206]のAPIが不足しているためにアプリケーションがコンパイルに失敗する場合は、`System.Diagnostics.DiagnosticSource`への直接のNuGetパッケージ参照を追加するか、.NETのバージョンをアップグレードする必要があります。詳細については、[.NETバージョンと計測サポート](#net-version-and-instrument-support)を参照してください。
{% /if %}
{% if equals($prog_lang, "node_js") %}
-`dd-trace`が最初に初期化されていることを確認してください。Datadog SDKは、アプリケーションの最上部で初期化する必要があります。*他のモジュールがインポートされる前に*。
-`@opentelemetry/api`がインストールされていることを確認してください。Node.js SDKはこのAPIパッケージを必要とします。
{% /if %}
{% if equals($prog_lang, "python") %}
-`opentelemetry-sdk`がインストールされていることを確認してください。Python SDKは、Python環境に`opentelemetry-sdk`と`opentelemetry-exporter-otlp`がインストールされている必要があります。
-`ddtrace-run`でアプリケーションを実行していることを確認してください（または`ddtrace`を手動でインポートして初期化していること）。
{% /if %}
{% if equals($prog_lang, "ruby") %}
-Ruby環境に必要なgem（`opentelemetry-metrics-sdk`と`opentelemetry-exporter-otlp-metrics`）がインストールされていることを確認してください。
-`Datadog.configure`が`OpenTelemetry::SDK.configure`の前に呼び出されていることを確認してください。Datadog SDKは、メータープロバイダーを適切に設定するために最初に構成する必要があります。
{% /if %}
{% if equals($prog_lang, "go") %}
-`DD_METRICS_OTEL_ENABLED=true`が設定されていることを確認してください。dd-trace-goでは、メトリックはデフォルトで無効になっています。
-Datadog SDKがインポートされていることを確認してください：`import "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"`
{% /if %}
{% if equals($prog_lang, "php") %}
- OpenTelemetry SDKのバージョンを確認してください。バージョン 1.0.0 以降が必要です。
-`open-telemetry/exporter-otlp` パッケージがインストールされていることを確認してください。
-アプリケーションが開始する前に `DD_METRICS_OTEL_ENABLED=true` が設定されていることを確認してください。
-詳細なログを表示するには、`DD_TRACE_DEBUG=true` でデバッグログを有効にしてください。
{% /if %}
{% if equals($prog_lang, "rust") %}
-プロトコルの選択に応じて、Cargo.toml ファイルにトランスポート機能 (`metrics-grpc` または `metrics-http`) が有効になっていることを確認してください。
-プロトコル設定を確認してください。`grpc` および `http/protobuf` プロトコルのみがサポートされています。HTTP/JSON はサポートされていません。
-メータープロバイダーを初期化する前に `DD_METRICS_OTEL_ENABLED=true` が設定されていることを確認してください。
{% /if %}

{% if equals($prog_lang, "dot_net") %}
###.NET バージョンとインストゥルメントのサポート

特定の OpenTelemetry メトリックインストゥルメントのサポートは、インストールされている .NET ランタイムバージョンまたは `System.Diagnostics.DiagnosticSource` NuGet パッケージのバージョンに依存します。

各インストゥルメントタイプに必要な最小バージョンは次のとおりです：

- **.NET 6+** (または `System.Diagnostics.DiagnosticSource` v6.0.0) は次のことをサポートします：
  - `Counter`
  - `Histogram`
  - `ObservableCounter`
  - `ObservableGauge`

- **.NET 7+** (または `System.Diagnostics.DiagnosticSource` v7.0.0) は次のことをサポートします：
  - `UpDownCounter`
  - `ObservableUpDownCounter`

- **.NET 9+** (または `System.Diagnostics.DiagnosticSource` v9.0.0) は次のことをサポートします：
  - `Gauge`
{% /if %}

{% /if %}
<!-- End metrics support check -->

{% /if %}
<!-- END METRICS CONTENT -->

<!-- ============================================== -->
<!-- LOGS CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "logs") %}

<!-- Show content only for languages that support logs -->
{% if includes($prog_lang, ["dot_net", "node_js", "python", "go", "rust"]) %}

## 概要

Datadog SDK を使用して OpenTelemetry Logs API でカスタムアプリケーションログを送信します。これは Datadog の従来のログインジェクションの代替手段です。

<!-- Native implementation (.NET, Node.js, Go, Rust) -->
{% if includes($prog_lang, ["dot_net", "node_js", "go", "rust"]) %}

Datadog SDKはOpenTelemetry APIのネイティブ実装を提供します。これは、公式のOpenTelemetry SDKを必要とせずに標準のOTelインターフェースに対してコードを書くことができることを意味します。

{% alert level="info" %}
公式のOpenTelemetry SDKやOTLPエクスポーターパッケージをインストールしないでください。Datadog SDKはこの機能を提供します。両方をインストールすると、ランタイムの競合や重複データが発生する可能性があります。
{% /alert %}
{% /if %}

<!-- Exporter-based implementation (Python) -->
{% if equals($prog_lang, "python") %}

このアプローチは、既存のOpenTelemetry SDKと連携します。この機能を有効にすると、Datadog SDK は OTel SDK を検出し、その OTLP エクスポーターを構成してログを Datadog エージェントに送信します。
{% /if %}

##前提条件

{% if equals($prog_lang, "dot_net") %}
- **Datadog SDK**: `dd-trace-dotnet` バージョン [3.31.0][301] 以降。
{% /if %}
{% if equals($prog_lang, "node_js") %}
- **Datadog SDK**: `dd-trace-js` バージョン 5.73.0 以降。
- **OpenTelemetry Logs API**: `@opentelemetry/api-logs`パッケージは、`v0.200.0`から`v1.0`までのバージョンが必要です。

{% alert level="warning" %}
`@opentelemetry/api-logs`パッケージはまだ実験的であり、バージョン1.0はまだリリースされていません。このパッケージの新しいバージョンは、互換性に影響を与える破壊的変更を導入する可能性があります。

`@opentelemetry/api-logs`をアップグレードした後に問題が発生した場合は、[リポジトリに問題を報告してください](https://github.com/DataDog/dd-trace-js/issues)。
{% /alert %}
{% /if %}
{% if equals($prog_lang, "python") %}
- **Datadog SDK**: `dd-trace-py`バージョン3.18.0以降。
{% /if %}
{% if equals($prog_lang, "go") %}
- **Datadog SDK**: `dd-trace-go`バージョン2.5.0以降。
- **OpenTelemetry Go SDK**: `go.opentelemetry.io/otel/log`バージョン0.13.0以降（Datadog SDKによって自動的に提供されます）。
{% /if %}
{% if equals($prog_lang, "rust") %}
- **Datadog SDK**: `datadog-opentelemetry`クレートバージョン0.2.1以降。
- **Rust**: MSRV 1.84.1以降。
- **OpenTelemetry Rust SDK**: SDKは自動的にログの実装を提供します。
{% /if %}
- **OTLP互換の宛先**: OTelログを受信するには、ポート4317（gRPC）または4318（HTTP）でリスニングしている宛先（エージェントまたはコレクター）が必要です。

##セットアップ

アプリケーションでOTel Logs APIサポートを有効にするための手順に従ってください。

{% if equals($prog_lang, "dot_net") %}
1.Datadog SDKをインストールしてください。ランタイムに応じたインストール手順に従ってください：
   - [.NET Framework][202]
   - [.NET Core][203]
2.次の環境変数を設定してOTelログのエクスポートを有効にします:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Datadog SDKをインストールします：
    ```sh
    npm install dd-trace
    ```
2.OpenTelemetry Logs APIパッケージをインストールします:
    ```sh
    npm install @opentelemetry/api-logs
    ```
3.次の環境変数を設定してOTelログのエクスポートを有効にします:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4.アプリケーションの最初にDatadog SDK (`dd-trace`)を初期化します。他のモジュールがインポートされる前に:
    ```javascript
    // This must be the first line of your application
    require('dd-trace').init()

    // Other imports can follow
    const { logs } = require('@opentelemetry/api-logs')
    const express = require('express')
    ```
{% /if %}

{% if equals($prog_lang, "python") %}
1. Datadog SDKをインストールします：
    ```sh
    pip install ddtrace
    ```
2. OTel SDKとエクスポーターをインストールします：
    ```sh
    pip install opentelemetry-sdk opentelemetry-exporter-otlp>=1.15.0
    ```
3.次の環境変数を設定してOTelログのエクスポートを有効にします:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4. `ddtrace-run`を使用してアプリケーションを実行します:
    ```sh
    ddtrace-run python my_app.py
    ```
    When enabled, `ddtrace` automatically detects the OTel packages and configures the `OTLPLogExporter` to send logs to your OTLP destination.
{% /if %}

{% if equals($prog_lang, "go") %}
1.Datadog SDKをインストールします:
    ```sh
    go get github.com/DataDog/dd-trace-go/v2
    ```
2.次の環境変数を設定してOTelログのエクスポートを有効にします:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
3. アプリケーションでロガープロバイダーを初期化します:
    ```go
    import (
        "context"
        "log/slog"
        
        "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/log"
        "go.opentelemetry.io/otel"
        otellog "go.opentelemetry.io/otel/log"
    )

    // Initialize the global logger provider
    err := log.InitGlobalLoggerProvider(context.Background())
    if err != nil {
        panic(err)
    }

    // Set as global logger provider
    otel.SetLoggerProvider(log.GetGlobalLoggerProvider())

    // Your application code here...

    // Shutdown to flush remaining logs
    defer log.ShutdownGlobalLoggerProvider(context.Background())
    ```
{% /if %}

{% if equals($prog_lang, "rust") %}
1. Datadog SDKを`Cargo.toml`に追加します:
    ```toml
    [dependencies]
    datadog-opentelemetry = { version = "0.3.0", features = ["logs-grpc"] }
    opentelemetry = { version = "0.31", features = ["logs"] }
    opentelemetry_sdk = { version = "0.31", features = ["logs"] }
    ```
    **Note**: Use `features = ["logs-http"]` if you prefer HTTP/protobuf transport instead of gRPC.
2. 次の環境変数を設定してOTelログのエクスポートを有効にします:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
3. アプリケーションでロガープロバイダーを初期化します:
    ```rust
    use opentelemetry::global;

    // Initialize logs with default configuration
    let logger_provider = datadog_opentelemetry::logs().init();
    
    // Set as global logger provider
    global::set_logger_provider(logger_provider.clone());

    // Your application code here...

    // Shutdown to flush remaining logs
    let _ = logger_provider.shutdown();
    ```
{% /if %}

## 例

{% if equals($prog_lang, "dot_net") %}
### 標準ログ{% #standard-logging-dotnet %}

```csharp
using Microsoft.Extensions.Logging;

// For a Console application, manually create a logger factory
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Get a logger instance
var logger = loggerFactory.CreateLogger<Program>();

// This log will be exported via OTLP
logger.LogInformation("This is a standard log message.");
```

### トレースとログの相関{% #trace-log-correlation-dotnet %}

この例は、アクティブなDatadogスパン内で発生したログが自動的に相関される方法を示しています。OTelトレーシングAPIまたは組み込みの.NETアクティビティAPIを使用してスパンを作成している場合は、`DD_TRACE_OTEL_ENABLED=true`を設定してOTelトレーシングAPIのサポートが有効になっていることを確認してください。

```csharp
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

// For a Console application, manually create a logger factory
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Get a logger instance
var logger = loggerFactory.CreateLogger<Program>();

// Create an activity source
var activitySource = new ActivitySource("MyService", "1.0.0");

// Start an activity (span)
using (var activity = activitySource.StartActivity("do.work"))
{
    // This log is automatically correlated with the 'do.work' span
    logger.LogInformation("This log is correlated to the active span.");
    await Task.Delay(TimeSpan.FromMilliseconds(100));
    logger.LogWarning("So is this one.");
}
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
### ログを発行する{% #emitting-log-nodejs %}

Datadog SDKが初期化された後、標準のOpenTelemetry Logs APIを使用してロガーを取得し、ログレコードを発行できます。

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const logger = logs.getLogger('my-service', '1.0.0')

// Emit a log record
logger.emit({
  severityText: 'INFO',
  severityNumber: 9,
  body: `User clicked the checkout button.`,
  attributes: {
    'cart.id': 'c-12345',
    'user.id': 'u-54321'
  }
})
```

### トレースとログの相関{% #trace-log-correlation-nodejs %}

トレースとログの相関は自動です。アクティブなDatadogトレース内でOTel Logs APIを使用してログを発行すると、`trace_id`と`span_id`が自動的にログレコードに追加されます。

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const express = require('express')

const app = express()
const logger = logs.getLogger('my-service', '1.0.0')

app.get('/api/users/:id', (req, res) => {
  // This log is automatically correlated with the 'express.request' span
  logger.emit({
    severityText: 'INFO',
    severityNumber: 9,
    body: `Processing user request for ID: ${req.params.id}`,
  })
  res.json({ id: req.params.id, name: 'John Doe' })
})

app.listen(3000)
```
{% /if %}

{% if equals($prog_lang, "python") %}
Datadog SDKは、Pythonの組み込み`logging`モジュールのOpenTelemetry Logs APIをサポートしています。既存のログコードを変更する必要はありません。

###標準ログ{% #standard-logging-python %}

この例は、標準的なログメッセージを示しています。`DD_LOGS_OTEL_ENABLED=true`を使用すると、このログは自動的にキャプチャされ、OTLP形式にフォーマットされ、エクスポートされます。

```python
import logging
import time

# Get a logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Add a handler to see logs in the console (optional)
handler = logging.StreamHandler()
logger.addHandler(handler)

# This log will be exported via OTLP
logger.info("This is a standard log message.")
```

### トレースとログの相関{% #trace-log-correlation-python %}

この例は、アクティブなDatadogスパン内で発生したログが自動的に相関される方法を示しています。

```python
from ddtrace import tracer
import logging
import time

# Standard logging setup
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter('%(message)s'))
logger.addHandler(handler)

@tracer.wrap("do.work")
def do_work():
    # This log is automatically correlated with the 'do.work' span
    logger.info("This log is correlated to the active span.")
    time.sleep(0.1)
    logger.warning("So is this one.")

print("Starting work...")
do_work()
print("Work complete.")
```
{% /if %}

{% if equals($prog_lang, "go") %}
### 標準ログ{% #standard-logging-go %}

Datadog SDKが初期化された後、標準のOpenTelemetry Logs APIを使用してログレコードを発行できます。

```go
import (
    "context"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/log"
    "go.opentelemetry.io/otel"
    otellog "go.opentelemetry.io/otel/log"
)

// Initialize the logger provider (typically done once at startup)
err := log.InitGlobalLoggerProvider(context.Background())
if err != nil {
    panic(err)
}
otel.SetLoggerProvider(log.GetGlobalLoggerProvider())

// Get a logger
logger := otel.GetLoggerProvider().Logger("my-service")

// Create and emit a log record
var logRecord otellog.Record
logRecord.SetBody(otellog.StringValue("User clicked the checkout button"))
logRecord.SetSeverity(otellog.SeverityInfo)
logRecord.SetSeverityText("INFO")
logRecord.AddAttributes(
    otellog.String("cart.id", "c-12345"),
    otellog.String("user.id", "u-54321"),
)

logger.Emit(context.Background(), logRecord)
```

### トレースとログの相関{% #trace-log-correlation-go %}

トレースとログの相関は自動です。アクティブなDatadogトレース内でOTel Logs APIを使用してログを発行すると、`trace_id`と`span_id`が自動的にログレコードに追加されます。

```go
import (
    "context"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/log"
    "go.opentelemetry.io/otel"
    otellog "go.opentelemetry.io/otel/log"
    "go.opentelemetry.io/otel/trace"
)

// Initialize logger (typically done once at startup)
err := log.InitGlobalLoggerProvider(context.Background())
if err != nil {
    panic(err)
}
otel.SetLoggerProvider(log.GetGlobalLoggerProvider())

// Get tracer and logger
tracer := otel.Tracer("my-service")
logger := otel.GetLoggerProvider().Logger("my-service")

// Start a span
ctx, span := tracer.Start(context.Background(), "process.user.request")
defer span.End()

// Create and emit a log record that will be automatically correlated with the active span
var logRecord otellog.Record
logRecord.SetBody(otellog.StringValue("Processing user request for ID: 12345"))
logRecord.SetSeverity(otellog.SeverityInfo)
logRecord.SetSeverityText("INFO")

logger.Emit(ctx, logRecord)
```
{% /if %}

{% if equals($prog_lang, "rust") %}
### 標準ログ{% #standard-logging-rust %}

Datadog SDKが初期化された後、標準のOpenTelemetry Logs APIを使用してログレコードを発行できます。

```rust
use opentelemetry::global;
use opentelemetry::logs::{Logger, LogRecord, Severity};
use opentelemetry::KeyValue;

// Initialize logs (typically done once at startup)
let logger_provider = datadog_opentelemetry::logs().init();
global::set_logger_provider(logger_provider.clone());

// Get a logger
let logger = global::logger_provider().logger("my-service");

// Emit a log record
let mut log_record = LogRecord::default();
log_record.set_body("User clicked the checkout button".into());
log_record.set_severity_number(Severity::Info);
log_record.set_severity_text("INFO");
log_record.add_attribute(KeyValue::new("cart.id", "c-12345"));
log_record.add_attribute(KeyValue::new("user.id", "u-54321"));

logger.emit(log_record);
```

### トレースとログの相関{% #trace-log-correlation-rust %}

トレースとログの相関は自動です。アクティブなDatadogトレース内でOTel Logs APIを使用してログを発行すると、`trace_id`と`span_id`が自動的にログレコードに追加されます。

```rust
use opentelemetry::global;
use opentelemetry::logs::{Logger, LogRecord, Severity};
use opentelemetry::trace::{Tracer, TracerProvider};

// Initialize logs and traces (typically done once at startup)
let logger_provider = datadog_opentelemetry::logs().init();
global::set_logger_provider(logger_provider.clone());

// Get tracer and logger
let tracer = global::tracer("my-service");
let logger = global::logger_provider().logger("my-service");

// Start a span
let span = tracer.start("process.user.request");
let _guard = span.with_current_context();

// This log is automatically correlated with the active span
let mut log_record = LogRecord::default();
log_record.set_body("Processing user request for ID: 12345".into());
log_record.set_severity_number(Severity::Info);
log_record.set_severity_text("INFO");

logger.emit(log_record);
```
{% /if %}

## サポートされている構成

この機能を有効にするには、`DD_LOGS_OTEL_ENABLED=true`を設定する必要があります。

すべてのOTLPエクスポータ設定（エンドポイント、プロトコル、タイムアウトなど）、リソース属性、およびバッチプロセッサ設定は、共有のOpenTelemetry環境変数セットを使用して構成されます。

すべての共有OTLP環境変数の完全なリストについては、[OpenTelemetry環境変数の相互運用性][204]を参照してください。

##他のセットアップから移行する

### 既存のOTelセットアップ

手動OTLPエクスポータ構成でOpenTelemetry SDKをすでに使用している場合は、次の手順に従って移行してください：

{% if equals($prog_lang, "dot_net") %}
1. Datadog SDK（`dd-trace-dotnet`）をプロジェクトに追加し、その計測を有効にします。
2.ログのために`OtlpExporter`を手動で構成するコードを削除してください。Datadog SDKはこの構成を自動的に処理します。
3.プロジェクトの依存関係から`OpenTelemetry`および`OpenTelemetry.Exporter.OpenTelemetryProtocol`パッケージを削除してください。
4.`DD_LOGS_OTEL_ENABLED=true`環境変数を設定してください。
{% /if %}

{% if equals($prog_lang, "node_js") %}
1.OTel SDKおよびOTLPエクスポータパッケージを削除してください：
    ```sh
    npm uninstall @opentelemetry/sdk-logs @opentelemetry/exporter-otlp-logs
    ```
2. すべての手動OTel SDK初期化コードを削除してください（例：`new LoggerProvider()`、`addLogRecordProcessor()`、`new OTLPLogExporter()`）。
3.Datadog SDKをインストールします：`npm install dd-trace`
4. `@opentelemetry/api-logs`パッケージを保持してください。
5.`DD_LOGS_OTEL_ENABLED=true`を設定し、アプリケーションの先頭で`dd-trace`を初期化してください。

`logs.getLogger()`を使用する既存のコードは引き続き動作します。
{% /if %}

{% if equals($prog_lang, "python") %}
1.手動セットアップコードを削除してください（例：`LoggerProvider`、`BatchLogRecordProcessor`、および`OTLPLogExporter`のインスタンス化）。
2.アプリケーションの`ddtrace-run`自動計測を有効にしてください。
3.`DD_LOGS_OTEL_ENABLED=true`環境変数を設定してください。

Datadog SDKは、OTel SDKをプログラム的に設定します。
{% /if %}

{% if equals($prog_lang, "go") %}
1.プロジェクトにDatadog SDK（`dd-trace-go/v2`）を追加し、その計測を有効にしてください。
2.`OTLPLogExporter`を手動で設定するコードを削除してください。Datadog SDKはこの構成を自動的に処理します。
3.手動の`LoggerProvider`設定を削除し、`log.InitGlobalLoggerProvider()`に置き換えてください。
4.`DD_LOGS_OTEL_ENABLED=true`環境変数を設定してください。
{% /if %}

{% if equals($prog_lang, "rust") %}
1.プロジェクトにDatadog SDK（`datadog-opentelemetry`）を追加し、その計測を有効にしてください。
2.`OTLPLogExporter`を手動で設定するコードを削除してください。Datadog SDKはこの構成を自動的に処理します。
3.手動のロガープロバイダー設定を`datadog_opentelemetry::logs().init()`に置き換えてください。
4.`DD_LOGS_OTEL_ENABLED=true`環境変数を設定してください。
{% /if %}

###既存のDatadogログインジェクション

Datadogの従来のログインジェクション（`DD_LOGS_INJECTION=true`がテキストログにトレースコンテキストを追加する場合）とエージェントを使用してログファイルを監視している場合：

1. `DD_LOGS_OTEL_ENABLED=true`環境変数を設定してください。
2.Datadog SDKは、ログに重複するトレースメタデータを防ぐために、古いログインジェクションスタイル（`DD_LOGS_INJECTION`）を自動的に無効にします。トレースの相関は、構造化されたOTLPペイロードによって処理されます。
3.DatadogエージェントがOTLPログを受信するように設定されていることを確認してください（バージョン7.48.0以上が必要です）。
4. このサービスのファイルベースのログ収集を無効にして、重複ログを避けてください。

##トラブルシューティング

- `DD_LOGS_OTEL_ENABLED`が`true`に設定されていることを確認してください。
-OTLP宛先がログを受信するように正しく設定されていることを確認してください。
-Datadogエージェントにデータを送信している場合、OTLPの取り込みが有効になっていることを確認してください。詳細については、[DatadogエージェントでのOTLP取り込みの有効化][205]を参照してください。
{% if equals($prog_lang, "dot_net") %}
-Datadogの自動計測が有効であることを確認してください。この機能は、Datadogの自動計測に依存しています。ログデータを取得するためには、.NET計測フックを有効にするためのすべての設定手順を完了していることを確認してください。
{% /if %}
{% if equals($prog_lang, "node_js") %}
-`dd-trace`が最初に初期化されていることを確認してください。Datadog SDKは、アプリケーションの最上部で初期化される必要があります。*他のモジュールがインポートされる前に。
-`@opentelemetry/api-logs`がインストールされていることを確認してください。Node.js SDKは、このAPIパッケージを必要とします。
{% /if %}
{% if equals($prog_lang, "python") %}
-`opentelemetry-sdk`がインストールされていることを確認してください。Python SDKは、Python環境に`opentelemetry-sdk`と`opentelemetry-exporter-otlp`がインストールされていることを必要とします。
-`ddtrace-run`がアクティブであることを確認してください。`ddtrace-run`でアプリケーションを実行していることを確認してください（または`ddtrace`を手動でインポートして初期化していることを確認してください）。
{% /if %}
{% if equals($prog_lang, "go") %}
-`DD_LOGS_OTEL_ENABLED=true`が設定されていることを確認してください。dd-trace-goでは、デフォルトでログは無効になっています。
-Datadog SDKがインポートされ、初期化されていることを確認してください：`import "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/log"`
- ロガーを使用する前に`log.InitGlobalLoggerProvider()`が呼び出されていることを確認してください。
{% /if %}
{% if equals($prog_lang, "rust") %}
-`DD_LOGS_OTEL_ENABLED=true`が設定されていることを確認してください。デフォルトでログは無効になっています。
-`Cargo.toml`ファイルでトランスポート機能（`logs-grpc`または`logs-http`）が有効になっていることを確認してください。
-ロガーを使用する前に`datadog_opentelemetry::logs().init()`が呼び出されていることを確認してください。
-プロトコル設定を確認してください。`grpc`および`http/protobuf`のプロトコルのみがサポートされています。HTTP/JSONはサポートされていません。
{% /if %}

{% /if %}
<!-- End logs support check -->

{% /if %}
<!-- END LOGS CONTENT -->

<!-- ============================================== -->
<!-- GLOBAL LINK REFERENCES -->
<!-- ============================================== -->

<!-- Java traces -->
[100]: /ja/tracing/setup/java/
[101]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[102]: /ja/tracing/glossary/#trace
[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[105]: /ja/tracing/trace_collection/trace_context_propagation/
[106]: /ja/tracing/security
[107]: /ja/tracing/guide/ignoring_apm_resources/

<!-- Python traces -->
[110]: /ja/tracing/setup/python/

<!-- Node.js traces -->
[120]: /ja/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[121]: https://opentelemetry.io/docs/instrumentation/js/automatic/

<!-- Go traces -->
[130]: https://opentelemetry.io/docs/instrumentation/go/manual/

<!-- Ruby traces -->
[140]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[141]: /ja/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[142]: https://opentelemetry.io/docs/languages/ruby/libraries/

<!-- .NET traces -->
[150]: https://opentelemetry.io/docs/instrumentation/net/manual/
[151]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[152]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[153]: /ja/tracing/trace_collection/single-step-apm/
[154]: https://opentelemetry.io/docs/instrumentation/net/libraries/

<!-- PHP traces -->
[160]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[161]: https://opentelemetry.io/docs/instrumentation/php/manual/
[162]: /ja/tracing/trace_collection/dd_libraries/php#getting-started

<!-- Rust traces -->
[170]: https://crates.io/crates/datadog-opentelemetry
[171]: /ja/tracing/trace_collection/library_config/rust
[172]: /ja/tracing/trace_collection/trace_context_propagation/?tab=rust

<!-- Metrics and logs shared -->
[200]: /ja/extend/dogstatsd/
[201]: /ja/tracing/metrics/runtime_metrics/
[202]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer
[203]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer
[204]: /ja/opentelemetry/config/environment_variable_support
[205]: /ja/opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent
[206]: https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.metrics
[210]: /ja/logs/log_collection/

<!-- .NET logs -->
[301]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.31.0

<!-- PHP metrics -->
[400]: /ja/tracing/trace_collection/dd_libraries/php/#install-the-extension