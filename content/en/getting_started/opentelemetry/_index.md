---
title: Getting Started with OpenTelemetry at Datadog
further_reading:
- link: 'https://opentelemetry.io/docs/'
  tag: 'External Site'
  text: 'OpenTelemetry Documentation'
- link: '/opentelemetry'
  tag: 'Documentation'
  text: 'Datadog OpenTelemetry Documentation'
- link: '/tracing/trace_collection/custom_instrumentation/otel_instrumentation'
  tag: 'Documentation'
  text: 'Custom Instrumentation with OpenTelemetry'
- link: 'https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog'
  tag: 'Blog'
  text: 'Monitor runtime metrics from OTel-instrumented apps in Datadog APM'
- link: 'https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/'
  tag: 'Blog'
  text: 'Correlate Datadog RUM events with traces from OTel-instrumented applications'
- link: 'https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter'
  tag: 'Blog'
  text: 'Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter'
- link: 'https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter'
  tag: 'Blog'
  text: 'Forward logs from the OpenTelemetry Collector with the Datadog Exporter'
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

## Running the application

To start generating and forwarding observability data to Datadog, you need to run the Calendar application with the OpenTelemetry SDK:

1. Run the application from the `calendar/` folder:

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otel.yml up
{{< /code-block >}}
   This command creates a Docker container with the OpenTelemetry Collector and the Calendar service.

2. To test that the Calendar application is running correctly, execute the following command from another terminal window:

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar 
{{< /code-block >}}

3. Verify that you receive a response like:

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. Run the `curl` command several times to ensure at least one trace exports to the Datadog backend.

   <div class="alert alert-info">The Calendar application uses the probabilistic sampler processor, so only 30% of traces sent through the application reach the target backend.</div>

Each call to the Calendar application results in metrics, traces, and logs being forwarded to the OpenTelemetry Collector, then to the Datadog Exporter, and finally to the Datadog backend. 

## Exploring observability data in Datadog

Use the Datadog UI to explore the Calendar application's observability data.   

**Note**: It may take a few minutes for your trace data to appear.

### Runtime and infrastructure metrics

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your applications, hosts, containers, and processes.

1. Go to **APM** > **Service Catalog**.
2. Hover over the `calendar-otel` service and select **Full Page**.
3. Scroll to the bottom panel and select:

   * **Infrastructure Metrics** to see your Docker container metrics, such as CPU and memory usage.
   * **JVM Metrics** to see runtime metrics, such as heap usage and thread count. 

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="View Infrastructure metrics and JVM Runtime metrics for the Calendar application" style="width:90%;" >}}

### Logs

View logs to monitor and troubleshoot application and system operations.

1. Go to **Logs**.
2. If you have other logs in the list, add `@service.name:calendar-otel ` to the **Search for** field to only see logs from the Calendar application.
2. Select a log from the list to see more details.

{{< img src="/getting_started/opentelemetry/logs2.png" alt="View Logs for the Calendar application" style="width:90%;" >}}

### Traces

View traces and spans to observe the status and performance of requests processed by your application.

1. Go to **APM** > **Traces**.
2. Find the **Service** section in the filter menu, and select the `calendar-otel` facet to display all `calendar-otel` traces:

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="View Traces for the Calendar application" style="width:90%;" >}}

3. [Explore your `calendar-otel` traces][8]. 

   To start, click on a trace to open the trace side panel and find more details about the trace and its spans. For example, the [Flame Graph][9] captures how much time was spent in each component of the Calendar execution path:

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="View the Flame Graph for a Calendar application trace" style="width:90%;" >}}

4. Notice that you can select **Infrastructure**, **Metrics**, or **Logs** in the bottom panel to correlate your trace with other observability data. 

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="Correlate a Calendar application trace with logs" style="width:90%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: /opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: /tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: /opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
[12]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[14]: /opentelemetry/collector_exporter/
[15]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /getting_started/site/
