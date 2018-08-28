---
title: Priority Sampling
kind: documentation
---

Priority Sampling allows traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace. Additionally, APM traces expose sampling flags to configure how specific traces are sampled.

{{< tabs >}}
{{% tab "Java" %}}
Distributed Traces may sample inconsistently when the linked traces run on different hosts. To ensure that distributed traces are complete, enable priority sampling. Priority sampling automatically assigns and propagates a priority value along all traces, depending on their service and volume. Priorities can also be set manually to drop non-interesting traces or keep important ones.

Priority sampling is disabled by default. To enable it, configure the `priority.sampling` flag to `true` ([see how to configure the client here](/tracing/setup/java/#configuration)).

Current Priority Values (more may be added in the future):

| Sampling Value | Effect                                                                                                     |
| --------       | :--------------------------------------------------                                                        |
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
{{% /tab %}}
{{% tab "Python" %}}
Priority sampling is disabled by default. To enable it, configure the
`priority_sampling` flag using the `tracer.configure` method:

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

| Sampling Value |                                                   Effect                                                   |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| AUTO_REJECT    | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| AUTO_KEEP      | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| USER_REJECT    | The user asked to not keep the trace. The Agent will drop it.                                              |
| USER_KEEP      | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

{{% /tab %}}
{{% tab "Ruby" %}}
```ruby
This is some ruby code
```
{{% /tab %}}
{{% tab "Go" %}}
Propagate a single trace across multiple services with distributed tracing. For more details about how to use and configure distributed tracing, check out the [godoc page][tracer godoc].

Make use of priority sampling to ensure that distributed traces are complete. Set the sampling priority of a trace by adding the `sampling.priority` tag to its root span. This is then propagated throughout the entire stack. For example:

```go
span.SetTag(ext.SamplingPriority, ext.PriorityUserKeep)
```

Possible values for the sampling priority tag are:

| Sampling Value             | Effect                                                                                                      |
| -------------------------- | :---------------------------------------------------------------------------------------------------------- |
| ext.PriorityAutoReject     | The sampler automatically decided to not keep the trace. The Agent will drop it.                            |
| ext.PriorityAutoKeep       | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side.  |
| ext.PriorityUserReject     | The user asked to not keep the trace. The Agent will drop it.                                               |
| ext.PriorityUserKeep       | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                      |

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
This is some node code
```

{{% /tab %}}
{{< /tabs >}}