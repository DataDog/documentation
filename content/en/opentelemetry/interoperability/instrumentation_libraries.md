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

[Instrumentation][1] is the process of adding code to your application to capture and report observability data.
[Automatic instrumentation][2] is a way to instrument applications and libraries without modifying their source code.
Both OpenTelemetry and Datadog provide automatic instrumentation in their SDKs.

Datadog SDKs support adding [OpenTelemetry instrumentation libraries][3] to their existing automatic instrumentation.
This provides observability for libraries not covered by Datadog SDKs without changing SDKs.

## Prerequisites

Before adding OpenTelemetry instrumentation libraries, set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

<div class="alert alert-warning">
When replacing a Datadog instrumentation with its OpenTelemetry equivalent, disable the
Datadog instrumentation to avoid duplicate spans in the trace.
</div>

<div class="alert alert-info">
<code>DD_TRACE_OTEL_ENABLED</code> is not required for the Datadog Go SDK.
</div>

## Language support

| Language | Minimum version          |
|----------|--------------------------|
| Java     | 1.35.0                   |
| Python   | 2.10.0                   |
| Ruby     | 2.1.0                    |
| Go       | 1.65.0                   |
| Node.js  | 4.3.0                    |
| PHP      | 0.94.0                   |
| .NET     | 2.53.0                   |

{{< tabs >}}

{{% tab "Java" %}}

## Compatibility requirements

The Datadog Java SDK supports library instrumentations using OpenTelemetry's [instrumentation API][4] and `javaagent` [extension API][5].

Each instrumentation must be packaged as an OpenTelemetry [extension][6] in its own JAR.

OpenTelemetry provides an [example extension project][7] that registers a custom [instrumentation for Servlet 3 classes][8].

The Datadog SDK for Java also accepts select individual instrumentation JARs produced by OpenTelemetry's [opentelemetry-java-instrumentation][9]
build, for example the [CFX instrumentation JAR][10].

<div class="alert alert-warning">
OpenTelemetry incubator APIs are not supported.
</div>

## Setup

To use an OpenTelemetry instrumentation with the Datadog Java SDK:

1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.
2. Copy the OpenTelemetry extension JAR containing the instrumentation to the same container as the application.
3. Set the `otel.javaagent.extensions` system property or the `OTEL_JAVAAGENT_EXTENSIONS` environment variable to the extension JAR path.

## Configuration

The following configuration options have system property and environment variable equivalents.
If the same key type is set for both, the system property takes priority.
Set system properties as JVM flags.

`dd.trace.otel.enabled`
: **Environment Variable**: `DD_TRACE_OTEL_ENABLED`<br>
**Default**: `false`<br>
Must be set to `true` to enable use of OpenTelemetry instrumentations.

`otel.javaagent.extensions`
: **Environment Variable**: `OTEL_JAVAAGENT_EXTENSIONS`<br>
**Default**: `false`<br>
A comma-separated list of paths to extension JAR files or folders containing extension JAR files.

OpenTelemetry's [Agent Configuration][11] page describes additional properties that are also recognized by the Datadog SDK.

## Verified OpenTelemetry extensions

| Framework           | Versions | OpenTelemetry Extension                         | Instrumentation Names |
|---------------------|----------|-------------------------------------------------|-----------------------|
| Apache CXF (Jax-WS) | 3.0+     | [opentelemetry-javaagent-jaxws-2.0-cxf-3.0][10] | `cxf`                 |

[4]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation-api/src/main/java/io/opentelemetry/instrumentation/api/instrumenter/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/javaagent-extension-api/src/main/java/io/opentelemetry/javaagent/extension/instrumentation/
[6]: https://opentelemetry.io/docs/zero-code/java/agent/extensions/
[7]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/README.md
[8]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/src/main/java/com/example/javaagent/instrumentation/DemoServlet3InstrumentationModule.java
[9]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/
[10]: https://search.maven.org/search?q=a:opentelemetry-javaagent-jaxws-2.0-cxf-3.0
[11]: https://opentelemetry.io/docs/zero-code/java/agent/configuration/

{{% /tab %}}

<!-- {{% tab "Python" %}}

## Compatibility requirements

## Setup

## Configuration

{{% /tab %}} -->

<!-- {{% tab "Ruby" %}}

## Compatibility requirements

## Setup

## Configuration

{{% /tab %}} -->

{{% tab "Go" %}}

## Compatibility requirements

The Datadog SDK for Go supports library instrumentations written using the [Opentelemetry-Go Trace API][1], including the [`opentelemetry-go-contrib/instrumentation`][2] libraries, but it does not support integrations that rely on metrics or logs exporters.

## Setup

To use Opentelemetry integrations with the Datadog tracing library, perform the following steps:

 1. Follow the instructions in the Imports and Setup sections of the [Go Custom Instrumentation using OpenTelemetry API][3] page.
 2. Follow the steps for instrumenting your service with your chosen `opentelemetry-go-contrib` library.

The following is an example instrumenting the `net/http` library with the Datadog Tracer and Opentelemetry's `net/http` integration:

```go
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

	// configure the server with otelhttp instrumentation as you normally would using opentelemetry: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp
	var mux http.ServeMux
	mux.Handle("/hello", http.HandlerFunc(hello))
	http.HandleFunc("/hello", hello)
	log.Fatal(http.ListenAndServe(":8080", otelhttp.NewHandler(&mux, "server")))
}

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hello\n")
}
```

{{< img src="opentelemetry/interoperability/go-otel-dropin-support.png" alt="go-dd-otelhttp">}}

## Configuration

No additional configuration is required.

[1]: https://github.com/open-telemetry/opentelemetry-go/tree/main/trace
[2]: https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation
[3]: https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/otel/#imports

{{% /tab %}}

<!-- {{% tab "NodeJS" %}}

## Compatibility requirements

## Setup

## Configuration

{{% /tab %}} -->

<!-- {{% tab "PHP" %}}

## Compatibility requirements

## Setup

## Configuration

{{% /tab %}} -->

<!-- {{% tab ".NET" %}}

## Compatibility requirements

## Setup

## Configuration

{{% /tab %}} -->

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/automatic_instrumentation/
[3]: https://opentelemetry.io/docs/concepts/instrumentation/libraries/
