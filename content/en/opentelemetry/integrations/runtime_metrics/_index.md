---
title: OpenTelemetry Runtime Metrics
aliases:
- /opentelemetry/runtime_metrics/
- /opentelemetry/integrations/runtime_metrics/go/
- /opentelemetry/integrations/runtime_metrics/dotnet/
- /opentelemetry/integrations/runtime_metrics/java/
further_reading:
- link: "/tracing/metrics/runtime_metrics/"
  tag: "Documentation"
  text: "APM Runtime Metrics"
- link: "/opentelemetry/mapping/metrics_mapping/"
  tag: "Documentation"
  text: "OpenTelemetry Metrics Mapping"
---

## Overview

Runtime metrics provide insights into application performance, including memory usage, garbage collection, and parallelization. Datadog tracing libraries offer [runtime metrics collection][5] for each supported language, and OpenTelemetry (OTel) also collects compatible runtime metrics that can be sent to Datadog through the OpenTelemetry SDKs.

## Compatibility

Datadog supports OpenTelemetry runtime metrics for the following languages:
- Java
- .NET
- Go
- NodeJS
- Python

For details about host and container metrics mapping, see [OpenTelemetry Metrics Mapping][1].

## Setup instructions

### 1. Prerequisites

- You have successfully [configured OpenTelemetry metrics to send to Datadog][2].
- You have installed the [corresponding language integration in Datadog][3].

### 2. Configure your application

Select your language to see instructions for configuring the OpenTelemetry SDK to send runtime metrics:

{{< tabs >}}
{{% tab "Java" %}}

#### Automatic instrumentation

If you use [OpenTelemetry automatic instrumentation][3] for Java applications, runtime metrics are enabled by default.

#### Manual instrumentation

If you use [OpenTelemetry manual instrumentation][4], follow the guides for your Java version:
- [Java 8][5]
- [Java 17][6]

#### Collector configuration

The `jvm.gc.collections.count` and `jvm.gc.collections.elapsed` metrics require the [Delta-to-Rate Processor][8] in the OpenTelemetry Collector. Additionally, ensure that `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta` is set as well.

```yaml
processors:
  deltatorate:
    metrics:
      - jvm.gc.collections.count
      - jvm.gc.collections.elapsed
```

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/deltatorateprocessor

{{% /tab %}}

{{% tab "Go" %}}

OpenTelemetry Go applications are [instrumented manually][3]. To enable runtime metrics, see the documentation for the [runtime package][4].

#### Collector configuration

The `process.runtime.go.gc.pause_total_ns` and `process.runtime.go.gc.count` metrics require the [Delta-to-Cumulative Processor][9] and the [Transform Processor][8] in the OpenTelemetry Collector. The Delta-to-Cumulative Processor converts delta sums to cumulative sums, and the Transform Processor converts cumulative sums to gauges. Additionally, ensure that `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta` is set to handle other metrics as well.

```yaml
processors:
  deltatocumulative:
    metrics:
      - process.runtime.go.gc.pause_total_ns
      - process.runtime.go.gc.count
  transform:
    metric_statements:
      - context: metric
        statements:
          - convert_sum_to_gauge() where name == "process.runtime.go.gc.pause_total_ns" or name == "process.runtime.go.gc.count"
```

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/deltatocumulativeprocessor

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">The minimum supported version of the .NET OpenTelemetry SDK is <a href="https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0">1.5.0</a></div>

#### Automatic instrumentation

If you use [OpenTelemetry automatic instrumentation][3] for .NET applications, runtime metrics are enabled by default.

#### Manual instrumentation

If you use [OpenTelemetry manual instrumentation][4], see the documentation for the [OpenTelemetry.Instrumentation.Runtime library][5].

#### Metric export interval

The default metric export interval for the .NET OTel SDK differs from the default for the Datadog .NET SDK. Datadog recommends setting the [OTEL_METRIC_EXPORT_INTERVAL][7] environment variable on your .NET service to match the default Datadog metric export interval:

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

#### Collector configuration

The `dotnet.process.cpu.time` metric requires the [Delta-to-Rate Processor][8] in the OpenTelemetry Collector. Additionally, ensure that `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta` is set as well.

```yaml
processors:
  deltatorate:
    metrics:
      - dotnet.process.cpu.time
```

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/deltatorateprocessor

{{% /tab %}}

{{% tab "NodeJS" %}}

#### Automatic instrumentation

If you use [OpenTelemetry automatic instrumentation][3] for Node.js applications, runtime metrics are enabled by default through the [`@opentelemetry/instrumentation-runtime-node`][5] package.

**Note**: Runtime metrics are only exported if a `MeterProvider` and metric exporter are configured. Set the `OTEL_METRICS_EXPORTER` environment variable or programmatically configure a `metricReader` in your SDK initialization.

#### Manual instrumentation

If you use [OpenTelemetry manual instrumentation][4], see the documentation for the [`@opentelemetry/instrumentation-runtime-node`][5] library.

[3]: https://opentelemetry.io/docs/zero-code/js/
[4]: https://opentelemetry.io/docs/languages/js/instrumentation/
[5]: https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-runtime-node

{{% /tab %}}

{{% tab "Python" %}}

Runtime metrics are not enabled by default for Python applications. Install the [`opentelemetry-instrumentation-system-metrics`][5] package:

```shell
pip install opentelemetry-instrumentation-system-metrics
```

If you use [automatic instrumentation][3], `opentelemetry-instrument` discovers and enables the package after installation. If you use [manual instrumentation][4], enable it in your application:

```python
from opentelemetry.instrumentation.system_metrics import SystemMetricsInstrumentor

SystemMetricsInstrumentor().instrument()
```

[3]: https://opentelemetry.io/docs/languages/python/automatic/
[4]: https://opentelemetry.io/docs/languages/python/instrumentation/
[5]: https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation/opentelemetry-instrumentation-system-metrics

{{% /tab %}}

{{< /tabs >}}

## View runtime metric dashboards

After setup is complete, you can view runtime metrics in:
- The service's details page (see Java example below)
- The flame graph metrics tab
- Default [runtime dashboards][7]

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="Service page showing OpenTelemetry runtime metrics on the JVM Metrics tab" style="width:100%;" >}}

## Data collected

The following tables list the OpenTelemetry runtime metrics used in Datadog's out-of-the-box in-app experiences.

<div class="alert alert-danger"> OpenTelemetry runtime metrics are mapped to Datadog by metric name. Do not rename host metrics for OpenTelemetry runtime metrics as this breaks the mapping.</div>

{{< tabs >}}
{{< tab "Java" >}}

<h3>JVM Instrumentation</h3>
<p>These metrics are collected when using the latest version of the OpenTelemetry Java SDK.</p>
{{< mapping-table resource="jvm-instrumentation.csv">}}

<h3>JVM Contrib</h3>
<p>These metrics are collected when using the OpenTelemetry JMX Metrics Gatherer.</p>
{{< mapping-table resource="jvm-contrib.csv">}}

<h3>JVM Deprecated</h3>
<p>These metrics are collected when using OpenTelemetry Java SDK versions 1.32.0 and earlier.</p>
{{< mapping-table resource="jvm-deprecated.csv">}}

{{< /tab >}}

{{< tab "Go" >}}

{{< mapping-table resource="go-contrib-runtime.csv">}}

{{< /tab >}}

{{< tab ".NET" >}}

<h3>.NET System.Runtime</h3>
<p>These metrics are emitted by the .NET runtime's built-in <code>System.Runtime</code> meter on .NET 9.0 and later. The OpenTelemetry SDK collects and exports them automatically.</p>
{{< mapping-table resource="dotnet.csv">}}

<h3>.NET Contrib Runtime</h3>
<p>These metrics are collected by the <a href="https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime">OpenTelemetry.Instrumentation.Runtime</a> package. On .NET 9.0 and later, these overlap with the System.Runtime metrics above.</p>
{{< mapping-table resource="dotnet-contrib-runtime.csv">}}

<h3>.NET Contrib Process</h3>
<p>These metrics are collected by the <a href="https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Process">OpenTelemetry.Instrumentation.Process</a> package.</p>
{{< mapping-table resource="dotnet-contrib-process.csv">}}

{{< /tab >}}

{{< tab "NodeJS" >}}

<h3>Node Contrib Runtime</h3>
<p>These metrics are emitted from auto-instrumentation with the latest version of the OpenTelemetry Node.js SDK.</p>
{{< mapping-table resource="node-contrib-runtime.csv">}}

<h3>Node Contrib Host</h3>
<p>These metrics are collected by the <a href="https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/host-metrics">@opentelemetry/host-metrics</a> package. This package is not included in OpenTelemetry automatic instrumentation and must be installed and configured manually.</p>
{{< mapping-table resource="node-contrib-host.csv">}}

{{< /tab >}}

{{% tab "Python" %}}

The following table lists the conceptual equivalences between OpenTelemetry and Datadog Python runtime metrics. There are no direct mappings due to mismatching metric types between the two systems.

| Datadog metric | Description | OpenTelemetry metric |
| --- | --- | --- |
| `runtime.python.cpu.time.sys` | Number of seconds executing in the kernel. | `process.cpu.time` (`type: system`) |
| `runtime.python.cpu.time.user` | Number of seconds executing outside the kernel. | `process.cpu.time` (`type: user`) |
| `runtime.python.cpu.percent` | CPU utilization percentage. OTel divides by 100 × number of cores. | `process.cpu.utilization` |
| `runtime.python.cpu.ctx_switch.voluntary` | Number of voluntary context switches. | `process.context_switches` (`type: voluntary`) |
| `runtime.python.cpu.ctx_switch.involuntary` | Number of involuntary context switches. | `process.context_switches` (`type: involuntary`) |
| `runtime.python.gc.count.gen0` | Number of generation 0 objects. | `process.runtime.{python_implementation}.gc_count` (`count: 0`) |
| `runtime.python.gc.count.gen1` | Number of generation 1 objects. | `process.runtime.{python_implementation}.gc_count` (`count: 1`) |
| `runtime.python.gc.count.gen2` | Number of generation 2 objects. | `process.runtime.{python_implementation}.gc_count` (`count: 2`) |
| `runtime.python.mem.rss` | Resident set memory. | `process.memory.usage` |
| `runtime.python.thread_count` | Number of threads. | `process.thread.count` |

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/mapping/metrics_mapping/
[2]: /opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics