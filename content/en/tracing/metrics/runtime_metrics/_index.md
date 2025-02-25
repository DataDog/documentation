---
title: Runtime Metrics
type: multi-code-lang
aliases:
  - /tracing/advanced/runtime_metrics/
  - /tracing/runtime_metrics/
  - /tracing/runtime_metrics/dotnet
  - /tracing/runtime_metrics/go
  - /tracing/runtime_metrics/java
  - /tracing/runtime_metrics/nodejs
  - /tracing/runtime_metrics/python
  - /tracing/runtime_metrics/ruby
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

This behavior is enabled by default for the Java tracing library.

## Tracing requirements

| Language | Library Version       |
|----------|-----------------------|
| Java     | 0.29.0+               |
| Python   | 0.30.0+               |
| Ruby     | 0.44.0+               |
| Go       | 1.18.0+               |
| Node.js  | 3.0.0+                |
| .NET     | 1.23.0+               |

Caveats:
- **For Ruby applications**, you must add the [`dogstatsd-ruby`][1] gem to your Ruby application.
- **For .NET applications**, runtime metrics are only supported on .NET Framework 4.6.1+ and .NET Core 3.1+ (including .NET 5 and newer).

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

#### Additional In-Code configuration

{{< tabs >}}

{{% tab "Python" %}}

If you are not using `ddtrace-run`, you can enable runtime metrics collection in code:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

{{% /tab %}}

{{% tab "Node.js" %}}

Runtime metrics collection can also be enabled with one configuration parameter in the tracing client through the tracer option: `tracer.init({ runtimeMetrics: true })`

```js
const tracer = require('dd-trace').init({
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3',
  runtimeMetrics: true
})
```

{{% /tab %}}

{{% tab "Go" %}}

Runtime metrics collection can also be enabled by starting the tracer with the `WithRuntimeMetrics` option:

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

If your Datadog Agent DogStatsD address differs from the default `localhost:8125`, use the [`WithDogstatsdAddress`][3] (or [`WithDogstatsdAddress` v2][9]) option (available starting in 1.18.0).

[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddress

{{% /tab %}}

{{% tab "Ruby" %}}

Runtime metrics collection can also be enabled by setting the following configuration in your Ruby application:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  # To enable runtime metrics collection, set `true`. Defaults to `false`
  # You can also set DD_RUNTIME_METRICS_ENABLED=true to configure this.
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

{{% /tab %}}

{{< /tabs >}}

## Data Collected

See [Runtime Metrics Data Collected][4] for the full list of collected runtime metrics.

## Additional permissions for IIS

On .NET Framework, metrics are collected using performance counters. Users in non-interactive logon sessions (that includes IIS application pool accounts and some service accounts) must be added to the **Performance Monitoring Users** group to access counter data.

IIS application pools use special accounts that do not appear in the list of users. To add them to the Performance Monitoring Users group, look for `IIS APPPOOL\<name of the pool>`. For instance, the user for the DefaultAppPool would be `IIS APPPOOL\DefaultAppPool`.

This can be done either from the "Computer Management" UI, or from an administrator command prompt:

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## View runtime metric dashboards

After setup is complete, see your runtime metrics in the instrumented service's details page (see Java example below), the flame graph metrics tab, and in default runtime dashboards.

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

**Notes**:
- To associate runtime metrics within flame graphs, ensure the `env` tag (case-sensitive) is set and matching across your environment.
- For runtime metrics to appear on the service page when using Fargate, ensure that `DD_DOGSTATSD_TAGS` is set on your Agent task, and that the configured `env` tag matches the `env` of the instrumented service.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /tracing/metrics/runtime_metrics/data_collected
[7]: /developers/dogstatsd/unix_socket/
[8]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
