---
title: Getting Started with OpenTelemetry and Datadog
kind: documentation
further_reading:
- link: 'https://opentelemetry.io/docs/'
  tag: 'OpenTelemetry'
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

[OpenTelemetry][11] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing observability data from software applications. OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application observability data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

Datadog offers multiple options for sending data from OpenTelemetry-instrumented applications to the Datadog backend. 

This guide demonstrates how to integrate an existing OpenTelemetry environment with Datadog so you can analyze in Datadog the observability data you’re already generating. You will configure the Datadog Exporter, which runs alongside your OpenTelemetry Collector, to forward trace, metric, and logs data from OpenTelemetry SDKs to Datadog. 

Follow this guide to:

1. Configure a sample application, instrumented using the OpenTelemetry API.
2. Send observability data (metrics, logs, and traces) to Datadog using the OpenTelemetry Collector with the Datadog Exporter. 
3. Explore the application’s observability data in the Datadog UI. 

## Prerequisites

To complete this guide, you need the following:

* (Optional) Use Linux to receive infrastructure metrics.
* Install [Docker Compose][3]. 
* [Create a Datadog account][1] if you haven’t done so already.
* Find or create your [Datadog API key][2].
* Export your Datadog API key to an environment variable:
  ```
  export DD_API_KEY=<Your API Key>
  ```

You will use a sample Java REST application named **Calendar** to complete this guide. To get the application:

1. Clone the `opentelemetry-examples` repository to your device: 
   ```
   git clone https://github.com/DataDog/opentelemetry-examples.git
   ```
2. Navigate to the `/calendar` directory: 
   ```
   cd opentelemetry-examples/apps/rest-services/java/calendar
   ```

## Using OpenTelemetry with Datadog

The **Calendar** application uses OpenTelemetry tools to generate and collect metrics, logs, and traces. The following steps explain how to get this observability data into Datadog. 

### Instrumenting your application with the OpenTelemetry API

The **Calendar** sample application is already instrumented for you.

In `CalendarController.java`, the following code instruments the **Calendar** application using the OpenTelemetry API:

```
private String getDate() {
   Span span = GlobalOpenTelemetry.getTracer("calendar").spanBuilder("getDate").startSpan();
```

When the **Calendar** application runs, the `getDate()` call generates traces and spans. Next, you will configure the application to send this data to the Datadog backend.

### Configuring the OTLP Receiver 

The **Calendar** application sends data from the OpenTelemetry SDK to the [OpenTelemetry Protocol (OTLP) receiver][10] in the OpenTelemetry Collector. In the Collector configuration file---which lives at `./src/main/resources/otelcol-config.yaml`---the following code configures the OTLP receiver to receive metrics, traces, and logs:

```
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

### Configuring the Datadog Exporter

The Datadog Exporter sends data collected by the OTLP receiver to the Datadog backend so it can be explored through the Datadog app. In `otelcol-config.yaml`, the following configures the Datadog Exporter:

```
service:
  pipelines:
    metrics:
      exporters: [datadog]
    traces:
      exporters: [datadog]
    logs:
      exporters: [datadog]
```

This code suffices to send runtime metrics, traces, and logs to Datadog. However, [*infrastructure metrics* require additional changes][4]. 

### Configuring your application to send infrastructure metrics

As an example, you will configure your OpenTelemetry Collector to forward Docker container metrics. 

*Reminder: You must use Linux to send infrastructure metrics from the OpenTelemetry Collector to Datadog.*

To collect container metrics, configure the [Docker stats receiver][5] in your Datadog Exporter: 

1. Add a `docker_stats` block to the `receivers` section of `otel-config.yaml`:

```
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        Endpoint: 0.0.0.0:4318
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

2. Update `service.pipelines.metrics.receivers` to include `docker_stats`:

```
service:
  pipelines:
    metrics:
      receivers: [otlp, docker_stats] # <- update this line!
```

Your application now sends container metrics to Datadog for viewing in the Datadog UI.

### Using unified tagging to correlate observability data

[Unified service tagging][6] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In the **Calendar** application's Docker Compose file, `./deploys/docker/docker-compose-otel.yml`, the following lines are already included to enable correlation between application traces and other observability data: 

```
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_LOGS_EXPORTER=otlp
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker
```


## Running the application to generate observability data

Run the **Calendar** application with the OpenTelemetry SDK to generate and forward observability data to Datadog:  

1. Run the application from the `calendar/` folder:
   ```
   docker compose -f deploys/docker/docker-compose-otel.yml up
   ```

   This command spins up a Docker container with the OpenTelemetry Collector and the **Calendar** service.

2. Test the **Calendar** application by running the below from another terminal window:
   ```
   curl localhost:9090/calendar 
   ```

   You should get a response like:
   ```
   {“date":"2022-12-30"}
   ```

With each call, the **Calendar** application metrics, traces, and logs, which are forwarded to the OpenTelemetry Collector, the Datadog Exporter, and finally the Datadog backend. 

Note: The **Calendar** application uses the probabilistic sampler processor, meaning only a percentage (30%, specifically) of all traces sent through the application reach the target backend. Run the curl command several times to ensure at least one trace exports to the Datadog backend. 

## Exploring observability data in Datadog

Now, you can use Datadog to explore the **Calendar** application’s observability data.   

*Note: It may take a few minutes for your trace data to appear in Datadog.*

### Exploring Runtime and Infrastructure Metrics

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your applications, hosts, containers, and processes.

1. Hover over **APM** in the left-side panel and select **Service Catalog**.
2. Hover over the `calendar-otel` service and select **Full Page**.
3. Scroll to the bottom panel and select:

   * **Infrastructure Metrics** to see your Docker container metrics, such as CPU and memory usage.
   * **JVM Metrics** to see runtime metrics, such as heap usage and thread count. 

   TODO: insert screenshot

### Exploring Logs

View logs to monitor and troubleshoot application and system operations.

Select **Logs** in the left-side panel to explore logs generated by the **Calendar** application. 

TODO: insert screenshot

### Exploring Traces

View traces and spans to observe the status and performance of requests processed by your application.

1. Hover over **APM** in the left-side panel and select **Traces**.
2. Find the **Service** section in the filter menu on the left-hand side, and select the `calendar-otel` service to list all `calendar-otel` traces:

   TODO: insert screenshot

3. [Explore your `calendar-otel` traces][8]. 

   To start, click on a trace to open the trace side panel and find more details about the trace and its spans. For example, the [Flame Graph][9] captures how much time was spent in each component of the **Calendar** execution path:

   TODO: insert screenshot

4. Notice that you can select **Infrastructure**, **Metrics**, or **Logs** in the bottom panel to correlate your trace with other observability data. 

   TODO: insert screenshot

   You can also take the inverse approach: for example, in the **Logs** section of the Datadog site, you can click on a log and correlate it back to the respective trace.

   TODO: insert screenshot


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: https://docs.datadoghq.com/opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: https://docs.datadoghq.com/tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: https://docs.datadoghq.com/opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
