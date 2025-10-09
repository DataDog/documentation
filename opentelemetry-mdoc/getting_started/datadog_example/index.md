---
title: Getting Started with OpenTelemetry at Datadog
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Getting Started with OpenTelemetry at
  Datadog > Getting Started with OpenTelemetry at Datadog
---

# Getting Started with OpenTelemetry at Datadog

{% callout %}
##### Try "Understanding OpenTelemetry" in the Learning Center

Learn the fundamentals of OpenTelemetry, including its capabilities and benefits, key components, and how OTel and Datadog work together.

[ENROLL NOW](https://learn.datadoghq.com/courses/understanding-opentelemetry)
{% /callout %}

## Overview{% #overview %}

[OpenTelemetry](https://opentelemetry.io/) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing observability data from software applications. OpenTelemetry provides a consistent format for instrumenting (Instrumentation is the process of adding code to your application to capture and report observability data to Datadog, such as traces, metrics, and logs.), generating, gathering, and exporting application observability data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

This guide demonstrates how to configure [a sample OpenTelemetry application](https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar) to send observability data to Datadog using the OpenTelemetry SDK, OpenTelemetry Collector, and [Datadog Exporter](http://localhost:1313/opentelemetry/collector_exporter/). This guide also shows you how to explore this data in the Datadog UI.

Follow this guide to:

1. Instrument the application with the OpenTelemetry API.
1. Configure the application to send observability data to Datadog.
1. Correlate observability data with unified service tagging.
1. Run the application to generate observability data.
1. Explore observability data in the Datadog UI.

## Prerequisites{% #prerequisites %}

To complete this guide, you need the following:

1. [Create a Datadog account](https://www.datadoghq.com/free-datadog-trial/) if you haven't yet.
1. Set up your Datadog API key:
   1. Find or create your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys/).
   1. Export your Datadog API key to an environment variable:
      ```sh
      export DD_API_KEY=<Your API Key>
```
1. Get the sample [Calendar](https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar) application.
   1. Clone the `opentelemetry-examples` repository to your device:
      ```sh
      git clone https://github.com/DataDog/opentelemetry-examples.git
```
   1. Navigate to the `/calendar` directory:
      ```sh
      cd opentelemetry-examples/apps/rest-services/java/calendar
```
1. Install [Docker Compose](https://docs.docker.com/compose/install/).
1. (Optional) Use Linux to send infrastructure metrics.

The Calendar application uses OpenTelemetry tools to generate and collect metrics, logs, and traces. The following steps explain how to get this observability data into Datadog.

## Instrumenting the application{% #instrumenting-the-application %}

The Calendar sample application is already partially [instrumented](http://localhost:1313/tracing/trace_collection/custom_instrumentation/otel_instrumentation/):

1. Go to the main `CalendarService.java` file located at: `./src/main/java/com/otel/service/CalendarService.java`.

1. The following code instruments `getDate()` using the OpenTelemetry annotations and API:

In the `CalendarService.java` file:

   ```java
   @WithSpan(kind = SpanKind.CLIENT)
   public String getDate() {
       Span span = Span.current();
       span.setAttribute("peer.service", "random-date-service");
       ...
   }
```

When the Calendar application runs, the `getDate()` call generates [traces](http://localhost:1313/tracing/glossary/#trace) and spans.

## Configuring the application{% #configuring-the-application %}

### OTLP Receiver{% #otlp-receiver %}

The Calendar application is already configured to send data from the OpenTelemetry SDK to the [OpenTelemetry Protocol (OTLP) receiver](http://localhost:1313/opentelemetry/collector_exporter/otlp_receiver/) in the OpenTelemetry Collector.

1. Go to the Collector configuration file located at: `./src/main/resources/otelcol-config.yaml`.

1. The following lines configure the OTLP Receiver to receive metrics, traces, and logs:

In the `otelcol-config.yaml` file:

   ```yaml
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
```

### Datadog Exporter{% #datadog-exporter %}

The Datadog Exporter sends data collected by the OTLP Receiver to the Datadog backend.

1. Go to the `otelcol-config.yaml` file.

1. The following lines configure the Datadog Exporter to send observability data to Datadog:

In the `otelcol-config.yaml` file:

   ```yaml
   exporters:
     datadog:
       traces:
         compute_stats_by_span_kind: true
         trace_buffer: 500
       hostname: "otelcol-docker"
       api:
         key: ${DD_API_KEY}
         site: datadoghq.com
   
   connectors:
       datadog/connector:
         traces:
           compute_stats_by_span_kind: true
   
   service:
     pipelines:
       metrics:
         receivers: [otlp, datadog/connector] # <- update this line
         exporters: [datadog]
       traces:
         exporters: [datadog, datadog/connector]
       logs:
         exporters: [datadog]
```

1. Set `exporters.datadog.api.site` to your [Datadog site](http://localhost:1313/getting_started/site/). Otherwise, it defaults to US1.

This configuration allows the Datadog Exporter to send runtime metrics, traces, and logs to Datadog. However, sending infrastructure metrics requires additional configuration.

### OpenTelemetry Collector{% #opentelemetry-collector %}

In this example, configure your OpenTelemetry Collector to send infrastructure metrics.

{% alert level="info" %}
To send infrastructure metrics from the OpenTelemetry Collector to Datadog, you must use Linux. This is a limitation of the Docker Stats receiver.
{% /alert %}

To collect container metrics, configure the [Docker stats receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/) in your Datadog Exporter:

1. Add a `docker_stats` block to the `receivers` section of `otel-config.yaml`:

In the `otelcol-config.yaml` file:

   ```yaml
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
```

1. Update `service.pipelines.metrics.receivers` to include `docker_stats`:

In the `otelcol-config.yaml` file:

   ```yaml
   service:
     pipelines:
       metrics:
         receivers: [otlp, datadog/connector, docker_stats] # <- update this line
```

This configuration allows the Calendar application to send container metrics to Datadog for you to explore in Datadog.

### Sending observability data with OTLP{% #sending-observability-data-with-otlp %}

The Calendar application uses the OpenTelemetry logging exporter in its Logback configuration to send logs with OpenTelemetry Layer Processor (OTLP).

1. Go to the Calendar application's Logback XML configuration file at `/src/main/resources/logback.xml`.

1. The following lines define the `OpenTelemetry` appender:

In the `logback.xml` file:

   ```xml
   <appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
       <immediateFlush>true</immediateFlush>
       <captureExperimentalAttributes>true</captureExperimentalAttributes>
       <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
     </appender>
```

1. The `<appender-ref ref="OpenTelemetry"/>` line references the `OpenTelemetry` appender in the root level configuration:

In the `logback.xml` file:

   ```xml
   <root level="INFO">
     <appender-ref ref="console"/>
     <appender-ref ref="OpenTelemetry"/>
   </root>
```

Additionally, environment variables configure the OpenTelemetry environment to export logs, metrics, and traces:

1. Go to the Calendar application's Docker Compose file at `./deploys/docker/docker-compose-otelcol.yml`.
1. The `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` configuration allows the metrics, traces, and logs to be sent with OTLP.

## Correlating observability data{% #correlating-observability-data %}

[Unified service tagging](http://localhost:1313/getting_started/tagging/unified_service_tagging/) ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

The Calendar application is already configured with unified service tagging:

1. Go to the Calendar application's Docker Compose file at `./deploys/docker/docker-compose-otelcol.yml`.

1. The following lines enable the correlation between application traces and other observability data:

In the `docker-compose-otelcol.yml` file:

   ```yaml
   environment:
     - OTEL_SERVICE_NAME=calendar-otel
     - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
```

## Running the application{% #running-the-application %}

To start generating and forwarding observability data to Datadog, you need to run the Calendar application with the OpenTelemetry SDK:

1. Run the application from the `calendar/` folder:



   ```sh
   docker compose -f deploys/docker/docker-compose-otelcol.yml up
```
This command creates a Docker container with the OpenTelemetry Collector and the Calendar service.


1. To test that the Calendar application is running correctly, execute the following command from another terminal window:

   ```sh
   curl localhost:9090/calendar
```

1. Verify that you receive a response like:

   ```sh
   {"date":"2022-12-30"}
```

1. Run the `curl` command several times to ensure at least one trace exports to the Datadog backend.
Important alert (level: info): The Calendar application uses the probabilistic sampler processor, so only 30% of traces sent through the application reach the target backend.

Each call to the Calendar application results in metrics, traces, and logs being forwarded to the OpenTelemetry Collector, then to the Datadog Exporter, and finally to the Datadog backend.

## Exploring observability data in Datadog{% #exploring-observability-data-in-datadog %}

Use the Datadog UI to explore the Calendar application's observability data.

**Note**: It may take a few minutes for your trace data to appear.

### Runtime and infrastructure metrics{% #runtime-and-infrastructure-metrics %}

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your applications, hosts, containers, and processes.

1. Go to **APM** > **Software Catalog**.

1. Hover over the `calendar-otel` service and select **Full Page**.

1. Scroll to the bottom panel and select:

   - **Infrastructure Metrics** to see your Docker container metrics, such as CPU and memory usage.
   - **JVM Metrics** to see runtime metrics, such as heap usage and thread count.

   {% image
      source="http://localhost:1313/images/getting_started/opentelemetry/infra_and_jvm2.ee035ce972f22cc98ad390910586b971.png?auto=format"
      alt="View Infrastructure metrics and JVM Runtime metrics for the Calendar application" /%}

### Logs{% #logs %}

View logs to monitor and troubleshoot application and system operations.

1. Go to **Logs**.
1. If you have other logs in the list, add `@service.name:calendar-otel` to the **Search for** field to only see logs from the Calendar application.
1. Select a log from the list to see more details.

{% image
   source="http://localhost:1313/images/getting_started/opentelemetry/logs2.43c742c87041b0969a2624681f040143.png?auto=format"
   alt="View Logs for the Calendar application" /%}

### Traces{% #traces %}

View traces and spans to observe the status and performance of requests processed by your application.

1. Go to **APM** > **Traces**.

1. Find the **Service** section in the filter menu, and select the `calendar-otel` facet to display all `calendar-otel` traces:

   {% image
      source="http://localhost:1313/images/getting_started/opentelemetry/traces2.b1f59d9e3f89f11e0a4747c1d26056ba.png?auto=format"
      alt="View Traces for the Calendar application" /%}

1. [Explore your `calendar-otel` traces](http://localhost:1313/tracing/glossary/#trace).

To start, click on a trace to open the trace side panel and find more details about the trace and its spans. For example, the [Flame Graph](https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/) captures how much time was spent in each component of the Calendar execution path:

   {% image
      source="http://localhost:1313/images/getting_started/opentelemetry/flame_graph2.d5056f017bfdb484c4c45b7360e86541.png?auto=format"
      alt="View the Flame Graph for a Calendar application trace" /%}

1. Notice that you can select **Infrastructure**, **Metrics**, or **Logs** in the bottom panel to correlate your trace with other observability data.

   {% image
      source="http://localhost:1313/images/getting_started/opentelemetry/trace_logs_correlation.3365e01c45c01ddc449d9e8556c9e7ba.png?auto=format"
      alt="Correlate a Calendar application trace with logs" /%}

## Further reading{% #further-reading %}

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Datadog OpenTelemetry Documentation](http://localhost:1313/opentelemetry)
- [Custom Instrumentation with OpenTelemetry](http://localhost:1313/tracing/trace_collection/custom_instrumentation/otel_instrumentation)
- [Monitor runtime metrics from OTel-instrumented apps in Datadog APM](https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog)
- [Correlate Datadog RUM events with traces from OTel-instrumented applications](https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/)
- [Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter](https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter)
- [Forward logs from the OpenTelemetry Collector with the Datadog Exporter](https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter)
