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

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library

{{% /tab %}}

{{% tab "Go" %}}

OpenTelemetry Go applications are [instrumented manually][3]. To enable runtime metrics, see the documentation for the [runtime package][4].

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime

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

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader

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

{{< mapping-table resource="jvm-deprecated.csv">}}

{{< /tab >}}

{{< tab "Go" >}}

{{< mapping-table resource="go-contrib-runtime.csv">}}

{{< /tab >}}

{{< tab ".NET" >}}

{{< mapping-table resource="dotnet.csv">}}

{{< mapping-table resource="dotnet-contrib-process.csv">}}

{{< mapping-table resource="dotnet-contrib-runtime.csv">}}

{{< /tab >}}

{{< tab "NodeJS" >}}

{{< mapping-table resource="node-contrib-host.csv">}}

{{< mapping-table resource="node-contrib-runtime.csv">}}

{{< /tab >}}

{{< tab "Python" >}}

<p>The following table lists the conceptual equivalences between OpenTelemetry and Datadog Python runtime metrics. There are no direct mappings due to mismatching metric types between the two systems.</p>

<div class="table-wrapper">
    <table class="table-fixed">
        <thead>
            <tr>
                <th>DATADOG</th>
                <th>DESCRIPTION</th>
                <th>OTEL</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>runtime.python.cpu.time.sys</code></td>
                <td>Number of seconds executing in the kernel.</td>
                <td><code>process.cpu.time</code> (<code>type: system</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.cpu.time.user</code></td>
                <td>Number of seconds executing outside the kernel.</td>
                <td><code>process.cpu.time</code> (<code>type: user</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.cpu.percent</code></td>
                <td>CPU utilization percentage. OTel divides by 100 × number of cores.</td>
                <td><code>process.cpu.utilization</code></td>
            </tr>
            <tr>
                <td><code>runtime.python.cpu.ctx_switch.voluntary</code></td>
                <td>Number of voluntary context switches.</td>
                <td><code>process.context_switches</code> (<code>type: voluntary</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.cpu.ctx_switch.involuntary</code></td>
                <td>Number of involuntary context switches.</td>
                <td><code>process.context_switches</code> (<code>type: involuntary</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.gc.count.gen0</code></td>
                <td>Number of generation 0 objects.</td>
                <td><code>process.runtime.{python_implementation}.gc_count</code> (<code>count: 0</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.gc.count.gen1</code></td>
                <td>Number of generation 1 objects.</td>
                <td><code>process.runtime.{python_implementation}.gc_count</code> (<code>count: 1</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.gc.count.gen2</code></td>
                <td>Number of generation 2 objects.</td>
                <td><code>process.runtime.{python_implementation}.gc_count</code> (<code>count: 2</code>)</td>
            </tr>
            <tr>
                <td><code>runtime.python.mem.rss</code></td>
                <td>Resident set memory.</td>
                <td><code>process.memory.usage</code></td>
            </tr>
            <tr>
                <td><code>runtime.python.thread_count</code></td>
                <td>Number of threads.</td>
                <td><code>process.thread.count</code></td>
            </tr>
        </tbody>
    </table>
</div>

{{< /tab >}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/mapping/metrics_mapping/
[2]: /opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics