---
title: Force Tracing
kind: documentation
aliases:
  - /tracing/guide/force_tracing
---


APM enables priority sampling by default to allow traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace (i.e. ensures completeness) and helps removing unimportant ones. You can override this functionality to force keep a trace (critical transaction, debug mode, etc.) or force drop a trace (health checks, static assets, etc) by the agent and the server using forced tracing.

Forced tracing should be done only before any context propagation. If this happens after the propagation of a context, the system can’t ensure that the entire trace is sampled properly.


{{< tabs >}}
{{% tab "Java" %}}

Manually keep or drop a trace:

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

        // ask the sampler to keep the current trace
        ddspan.setTag(DDTags.MANUAL_KEEP, true);

        // ask the sampler to drop the current trace
        ddspan.setTag(DDTags.MANUAL_DROP, true);

        // method impl follows
    }
}
```

[1]: /tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Manually keep or drop a trace:

```python
span = tracer.current_span()

# Always keep this trace
span.set_tag('manual.keep')

# Always drop this trace
span.set_tag('manual.drop')
```

{{% /tab %}}
{{% tab "Ruby" %}}

Manually keep or drop a trace:

```ruby
# Always keep this trace
span.set_tag('manual.keep')

# Always drop this trace
span.set_tag('manual.drop')
```
{{% /tab %}}
{{% tab "Go" %}}

Manually keep or drop a trace:

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

    // To Manually Keep a Trace
    span.SetTag(ext.SamplingPriority, ext.PriorityUserKeep)

     // To Manually Keep a Trace
    span.SetTag(ext.SamplingPriority, ext.PriorityUserDrop)
}
```


{{% /tab %}}
{{% tab "Node.js" %}}

Manually keep or drop a trace:

```js
const tags = require('dd-trace/ext/tags')

// To reject the trace
span.setTag(tags.MANUAL_DROP)

// To keep the trace
span.setTag(tags.MANUAL_KEEP)
```

{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon

{{% /tab %}}
{{% tab "PHP" %}}

Manually keep or drop a trace:

```php

$tracer = \OpenTracing\GlobalTracer::get();
$span = $tracer->getActiveSpan();

if (null !== $span) {

  // Always keep this trace
  $span->setTag('manual.keep', true);

  // Always drop this trace
  $span->setTag('manual.drop', true);
}

```

{{% /tab %}}
{{% tab "C++" %}}

Manually keep or drop a trace:

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// Always keep this trace
span->SetTag(datadog::tags::manual_keep, {});
auto another_span = tracer->StartSpan("operation_name");
// Always drop this trace
another_span->SetTag(datadog::tags::manual_drop, {});
```


{{% /tab %}}
{{< /tabs >}}

For a more detailed explanations of sampling, check the [sampling and storage][1] documentation.

[1]: /tracing/guide/trace_sampling_and_storage
