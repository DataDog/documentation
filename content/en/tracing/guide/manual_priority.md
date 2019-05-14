---
title: Force Tracing
kind: documentation
aliases:
  - /tracing/guide/force_tracing
---


APM enables distributed tracing by default to allow trace propagation between tracing headers across multiple services/hosts. Tracing headers include a priority tag to ensure complete traces between upstream and downstream services during trace propagation. 
 
You can override this tag to manually keep a trace (critical transaction, debug mode, etc.) or drop a trace (health checks, static assets, etc). 
Note that this tag should only be set before any context propagation. If this happens after the propagation of a context, the system can’t ensure that the entire trace is kept across services.
 
In regards to dropping unimportant traces, take a look at the agent docs[1] to ignore resources.



{{< tabs >}}
{{% tab "Java" %}}

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


{{% /tab %}}
{{% tab "Python" %}}

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

        // Always Drop the Trace
        span.set_tag(MANUAL_DROP_KEY)

        // method impl follows
```

{{% /tab %}}
{{% tab "Ruby" %}}

Manually keep a trace:

```ruby
Datadog.tracer.trace(name, options) do |span|

  # Always Keep the Trace
  span.set_tag(Datadog::Ext::ForcedTracing::TAG_KEEP)
  # method impl follows
end
```
Manually drop a trace:

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Always Drop the Trace
  span.set_tag(Datadog::Ext::ForcedTracing::TAG_DROP)
  # method impl follows
end
```
{{% /tab %}}
{{% tab "Go" %}}

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

{{% /tab %}}
{{% tab "Node.js" %}}

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

{{% /tab %}}
{{% tab ".NET" %}}

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

{{% /tab %}}
{{% tab "PHP" %}}

From anywhere in your code, you can access the currently active span and force the current trace to be kept or dropped.

Manually keep a trace:

```php

$tracer = \OpenTracing\GlobalTracer::get();
$span = $tracer->getActiveSpan();

if (null !== $span) {
  // Always keep this trace
  $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  //method impl follows
}

```

Manually drop a trace:

```php

$tracer = \OpenTracing\GlobalTracer::get();
$span = $tracer->getActiveSpan();

if (null !== $span) {
  // Always drop this trace
  $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  //method impl follows
}

```

{{% /tab %}}
{{% tab "C++" %}}

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

{{% /tab %}}
{{< /tabs >}}

For a more detailed explanations of sampling, check the [sampling and storage][1] documentation.

[1]: /tracing/guide/trace_sampling_and_storage
