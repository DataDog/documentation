---
further_reading:
- link: https://opentelemetry.io/docs/
  tag: 外部サイト
  text: OpenTelemetry Documentation
- link: /opentelemetry
  tag: Documentation
  text: Datadog OpenTelemetry Documentation
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: Documentation
  text: Custom Instrumentation with OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: Blog
  text: Monitor runtime metrics from OTel-instrumented apps in Datadog APM
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlate Datadog RUM events with traces from OTel-instrumented applications
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: Blog
  text: Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog
    Exporter
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: Blog
  text: Forward logs from the OpenTelemetry Collector with the Datadog Exporter
kind: documentation
title: Getting Started with OpenTelemetry at Datadog
---


## Overview

[OpenTelemetry][11] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing observability data from software applications. OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application observability data---namely metrics, logs, and traces---to monitoring platforms for analysis and insight.

This guide demonstrates how to configure [a sample OpenTelemetry application][12] to send observability data to Datadog using the OpenTelemetry SDK, OpenTelemetry Collector, and [Datadog Exporter][14]. This guide also shows you how to explore this data in the Datadog UI.

Follow this guide to:

1. [Instrument the application](#instrumenting-the-application) with the OpenTelemetry API.
2. [Configure the application](#configuring-the-application) to send observability data to Datadog.
3. [Correlate observability data](#correlating-observability-data) with unified service tagging.
4. [Run the application](#running-the-application) to generate observability data.
5. [Explore observability data](#exploring-observability-data-in-datadog) in the Datadog UI.

## Prerequisites

To complete this guide, you need the following:

1. [Create a Datadog account][1] if you haven't yet. 
2. Set up your Datadog API key:  
   a. Find or create your [Datadog API key][2].  
   b. Export your Datadog API key to an environment variable:  
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. Get the sample [Calendar][12] application.  
   a. Clone the `opentelemetry-examples` repository to your device:
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}} 
   b. Navigate to the `/calendar` directory:
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}  
4. Install [Docker Compose][3].
5. (Optional) Use Linux to send infrastructure metrics.

The Calendar application uses OpenTelemetry tools to generate and collect metrics, logs, and traces. The following steps explain how to get this observability data into Datadog. 

## Instrumenting the application

The Calendar sample application is already partially [instrumented][15]:

1. Go to the main `CalendarController.java` file located at: `./src/main/java/com/otel/controller/CalendarController.java`.
2. The following code instruments `getDate()` using the OpenTelemetry API:

   {{< code-block lang="java" disable_copy="true" filename="CalendarController.java" >}}
private String getDate() {
  Span span = GlobalOpenTelemetry.getTracer("calendar").spanBuilder("getDate").startSpan();
  try (Scope scope = span.makeCurrent()) {
   ...
  } finally {
    span.end();
  }
}
{{< /code-block >}}  

When the Calendar application runs, the `getDate()` call generates [traces][8] and spans.

## Configuring the application

### OTLP Receiver 

The Calendar application is already configured to send data from the OpenTelemetry SDK to the [OpenTelemetry Protocol (OTLP) receiver][10] in the OpenTelemetry Collector.

1. Go to the Collector configuration file located at: `./src/main/resources/otelcol-config.yaml`.
2. The following lines configure the OTLP Receiver to receive metrics, traces, and logs:  

    {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
...
service:
  pipelines:
    traces:
      receivers: [otlp]
    metrics:
      receivers: [otlp]
    logs:
      receivers: [otlp]
{{< /code-block >}}  

### Datadog Exporter

The Datadog Exporter sends data collected by the OTLP Receiver to the Datadog backend.

1. Go to the `otelcol-config.yaml` file.
2. The following lines configure the Datadog Exporter to send observability data to Datadog:  

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exporters:
  datadog:
    traces:
      span_name_as_resource_name: true
      trace_buffer: 500
    hostname: "otelcol-docker"
    api:
      key: ${DD_API_KEY}
      site: datadoghq.com

connectors:
    datadog/connector:

service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector] # <- update this line
      exporters: [datadog]
    traces:
      exporters: [datadog, datadog/connector]
    logs:
      exporters: [datadog]
{{< /code-block >}}  
3. Set `exporters.datadog.api.site` to your [Datadog site][16]. Otherwise, it defaults to US1.

This configuration allows the Datadog Exporter to send runtime metrics, traces, and logs to Datadog. However, sending infrastructure metrics requires additional configuration.

### OpenTelemetry Collector

In this example, configure your OpenTelemetry Collector to send infrastructure metrics.

<div class="alert alert-info">To send infrastructure metrics from the OpenTelemetry Collector to Datadog, you must use Linux. This is a limitation of the Docker Stats receiver.</div>

To collect container metrics, configure the [Docker stats receiver][5] in your Datadog Exporter: 

1. Add a `docker_stats` block to the `receivers` section of `otel-config.yaml`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # add the following block
      docker_stats: 
        endpoint: unix:///var/run/docker.sock # default; if this is not the Docker socket path, update to the correct path
        metrics:
          container.network.io.usage.rx_packets:
            enabled: true
          container.network.io.usage.tx_packets:
            enabled: true
          container.cpu.usage.system:
            enabled: true
          container.memory.rss:
            enabled: true
          container.blockio.io_serviced_recursive:
            enabled: true
          container.uptime:
            enabled: true
          container.memory.hierarchical_memory_limit:
            enabled: true
{{< /code-block >}}  

2. Update `service.pipelines.metrics.receivers` to include `docker_stats`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- update this line
{{< /code-block >}}

This configuration allows the Calendar application to send container metrics to Datadog for you to explore in Datadog.

### Sending observability data with OTLP

The Calendar application uses the OpenTelemetry logging exporter in its Logback configuration to send logs with OpenTelemetry Layer Processor (OTLP).

1. Go to the Calendar application's Logback XML configuration file at `/src/main/resources/logback.xml`.
2. The following lines define the `OpenTelemetry` appender:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. The `<appender-ref ref="OpenTelemetry"/>` line references the `OpenTelemetry` appender in the root level configuration:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

Additionally, environment variables configure the OpenTelemetry environment to export logs, metrics, and traces:

1. Go to the Calendar application's Docker Compose file at `./deploys/docker/docker-compose-otel.yml`.
2. The `OTEL_LOGS_EXPORTER=otlp` configuration allows the logs to be sent with OTLP.
3. The `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` configuration allows the metrics and traces to be sent with OTLP.

## Correlating observability data

[Unified service tagging][6] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

The Calendar application is already configured with unified service tagging:

1. Go to the Calendar application's Docker Compose file at `./deploys/docker/docker-compose-otel.yml`.
2. The following lines enable the correlation between application traces and other observability data: 

   {{< code-block lang="yaml" filename="docker-compose-otel.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
{{< /code-block >}}

## アプリケーションの実行

可観測性データの生成と Datadog への転送を開始するには、OpenTelemetry SDK を使ってカレンダーアプリケーションを実行する必要があります。

1. `calendar/` フォルダーからアプリケーションを実行します。

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otel.yml up
{{< /code-block >}}
   このコマンドにより、OpenTelemetry コレクターおよびカレンダーサービスを持つ Docker コンテナが作成されます。

2. カレンダーアプリケーションが正常に動作しているかどうかテストするには、別のターミナルウィンドウから次のコマンドを実行します。

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar 
{{< /code-block >}}

3. 次のような応答を受信したことを確認します。

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. `curl` コマンドを複数回実行し、トレースが少なくとも 1 つは Datadog バックエンドにエクスポートされることを確認します。

   <div class="alert alert-info">カレンダーアプリケーションは、確率的サンプラープロセッサーを使用するため、アプリケーションを通じて送信されるトレースの 30% しかターゲットのバックエンドに到達しません。</div>

カレンダーアプリケーションに対する呼び出しのたびに、メトリクス、トレース、ログが OpenTelemetry コレクターに転送され、次に Datadog エクスポーターに、最後に Datadog バックエンドに転送されます。

## Datadog での可観測性データの確認

カレンダーアプリケーションの可観測性データを確認するには、Datadog UI を使用します。

**注**: トレースデータが表示されるまで、数分かかる場合があります。

### ランタイムおよびインフラストラクチャーメトリクス

アプリケーション、ホスト、コンテナ、プロセスのパフォーマンスを視覚化、監視、測定するには、ランタイムおよびインフラストラクチャーのメトリクスを確認します。

1. **APM** > **Service Catalog** に移動します。
2. `calendar-otel` サービスにカーソルを合わせ、**Full Page** を選択します。
3. 一番下のパネルまでスクロールして、以下のオプションを選択します。

   * **Infrastructure Metrics** では、CPU やメモリの使用量などの Docker コンテナメトリクスを確認できます。
   * **JVM Metrics** では、ヒープ使用量やスレッド数などのランタイムメトリクスを確認できます。

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="View Infrastructure metrics and JVM Runtime metrics for the Calendar application" style="width:90%;" >}}

### ログ

アプリケーションおよびシステムの運用を監視し、トラブルシューティングを行うにはログを確認します。

1. **Logs** に移動します。
2. 他のログがリストにある場合は、**Search for** フィールドに `@service.name:calendar-otel ` を追加し、カレンダーアプリケーションからのログのみを表示させます。
2. リストからログを選択し、詳細を確認します。

{{< img src="/getting_started/opentelemetry/logs2.png" alt="View Logs for the Calendar application" style="width:90%;" >}}

### トレース

アプリケーションによって処理されるリクエストのステータスやパフォーマンスを観測するには、トレースおよびスパンを確認します。

1. **APM** > **Traces** に移動します。
2. フィルターメニューの **Service** セクションを見つけ、`calendar-otel` ファセットを選択して、すべての `calendar-otel` トレースを表示します。

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="View Traces for the Calendar application" style="width:90%;" >}}

3. [`calendar-otel` トレースを確認][8]します。 

   開始するには、トレースをクリックしてトレースサイドパネルを開き、トレースおよびそのスパンについての詳細を確認します。例えば、[フレームグラフ][9]は、カレンダー実行パスの各コンポーネントで費やされた時間を取得します。

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="View the Flame Graph for a Calendar application trace" style="width:90%;" >}}

4. 一番下のパネルでは、**Infrastructure**、**Metrics**、または **Logs** を選択して、トレースとその他の可観測性データの相関付けが可能であることに注目してください。

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="カレンダーアプリケーションのトレースとログの相関付け" style="width:90%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: /ja/opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: /ja/tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: /ja/opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
[12]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[14]: /ja/opentelemetry/collector_exporter/
[15]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /ja/getting_started/site/