---
title: Open Standards
kind: documentation
description: "Get Started with Datadog APM using Open Tracing or Open Telemetry"
---

Get started with Open Standards

{{< programming-lang-wrapper langs="java,python,ruby,c++,go,nodejs,.NET,php" >}}

{{< programming-lang lang="java" >}}

## OpenTracing

Datadog integrates seamlessly with the [OpenTracing API][1].

### Setup

For Maven, add this to `pom.xml`:
```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.32.0</version>
</dependency>

<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.32.0</version>
</dependency>

<!-- Datadog API -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>

<!-- Datadog OpenTracing bridge (only needed if you do not use dd-java-agent for autoinstrumentation) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

For Gradle, add:

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.32.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.32.0"
compile group: 'com.datadoghq', name: 'dd-trace-api', version: "${dd-trace-java.version}"
// Datadog OpenTracing bridge (only needed if you do not use dd-java-agent for autoinstrumentation)
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configure your application using environment variables or system properties as discussed in the configuration section.

If you’re not using autoinstrumentation, you must register a configured tracer with `GlobalTracer`. For this, call `GlobalTracer.register(DDTracer.builder().build())` early on in your application startup (for example, main method).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {
    public static void main(String[] args) {
        DDTracer tracer = DDTracer.builder().build();
        GlobalTracer.register(tracer);
        // register the same tracer with the Datadog API
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);
    }
}
```

Aside from environment variables and system properties, there are additional configuration options as part of the `DDTracer.Builder` interface.  Consult the [Javadoc][2] for a full listing.


### Asynchronous traces

An asynchronous trace is when a span is started in one thread and finished in another. To instrument this behavior, a new scope must be used in each thread the span is active.
```java
// Step 1: start the Scope/Span on the work submission thread
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("ServicehandlerSpan").start();

try (final Scope scope = tracer.activateSpan(span)) {
    // submission thread impl...

    submitAsyncTask(new Runnable() {
        @Override
        public void run() {
            // Step 2: reactivate the Span in the worker thread
            try (final Scope scope = tracer.activateSpan(span)) {
              // worker thread impl
            } finally {
              // Step 3: Finish Span when work is complete
              span.finish();
            }
       }
    });
}
```

### Inject & Extract context for Distributed Tracing

Create a distributed trace using manual instrumentation with OpenTracing:

```java
// Step 1: Inject the Datadog headers in the client code
Span span = tracer.buildSpan("httpClientSpan").start();
try (Scope scope = tracer.activate(span)) {
    HttpRequest request = /* your code here */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // http request impl...
} finally {
    span.finish();
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

// is a child of http client span in step 1
Span span = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).start();
try (Scope scope = tracer.activateSpan(span)) {
    // http server impl...
} finally {
    span.finish();
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

Notice the above examples only use the OpenTracing classes. Check the [OpenTracing API][2] for more details and information.


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

## OpenTracing

OpenTracing support is included in the `ddtrace` package. Use `pip` to install the required `opentracing` package:

```sh
pip install ddtrace[opentracing]
```

The OpenTracing convention for initializing a tracer is to define an initialization method that configures and instantiates a new tracer and overwrites the global `opentracing.tracer` reference:

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      "agent_hostname": "localhost",
      "agent_port": 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span("<OPERATION_NAME>")
  span.set_tag("<TAG_KEY>", "<TAG_VALUE>")
  time.sleep(0.05)
  span.finish()

init_tracer("<SERVICE_NAME>")
my_operation()
```

The tracer can now be used like in any other OpenTracing application. See [opentracing.io][3] for OpenTracing Python usage.

## OpenTelemetry

OpenTelemetry support is available by using the `opentelemetry-ext-datadog` package to export traces from OpenTelemetry to Datadog.

<div class="alert alert-warning">
This feature is currently in beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

### Installation

To install:

```python
pip install opentelemetry-ext-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```python
from opentelemetry import trace
from opentelemetry.ext.datadog import (
    DatadogExportSpanProcessor,
    DatadogSpanExporter,
)
from opentelemetry.sdk.trace import TracerProvider

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

exporter = DatadogSpanExporter(
    agent_url="http://localhost:8126", service="example"
)

span_processor = DatadogExportSpanProcessor(exporter)
trace.get_tracer_provider().add_span_processor(span_processor)


with tracer.start_as_current_span("foo"):
    with tracer.start_as_current_span("bar"):
        with tracer.start_as_current_span("baz"):
            print("Hello world from OpenTelemetry Python!")
```

### Configuration Options

The Datadog Agent URL and span tag values can be configured if necessary or desired based upon your environment and Agent location.

#### Datadog Agent URL

By default, the OpenTelemetry Datadog Exporter transmits traces to `http://localhost:8126`. Send traces to a different URL by configuring the following environment variables:

- `DD_TRACE_AGENT_URL`: The `<host>:<port>` where Datadog Agent listens for traces. For example, `agent-host:8126`.

You can override these values at the trace exporter level:

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126", service="example"
)
```

#### Tagging

Configure the application to automatically tag your Datadog exported traces by setting the following environment variables:

- `DD_ENV`: Your application environment, for example, `production`, `staging`.
- `DD_SERVICE`: Your application's default service name, for example, `billing-api`.
- `DD_VERSION`: Your application version, for example, `2.5`, `202003181415`, or `1.3-alpha`.
- `DD_TAGS`: Custom tags in value pairs, separated by commas, for example, `layer:api,team:intake`.
- If `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` is set, it will override any corresponding `env`, `service`, or `version` tag defined in `DD_TAGS`.
- If `DD_ENV`, `DD_SERVICE` and `DD_VERSION` are _not_ set, you can configure environment, service, and version by using corresponding tags in `DD_TAGS`.

Tag values can also be overridden at the trace exporter level. This lets you set values on a per-application basis, so you can have multiple applications reporting for different environments on the same host:

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126",
    service="example",
    env='prod',
    version='1.5-alpha',
    tags='team:ops,region:west'
)

```

Tags that are set directly on individual spans supersede conflicting tags defined at the application level.

### OpenTelemetry Links

- See [github][4], [opentelemetry examples][5], or [readthedocs][6] for more OpenTelemetry Python Datadog Exporter usage.




{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

## OpenTracing

To set up Datadog with OpenTracing, see the Ruby [Quickstart for OpenTracing][7] for details.

### Configuring Datadog tracer settings

The underlying Datadog tracer can be configured by passing options (which match `Datadog::Tracer`) when configuring the global tracer:

```ruby
# Where `options` is a Hash of options provided to Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

It can also be configured by using `Datadog.configure` as described in the [Ruby tracer settings][8] section.

### Activating and configuring integrations

By default, configuring OpenTracing with Datadog does not automatically activate any additional instrumentation provided by Datadog. You will only receive [spans][9] and [traces][10] from OpenTracing instrumentation you have in your application.

However, additional instrumentation provided by Datadog can be activated alongside OpenTracing using `Datadog.configure`, which can be used to enhance your tracing further. To enable this, see [Ruby integration instrumentation][11] for more details.

### Supported serialization formats

| Type                           | Supported? | Additional information                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Yes        | Because of the loss of resolution in the Rack format, note that baggage items with names containing either upper case characters or `-` are be converted to lower case and `_` in a round-trip, respectively. Datadog recommends avoiding these characters or accommodating accordingly on the receiving end. |
| `OpenTracing::FORMAT_BINARY`   | No         |                                                                                                                                                                                                                                                                                                               |

## OpenTelemetry

OpenTelemetry support is available by using the `opentelemetry-exporters-datadog` gem to export traces from OpenTelemetry to Datadog.

<div class="alert alert-warning">
This feature is currently in beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

### Installation

- If you use [bundler][12], include the following in your `Gemfile`:

```
gem 'opentelemetry-exporters-datadog'
gem 'opentelemetry-api', '~> 0.5'
gem 'opentelemetry-sdk', '~> 0.5'
```

- Or install the gems directly using:

```
gem install opentelemetry-api
gem install opentelemetry-sdk
gem install opentelemetry-exporters-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry-exporters-datadog'

# Configure the SDK with custom export
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service', agent_url: 'http://localhost:8126'
      )
    )
  )
end

# For propagation of Datadog-specific distributed tracing headers,
# set HTTP propagation to the Composite Propagator
OpenTelemetry::Exporters::Datadog::Propagator.auto_configure

# To start a trace, get a Tracer from the TracerProvider
tracer = OpenTelemetry.tracer_provider.tracer('my_app_or_gem', '0.1.0')

# create a span
tracer.in_span('foo') do |span|
  # set an attribute
  span.set_attribute('platform', 'osx')
  # add an event
  span.add_event(name: 'event in bar')
  # create bar as child of foo
  tracer.in_span('bar') do |child_span|
    # inspect the span
    pp child_span
  end
end
```

### Configuration Options

The Datadog Agent URL and span tag values can be configured if necessary or desired based upon your environment and Agent location.

#### Datadog Agent URL

By default, the OpenTelemetry Datadog Exporter sends traces to `http://localhost:8126`. Send traces to a different URL by configuring the following environment variables:

- `DD_TRACE_AGENT_URL`: The `<host>:<port>` where Datadog Agent is listening for traces, for example, `http://agent-host:8126`.

You can override these values at the trace exporter level:

```ruby
# Configure the SDK with custom export
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://dd-agent:8126',
      )
    )
  )
end
```

#### Tagging

Configure the application to automatically tag your Datadog exported traces by setting the following environment variables:

- `DD_ENV`: Your application environment, for example `production`, `staging`.
- `DD_SERVICE`: Your application's default service name, for example, `billing-api`.
- `DD_VERSION`: Your application version, for example, `2.5`, `202003181415`, or `1.3-alpha`.
- `DD_TAGS`: Custom tags in value pairs, separated by commas, for example, `layer:api,team:intake`.
- If `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` is set, it will override any corresponding `env`, `service`, or `version` tag defined in `DD_TAGS`.
- If `DD_ENV`, `DD_SERVICE` and `DD_VERSION` are _not_ set, you can configure environment, service, and version by using corresponding tags in `DD_TAGS`.

Tag values can also be overridden at the trace exporter level. This lets you set values on a per-application basis, so you can have multiple applications reporting for different environments on the same host:

```ruby
# Configure the SDK with custom export
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://localhost:8126',
        env: 'prod',
        version: '1.5-alpha',
        tags: 'team:ops,region:west'
      )
    )
  )
end
```

Tags that are set directly on individual spans supersede conflicting tags defined at the application level.

### OpenTelemetry Links

- See [rubygems][13] or [github][14] for more OpenTelemetry Ruby Datadog Exporter usage.


{{< /programming-lang >}}

{{< programming-lang lang="c++" >}}

C++

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

# OpenTracing

Datadog also supports the OpenTracing standard.  For more details and information, view the [OpenTracing API][15], or see the setup information below.

### Setup

Import the [`opentracer` package][16] to expose the Datadog tracer as an [OpenTracing][17] compatible tracer.

A basic usage example:

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Start the regular tracer and return it as an opentracing.Tracer interface. You
    // may use the same set of options as you normally would with the Datadog tracer.
    t := opentracer.New(tracer.WithServiceName("<SERVICE_NAME>"))

    // Stop it using the regular Stop call for the tracer package.
    defer tracer.Stop()

    // Set the global OpenTracing tracer.
    opentracing.SetGlobalTracer(t)

    // Use the OpenTracing API as usual.
}
```

**Note**: Using the [OpenTracing API][15] in parallel with the regular API or Datadog integrations is fully supported. Under the hood, all of them make use of the same tracer. See the [API documentation][16] for more examples and details.


{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

## OpenTracing

OpenTracing support is included in the `dd-trace` package.

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

The tracer can now be used like in any other OpenTracing application.

The following tags are available to override Datadog specific options:

* `service.name`: The service name to be used for the span. The service name from the tracer will be used if this is not provided.
* `resource.name`: The resource name to be used for the span. The operation name will be used if this is not provided.
* `span.type`: The span type to be used for the span. Will fallback to `custom` if not provided.

See [opentracing.io][18] for OpenTracing NodeJS usage.

## OpenTelemetry

OpenTelemetry support is available by using the `opentelemetry-exporter-datadog` package to export traces from OpenTelemetry to Datadog.

<div class="alert alert-warning">
This feature is currently in beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

### Installation

To install:

```
npm install --save opentelemetry-exporter-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```javascript
const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider } = require('@opentelemetry/tracing');
const { DatadogSpanProcessor, DatadogExporter, DatadogProbabilitySampler, DatadogPropagator } = require('opentelemetry-exporter-datadog');

const provider = new BasicTracerProvider();

const exporterOptions = {
  serviceName: 'my-service', // optional
  agentUrl: 'http://localhost:8126', // optional
  tags: 'example_key:example_value,example_key_two:value_two', // optional
  env: 'production', // optional
  version: '1.0' // optional
};

const exporter = new DatadogExporter(exporterOptions);
const processor = new DatadogSpanProcessor(exporter);

provider.addSpanProcessor(processor);

// Next, add the Datadog Propagator for distributed tracing
provider.register({
  propagator: new DatadogPropagator()
});

const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

// Create a span. A span must be closed.
const parentSpan = tracer.startSpan('main');

doWork(parentSpan);

setTimeout(() => {
  parentSpan.end();

  setTimeout(() => {
    processor.shutdown()
  },4000);
}, 5000);

function doWork(parent) {
  const span = tracer.startSpan('doWork', {
    parent,
  });

  // simulate some random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }
  // Set attributes to the span.
  span.setAttribute('key', 'value');
  setTimeout( () => {
    span.end();
  }, 1000)
}
```

### Configuration Options

The Datadog Agent URL and span tag values can be configured if necessary or desired based upon your environment and Agent location.

#### Datadog Agent URL

By default, the OpenTelemetry Datadog Exporter transmits traces to `http://localhost:8126`. Send traces to a different URL by configuring the following environment variables:

- `DD_TRACE_AGENT_URL`: The `<host>:<port>` where Datadog Agent listens for traces. For example, `agent-host:8126`.

You can override these values at the trace exporter level:

```js
// Configure the datadog trace agent url
new DatadogExporter({agentUrl: 'http://dd-agent:8126'});
```

#### Tagging

Configure the application to automatically tag your Datadog exported traces by setting the following environment variables:

- `DD_ENV`: Your application environment, for example, `production`, `staging`.
- `DD_SERVICE`: Your application's default service name, for example, `billing-api`.
- `DD_VERSION`: Your application version, for example, `2.5`, `202003181415`, or `1.3-alpha`.
- `DD_TAGS`: Custom tags in value pairs, separated by commas, for example, `layer:api,team:intake`.
- If `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` is set, it will override any corresponding `env`, `service`, or `version` tag defined in `DD_TAGS`.
- If `DD_ENV`, `DD_SERVICE` and `DD_VERSION` are _not_ set, you can configure environment, service, and version by using corresponding tags in `DD_TAGS`.

Tag values can also be overridden at the trace exporter level. This lets you set values on a per-application basis, so you can have multiple applications reporting for different environments on the same host:

```javascript

new DatadogExporter({
  serviceName: 'my-service', // optional
  agentUrl: 'http://localhost:8126', // optional
  tags: 'example_key:example_value,example_key_two:value_two', // optional
  env: 'production', // optional
  version: '1.1' // optional
});
```

Tags that are set directly on individual spans supersede conflicting tags defined at the application level.

### OpenTelemetry Links

- See [npm][19] or [github][20] for more OpenTelemetry NodeJS Datadog Exporter usage.



{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

## OpenTracing

Datadog also supports the OpenTracing standard.  For more details and information, view the [OpenTracing API][21].

### Setup
For OpenTracing support, add the `Datadog.Trace.OpenTracing` [NuGet package][73 ] to your application. During application start-up, initialize the OpenTracing library:

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // Create an OpenTracing ITracer with the default setting
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // Use the tracer with ASP.NET Core dependency injection
    services.AddSingleton<ITracer>(tracer);

    // Use the tracer with OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```

### Manually instrument a method

Use OpenTracing to create a span.

```csharp
using (var scope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    SortOrders();
}
```

### Asynchronous traces

To trace code running in an asynchronous task, create a new scope within the background task, just as you would wrap synchronous code.
```csharp
 Task.Run(
     () =>
     {
         using (var scope =
                Tracer.Instance.StartActive("manual.sortorders.async"))
         {
             SortOrders();
         }
     });

```



{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

## OpenTracing

The PHP tracer supports OpenTracing via the [**opentracing/opentracing** library][22] which is installed with Composer:

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

When [automatic instrumentation][23] is enabled, an OpenTracing-compatible tracer is made available as the global tracer:

```php
<?php
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Use OpenTracing as expected
?>
```

<div class="alert alert-info">Before ddtrace version 0.46.0, an OpenTracing compatible tracer was automatically returned from <code>OpenTracing\GlobalTracer::get()</code> without the need to set the global tracer manually.</div>


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

<br>






[1]: https://github.com/opentracing/opentracing-java
[2]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-ot/src/main/java/datadog/opentracing/DDTracer.java
[3]: https://opentracing.io/guides/python/
[4]: https://github.com/open-telemetry/opentelemetry-python/tree/master/ext/opentelemetry-ext-datadog
[5]: https://github.com/open-telemetry/opentelemetry-python/tree/master/docs/examples/datadog_exporter
[6]: https://opentelemetry-python.readthedocs.io/en/stable/ext/datadog/datadog.html
[7]: /tracing/setup/ruby/#quickstart-for-opentracing
[8]: /tracing/setup/ruby/#tracer-settings
[9]: /tracing/visualization/#spans
[10]: /tracing/visualization/#trace
[11]: /tracing/setup/ruby/#integration-instrumentation
[12]: https://bundler.io
[13]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[14]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby
[15]: https://github.com/opentracing/opentracing-go
[16]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[17]: http://opentracing.io
[18]: https://opentracing.io/guides/javascript/
[19]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[20]: https://github.com/Datadog/dd-opentelemetry-exporter-js
[21]: https://github.com/opentracing/opentracing-csharp
[22]: https://github.com/opentracing/opentracing-php
[23]: /tracing/setup/php/#automatic-instrumentation
