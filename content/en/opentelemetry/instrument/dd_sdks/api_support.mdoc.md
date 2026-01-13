---
title: OpenTelemetry API Support
description: "Use the OpenTelemetry API with Datadog SDKs to send traces, metrics, and logs to Datadog while maintaining vendor-neutral instrumentation."
aliases:
  - /opentelemetry/interoperability/api_support
  - /opentelemetry/interoperability/otel_api_tracing_interoperability/
content_filters:
  - trait_id: prog_lang
    option_group_id: otel_api_support_language_options
    label: "Language"
  - trait_id: platform
    option_group_id: otel_api_support_signal_options
    label: "Signal"
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
      tag: 'Documentation'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
      tag: 'Documentation'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
      tag: 'Documentation'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
      tag: 'Blog'
---

<!-- ============================================== -->
<!-- SIGNAL AVAILABILITY NOTICES -->
<!-- ============================================== -->

<!-- Languages with only traces: Go, PHP, Java, Rust -->
{% if or(or(or(equals($prog_lang, "go"), equals($prog_lang, "php")), equals($prog_lang, "java")), equals($prog_lang, "rust")) %}
{% if equals($platform, "metrics") %}
{% alert level="danger" %}
OpenTelemetry API support for metrics is not available for this language. Select **Traces** to see available instrumentation options.
{% /alert %}
{% /if %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
OpenTelemetry API support for logs is not available for this language. Select **Traces** to see available instrumentation options.
{% /alert %}
{% /if %}
{% /if %}

<!-- Ruby has traces and metrics only -->
{% if equals($prog_lang, "ruby") %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
OpenTelemetry API support for logs is not available for Ruby. Select **Traces** or **Metrics** to see available instrumentation options.
{% /alert %}
{% /if %}
{% /if %}

Datadog SDKs implement the [OpenTelemetry API][1], allowing you to instrument your code with vendor-neutral APIs while benefiting from Datadog's native implementation and features. Your code remains free of vendor-specific calls and doesn't depend on Datadog SDKs at compile time.

{% img src="/opentelemetry/setup/otel-api-dd-sdk.png" alt="Navigate to the API Keys page for your organization in Datadog" style="width:80%;" /%}

{% alert level="info" %}
You can also send OTel-instrumented data via the [OTel Collector][7]. See the [feature compatibility table][8] for supported Datadog features.
{% /alert %}

<!-- ============================================== -->
<!-- TRACES CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "traces") %}

## Overview

Use OpenTelemetry tracing APIs with Datadog SDKs to create custom spans, add tags, record events, and more.

<!-- JAVA TRACES -->
{% if equals($prog_lang, "java") %}

## Setup {% #setup-java %}

{% alert level="info" %}
OpenTelemetry is supported in Java after version 1.24.0.
{% /alert %}

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Java Setup Instructions][100].

2. Make sure you only depend on the OpenTelemetry API (and not the OpenTelemetry SDK).

3. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

## Adding span tags {% #adding-span-tags-java %}

### Add custom span tags {% #add-custom-span-tags-java %}

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### Adding tags globally to all spans {% #adding-tags-globally-java %}

The `dd.tags` property allows you to set tags across all generated spans for an application. This is useful for grouping stats for your applications, data centers, or any other tags you would like to see in Datadog.

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar
```

### Setting errors on span {% #setting-errors-java %}

To set an error on a span, use the `setStatus` method:

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### Setting tags and errors on a root span from a child span {% #setting-root-span-java %}

When you want to set tags or errors on the root span from within a child span, you can use the OpenTelemetry Context API:

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.ContextKey;
import io.opentelemetry.context.Scope;

public class Example {

  private final static ContextKey<Span> CONTEXT_KEY =
    ContextKey.named("opentelemetry-traces-local-root-span");

  public void begin() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span parentSpan = tracer.spanBuilder("begin").startSpan();
    try (Scope scope = parentSpan.makeCurrent()) {
      createChildSpan();
    } finally {
      parentSpan.end();
    }
  }

  private void createChildSpan() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span childSpan = tracer.spanBuilder("child-span").startSpan();
    try {
      Span rootSpan = Context.current().get(CONTEXT_KEY);
        if (null != rootSpan) {
          rootSpan.setAttribute("my-attribute", "my-attribute-value");
          rootSpan.setStatus(StatusCode.ERROR, "Some error details...");
        }
    } finally {
      childSpan.end();
    }
  }

}
```

## Adding spans {% #adding-spans-java %}

If you aren't using a [supported framework instrumentation][101], or you would like additional depth in your application's [traces][102], you may want to add custom instrumentation to your code for complete flame graphs or to measure execution times for pieces of code.

If modifying application code is not possible, use the environment variable `dd.trace.methods` to detail these methods.

If you have existing `@Trace` or similar annotations, or prefer to use annotations to complete any incomplete traces within Datadog, use Trace Annotations.

### Trace annotations {% #trace-annotations-java %}

Add `@WithSpan` to methods to have them be traced when running OpenTelemetry and the `dd-java-agent.jar`. If the Agent is not attached, this annotation has no effect on your application.

OpenTelemetry's `@WithSpan` annotation is provided by the `opentelemetry-instrumentation-annotations` dependency.

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;

public class SessionManager {

  @WithSpan
  public static void saveSession() {
    // your method implementation here
  }
}
```

### Manually creating a new span {% #manually-creating-span-java %}

To manually create new spans within the current trace context:

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;

public class Example {

  public void doSomething() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span span = tracer.spanBuilder("my-resource").startSpan();
    try (Scope scope = span.makeCurrent()) {
      // do some work
    } catch (Throwable t) {
      span.recordException(t);
      throw t;
    } finally {
      span.end();
    }
  }
}
```

## Adding span events {% #adding-span-events-java %}

{% alert level="info" %}
Adding span events requires SDK version 1.40.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Key-value pairs where the key is a non-empty string and the value is a primitive type or a homogeneous array of primitive values.
- **Timestamp** [_optional_]: A UNIX timestamp representing the event's occurrence time. Expects an `Instant` object.

```java
Attributes eventAttributes = Attributes.builder()
    .put(AttributeKey.longKey("int_val"), 1L)
    .put(AttributeKey.stringKey("string_val"), "two")
    .put(AttributeKey.longArrayKey("int_array"), Arrays.asList(3L, 4L))
    .put(AttributeKey.stringArrayKey("string_array"), Arrays.asList("5", "6"))
    .put(AttributeKey.booleanArrayKey("bool_array"), Arrays.asList(true, false))
    .build();

span.addEvent("Event With No Attributes");
span.addEvent("Event With Some Attributes", eventAttributes);
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-java %}

To record exceptions, use the `recordException` API:

```java
span.recordException(new Exception("Error Message"));
span.recordException(new Exception("Error Message"),
    Attributes.builder().put(AttributeKey.stringKey("status"), "failed").build());
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Trace client and Agent configuration {% #trace-client-agent-config-java %}

Both the tracing client and Datadog Agent offer additional configuration options for context propagation. You can also exclude specific resources from sending traces to Datadog if you don't want those traces to be included in calculated metrics, such as traces related to health checks.

### Propagating context with headers extraction and injection {% #propagating-context-java %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][105] for information.

### Resource filtering {% #resource-filtering-java %}

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][106] page or in [Ignoring Unwanted Resources][107].

{% /if %}
<!-- END JAVA TRACES -->

<!-- PYTHON TRACES -->
{% if equals($prog_lang, "python") %}

## Setup {% #setup-python %}

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Python Setup Instructions][110].

2. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

### Creating custom spans {% #creating-custom-spans-python %}

To create custom spans within an existing trace context:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # Perform the work that you want to track with the span
        print("Doing work...")
        # When the 'with' block ends, the span is automatically closed
```

## Accessing active spans {% #accessing-active-spans-python %}

To access the currently active span, use the `get_current_span()` function:

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# enrich 'current_span' with information
```

## Adding span tags {% #adding-span-tags-python %}

Add attributes to a span to provide additional context or metadata:

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## Adding span events {% #adding-span-events-python %}

{% alert level="info" %}
Adding span events requires SDK version 2.9.0 or higher.
{% /alert %}

You can add span events using the `add_event` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters.

```python
span.add_event("Event With No Attributes")
span.add_event("Event With Some Attributes", {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [True, False]})
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-python %}

To record exceptions, use the `record_exception` API:

```python
span.record_exception(Exception("Error Message"))
span.record_exception(Exception("Error Message"), {"status": "failed"})
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

{% /if %}
<!-- END PYTHON TRACES -->

<!-- NODE.JS TRACES -->
{% if equals($prog_lang, "node_js") %}

## Setup {% #setup-nodejs %}

To instrument your application, initialize the Datadog tracer (`dd-trace`) and explicitly register its `TracerProvider` with the OpenTelemetry API. This ensures all OpenTelemetry calls are routed through Datadog.

1. **Add the dependencies**:
   ```sh
   npm install dd-trace @opentelemetry/api
   ```

2. **Initialize and register the tracer** in your application's entry file (for example, `index.js`), before any other imports:

### Complete example {% #complete-example-nodejs %}

```javascript
// 1. Import the dd-trace library (do not initialize it yet)
const ddtrace = require('dd-trace');

// 2. Initialize the Datadog tracer. This must be the first operation.
const tracer = ddtrace.init({
  // service: 'my-nodejs-app'
  // ... other Datadog configurations
});

// 3. Create and register Datadog's TracerProvider.
const provider = new tracer.TracerProvider();
provider.register(); // This wires the @opentelemetry/api to Datadog

// 4. Import and use the OpenTelemetry API
const otel = require('@opentelemetry/api');
const otelTracer = otel.trace.getTracer(
  'my-custom-instrumentation' // A name for your specific instrumentation
);

// You can now use 'otelTracer' to create spans throughout your application.
```

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [integration instrumentation][120] and [OpenTelemetry automatic instrumentation][121].

## Adding span tags {% #adding-span-tags-nodejs %}

Add custom attributes to your spans to provide additional context:

```javascript
function processData(i, param1, param2) {
  return otelTracer.startActiveSpan(`processData:${i}`, (span) => {
    const result = someOperation(param1, param2);

    // Add an attribute to the span
    span.setAttribute('app.processedData', result.toString());
    span.end();
    return result;
    });
}
```

## Creating spans {% #creating-spans-nodejs %}

To create a new span and properly close it, use the `startActiveSpan` method:

```javascript
function performTask(iterations, param1, param2) {
  // Create a span. A span must be closed.
  return otelTracer.startActiveSpan('performTask', (span) => {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(processData(i, param1, param2));
    }
    // Be sure to end the span!
    span.end();
    return results;
  });
}
```

## Adding span events {% #adding-span-events-nodejs %}

{% alert level="info" %}
Adding span events requires SDK version 5.17.0/4.41.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API:

```javascript
span.addEvent('Event With No Attributes')
span.addEvent('Event With Some Attributes', {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [true, false]})
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-nodejs %}

To record exceptions, use the `recordException` API:

```javascript
span.recordException(new TestError())
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Filtering requests {% #filtering-requests-nodejs %}

In some cases, you may want to exclude certain requests from being instrumented, such as health checks or synthetic traffic. You can use the `blocklist` or `allowlist` option on the `http` plugin to ignore these requests.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

You can also split the configuration between client and server if needed:

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

Additionally, you can exclude traces based on their resource name to prevent the Agent from sending them to Datadog. For more information on security and fine-tuning Agent configurations, read the [Security][106] or [Ignoring Unwanted Resources][107] documentation.

{% /if %}
<!-- END NODE.JS TRACES -->

<!-- GO TRACES -->
{% if equals($prog_lang, "go") %}

## Imports {% #imports-go %}

Import the following packages to setup the Datadog trace provider:

```go
import (
	"context"
	"log"
	"os"

   "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)
```

## Setup {% #setup-go %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your Go code following the [OpenTelemetry Go Manual Instrumentation documentation][130]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the OpenTelemetry package:
   ```shell
   go get go.opentelemetry.io/otel
   ```

3. Install the Datadog OpenTelemetry wrapper package:
   ```shell
   go get github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry
   ```

4. Import packages:
   ```go
   import (
      "go.opentelemetry.io/otel"
      ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
   )
   ```

5. Create a TracerProvider and defer the Shutdown method:
   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

6. Set the global TracerProvider:
   ```go
   otel.SetTracerProvider(provider)
   ```

7. Run your application.

## Adding span tags {% #adding-span-tags-go %}

Add custom tags to your spans to attach additional metadata and context:

```go
// Start a span.
ctx, span := t.Start(ctx, "read.file")
// Set an attribute, or a tag in Datadog terminology, on a span.
span.SetAttributes(attribute.String(ext.ResourceName, "test.json"))
```

### Adding tags globally to all spans {% #adding-tags-globally-go %}

Add tags to all spans by configuring the tracer with the `WithGlobalTag` option:

```go
provider := ddotel.NewTracerProvider(
	ddtracer.WithGlobalTag("datacenter", "us-1"),
	ddtracer.WithGlobalTag("env", "dev"),
)
defer provider.Shutdown()

otel.SetTracerProvider(provider)
t := otel.Tracer("")
```

### Setting errors on a span {% #setting-errors-go %}

To set an error on a span:

```go
// Start a span.
ctx, span := t.Start(context.Background(), "spanName")

// Set an error on a span with 'span.SetAttributes'.
span.SetAttributes(attribute.String(ext.ErrorMsg, "errorMsg"))

// Alternatively, set an error via end span options.
EndOptions(span, tracer.WithError(errors.New("myErr")))
span.End()
```

## Adding spans {% #adding-spans-go %}

Unlike other Datadog tracing libraries, when tracing Go applications, Datadog recommends that you explicitly manage and pass the Go context of your spans.

```go
ctx, span := t.Start(
	ddotel.ContextWithStartOptions(context.Background(), ddtracer.Measured()), "span_name")

span.End()
```

## Adding span events {% #adding-span-events-go %}

{% alert level="info" %}
Adding span events requires SDK version 1.67.0 or higher.
{% /alert %}

You can add span events using the `AddEvent` API:

```go
ctx, span := tracer.StartSpan(context.Background(), "span_name")
span.AddEvent("Event With No Attributes")
span.AddEvent("Event With Some Attributes", oteltrace.WithAttributes(attribute.Int("int_val", 1), attribute.String("string_val", "two")))
span.Finish()
```

Read the [OpenTelemetry specification for adding events][103] for more information.

## Trace client and Agent configuration {% #trace-client-agent-config-go %}

### Propagating context with headers extraction and injection {% #propagating-context-go %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][105] for information.

### Resource filtering {% #resource-filtering-go %}

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][106] page.

{% /if %}
<!-- END GO TRACES -->

<!-- RUBY TRACES -->
{% if equals($prog_lang, "ruby") %}

## Requirements and limitations {% #requirements-limitations-ruby %}

- Datadog Ruby tracing library `dd-trace-rb` version 1.9.0 or greater.
- Gem version support 1.1.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|--------------------------------------|
| OpenTelemetry Context propagation         | Datadog and W3C Trace Context header formats are enabled by default. |
| Span processors                  | Unsupported                                          |
| Span Exporters                   | Unsupported                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` is set to the same object as `Datadog.logger`. Configure through custom logging. |
| Trace/span ID generators         | ID generation is performed by the tracing library, with support for 128-bit trace IDs.     |

## Configuring OpenTelemetry to use the Datadog tracing library {% #setup-ruby %}

1. Add your desired manual OpenTelemetry instrumentation to your Ruby code following the [OpenTelemetry Ruby Manual Instrumentation documentation][140]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Add the `datadog` gem to your Gemfile:
    ```ruby
    source 'https://rubygems.org'
    gem 'datadog' # For dd-trace-rb v1.x, use the `ddtrace` gem.
    ```

3. Install the gem by running `bundle install`.

4. Add the following lines to your OpenTelemetry configuration file:
    ```ruby
    require 'opentelemetry/sdk'
    require 'datadog/opentelemetry'
    ```

5. Add a configuration block to your application:
    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [integration instrumentation][141] and [OpenTelemetry Automatic instrumentation][142] also.

## Adding span events {% #adding-span-events-ruby %}

{% alert level="info" %}
Adding span events requires SDK version 2.3.0 or higher.
{% /alert %}

You can add span events using the `add_event` API:

```ruby
span.add_event('Event With No Attributes')
span.add_event(
  'Event With All Attributes',
  attributes: { 'int_val' => 1, 'string_val' => 'two', 'int_array' => [3, 4], 'string_array' => ['5', '6'], 'bool_array' => [false, true]}
)
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-ruby %}

To record exceptions, use the `record_exception` API:

```ruby
span.record_exception(
  StandardError.new('Error Message')
)
span.record_exception(
  StandardError.new('Error Message'),
  attributes: { 'status' => 'failed' }
)
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

{% /if %}
<!-- END RUBY TRACES -->

<!-- .NET TRACES -->
{% if equals($prog_lang, "dot_net") %}

## Setup {% #setup-dotnet %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your .NET code following the [OpenTelemetry .NET Manual Instrumentation documentation][150]. **Note**: Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the Datadog .NET tracing library and enable the tracer for your [.NET Framework service][151] or your [.NET Core (and .NET 5+) service][152]. You can optionally do this with [Single Step APM Instrumentation][153].

3. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

4. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [OpenTelemetry instrumentation libraries][154].

## Creating custom spans {% #creating-custom-spans-dotnet %}

To manually create spans that start a new, independent trace:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

// Start a new span
using (Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
  activity?.SetTag("operation.name", "custom-operation");
  // Do something
}
```

## Creating spans {% #creating-spans-dotnet %}

To create custom spans within an existing trace context:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

using (Activity? parentScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
   parentScope?.SetTag("operation.name", "manual.sortorders");
   using (Activity? childScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
   {
       childScope?.SetTag("operation.name", "manual.sortorders.child");
       SortOrders();
   }
}
```

## Adding span tags {% #adding-span-tags-dotnet %}

Add custom tags to your spans to provide additional context:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

public class ShoppingCartController : Controller
{
    [HttpGet]
    public IActionResult Index(int customerId)
    {
      Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>")

      // Add a tag to the span for use in the Datadog web UI
      activity?.SetTag("customer.id", customerId.ToString());

      var cart = _shoppingCartRepository.Get(customerId);
      return View(cart);
    }
}
```

## Setting errors on spans {% #setting-errors-dotnet %}

Set error information on a span when an error occurs during its execution:

```csharp
try
{
    // do work that can throw an exception
}
catch(Exception e)
{
    activity?.SetTag("error", 1);
    activity?.SetTag("error.message", exception.Message);
    activity?.SetTag("error.stack", exception.ToString());
    activity?.SetTag("error.type", exception.GetType().ToString());
}
```

## Adding span events {% #adding-span-events-dotnet %}

{% alert level="info" %}
Adding span events requires SDK version 2.53.0 or higher.
{% /alert %}

You can add span events using the `AddEvent` API:

```csharp
var eventTags = new ActivityTagsCollection
{
    { "int_val", 1 },
    { "string_val", "two" },
    { "int_array", new int[] { 3, 4 } },
    { "string_array", new string[] { "5", "6" } },
    { "bool_array", new bool[] { true, false } }
};

activity.AddEvent(new ActivityEvent("Event With No Attributes"));
activity.AddEvent(new ActivityEvent("Event With Some Attributes", DateTimeOffset.Now, eventTags));
```

Read the [OpenTelemetry specification for adding events][103] for more information.

## Propagating context with headers extraction and injection {% #propagating-context-dotnet %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][105] for information.

{% /if %}
<!-- END .NET TRACES -->

<!-- PHP TRACES -->
{% if equals($prog_lang, "php") %}

## Setup {% #setup-php %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Install [OpenTelemetry API packages][160]:
   ```php
   composer require open-telemetry/sdk
   ```

2. Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation][161].

3. Install the [Datadog PHP tracing library][162].

4. Set `DD_TRACE_OTEL_ENABLED` to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Adding span tags {% #adding-span-tags-php %}

You can add attributes at the exact moment as you are starting the span:

```php
$span = $tracer->spanBuilder('mySpan')
    ->setAttribute('key', 'value')
    ->startSpan();
```

Or while the span is active:

```php
$activeSpan = OpenTelemetry\API\Trace\Span::getCurrent();
$activeSpan->setAttribute('key', 'value');
```

## Setting errors on a span {% #setting-errors-php %}

Exception information is captured and attached to a span if one is active when the exception is raised:

```php
// Create a span
$span = $tracer->spanBuilder('mySpan')->startSpan();

throw new \Exception('Oops!');

// 'mySpan' will be flagged as erroneous and have
// the stack trace and exception message attached as tags
```

Flagging a trace as erroneous can also be done manually:

```php
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\Context\Context;

try {
    throw new \Exception('Oops!');
} catch (\Exception $e) {
    $rootSpan = Span::fromContext(Context::getRoot());
    $rootSpan->recordException($e);
}
```

## Adding spans {% #adding-spans-php %}

To add a span:

```php
// Get a tracer or use an existing one
$tracerProvider = \OpenTelemetry\API\Globals::tracerProvider();
$tracer = $tracerProvider->getTracer('datadog')

// Create a span
$span = $tracer->spanBuilder('mySpan')->startSpan();

// ... do stuff

// Close the span
$span->end();
```

## Adding span events {% #adding-span-events-php %}

{% alert level="info" %}
Adding span events requires SDK version 1.3.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API:

```php
$span->addEvent("Event With No Attributes");
$span->addEvent(
    "Event With Some Attributes",
    [
        'int_val' => 1,
        'string_val' => "two",
        'int_array' => [3, 4],
        'string_array' => ["5", "6"],
        'bool_array' => [true, false]
    ]
);
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-php %}

To record exceptions, use the `recordException` API:

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Accessing active spans {% #accessing-active-spans-php %}

To access the currently active span:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

{% /if %}
<!-- END PHP TRACES -->

<!-- RUST TRACES -->
{% if equals($prog_lang, "rust") %}

{% alert level="info" %}
The Datadog Rust SDK is in Preview.
{% /alert %}

Datadog provides support for custom instrumentation in Rust applications through the [`datadog-opentelemetry` crate][170]. This library is built on the OpenTelemetry (OTel) API and SDK, providing a tracer that includes Datadog-specific features and an exporter.

Because this library is built on OpenTelemetry, you use the standard OpenTelemetry API to create traces and spans.

## Setup {% #setup-rust %}

To configure your Rust application to send OpenTelemetry traces to Datadog:

### 1. Add dependencies {% #add-dependencies-rust %}

Add `datadog-opentelemetry` and the core `opentelemetry` crate to your `Cargo.toml`:

```shell
cargo add datadog-opentelemetry opentelemetry
```

### 2. Initialize the Tracer {% #initialize-tracer-rust %}

In your application's main function, initialize the Datadog tracer provider:

{% alert level="info" %}
You must shut down the provider before your application exits to ensure all pending traces are flushed.
{% /alert %}

```rust
use datadog_opentelemetry;
use opentelemetry::{global, trace::Tracer};
use std::time::Duration;

fn main() {
    // This picks up env var configuration (like DD_SERVICE)
    // and initializes the global tracer provider
    let tracer_provider = datadog_opentelemetry::tracing()
        .init();

    // --- Your application code starts here ---
    let tracer = global::tracer("my-component");

    tracer.in_span("my-operation", |_cx| {
        // ... do work ...
    });

    println!("Doing work...");

    // --- Your application code ends here ---

    // Shut down the tracer provider to flush remaining spans
    tracer_provider.shutdown_with_timeout(Duration::from_secs(5)).expect("tracer shutdown error");
}
```

### 3. Ensure Agent is running {% #ensure-agent-rust %}

The Datadog exporter sends traces to the Datadog Agent, which must be running and accessible.

## Configuration {% #configuration-rust %}

The Datadog Rust SDK is configured using environment variables. For a complete list of options, see the [Configuration documentation][171].

## Examples {% #examples-rust %}

### Get a Tracer {% #get-tracer-rust %}

Get an instance of a `Tracer` from the global provider:

```rust
use opentelemetry::global;

let tracer = global::tracer("my-component");
```

### Create a span {% #create-span-rust %}

Use `tracer.in_span` to create a new span. The span is automatically ended when the closure finishes:

```rust
use opentelemetry::{global, trace::Tracer};

fn do_work() {
    let tracer = global::tracer("my-component");

    tracer.in_span("operation_name", |_cx| {
        // The span is active within this closure
        println!("Doing work...");
    });
}
```

### Create a child span {% #create-child-span-rust %}

To create a child span, nest `in_span` calls:

```rust
use opentelemetry::{global, trace::Tracer};

fn parent_operation() {
    let tracer = global::tracer("my-component");

    tracer.in_span("parent_operation", |_cx| {
        tracer.in_span("child_operation", |_cx| {
            // This span is automatically parented to "parent_operation"
            println!("Doing child work...");
        });
        println!("Doing parent work...");
    });
}
```

### Add span tags {% #add-span-tags-rust %}

Add attributes to a span using the `set_attribute` method:

```rust
use opentelemetry::trace::{Tracer, TraceContextExt};
use opentelemetry::KeyValue;

fn add_tags_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.tags", |cx| {
        let span = cx.span();

        span.set_attribute(KeyValue::new("customer.id", "12345"));
        span.set_attribute(KeyValue::new("http.method", "GET"));
    });
}
```

### Add span events {% #add-span-events-rust %}

Add time-stamped log messages to a span using the `add_event` method:

```rust
use opentelemetry::trace::{Tracer, TraceContextExt};
use opentelemetry::KeyValue;

fn add_events_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.events", |cx| {
        let span = cx.span();

        span.add_event("Data received", vec![]);
        span.add_event(
            "Processing data",
            vec![
                KeyValue::new("data.size_bytes", 1024),
                KeyValue::new("data.format", "json"),
            ],
        );
    });
}
```

## Context propagation {% #context-propagation-rust %}

Because Rust does not have automatic instrumentation, you must manually propagate the trace context when making or receiving remote calls to connect traces across services.

For more information, see [Trace Context Propagation][172].

{% /if %}
<!-- END RUST TRACES -->

{% /if %}
<!-- END TRACES CONTENT -->

<!-- ============================================== -->
<!-- METRICS CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "metrics") %}

<!-- Show content only for languages that support metrics -->
{% if or(or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")), or(equals($prog_lang, "python"), equals($prog_lang, "ruby"))) %}

## Overview

Use the OpenTelemetry Metrics API with Datadog SDKs to send custom application metrics. This is an alternative to [DogStatsD][200].

<!-- Native implementation (.NET, Node.js) -->
{% if or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")) %}

The Datadog SDK provides a native implementation of the OpenTelemetry API. This means you can write code against the standard OTel interfaces without needing the official OpenTelemetry SDK.

{% alert level="info" %}
You should not install the official OpenTelemetry SDK or any OTLP Exporter packages. The Datadog SDK provides this functionality. Installing both can lead to runtime conflicts and duplicate data.
{% /alert %}
{% /if %}

<!-- Exporter-based implementation (Python, Ruby) -->
{% if or(equals($prog_lang, "python"), equals($prog_lang, "ruby")) %}

This approach works with the existing OpenTelemetry SDK. When you enable this feature, the Datadog SDK detects the OTel SDK and configures its OTLP exporter to send metrics to the Datadog Agent.
{% /if %}

## Prerequisites

{% if equals($prog_lang, "dot_net") %}
- **.NET Runtime**: Requires .NET 6+ (or `System.Diagnostics.DiagnosticSource` v6.0.0+). See [Version and instrument support](#net-version-and-instrument-support) for a list of supported instruments by version.
- **Datadog SDK**: dd-trace-dotnet version 3.30.0 or later.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- **Datadog SDK**: `dd-trace-js` version 5.81.0 or later.
- **OpenTelemetry API**: `@opentelemetry/api` version 1.0.0 to 1.10.0. (The Datadog SDK provides the implementation for this API).
{% /if %}
{% if equals($prog_lang, "python") %}
- **Datadog SDK**: dd-trace-py version 3.18.0 or later.
{% /if %}
{% if equals($prog_lang, "ruby") %}
{% alert level="info" %}
The OpenTelemetry Metrics SDK for Ruby is currently in [alpha implementation](https://github.com/open-telemetry/opentelemetry-ruby/tree/main/metrics_sdk). Report issues with the SDK at [opentelemetry-ruby/issues](https://github.com/open-telemetry/opentelemetry-ruby/issues).
{% /alert %}
- **Datadog SDK**: `datadog` gem version 2.23.0 or later.
{% /if %}
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel metrics.
- **DogStatsD (Runtime Metrics)**: If you also use Datadog [Runtime Metrics][201], ensure the Datadog Agent is listening for DogStatsD traffic on port 8125 (UDP). OTel configuration does not route Runtime Metrics through OTLP.

## Setup

Follow these steps to enable OTel Metrics API support in your application.

{% if equals($prog_lang, "dot_net") %}
1. Install the Datadog SDK. Follow the installation steps for your runtime:
   - [.NET Framework][202]
   - [.NET Core][203]
2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Install the Datadog SDK:
   ```sh
   npm install dd-trace
   ```
2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
3. Instrument your application:
   ```javascript
   // On application start
   require('dd-trace').init();
   ```
{% /if %}

{% if equals($prog_lang, "python") %}
1. Install the Datadog SDK:
   ```sh
   pip install ddtrace
   ```
2. Install the OTel SDK and Exporter:
   ```sh
   pip install opentelemetry-sdk opentelemetry-exporter-otlp
   ```
3. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. Instrument your application:
   ```py
   ddtrace-run python my_app.py
   ```
{% /if %}

{% if equals($prog_lang, "ruby") %}
1. Add the Datadog SDK and OTel gems:
   ```ruby
   # Add to your Gemfile
   gem 'datadog', '~> 2.23.0'
   gem 'opentelemetry-metrics-sdk', '~> 0.8'
   gem 'opentelemetry-exporter-otlp-metrics', '~> 0.4'
   ```
2. Install dependencies:
   ```sh
   bundle install
   ```
3. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. Configure your application:
   ```ruby
   require 'opentelemetry/sdk'
   require 'datadog/opentelemetry'

   Datadog.configure do |c|
     # Configure Datadog settings here
   end

   # Call after Datadog.configure to initialize metrics
   OpenTelemetry::SDK.configure
   ```
{% /if %}

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

{% if equals($prog_lang, "dot_net") %}
```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a counter instrument
Counter<long> requestsCounter = meter.CreateCounter<long>("http.requests_total");

// Perform work
// ...

// Record measurements
requestsCounter.Add(1, new("method", "GET"), new("status_code", "200"));
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
```javascript
const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('my-service', '1.0.0');

// Counter - monotonically increasing values
const requestCounter = meter.createCounter('http.requests', {
  description: 'Total HTTP requests',
  unit: 'requests'
});
requestCounter.add(1, { method: 'GET', status: 200 });
```
{% /if %}

{% if equals($prog_lang, "python") %}
```python
import os
os.environ["DD_METRICS_OTEL_ENABLED"] = "true"
import ddtrace.auto # This must be imported before opentelemetry
from opentelemetry import metrics

# ddtrace automatically configures the MeterProvider
meter = metrics.get_meter(__name__)

# Counter - monotonically increasing values
counter = meter.create_counter("http.requests_total")
counter.add(1, {"method": "GET", "status_code": "200"})
```
{% /if %}

{% if equals($prog_lang, "ruby") %}
```ruby
require 'opentelemetry/api'

# dd-trace-rb automatically configures the MeterProvider
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Counter - monotonically increasing values
counter = meter.create_counter('http.requests_total')
counter.add(1, attributes: { 'method' => 'GET', 'status_code' => '200' })
```
{% /if %}

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

{% if equals($prog_lang, "dot_net") %}
```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a histogram instrument
Histogram<double> responseTimeHistogram = meter.CreateHistogram<double>("http.response.time");

// Perform work
var watch = System.Diagnostics.Stopwatch.StartNew();
await Task.Delay(1_000);
watch.Stop();

// Record measurements
responseTimeHistogram.Record(watch.ElapsedMilliseconds, new("method", "GET"), new("status_code", "200"));
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
```javascript
const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('my-service', '1.0.0');

// Histogram - distribution of values
const durationHistogram = meter.createHistogram('http.duration', {
  description: 'HTTP request duration',
  unit: 'ms'
});
durationHistogram.record(145, { route: '/api/users' });
```
{% /if %}

{% if equals($prog_lang, "python") %}
```python
import os
os.environ["DD_METRICS_OTEL_ENABLED"] = "true"
import ddtrace.auto # This must be imported before opentelemetry
from opentelemetry import metrics
import time

# ddtrace automatically configures the MeterProvider
meter = metrics.get_meter(__name__)

# Histogram - distribution of values
histogram = meter.create_histogram(
    name="http.request_duration",
    description="HTTP request duration",
    unit="ms"
)

start_time = time.time()
# ... simulate work ...
time.sleep(0.05)
end_time = time.time()

duration = (end_time - start_time) * 1000 # convert to milliseconds
histogram.record(duration, {"method": "POST", "route": "/api/users"})
```
{% /if %}

{% if equals($prog_lang, "ruby") %}
```ruby
require 'opentelemetry/api'
require 'time'

# dd-trace-rb automatically configures the MeterProvider
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Histogram - distribution of values
histogram = meter.create_histogram('http.request_duration',
  description: 'HTTP request duration',
  unit: 'ms'
)

start_time = Time.now
# ... simulate work ...
sleep(0.05)
end_time = Time.now

duration = (end_time - start_time) * 1000 # convert to milliseconds
histogram.record(duration, attributes: { 'method' => 'POST', 'route' => '/api/users' })
```
{% /if %}

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][204].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

{% if equals($prog_lang, "dot_net") %}
1. Add the Datadog SDK (`dd-trace-dotnet`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OtlpExporter` for metrics. The Datadog SDK handles this configuration automatically.
3. Remove the `OpenTelemetry` and `OpenTelemetry.Exporter.OpenTelemetryProtocol` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Add the Datadog SDK (`dd-trace`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Remove the `@opentelemetry/sdk-node` and `@opentelemetry/exporter-otlp` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "python") %}
1. Add the Datadog SDK (`dd-trace-py`) to your project and enable its instrumentation (for example, `ddtrace-run`).
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "ruby") %}
1. Add the Datadog SDK (`datadog`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

{% alert level="warning" %}
Runtime and trace metrics continue to be submitted using StatsD. Only custom metrics created through the OpenTelemetry Metrics API are sent using OTLP. The `dd-trace-rb` implementation supports exporting OTLP metrics exclusively to a Datadog Agent or OpenTelemetry Collector. Multiple exporters are not supported.
{% /alert %}
{% /if %}

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

## Troubleshooting

- Ensure `DD_METRICS_OTEL_ENABLED` is set to `true`.
- Verify that your OTLP destination is configured correctly to receive metrics.
- If you are sending data to the Datadog Agent, ensure OTLP ingestion is enabled. See [Enabling OTLP Ingestion on the Datadog Agent][205] for details.
{% if equals($prog_lang, "dot_net") %}
- Verify Datadog automatic instrumentation is active. This feature relies on Datadog's automatic instrumentation to function. Ensure you have completed all setup steps to enable the .NET instrumentation hooks, as these are required to intercept the metric data.
- If, after removing the OpenTelemetry SDK packages, your application fails to compile due to missing APIs in the [System.Diagnostics.Metrics namespace][206], you must update your application by either adding a direct NuGet package reference to `System.Diagnostics.DiagnosticSource` or upgrading the version of .NET. See [.NET version and instrument support](#net-version-and-instrument-support) for more information.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- Verify `dd-trace` is initialized first. The Datadog SDK must be initialized at the top of your application, *before* any other modules are imported.
- Verify `@opentelemetry/api` is installed. The Node.js SDK requires this API package.
{% /if %}
{% if equals($prog_lang, "python") %}
- Verify `opentelemetry-sdk` is installed. The Python SDK requires `opentelemetry-sdk` and `opentelemetry-exporter-otlp` to be installed in your Python environment.
- Ensure `ddtrace-run` is active. Verify that you are running your application with `ddtrace-run` (or have imported and initialized `ddtrace` manually).
{% /if %}
{% if equals($prog_lang, "ruby") %}
- Verify required gems are installed. Ensure `opentelemetry-metrics-sdk` and `opentelemetry-exporter-otlp-metrics` are installed in your Ruby environment.
- Ensure `Datadog.configure` is called before `OpenTelemetry::SDK.configure`. The Datadog SDK must be configured first to properly set up the meter provider.
{% /if %}

{% if equals($prog_lang, "dot_net") %}
### .NET version and instrument support

Support for specific OpenTelemetry metric instruments is dependent on your .NET runtime version or the version of the `System.Diagnostics.DiagnosticSource` NuGet package you have installed.

Here is the minimum version required for each instrument type:

- **.NET 6+** (or `System.Diagnostics.DiagnosticSource` v6.0.0) supports:
  - `Counter`
  - `Histogram`
  - `ObservableCounter`
  - `ObservableGauge`

- **.NET 7+** (or `System.Diagnostics.DiagnosticSource` v7.0.0) supports:
  - `UpDownCounter`
  - `ObservableUpDownCounter`

- **.NET 9+** (or `System.Diagnostics.DiagnosticSource` v9.0.0) supports:
  - `Gauge`
{% /if %}

{% /if %}
<!-- End metrics support check -->

{% /if %}
<!-- END METRICS CONTENT -->

<!-- ============================================== -->
<!-- LOGS CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "logs") %}

<!-- Show content only for languages that support logs -->
{% if or(or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")), equals($prog_lang, "python")) %}

## Overview

Use the OpenTelemetry Logs API with Datadog SDKs to send custom application logs. This is an alternative to Datadog's traditional log injection.

<!-- Native implementation (.NET, Node.js) -->
{% if or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")) %}

The Datadog SDK provides a native implementation of the OpenTelemetry API. This means you can write code against the standard OTel interfaces without needing the official OpenTelemetry SDK.

{% alert level="info" %}
You should not install the official OpenTelemetry SDK or any OTLP Exporter packages. The Datadog SDK provides this functionality. Installing both can lead to runtime conflicts and duplicate data.
{% /alert %}
{% /if %}

<!-- Exporter-based implementation (Python) -->
{% if equals($prog_lang, "python") %}

This approach works with the existing OpenTelemetry SDK. When you enable this feature, the Datadog SDK detects the OTel SDK and configures its OTLP exporter to send logs to the Datadog Agent.
{% /if %}

## Prerequisites

{% if equals($prog_lang, "dot_net") %}
- **Datadog SDK**: `dd-trace-dotnet` version [3.31.0][301] or later.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- **Datadog SDK**: `dd-trace-js` version 5.73.0 or later.
- **OpenTelemetry Logs API**: The `@opentelemetry/api-logs` package is required, in a version from `v0.200.0` up to `v1.0`.

{% alert level="warning" %}
The `@opentelemetry/api-logs` package is still experimental, and version 1.0 has not yet been released. New versions of this package may introduce breaking changes that affect compatibility.

If you encounter an issue after upgrading `@opentelemetry/api-logs`, [open an issue in the `dd-trace-js` repository](https://github.com/DataDog/dd-trace-js/issues).
{% /alert %}
{% /if %}
{% if equals($prog_lang, "python") %}
- **Datadog SDK**: `dd-trace-py` version 3.18.0 or later.
{% /if %}
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel logs.

## Setup

Follow these steps to enable OTel Logs API support in your application.

{% if equals($prog_lang, "dot_net") %}
1. Install the Datadog SDK. Follow the installation steps for your runtime:
   - [.NET Framework][202]
   - [.NET Core][203]
2. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Install the Datadog SDK:
    ```sh
    npm install dd-trace
    ```
2. Install the OpenTelemetry Logs API package:
    ```sh
    npm install @opentelemetry/api-logs
    ```
3. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4. Initialize the Datadog SDK (`dd-trace`) at the beginning of your application, before any other modules are imported:
    ```javascript
    // This must be the first line of your application
    require('dd-trace').init()

    // Other imports can follow
    const { logs } = require('@opentelemetry/api-logs')
    const express = require('express')
    ```
{% /if %}

{% if equals($prog_lang, "python") %}
1. Install the Datadog SDK:
    ```sh
    pip install ddtrace
    ```
2. Install the OTel SDK and Exporter:
    ```sh
    pip install opentelemetry-sdk opentelemetry-exporter-otlp>=1.15.0
    ```
3. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4. Run your application using `ddtrace-run`:
    ```sh
    ddtrace-run python my_app.py
    ```
    When enabled, `ddtrace` automatically detects the OTel packages and configures the `OTLPLogExporter` to send logs to your OTLP destination.
{% /if %}

## Examples

{% if equals($prog_lang, "dot_net") %}
### Standard logging {% #standard-logging-dotnet %}

```csharp
using Microsoft.Extensions.Logging;

// For a Console application, manually create a logger factory
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Get a logger instance
var logger = loggerFactory.CreateLogger<Program>();

// This log will be exported via OTLP
logger.LogInformation("This is a standard log message.");
```

### Trace and log correlation {% #trace-log-correlation-dotnet %}

This example shows how logs emitted within an active Datadog span are automatically correlated. If you are using the OTel Tracing API or built-in .NET Activity API to create spans, ensure OTel Tracing API support is enabled by setting `DD_TRACE_OTEL_ENABLED=true`.

```csharp
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

// For a Console application, manually create a logger factory
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Get a logger instance
var logger = loggerFactory.CreateLogger<Program>();

// Create an activity source
var activitySource = new ActivitySource("MyService", "1.0.0");

// Start an activity (span)
using (var activity = activitySource.StartActivity("do.work"))
{
    // This log is automatically correlated with the 'do.work' span
    logger.LogInformation("This log is correlated to the active span.");
    await Task.Delay(TimeSpan.FromMilliseconds(100));
    logger.LogWarning("So is this one.");
}
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
### Emitting a log {% #emitting-log-nodejs %}

After the Datadog SDK is initialized, you can use the standard OpenTelemetry Logs API to get a logger and emit log records.

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const logger = logs.getLogger('my-service', '1.0.0')

// Emit a log record
logger.emit({
  severityText: 'INFO',
  severityNumber: 9,
  body: `User clicked the checkout button.`,
  attributes: {
    'cart.id': 'c-12345',
    'user.id': 'u-54321'
  }
})
```

### Trace and log correlation {% #trace-log-correlation-nodejs %}

Trace and log correlation is automatic. When you emit a log using the OTel Logs API within an active Datadog trace, the `trace_id` and `span_id` are automatically added to the log record.

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const express = require('express')

const app = express()
const logger = logs.getLogger('my-service', '1.0.0')

app.get('/api/users/:id', (req, res) => {
  // This log is automatically correlated with the 'express.request' span
  logger.emit({
    severityText: 'INFO',
    severityNumber: 9,
    body: `Processing user request for ID: ${req.params.id}`,
  })
  res.json({ id: req.params.id, name: 'John Doe' })
})

app.listen(3000)
```
{% /if %}

{% if equals($prog_lang, "python") %}
The Datadog SDK supports the OpenTelemetry Logs API for Python's built-in `logging` module. You do not need to change your existing logging code.

### Standard logging {% #standard-logging-python %}

This example shows a standard log message. With `DD_LOGS_OTEL_ENABLED=true`, this log is automatically captured, formatted as OTLP, and exported.

```python
import logging
import time

# Get a logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Add a handler to see logs in the console (optional)
handler = logging.StreamHandler()
logger.addHandler(handler)

# This log will be exported via OTLP
logger.info("This is a standard log message.")
```

### Trace and log correlation {% #trace-log-correlation-python %}

This example shows how logs emitted within an active Datadog span are automatically correlated.

```python
from ddtrace import tracer
import logging
import time

# Standard logging setup
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter('%(message)s'))
logger.addHandler(handler)

@tracer.wrap("do.work")
def do_work():
    # This log is automatically correlated with the 'do.work' span
    logger.info("This log is correlated to the active span.")
    time.sleep(0.1)
    logger.warning("So is this one.")

print("Starting work...")
do_work()
print("Work complete.")
```
{% /if %}

## Supported configuration

To enable this feature, you must set `DD_LOGS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and batch processor settings are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][204].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

{% if equals($prog_lang, "dot_net") %}
1. Add the Datadog SDK (`dd-trace-dotnet`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OtlpExporter` for logs. The Datadog SDK handles this configuration automatically.
3. Remove the `OpenTelemetry` and `OpenTelemetry.Exporter.OpenTelemetryProtocol` packages from your project's dependencies.
4. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Remove the OTel SDK and OTLP Exporter packages:
    ```sh
    npm uninstall @opentelemetry/sdk-logs @opentelemetry/exporter-otlp-logs
    ```
2. Remove all manual OTel SDK initialization code (for example, `new LoggerProvider()`, `addLogRecordProcessor()`, `new OTLPLogExporter()`).
3. Install the Datadog SDK: `npm install dd-trace`
4. Keep the `@opentelemetry/api-logs` package.
5. Set `DD_LOGS_OTEL_ENABLED=true` and initialize `dd-trace` at the top of your application.

Your existing code that uses `logs.getLogger()` will continue to work.
{% /if %}

{% if equals($prog_lang, "python") %}
1. Remove your manual setup code (for example, `LoggerProvider`, `BatchLogRecordProcessor`, and `OTLPLogExporter` instantiation).
2. Enable `ddtrace-run` auto-instrumentation for your application.
3. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.

The Datadog SDK will programmatically configure the OTel SDK for you.
{% /if %}

### Existing Datadog log injection

If you are using Datadog's traditional log injection (where `DD_LOGS_INJECTION=true` adds trace context to text logs) and an Agent to tail log files:

1. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
2. The Datadog SDK automatically disables the old log injection style (`DD_LOGS_INJECTION`) to prevent duplicate trace metadata in your logs. Trace correlation is handled by the structured OTLP payload.
3. Ensure your Datadog Agent is configured to receive OTLP logs (version 7.48.0 or greater is required)
4. Disable any file-based log collection for this service to avoid duplicate logs.

## Troubleshooting

- Ensure `DD_LOGS_OTEL_ENABLED` is set to `true`.
- Verify that your OTLP destination is configured correctly to receive logs.
- If you are sending data to the Datadog Agent, ensure OTLP ingestion is enabled. See [Enabling OTLP Ingestion on the Datadog Agent][205] for details.
{% if equals($prog_lang, "dot_net") %}
- Verify Datadog automatic instrumentation is active. This feature relies on Datadog's automatic instrumentation to function. Ensure you have completed all setup steps to enable the .NET instrumentation hooks, as these are required to intercept the log data.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- Verify `dd-trace` is initialized first. The Datadog SDK must be initialized at the top of your application, *before* any other modules are imported.
- Verify `@opentelemetry/api-logs` is installed. The Node.js SDK requires this API package.
{% /if %}
{% if equals($prog_lang, "python") %}
- Verify `opentelemetry-sdk` is installed. The Python SDK requires `opentelemetry-sdk` and `opentelemetry-exporter-otlp` to be installed in your Python environment.
- Ensure `ddtrace-run` is active. Verify that you are running your application with `ddtrace-run` (or have imported and initialized `ddtrace` manually).
{% /if %}

{% /if %}
<!-- End logs support check -->

{% /if %}
<!-- END LOGS CONTENT -->

<!-- ============================================== -->
<!-- GLOBAL LINK REFERENCES -->
<!-- ============================================== -->

[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /tracing/trace_collection/otel_instrumentation/
[7]: /opentelemetry/setup/collector_exporter/
[8]: /opentelemetry/compatibility/#feature-compatibility

<!-- Java traces -->
[100]: /tracing/setup/java/
[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[102]: /tracing/glossary/#trace
[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[105]: /tracing/trace_collection/trace_context_propagation/
[106]: /tracing/security
[107]: /tracing/guide/ignoring_apm_resources/

<!-- Python traces -->
[110]: /tracing/setup/python/

<!-- Node.js traces -->
[120]: /tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[121]: https://opentelemetry.io/docs/instrumentation/js/automatic/

<!-- Go traces -->
[130]: https://opentelemetry.io/docs/instrumentation/go/manual/

<!-- Ruby traces -->
[140]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[141]: /tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[142]: https://opentelemetry.io/docs/languages/ruby/libraries/

<!-- .NET traces -->
[150]: https://opentelemetry.io/docs/instrumentation/net/manual/
[151]: /tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[152]: /tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[153]: /tracing/trace_collection/single-step-apm/
[154]: https://opentelemetry.io/docs/instrumentation/net/libraries/

<!-- PHP traces -->
[160]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[161]: https://opentelemetry.io/docs/instrumentation/php/manual/
[162]: /tracing/trace_collection/dd_libraries/php#getting-started

<!-- Rust traces -->
[170]: https://crates.io/crates/datadog-opentelemetry
[171]: /tracing/trace_collection/library_config/rust
[172]: /tracing/trace_collection/trace_context_propagation/?tab=rust

<!-- Metrics and logs shared -->
[200]: /developers/dogstatsd/
[201]: /tracing/metrics/runtime_metrics/
[202]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer
[203]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer
[204]: /opentelemetry/config/environment_variable_support
[205]: /opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent
[206]: https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.metrics

<!-- .NET logs -->
[301]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.31.0
