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
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()

    # Manually choose to drop healthcheck traces
    if is_healthcheck():
        span.set_tag(MANUAL_DROP_KEY)

    # Manually choose to keep error traces
    elif is_error():
        span.set_tag(MANUAL_KEEP_KEY)
```

{{% /tab %}}
{{% tab "Ruby" %}}

Manually keep or drop a trace:

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Manually mark the trace to keep
  span.set_tag(Datadog::Ext::ForcedTracing::TAG_KEEP)

  # Manually mark the span to drop
  span.set_tag(Datadog::Ext::ForcedTracing::TAG_DROP)
end
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

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
}
```


{{% /tab %}}
{{% tab "Node.js" %}}

Manually keep or drop a trace:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
```

{{% /tab %}}
{{% tab ".NET" %}}

Manually keep or drop a trace:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Tags.ManualKeep, "true");

    // Always drop this trace
    span.SetTag(Tags.ManualDrop, "true");
}
```

{{% /tab %}}
{{% tab "PHP" %}}

Anywhere in your code you can easily access the currently active span and force the current trace to be kept or dropped.

Manually keep a trace:

```php

$tracer = \OpenTracing\GlobalTracer::get();
$span = $tracer->getActiveSpan();

if (null !== $span) {
  // Always keep this trace
  $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
}

```

Manually drop a trace:

```php

$tracer = \OpenTracing\GlobalTracer::get();
$span = $tracer->getActiveSpan();

if (null !== $span) {
  // Always drop this trace
  $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
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
