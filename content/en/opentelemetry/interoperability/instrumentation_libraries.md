---
title: Using OpenTelemetry Instrumentation Libraries with Datadog SDKs
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
algolia:
  tags: ['otel instrumentation']
---

[Instrumentation](/tracing/trace_collection/) is the process of adding code to your application to capture and report observability data.
[Automatic instrumentation](/tracing/trace_collection/automatic_instrumentation/) is a way to instrument applications and libraries without directly modifying their source code.
Both OpenTelemetry and Datadog provide automatic instrumentations as part of their SDKs.

Datadog SDKs support adding [instrumentation libraries](https://opentelemetry.io/docs/concepts/instrumentation/libraries/) from OpenTelemetry to their existing automatic instrumentations.
This provides observability for libraries not originally covered by Datadog SDKs without needing to change SDKs.

## Prerequisites

Before adding OpenTelemetry instrumentation libraries set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

<div class="alert alert-warning">
When replacing an existing Datadog instrumentation with its OpenTelemetry equivalent, remember to disable the
Datadog instrumentation to avoid duplicate spans in the trace.
</div>

## Language support

| Language | Minimum version required |
|----------|--------------------------|
| Java     | v1.35.0                  |
| Python   | v2.10.0                  |
| Ruby     | v2.1.0                   |
| Go       | v1.67.0                  |
| Node.js  | TBA                      |
| PHP      | TBA                      |
| .NET     | TBA                      |

{{< tabs >}}

{{% tab "Java" %}}

## Compatibility requirements

The Datadog SDK for Java supports library instrumentations written using OpenTelemetry's [instrumentation API](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation-api/src/main/java/io/opentelemetry/instrumentation/api/instrumenter)
and `javaagent` [extension API](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/javaagent-extension-api/src/main/java/io/opentelemetry/javaagent/extension/instrumentation).

Each instrumentation must be packaged as an OpenTelemetry [extension](https://opentelemetry.io/docs/zero-code/java/agent/extensions/) in its own jar.
OpenTelemetry provide an [example extension project](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/README.md)
that provides a custom [instrumentation for Servlet 3 classes](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/src/main/java/com/example/javaagent/instrumentation/DemoServlet3InstrumentationModule.java).

The Datadog SDK for Java also accepts selected individual instrumentation jars produced by OpenTelemetry's [opentelemetry-java-instrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main)
build, for example the [CFX instrumentation jar](https://search.maven.org/search?q=a:opentelemetry-javaagent-jaxws-2.0-cxf-3.0).

<div class="alert alert-warning">
Use of OpenTelemetry incubator APIs is not currently supported.
</div>

## Getting started

To use an OpenTelemetry instrumentation with the Datadog SDK for Java:
1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`
2. Copy the OpenTelemetry extension jar containing the instrumentation to the same container as the application
3. Set the `otel.javaagent.extensions` system property or the `OTEL_JAVAAGENT_EXTENSIONS` environment variable to
   the path to the extension jar

## Configuration

All configuration options below have system property and environment variable equivalents.
If the same key type is set for both, the system property configuration takes priority.
System properties should be set as JVM flags.

`dd.trace.otel.enabled`
: **Environment Variable**: `DD_TRACE_OTEL_ENABLED`<br>
**Default**: `false`<br>
Must be set to `true` to enable use of OpenTelemetry instrumentations.

`otel.javaagent.extensions`
: **Environment Variable**: `OTEL_JAVAAGENT_EXTENSIONS`<br>
**Default**: `false`<br>
A comma-separated list of paths to extension jar files, or folders containing extension jar files.

OpenTelemetry's [Agent Configuration](https://opentelemetry.io/docs/zero-code/java/agent/configuration/) page describes additional properties which are also recognized by the Datadog SDK.

## Verified OpenTelemetry Extensions

| Framework           | Versions | OpenTelemetry Extension                                                                                                    | Instrumentation Names |
|---------------------|----------|----------------------------------------------------------------------------------------------------------------------------|-----------------------|
| Apache CXF (Jax-WS) | 3.0+     | [opentelemetry-javaagent-jaxws-2.0-cxf-3.0](https://search.maven.org/search?q=a:opentelemetry-javaagent-jaxws-2.0-cxf-3.0) | `cxf`                 |

{{% /tab %}}

<!-- {{% tab "Python" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

<!-- {{% tab "Ruby" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

{{% tab "Go" %}}

## Compatibility requirements

The Datadog SDK for Go supports library instrumentations written using the [Opentelemetry-Go Trace API](https://github.com/open-telemetry/opentelemetry-go/tree/main/trace). This includes the [opentelemetry-go-contrib/instrumentation](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation) libraries, however, anything that relies on metrics or logs exporters is not supported at this time.

## Getting started

Set up the Datadog trace provider and configure Opentelemetry to use the Datadog trace provider as per the Imports and Setup instructions listed in the [Go Custom Instrumentation using OpenTelemetry API guide](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/otel/#imports).

Then, follow the instructions of your chosen opentelemetry-go-contrib library to instrument your service.

Example:
```
import (
	"fmt"
	"log"
	"net/http"

	ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
	ddtracer "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel"
)

func main() {
	// register tracer
	provider := ddotel.NewTracerProvider(ddtracer.WithDebugMode(true))
	defer provider.Shutdown()
	otel.SetTracerProvider(provider)

	// // custom span
	// ctx, sp := tracer.Start(context.Background(), "span_name")
	// sp.SetAttributes(attribute.String(ext.ResourceName, "test.json"))
	// var s specialString
	// ctx = context.WithValue(ctx, s, "value")
	// yourCode(ctx)
	// sp.End()
	var mux http.ServeMux
	mux.Handle("/hello", http.HandlerFunc(hello))
	http.HandleFunc("/hello", hello)
	log.Fatal(http.ListenAndServe(":8080", otelhttp.NewHandler(&mux, "server")))
}

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hello\n")
}
```

## Configuration

No additional configuration is required.

{{% /tab %}}

<!-- {{% tab "NodeJS" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

<!-- {{% tab "PHP" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

<!-- {{% tab ".NET" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
