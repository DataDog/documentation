---
title: Priority Sampling
kind: documentation
---

Priority sampling allows traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace (i.e. ensures completeness). Additionally, APM traces expose sampling flags to configure how specific traces are sampled.

Priority sampling automatically assigns and propagates a priority value along all traces, depending on their service and volume. Priorities can also be set manually to drop non-interesting traces or keep important ones.

For a more detailed explanations of sampling and priority sampling, check the [sampling and storage][1] documentation.


{{< tabs >}}
{{% tab "Java" %}}

Priority sampling is enabled by default. To disable it, configure the `priority.sampling` flag to `false` ([see how to configure the java client][1]).


Current Priority Values (more may be added in the future):

| Sampling Value | Effect                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| `SAMPLER_DROP` | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `SAMPLER_KEEP` | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `USER_DROP`    | The user asked to not keep the trace. The Agent will drop it.                                              |
| `USER_KEEP`    | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

Manually set trace priority:

```java
import datadog.trace.api.Trace;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.common.sampling.PrioritySampling;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // ask the sampler to keep the current trace
        ddspan.setSamplingPriority(PrioritySampling.USER_KEEP);
        // method impl follows
    }
}
```

[1]: /tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Priority sampling is disabled by default. To enable it, configure the `priority_sampling` flag using the `tracer.configure` method:

```python
tracer.configure(priority_sampling=True)
```

To set a custom priority to a trace:

```python
from ddtrace.ext.priority import USER_REJECT, USER_KEEP

span = tracer.current_span()

# indicate to not keep the trace
span.context.sampling_priority = USER_REJECT
```

The following priorities can be used.

| Sampling Value | Effect                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| AUTO_REJECT    | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| AUTO_KEEP      | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| USER_REJECT    | The user asked to not keep the trace. The Agent will drop it.                                              |
| USER_KEEP      | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

{{% /tab %}}
{{% tab "Ruby" %}}

Priority sampling is disabled by default. Enabling it ensures that your sampled distributed traces will be complete. To enable the priority sampling:

```ruby
Datadog.configure do |c|
  c.tracer priority_sampling: true
end
```

Once enabled, the sampler automatically assigns a value of `AUTO_REJECT` or `AUTO_KEEP` to traces, depending on their service and volume.

You can also set this priority manually to either drop a non-interesting trace or to keep an important one. For that, set the `Context#sampling_priority` to:

```ruby
# To reject the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# To keep the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

Possible values for the sampling priority tag are:

| Sampling Value                        | Effect                                                                                                     |
| ------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `Datadog::Ext::Priority::AUTO_REJECT` | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `Datadog::Ext::Priority::AUTO_KEEP`   | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `Datadog::Ext::Priority::USER_REJECT` | The user asked to not keep the trace. The Agent will drop it.                                              |
| `Datadog::Ext::Priority::USER_KEEP`   | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

When not using [distributed tracing](#distributed-tracing), you may change the priority at any time, as long as the trace is not finished yet. However, it must be done before any context propagation (e.g. fork, RPC calls) to be effective in a distributed context. Changing the priority after such context has been propagated causes different parts of a distributed trace to use different priorities. Some parts might be kept, some parts might be rejected, and consequently this can cause the trace to be partially stored and remain incomplete.

It is recommended that changing priority be done as soon as possible, when the root span has just been created.

See the [API documentation][1] for more details.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling
{{% /tab %}}
{{% tab "Go" %}}

For more details about how to use and configure distributed tracing, check out the [godoc page][1].

Set the sampling priority of a trace by adding the `sampling.priority` tag to its root span. This is then propagated throughout the entire stack. For example:

```go
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

    // Set priority sampling as a regular tag
    span.SetTag(ext.SamplingPriority, ext.PriorityUserKeep)
}
```

Possible values for the sampling priority tag are:

| Sampling Value         | Effect                                                                                                     |
| ---------------------- | :--------------------------------------------------------------------------------------------------------- |
| ext.PriorityAutoReject | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| ext.PriorityAutoKeep   | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| ext.PriorityUserReject | The user asked to not keep the trace. The Agent will drop it.                                              |
| ext.PriorityUserKeep   | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
{{% /tab %}}
{{% tab "Node.js" %}}

Priority sampling is enabled by default. The sampler automatically assigns a value of `AUTO_REJECT` or `AUTO_KEEP` to traces, depending on their service and volume.

Set this priority manually to either drop a non-interesting trace or to keep an important one with the `sampling.priority` tag:

```javascript
const priority = require('dd-trace/ext/priority')

// To reject the trace
span.setTag('sampling.priority', priority.USER_REJECT)

// To keep the trace
span.setTag('sampling.priority', priority.USER_KEEP)
```

Possible values for the sampling priority tag are:

| Sampling Value | Effect                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| `AUTO_REJECT`  | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `AUTO_KEEP`    | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `USER_REJECT`  | The user asked to not keep the trace. The Agent will drop it.                                              |
| `USER_KEEP`    | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

Once the sampling priority has been set, it cannot be changed. This is done automatically whenever a span is finished or the trace is propagated. Setting it manually should thus be done before either occur.

{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Priority sampling is enabled by default.

{{% /tab %}}
{{% tab "C++" %}}

Priority sampling is enabled by default, and can be disabled in the TracerOptions. You can mark a span to be kept or discarded by setting the tag `sampling.priority`. A value of `0` means reject/don't sample. Any value greater than 0 means keep/sample.

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("sampling.priority", 1); // Keep this span.
auto another_span = tracer->StartSpan("operation_name");
another_span->SetTag("sampling.priority", 0); // Discard this span.
```

{{% /tab %}}
{{< /tabs >}}

[1]: /tracing/getting_further/trace_sampling_and_storage
