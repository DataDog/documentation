---
title: Priority Sampling
kind: documentation
---

Priority sampling allows traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace (i.e. ensures completeness). Additionally, APM traces expose sampling flags to configure how specific traces are sampled.

Priority sampling automatically assigns and propagates a priority value along all traces, depending on their service and volume. Priorities can also be set manually to drop non-interesting traces or keep important ones. 

{{< tabs >}}
{{% tab "Java" %}}
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
```python
This is some python code
```
{{% /tab %}}
{{% tab "Ruby" %}}
Possible values for the sampling priority tag are:

| Sampling Value | Effect                                                                                                     |
| --------       | :--------------------------------------------------                                                        |
| `Datadog::Ext::Priority::AUTO_REJECT` | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `Datadog::Ext::Priority::AUTO_KEEP`   | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `Datadog::Ext::Priority::USER_REJECT` | The user asked to not keep the trace. The Agent will drop it.                                              |
| `Datadog::Ext::Priority::USER_KEEP`   | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

Priority sampling is disabled by default. Enabling it ensures that your sampled distributed traces will be complete. To enable the priority sampling:

```ruby
Datadog.configure do |c|
  c.tracer priority_sampling: true
end
```

Once enabled, the sampler will automatically assign a value of `AUTO_REJECT` or `AUTO_KEEP` to traces, depending on their service and volume.

You can also set this priority manually to either drop a non-interesting trace or to keep an important one. For that, set the `Context#sampling_priority` to:

```ruby
# To reject the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# To keep the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

When not using [distributed tracing](#distributed-tracing), you may change the priority at any time, as long as the trace is not finished yet. However, it must be done before any context propagation (fork, RPC calls) to be effective in a distributed context. Changing the priority after such context has been propagated causes different parts of a distributed trace to use different priorities. Some parts might be kept, some parts might be rejected, and consequently can cause the trace to be partially stored and remain incomplete.

When changing the priority, it is recommended that it is done as soon as possible, when the root span has just been created.

See the [API documentation][ruby api doc] for more details.

[ruby api doc]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling

{{% /tab %}}
{{% tab "Go" %}}
For more details about how to use and configure distributed tracing, check out the [godoc page][tracer godoc].

Set the sampling priority of a trace by adding the `sampling.priority` tag to its root span. This is then propagated throughout the entire stack. For example:

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

[tracer godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer

{{% /tab %}}
{{% tab "Node.js" %}}
Coming Soon.
{{% /tab %}}
{{< /tabs >}}