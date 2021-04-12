---
title: Trace Sampling and Storage
kind: documentation
aliases:
    - /tracing/faq/traces-sampling-and-storage/
    - /tracing/faq/how-long-is-tracing-data-stored/
    - /tracing/getting_further/trace_sampling_and_storage
    - /tracing/guide/trace_sampling_and_storage/
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/visualization/resource/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/visualization/trace/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

<div class="alert alert-danger">
On October 20, 2020, App Analytics was replaced by Tracing without Limits. This is a deprecated page with configuration information relevant to legacy App Analytics, useful for troubleshooting or modifying some old setups. Now, instead, use Tracing without Limits™ to have full control over your <a href="https://docs.datadoghq.com/tracing/trace_retention_and_ingestion">data ingestion and trace retention</a> with no sampling.
<br>
Migrate to <a href="https://docs.datadoghq.com/tracing/trace_retention_and_ingestion"> Trace Retention and Ingestion </a> to use the new functionality.
</div>

## Trace sampling

Trace Sampling is applicable for high-volume web-scale applications, where a sampled proportion of [traces][1] is kept in Datadog based on the following rules.

Statistics (requests, errors, latency, etc.), are calculated based on the full volume of traces at the Agent level, and are therefore always accurate.

### Statistics (Requests, Errors, Latencies etc.)

Datadog APM computes following aggregate statistics over all the traces instrumented, regardless of sampling:

* Total requests and requests per second
* Total errors and errors per second
* Latency
* Breakdown of time spent by service/type
* [Apdex score][2] (web services only)

{{< img src="tracing/product_specs/trace_sampling_storage/sampling_stats.png" alt="Aggregate statistics are generated on un-sampled data."  style="width:90%;">}}

### Goal of Sampling

The goal of sampling is to *keep* the traces that matter the most:

* Distributed traces
* Low QPS Services
* Representative variety set of traces

{{< img src="tracing/product_specs/trace_sampling_storage/tracing-flow-chart.png" alt="Individual traces are sampled at the Client, Agent, and Server level."  style="width:90%;">}}

### Sampling Rules

For the lifecycle of a trace, decisions are made at Tracing Client, Agent, and Backend level in the following order.

1. Tracing Client - The tracing client adds a context attribute `sampling.priority` to traces, allowing a single trace to be propagated in a distributed architecture across language agnostic request headers. `Sampling-priority` attribute is a hint to the Datadog Agent to do its best to prioritize the trace or drop unimportant ones.

    | Value           | Type                        | Action                                                                                                                                                                                                                         |
    |:----------------|:----------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **MANUAL_DROP** | User input                  | The Agent drops the trace.                                                                                                                                                                                                     |
    | **AUTO_DROP**   | Automatic sampling decision | The Agent drops the trace.                                                                                                                                                                                                     |
    | **AUTO_KEEP**   | Automatic sampling decision | The Agent keeps the trace.                                                                                                                                                                                                     |
    | **MANUAL_KEEP** | User input                  | The Agent keeps the trace, and the backend will only apply sampling if above maximum volume allowed. Note that when used with [App Analytics filtering][3] - all spans marked for `MANUAL_KEEP` are counted as billable spans. |

    Traces are automatically assigned a priority of AUTO_DROP or AUTO_KEEP, with a proportion ensuring that the Agent won’t have to sample more than it is allowed. Users can [manually adjust](#manually-control-trace-priority) this attribute to give priority to specific types of traces, or entirely drop uninteresting ones.

2. Trace Agent (Host or Container Level)- The Agent receives traces from various tracing clients and filters requests based on two rules -
    * Ensure traces are kept across variety of traces. (across services, resources, HTTP status codes, errors)
    * Ensure traces are kept for low volume resources (web endpoints, DB queries).

    The Agent computes a `signature` for every trace reported, based on its services, resources, errors, etc.. Traces of the same signature are considered similar. For example, a signature could be:

    * `env=prod`, `my_web_service`, `is_error=true`, `resource=/login`
    * `env=staging`, `my_database_service`, `is_error=false`, `query=SELECT...`

    A proportion of traces with each signature is then kept, so you get full visibility into all the different kinds of traces happening in your system. This method ensures traces for resources with low volumes are still kept.

    Moreover, the Agent provides a service-based rate to the prioritized traces from tracing client to ensure traces from low QPS services are prioritized to be kept.

    Users can manually drop entire uninteresting resource endpoints at Agent level by using [resource filtering][4].

3. DD Backend/Server - The server receives traces from various Agents running on hosts and applies sampling to ensure representation from every reporting Agent. It does so by keeping traces on the basis of the signature marked by Agent.

## Manually Control Trace Priority

APM enables distributed tracing by default to allow trace propagation between tracing headers across multiple services/hosts. Tracing headers include a priority tag to ensure complete traces between upstream and downstream services during trace propagation. You can override this tag to manually keep a trace (critical transaction, debug mode, etc.) or drop a trace (health checks, static assets, etc).
{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Manually keep a trace:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // Always keep the trace
        ddspan.setTag(DDTags.MANUAL_KEEP, true);
        // method impl follows
    }
}
```

Manually drop a trace:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // Always Drop the trace
        ddspan.setTag(DDTags.MANUAL_DROP, true);
        // method impl follows
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Manually keep a trace:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    // Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    // method impl follows
```

Manually drop a trace:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    //Always Drop the Trace
    span.set_tag(MANUAL_DROP_KEY)
    //method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Manually keep a trace:

```ruby
Datadog.tracer.trace(name, options) do |span|

  # Always Keep the Trace
  span.set_tag(Datadog::Ext::ManualTracing::TAG_KEEP, true)
  # method impl follows
end
```

Manually drop a trace:

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Always Drop the Trace
  span.set_tag(Datadog::Ext::ManualTracing::TAG_DROP, true)
  # method impl follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Manually keep a trace:

```Go
package main

import (
    "log"
    "net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)
    //method impl follows

}
```

Manually drop a trace:

```Go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Manually keep a trace:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Manually drop a trace:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)
//method impl follows

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Manually keep a trace:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Tags.ManualKeep, "true");
    //method impl follows
}
```

Manually drop a trace:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // Always drop this trace
    span.SetTag(Tags.ManualDrop, "true");
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


Manually keep a trace:

```php
<?php
  $tracer = \OpenTracing\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always keep this trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
    //method impl follows
  }
?>
```

Manually drop a trace:

```php
<?php
  $tracer = \OpenTracing\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always drop this trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
    //method impl follows
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Manually keep a trace:

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// Always keep this trace
span->SetTag(datadog::tags::manual_keep, {});
//method impl follows
```

Manually drop a trace:

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto another_span = tracer->StartSpan("operation_name");
// Always drop this trace

another_span->SetTag(datadog::tags::manual_drop, {});
//method impl follows
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Note that trace priority should be manually controlled only before any context propagation. If this happens after the propagation of a context, the system can’t ensure that the entire trace is kept across services. Manually controlled trace priority is set at tracing client location, the trace can still be dropped by Agent or server location based on the [sampling rules](#sampling-rules).

## Trace storage

Individual traces are stored for 15 days. This means that all **sampled** traces are retained for a period of 15 days and at the end of the 15th day, the entire set of expired traces is deleted. In addition, once a trace has been viewed by opening a full page, it continues to be available by using its trace ID in the URL: `{{< region-param key="dd_full_site" >}}/apm/trace/<TRACE_ID>`. This is true even if it "expires" from the UI. This behavior is independent of the UI retention time buckets.

{{< img src="tracing/guide/trace_sampling_and_storage/trace_id.png" alt="Trace ID"  >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm/
[3]: /tracing/app_analytics/#span-filtering
[4]: /security/tracing/#resource-filtering
