---
title: Live Debugger
kind: documentation
is_beta: true
private: true
further_reading:
- link: "/tracing/trace_collection/dd_libraries"
  tag: "Documentation"
  text: "Learn more about how to instrument your application"
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
- link: "/tracing/services/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/metrics"
  tag: "Documentation"
  text: "Learn more about Metrics"
---

{{< beta-callout url="http://d-sh.io/debugger" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
<!-- **!!!TODO: create beta signup form/link!!!** -->
  Live Debugger is in private beta. Let us know if you would like to access it.
{{< /beta-callout >}}

Live Debugger allows you to dynamically instrument your running application.
With Live Debugger you can set different kinds of probes, like snapshot or
metric probes, at specific code locations in your application. It relies on an
up-to-date APM tracing library, an up-to-date [Datadog Agent][1] and Remote
Configuration Management being enabled.

Create a probe:

{{< img src="tracing/live_debugger/snapshot_probe_creation.mp4" alt="Video demonstrating Live Debugger. A probe is configured on a service." video="true" >}}

See live data:

{{< img src="tracing/live_debugger/data_snapshot.mp4" alt="Video demonstrating Live Debugger. Data generated from a probe is explored." video="true" >}}

## Getting Started

### Supported Versions

| Component             | Version        |
|-----------------------|----------------|
| [datadog-agent][1]    | 7.38.0         |
| [dd-trace-java][2]    | **!!!TBD!!!**  |
| [dd-trace-py][3]      | **!!!TBD!!!**  |
| [dd-trace-dotnet][4]  | **!!!TBD!!!**  |

### Prerequisites

- [Datadog Agent][1] 7.38.0 or higher is installed alongside your service.
- Recommended: [Unified Service Tagging][5] tags `service`, `env` and `version`
  are applied to your deployment.
- Recommended: [Source Code Integration][6] has been set-up for your service.

### Enable Remote Configuration Management

**!!!TODO: create minimal Remote Configuration on boarding docs!!!**

### Create a Logs index

Live Debugger snapshots are sent to Datadog Logs. They will appear alongside
your application logs. To avoid snapshots being sampled, you must ensure they
are sent to an index that retains all messages. It is recommended you create a
logs index with the name `live-debugger-snapshots`.

[Configure the index][7] to the desired retention and make sure that no
sampling is configured. Use the filter `dd_source:debugger`. You should also
make sure that the new index is at a position in the list that is not
[superceeded][8] by any other filters. Logs enter the first index whose filter
they match on.

Snapshots are rate-limited in the Debugger libraries to at most one per second,
so you don't have to worry about excessive amounts of data being produced.

### Enable Live Debugger

Choose the runtime of the service that you would like to debug below to learn
how to enable it.

{{< partial name="live_debugger/livedebugger-languages.html" >}}

## Explore Live Debugger

The Live Debugger can help you understand what your application is doing at
runtime. By adding a Live Debugger probe you are dynamically instrumenting your
application, without the need to do any code change or redeployment.

### Create a snapshot probe

Create the snapshot probe:

{{< img src="tracing/live_debugger/snapshot_probe_creation.mp4" alt="Video demonstrating Live Debugger. A snapshot probe is configured on a service." video="true" >}}

See the output from a snapshot probe:

{{< img src="tracing/live_debugger/data_snapshot.mp4" alt="Video demonstrating Live Debugger. Data generated from a snapshot probe is explored." video="true" >}}

### Create a metric probe

Metric probes are used to emit metrics at a chosen location in your code. The
Live Debugger expression language can be used to reference numeric values from
the context, for example from a local variable or a class field.

Create the metric probe:

{{< img src="tracing/live_debugger/metric_probe_creation.mp4" alt="Video demonstrating Live Debugger. A metric probe is configured on a service." video="true" >}}

Observe the metric:

{{< img src="tracing/live_debugger/data_metric.mp4" alt="Video demonstrating Live Debugger. Data generated from a metric probe is explored." video="true" >}}

### Select instrumented instances

The Live Debugger allows you to specify which instances of your service should
be instrumented. Since the instrumentation applied by Live Debugger may
introduce a small performance overhead, you can use this feature to ensure the
instrumentation is not applied to every instance of your service, but only a
specific subset.

**Note**
: If you do not explicitly specify which instances should be instrumented, by
default, the Live Debugger will only enable the instrumentation on one
randomly-selected instance per service, environment and version combination.

{{< img src="tracing/live_debugger/client_selection.mp4" alt="Video demonstrating Live Debugger. Active clients are selected for a service." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/dd-trace-java
[3]: https://github.com/DataDog/dd-trace-py
[4]: https://github.com/DataDog/dd-trace-dotnet
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://docs.datadog.com/integrations/guide/source-code-integration
[7]: /logs/log_configuration/indexes/#add-indexes
[8]: /logs/log_configuration/indexes/#indexes-filters
