---
title: Open Tracing
kind: documentation
---


## Go

Import the [`opentracer` package][opentracing godoc] to expose the Datadog tracer as an [OpenTracing][open tracing] compatible tracer.

### Example

A basic usage would be:

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
    t := opentracer.Start(tracer.WithServiceName("my-service"))

    // Stop it using the regular Stop call.
    defer tracer.Stop()
    
    // Set the global OpenTracing tracer.
    opentracing.SetGlobalTracer(t)

    // Use the OpenTracing API as usual.
}
```

**Note**: Using the [OpenTracing API][opentracing go] in parallel with the regular API or our integrations is fully supported. Under the hood, all of them
make use of the same tracer. Make sure to check out the [API documentation][opentracing godoc] for more examples and details.

## Java

Use the [OpenTracing API][6] and the Datadog Tracer (dd-trace-ot) library to measure execution times for specific pieces of code. This lets you trace your application more precisely than you can with the Java Agent alone.

### Setup

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

Configure your application using environment variables or system properties as discussed in the [configuration](#configuration) section.

### Custom Instrumentation Examples

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

        Scope scope = tracer.buildSpan("operation-name").startActive(true);
        try {
            scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");

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

        try (Scope scope = tracer.buildSpan("operation-name").startActive(true)) {
            scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");
            Thread.sleep(1000);
        }
    }
}
```

In this case, you dont need to call `scope.close()`.

If you’re not using `dd-java-agent.jar`, you must register a configured tracer with `GlobalTracer`. For this call `GlobalTracer.register(new DDTracer())` early on in your application startup (ie, main method).

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

        // OR from the API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        Tracer tracer = new DDTracer(writer, sampler);
        GlobalTracer.register(tracer);

        // ...
    }
}
```

#### Custom Async Instrumentation

Create asynchronous traces in custom instrumentation using the OpenTracing API.

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


Notice the above examples only use the OpenTracing classes. Please reference the [OpenTracing API][6] for more details and information.

[tracer godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[opentracing godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[open tracing]: http://opentracing.io
[opentracing go]: https://github.com/opentracing/opentracing-go