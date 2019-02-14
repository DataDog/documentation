---
title: OpenTracing
kind: documentation
---

OpenTracing is a vendor-neutral, cross-language standard for tracing applications. Datadog offers OpenTracing implementations for many APM tracers. For more details see [opentracing.io][1].


{{< tabs >}}
{{% tab "Java" %}}

Use the [OpenTracing API][1] and the Datadog Tracer (dd-trace-ot) library to measure execution times for specific pieces of code. This lets you trace your application more precisely than you can with the Java Agent alone.

**Setup**:

For Maven, add this to `pom.xml`:

```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- OpenTracing Util -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Datadog Tracer (only needed if you do not use dd-java-agent) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

For Gradle, add:

```
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configure your application using environment variables or system properties as discussed in the [configuration][2] section.


**Manual Instrumentation with OpenTracing**:

Use a combination of these if the automatic instrumentation isn’t providing you enough depth or detail.

Using try-finally:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        /*
         * 1. Configure your application using environment variables or system properties
         * 2. Using dd-java-agent (-javaagent:/path/to/dd-java-agent.jar),
         *    GlobalTracer is automatically instantiated.
         */
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("<OPERATION_NAME>").startActive(true);
        try {
            scope.span().setTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>");

            // The code you're tracing
            Thread.sleep(1000);

        // If you don't call close(), the span data will NOT make it to Datadog!
        } finally {
            scope.close();
        }
    }
}
```

Alternatively, wrap the code you want to trace in a `try-with-resources` statement:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        Tracer tracer = GlobalTracer.get();

        try (Scope scope = tracer.buildSpan("<OPERATION_NAME>").startActive(true)) {
            scope.span().setTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>");
            Thread.sleep(1000);
        }
    }
}
```

In this case, you don't need to call `scope.close()`.

If you’re not using `dd-java-agent.jar`, you must register a configured tracer with `GlobalTracer`. For this, call `GlobalTracer.register(new DDTracer())` early on in your application startup (e.g., main method).

```java
import datadog.opentracing.DDTracer;
import datadog.trace.api.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {

    public static void main(String[] args) {

        // Initialize the tracer from environment variables or system properties
        Tracer tracer = new DDTracer();
        GlobalTracer.register(tracer);
        // register the same tracer with the Datadog API
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // OR from the API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        Tracer tracer = new DDTracer(writer, sampler);
        GlobalTracer.register(tracer);
        // register the same tracer with the Datadog API
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // ...
    }
}
```

**Manual Instrumentation for Async Traces**:

Create asynchronous traces with manual instrumentation using the OpenTracing API.

```java
// Step 1: start the Scope/Span on the work submission thread
try (Scope scope = tracer.buildSpan("ServiceHandlerSpan").startActive(false)) {
    final Span span = scope.span();
    doAsyncWork(new Runnable() {
        @Override
        public void run() {
            // Step 2: reactivate the Span in the worker thread
            try (Scope scope = tracer.scopeManager().activate(span, false)) {
              // worker thread impl...
            }
        }
    });
    // submission thread impl...
}
```
Notice the above examples only use the OpenTracing classes. Check the [OpenTracing API][1] for more details and information.


[1]: https://github.com/opentracing/opentracing-java
[2]: /tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Support for OpenTracing in the Python tracer is currently in beta.

**Setup**:

OpenTracing support is included in the `ddtrace` package. Use `pip` to install the required `opentracing` package :

```sh
$ pip install ddtrace[opentracing]
```

**Usage**:

The OpenTracing convention for initializing a tracer is to define an initialization method that configures and instantiates a new tracer and overwrites the global `opentracing.tracer` reference:

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      'agent_hostname': 'localhost',
      'agent_port': 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span('<OPERATION_NAME>')
  span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  time.sleep(0.05)
  span.finish()

init_tracer('<SERVICE_NAME>')
my_operation()
```

For more advanced usage and configuration information see [Datadog Python Opentracing API docs][1] and the [Python OpenTracing repo][2].


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#opentracing
[2]: https://github.com/opentracing/opentracing-python
{{% /tab %}}
{{% tab "Ruby" %}}

Support for OpenTracing with Ruby is coming soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab "Go" %}}

Import the [`opentracer` package][1] to expose the Datadog tracer as an [OpenTracing][2] compatible tracer.

**Example**:

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

**Note**: Using the [OpenTracing API][3] in parallel with the regular API or Datadog integrations is fully supported. Under the hood, all of them make use of the same tracer. See the [API documentation][1] for more examples and details.

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[2]: http://opentracing.io
[3]: https://github.com/opentracing/opentracing-go
{{% /tab %}}
{{% tab "Node.js" %}}
This library is OpenTracing compliant. Use the ([OpenTracing API][1] and the Datadog Tracer ([dd-trace][2]) library to measure execution times for specific pieces of code. In the following example, a Datadog Tracer is initialized and used as a global tracer:


```javascript
// server.js

const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)

const app = require('./app.js')

// app.js

const tracer = opentracing.globalTracer()
```

The following tags are available to override Datadog specific options:

* `service.name`: The service name to be used for this span. The service name from the tracer is used if this is not provided.
* `resource.name`: The resource name to be used for this span. The operation name is used if this is not provided.
* `span.type`: The span type to be used for this span. The span type falls back to `custom` if not provided.

[1]: https://doc.esdoc.org/github.com/opentracing/opentracing-javascript
[2]: https://datadog.github.io/dd-trace-js
{{% /tab %}}
{{% tab ".NET" %}}

For OpenTracing support, add the [`Datadog.Trace.OpenTracing`][1] NuGet package to your application. During application start-up, initialize the OpenTracing library:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // create an OpenTracing ITracer with default setting
    OpenTracing.ITracer tracer =
        Datadog.Trace.OpenTracing.OpenTracingTracerFactory.CreateTracer();

    // to use tracer with ASP.NET Core dependency injection
    services.AddSingleton<ITracer>(tracer);

    // to use tracer with OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```


[1]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
{{% /tab %}}
{{% tab "PHP" %}}

The PHP tracer supports OpenTracing via the [**opentracing/opentracing** library][1] which is installed with Composer:

```bash
$ composer require opentracing/opentracing:1.0.0-beta5
```

When [automatic instrumentation][2] is enabled, an OpenTracing-compatible tracer is made available as the global tracer:

```php
$otTracer = \OpenTracing\GlobalTracer::get();
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Use OpenTracing as expected
```


[1]: https://github.com/opentracing/opentracing-php
[2]: /tracing/languages/php/#automatic-instrumentation
{{% /tab %}}
{{% tab "C++" %}}

The Datadog C++ tracer can only be used through the OpenTracing API. The usage instructions in this document all describe generic OpenTracing functionality.

{{% /tab %}}
{{< /tabs >}}

[1]: http://opentracing.io
