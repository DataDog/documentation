---
title: Runtime Metrics
aliases:
  - /tracing/advanced/runtime_metrics/
  - /tracing/metrics/runtime_metrics/
  - /tracing/metrics/runtime_metrics/dotnet
  - /tracing/metrics/runtime_metrics/go
  - /tracing/metrics/runtime_metrics/java
  - /tracing/metrics/runtime_metrics/nodejs
  - /tracing/metrics/runtime_metrics/python
  - /tracing/metrics/runtime_metrics/ruby
description: "Gain additional insights into an application's performance with the runtime metrics associated to your traces."
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/trace_collection/custom_instrumentation'
      tag: 'Documentation'
      text: 'Manually instrument your application to create traces.'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

Runtime metrics are application metrics about memory usage, garbage collection, or parallelization. Datadog tracing libraries can automatically collect these metrics for supported environments and send them to the Datadog agent.

## Tracing requirements

| Language | Library Version       | Support Level | Enabled By Default | Generates runtime-id granularity |
|----------|-----------------------|---------------|--------------------|----------------------------------|
| Java     | 0.29.0+               | GA            | Yes                | Yes                              |
| Go       | 1.18.0+               | GA            | No                 | Yes                              |
| .NET     | 1.23.0+               | GA            | No                 | Yes                              |
| Node.js  | 3.0.0+                | GA            | No                 | No                               |
| Ruby     | 0.44.0+               | GA            | No                 | No                               |
| Python   | 0.30.0+               | Preview       | No                 | No                               |
| PHP      | Not supported         |               |                    |                                  |
| C++      | Not supported         |               |                    |                                  |

### Language-specific considerations

{{< programming-lang-wrapper langs="java,ruby,dotnet" >}}
{{< programming-lang lang="java" >}}
#### Supported runtimes
Runtime metrics are only supported on Java 8.
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
You must add the [`dogstatsd-ruby`][100] gem to your Ruby application.

[100]: https://rubygems.org/gems/dogstatsd-ruby
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}
#### Supported runtimes
Runtime metrics are only supported on .NET Framework 4.6.1+ and .NET Core 3.1+ (including .NET 5 and newer).

#### Additional permissions for IIS

On .NET Framework, metrics are collected using performance counters. Users in non-interactive logon sessions (that includes IIS application pool accounts and some service accounts) must be added to the **Performance Monitoring Users** group to access counter data.

IIS application pools use special accounts that do not appear in the list of users. To add them to the Performance Monitoring Users group, look for `IIS APPPOOL\<name of the pool>`. For instance, the user for the DefaultAppPool would be `IIS APPPOOL\DefaultAppPool`.

This can be done either from the "Computer Management" UI, or from an administrator command prompt:

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Getting started

### Configure the Datadog Agent

Make sure that [DogStatsD is enabled for the Agent][2]. By default, the Datadog Agent is configured to ingest metrics with UDP over port `8125`. Alternatively, the Datadog Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][7].

For containerized environments, follow the links below to enable DogStatsD metrics collection within the Datadog Agent.

#### Containers

1. Set `dogstatsd_non_local_traffic: true` in your main [`datadog.yaml` configuration file][8], or set the [environment variable][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. See the specific setup instructions to ensure that the Agent is configured to receive DogStatsD metrics in a containerized environment:

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

</br>

{{< site-region region="us3,us5,eu,gov,ap1" >}}

3. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

### Configure your application

`DD_RUNTIME_METRICS_ENABLED`
: **Default**: `true` for Java, `false` for all other languages <br>
**Description**: Enables the collection of runtime metrics. Metrics are sent to the Datadog agent, as configured for the instrumented application.

`DD_AGENT_HOST`
: **Default**: `localhost` <br>
**Description**: Sets the host address for the tracing library's metric submission. Can be a hostname or an IP address.

`DD_DOGSTATSD_PORT`
: **Default**: `8125` <br>
**Description**: Sets the port for the tracing library's metric submission.

#### Additional configuration

{{< programming-lang-wrapper langs="java,python,nodejs,go,ruby,dotnet" >}}
{{< programming-lang lang="java" >}}
Runtime metrics cannot be enabled in code.

Additional JMX metrics can be added using configuration files that are passed on using `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`. You can also enable existing Datadog JMX integrations individually with the `dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` parameter. This auto-embeds configuration from Datadog's existing JMX configuration files. See the [JMX Integration][100] for further details on configuration.

[100]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
If you are not using `ddtrace-run`, you can enable runtime metrics collection in code:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
Runtime metrics collection can also be enabled in code with one configuration parameter in the tracing client through the tracer option: `tracer.init({ runtimeMetrics: true })`

```js
const tracer = require('dd-trace').init({
  // ...
  runtimeMetrics: true
})
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
Runtime metrics collection can also be enabled in code by starting the tracer with the `WithRuntimeMetrics` option:

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

If your Datadog Agent DogStatsD address differs from the default `localhost:8125`, use the [`WithDogstatsdAddress`][3] (or [`WithDogstatsdAddress` v2][9]) option (available starting in 1.18.0).

[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddress
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
Runtime metrics collection can also be enabled in code by setting the following configuration in your Ruby application:

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
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}
Runtime metrics cannot be enabled in code.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Data Collected

See [Runtime Metrics Data Collected][4] for the full list of collected runtime metrics.

## View runtime metric dashboards

After setup is complete, see your runtime metrics in the instrumented service's details page (see Java example below), the flame graph metrics tab, and in default runtime dashboards.

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

**Notes**:
- To associate runtime metrics within flame graphs, ensure the `env` tag (case-sensitive) is set and matching across your environment.
- For runtime metrics to appear on the service page when using Fargate, ensure that `DD_DOGSTATSD_TAGS` is set on your Agent task, and that the configured `env` tag matches the `env` of the instrumented service.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /tracing/metrics/runtime_metrics/data_collected
[7]: /developers/dogstatsd/unix_socket/