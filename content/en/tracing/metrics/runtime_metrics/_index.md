---
title: Runtime Metrics
aliases:
  - /tracing/advanced/runtime_metrics/
  - /tracing/metrics/runtime_metrics/dotnet
  - /tracing/metrics/runtime_metrics/java
  - /tracing/metrics/runtime_metrics/nodejs
  - /tracing/metrics/runtime_metrics/python
  - /tracing/metrics/runtime_metrics/ruby
description: "Gain additional insights into an application's performance with the runtime metrics associated with your traces."
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Correlate your logs and traces'
    - link: 'tracing/trace_collection/custom_instrumentation'
      tag: 'Documentation'
      text: 'Manually instrument your application to create traces.'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

## Overview 

Runtime metrics monitor your application's memory usage, garbage collection, and parallelization. Datadog tracing libraries automatically collect these metrics for supported environments and send them to the Datadog Agent.

These metrics help you identify bottlenecks, troubleshoot performance issues, and optimize resource utilization. By viewing runtime metrics alongside traces and logs, you gain comprehensive visibility into your application's health and performance.

## Compatibility

Runtime metrics are available for several programming languages and runtimes, with varying levels of support and configuration options. 

{{< tabs >}}
{{% tab "Java" %}}
<div class="alert bg-light">
<ul>
  <li><strong>Enabled By Default</strong>: Yes</li>
  <li><strong>Library Version</strong>: 0.29.0+</li>
  <li><strong>Support Level</strong>: GA</li>
  <li><strong>Generates runtime-id granularity</strong>: Yes</li>
  <li><strong>Runtimes</strong>: Java 8+</li>
</ul>
</div>
{{% /tab %}}

{{% tab "Python" %}}
<div class="alert bg-light">
<ul>
  <li><strong>Enabled By Default</strong>: No</li>
  <li><strong>Library Version</strong>: 0.30.0+</li>
  <li><strong>Support Level</strong>: Preview</li>
  <li><strong>Generates runtime-id granularity</strong>: No</li>
  <li><strong>Runtimes</strong>: All supported Python versions</li>
</ul>
</div>
{{% /tab %}}

{{% tab "Ruby" %}}
<div class="alert bg-light">
<ul>
  <li><strong>Enabled By Default</strong>: No</li>
  <li><strong>Library Version</strong>: 0.44.0+</li>
  <li><strong>Support Level</strong>: GA</li>
  <li><strong>Generates runtime-id granularity</strong>: No</li>
  <li><strong>Runtimes</strong>: All supported Ruby versions</li>
</ul>

<div class="alert alert-info">You must add the <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> gem to your application.</div>
</div>
{{% /tab %}}

{{% tab "Go" %}}
<div class="alert bg-light">
<ul>
  <li><strong>Enabled By Default</strong>: No</li>
  <li><strong>Library Version</strong>: 1.18.0+</li>
  <li><strong>Support Level</strong>: GA</li>
  <li><strong>Generates runtime-id granularity</strong>: Yes</li>
  <li><strong>Runtimes</strong>: All supported Go versions</li>
</ul>
</div>
{{% /tab %}}

{{% tab "Node.js" %}}
<div class="alert bg-light">
<ul>
  <li><strong>Enabled By Default</strong>: No</li>
  <li><strong>Library Version</strong>: 3.0.0+</li>
  <li><strong>Support Level</strong>: GA</li>
  <li><strong>Generates runtime-id granularity</strong>: No</li>
  <li><strong>Runtimes</strong>: All supported Node.js versions</li>
</ul>
</div>
{{% /tab %}}

{{% tab ".NET" %}}
<div class="alert bg-light">
<ul>
  <li><strong>Enabled By Default</strong>: No</li>
  <li><strong>Library Version</strong>: 1.23.0+</li>
  <li><strong>Support Level</strong>: GA</li>
  <li><strong>Generates runtime-id granularity</strong>: Yes</li>
  <li><strong>Runtimes</strong>: .NET Framework 4.6.1+ and .NET Core 3.1+ (including .NET 5 and newer).</li>
</ul> 

<h4>Permissions for Internet Information Services (IIS)</h4>

<p>On .NET Framework, metrics are collected using performance counters. Users in non-interactive logon sessions (that includes IIS application pool accounts and some service accounts) must be added to the <strong>Performance Monitoring Users</strong> group to access counter data.</p>

<p>IIS application pools use special accounts that do not appear in the list of users. To add them to the Performance Monitoring Users group, look for <code>IIS APPPOOL\<name of the pool></code>. For instance, the user for the DefaultAppPool would be <code>IIS APPPOOL\DefaultAppPool</code>.</p>

<p>This can be done either from the "Computer Management" UI, or from an administrator command prompt:</p>

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```
</div>
{{% /tab %}}
{{% tab "PHP" %}}
<div class="alert bg-light">
<div class="alert alert-warning">Runtime metrics for PHP is not supported.</div>
</div>
{{% /tab %}}
{{% tab "C++" %}}
<div class="alert bg-light">
<div class="alert alert-warning">Runtime metrics for C++ is not supported.</div>
</div>
{{% /tab %}}
{{< /tabs >}}

## Setup instructions

To set up runtime metrics, you need to configure both the Datadog Agent and your application.

### 1. Configure the Datadog Agent

Enable [DogStatsD for the Agent][2]. By default, the Datadog Agent is configured to ingest metrics with UDP over port `8125`.

{{% collapse-content title="Container-specific configuration" level="h4" expanded=false %}}

When running the Agent in containerized environments, additional configuration is required:

1. Set `dogstatsd_non_local_traffic: true` in your main [`datadog.yaml` configuration file][8], or set the [environment variable][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Follow these container-specific setup instructions:

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,ap1" >}}

3. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the correct Datadog location.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configure your application

Configure runtime metrics in your application using environment variables. Some languages also support configuring runtime metrics [directly in code](#code-based-configuration).

#### Environment variables

Use the following environment variables to configure runtime metrics in your application:

`DD_RUNTIME_METRICS_ENABLED`
: **Default**: `true` for Java, `false` for all other languages <br>
**Description**: Enables the collection of runtime metrics. Metrics are sent to the Datadog agent, as configured for the instrumented application.

`DD_AGENT_HOST`
: **Default**: `localhost` <br>
**Description**: Sets the host address for the tracing library's metric submission. Can be a hostname or an IP address.

`DD_DOGSTATSD_PORT`
: **Default**: `8125` <br>
**Description**: Sets the port for the tracing library's metric submission.

#### Code-based configuration

In addition to environment variables, some languages support configuring runtime metrics directly in code.

{{< tabs >}}
{{% tab "Java" %}}
<div class="alert bg-light">

You can only enable runtime metrics with [environment variables](#environment-variables).

However, you can extend the metrics collected by adding custom JMX metrics. For more information, see [JMX Integration][100] documentation.

[100]: /integrations/java/
</div>
{{% /tab %}}

{{% tab "Python" %}}
<div class="alert bg-light">

You can enable runtime metrics with [environment variables](#environment-variables) or in code:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-warning">This only applies if you are not using <code>ddtrace-run</code></div>
</div>
{{% /tab %}}

{{% tab "Ruby" %}}
<div class="alert bg-light">

You can enable runtime metrics with [environment variables](#environment-variables) or in code:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
</div>
{{% /tab %}}

{{% tab "Go" %}}
<div class="alert bg-light">

You can enable runtime metrics with [environment variables](#environment-variables) or in code:

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

The `WithDogstatsdAddr` option allows you to specify a custom address for the DogStatsD server. Use the [`WithDogstatsdAddress`][100] (or [`WithDogstatsdAddress` v2][101]) option if your address differs from the default `localhost:8125`. (Available for 1.18.0+)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddress
</div>
{{% /tab %}}

{{% tab "Node.js" %}}
<div class="alert bg-light">

You can enable runtime metrics with [environment variables](#environment-variables) or in code:

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
</div>
{{% /tab %}}

{{% tab ".NET" %}}
<div class="alert bg-light">

You can only enable runtime metrics with [environment variables](#environment-variables).

</div>
{{% /tab %}}
{{< /tabs >}}

## Dashboards

After setup is complete, you can view runtime metrics in:

- The instrumented service's details page
- The flame graph **Metrics** tab
- Default runtime dashboards

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## Troubleshooting
- To associate runtime metrics within flame graphs, ensure the `env` tag (case-sensitive) is set and matching across your environment.
- For runtime metrics to appear on the service page when using Fargate, ensure that `DD_DOGSTATSD_TAGS` is set on your Agent task, and that the configured `env` tag matches the `env` of the instrumented service.

## Data collected

Each supported language collects a set of runtime metrics that provide insights into memory usage, garbage collection, CPU utilization, and other performance indicators.

{{< tabs >}}
{{< tab "Java" >}}
{{< get-metrics-from-git "java" >}}
{{< /tab >}}

{{< tab "Python" >}}
{{< get-metrics-from-git "python" >}}
{{< /tab >}}

{{< tab "Ruby" >}}
{{< get-metrics-from-git "ruby" >}}
{{< /tab >}}

{{< tab "Go" >}}
{{< get-metrics-from-git "go" >}}
{{< /tab >}}

{{< tab "Node.js" >}}
{{< get-metrics-from-git "node" >}}
{{< /tab >}}

{{< tab ".NET" >}}
{{< get-metrics-from-git "dotnet" >}}
{{< /tab >}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[7]: /developers/dogstatsd/unix_socket/
[8]: /agent/configuration/agent-configuration-files/#main-configuration-file
