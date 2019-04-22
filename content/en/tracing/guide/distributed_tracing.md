---
title: Distributed Tracing
kind: documentation
aliases:
  - /tracing/guide/distributed-tracing
---

Distributed tracing allows you to propagate a single trace across multiple services and hosts, so you can see performance end-to-end. Linking is implemented by injecting Datadog Metadata into the request headers.

Distributed tracing headers are language agnostic. A trace started in one language may propagate to another (for example, from Python to Java).

Distributed traces may sample inconsistently when the linked traces run on different hosts. To ensure that distributed traces are complete, enable [priority sampling][1].


{{< tabs >}}
{{% tab "Java" %}}

Create a distributed trace using manual instrumentation with OpenTracing:

```java
// Step 1: Inject the Datadog headers in the client code
try (Scope scope = tracer.buildSpan("httpClientSpan").startActive(true)) {
    final Span span = scope.span();
    HttpRequest request = /* your code here */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // http request impl...
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
  private final HttpRequest httpRequest;

  public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
    this.httpRequest = httpRequest;
  }

  @Override
  public void put(final String key, final String value) {
    httpRequest.addHeader(key, value);
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    throw new UnsupportedOperationException("This class should be used only with tracer#inject()");
  }
}

// Step 2: Extract the Datadog headers in the server code
HttpRequest request = /* your code here */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

try (Scope scope = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).startActive(true)) {
    final Span span = scope.span(); // is a child of http client span in step 1
    // http server impl...
}

public class MyHttpRequestExtractAdapter implements TextMap {
  private final HttpRequest request;

  public HttpRequestExtractAdapter(final HttpRequest request) {
    this.request = request;
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    return request.headers().iterator();
  }

  @Override
  public void put(final String key, final String value) {
    throw new UnsupportedOperationException("This class should be used only with Tracer.extract()!");
  }
}
```

{{% /tab %}}
{{% tab "Python" %}}

Distributed tracing is enabled by default and supported in the following frameworks:

| Framework/Library | API Documentation                                                   |
| ----------------- | :------------------------------------------------------------------ |
| aiohttp           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp  |
| bottle            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle   |
| django            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django   |
| falcon            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon   |
| flask             | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask    |
| molten            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten   |
| pylons            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons   |
| pyramid           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid  |
| requests          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests |
| tornado           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado  |

To add your own distributed tracing check the [Datadog API documentation][1].


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#http-client
{{% /tab %}}
{{% tab "Ruby" %}}

Distributed tracing is disabled by default. Refer to the configuration documentation for each framework to enable it.

Distributed tracing is supported in the following frameworks:

| Framework/Library | API Documentation                                                                    |
| ----------------- | :----------------------------------------------------------------------------------- |
| Excon             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#excon      |
| Faraday           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday    |
| Net/HTTP          | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp    |
| Rack              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack       |
| Rails             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails      |
| Rest Client       | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#restclient |
| Sinatra           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra    |

For more details about how to activate and configure distributed tracing, see the [API documentation][1].


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#distributed-tracing
{{% /tab %}}
{{% tab "Go" %}}

Create a distributed trace by manually propagating the tracing context:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Inject the span Context in the Request headers
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log injection error
    }
    http.DefaultClient.Do(req)
}
```

Then, on the server side, to continue the trace, start a new Span from the extracted `Context`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extract the span Context and continue the trace in this service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log extraction error
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

{{% /tab %}}
{{% tab "Node.js" %}}

Distributed tracing is enabled by default for all supported integrations (see [Compatibility][1]).


[1]: /tracing/languages/nodejs/#compatibility
{{% /tab %}}
{{% tab ".NET" %}}

Distributed tracing is enabled by default for all supported integrations (see [Integrations][1]).

[1]: /tracing/languages/dotnet/#integrations
{{% /tab %}}
{{% tab "PHP" %}}

Distributed tracing is enabled by default.

{{% /tab %}}
{{% tab "C++" %}}

Distributed tracing can be accomplished by [using the `Inject` and `Extract` methods on the tracer][1], which accept [generic `Reader` and `Writer` types][2]. Priority sampling (enabled by default) should be on to ensure uniform delivery of spans.

```cpp
// Allows writing propagation headers to a simple map<string, string>.
// Copied from https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("operation_name");
  tracer->Inject(span->context(), carrier);
  // `headers` now populated with the headers needed to propagate the span.
}
```

[1]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[2]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
{{% /tab %}}
{{< /tabs >}}

## Priority Sampling

Priority sampling allows traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace (i.e. ensures completeness). Additionally, APM traces expose sampling flags to configure how specific traces are sampled.

Priority sampling automatically assigns and propagates a priority value along all traces, depending on their service and volume. Priorities can also be set manually to drop non-interesting traces or keep important ones.

For a more detailed explanations of sampling and priority sampling, check the [sampling and storage][1] documentation.


{{< tabs >}}
{{% tab "Java" %}}

Priority sampling is enabled by default. To disable it, configure the `priority.sampling` flag to `false` ([see how to configure the java client][1]).

Manually set trace priority:

```java
import datadog.trace.api.Trace;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.sampling.ForcedTracing;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();

        // ask the sampler to keep the current trace
        ddspan.setTag(ForcedTracing.manual_KEEP);

        // ask the sampler to drop the current trace
        ddspan.setTag(ForcedTracing.manual_DROP);

        // method impl follows
    }
}
```

[1]: /tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Priority sampling is enabled by default.

To manually set trace priority:

```python
span = tracer.current_span()

# Always keep this trace
span.set_tag('manual.keep')

# Always drop this trace
span.set_tag('manual.drop')
```

{{% /tab %}}
{{% tab "Ruby" %}}

Priority sampling is enabled by default.

Manually set trace priority:

```ruby
# Always keep this trace
span.set_tag('manual.keep')

# Always drop this trace
span.set_tag('manual.drop')
```
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

Priority sampling is enabled by default. The default sampler automatically assigns a value of `AutoReject` or `AutoKeep` to traces, depending on their service and volume.

{{% /tab %}}
{{% tab "PHP" %}}

Priority sampling is enabled by default.


Manually set trace priority:

```php

$tracer = \OpenTracing\GLobalTracer::get();
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

[1]: /tracing/guide/trace_sampling_and_storage
