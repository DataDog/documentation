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

1. **Enable OpenTelemetry support**: Set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`. This step isn't required for the Datadog Go and Ruby APM SDKs.

1. **Run the Datadog Agent**: Datadog SDKs provide an implementation of the OpenTelemetry API and submit spans to a Datadog Agent. Ensure the Datadog Agent is [running][24] to use OpenTelemetry instrumentation with Datadog SDKs.

1. **Disable duplicate instrumentation**: When replacing a Datadog instrumentation with its OpenTelemetry equivalent, disable the
Datadog instrumentation to prevent duplicate spans from appearing in the trace.

## Configuration

Datadog SDKs support configuration through [OpenTelemetry environment variables][16].

## Language support

Datadog SDKs implement the OpenTelemetry API by overriding the default implementations in the OpenTelemetry SDK. However, note the following limitations:

- Operations only supported by the OpenTelemetry SDK are not supported (for example, SpanProcessors or OTLP Trace Exporters).
- Datadog SDKs do not support OpenTelemetry Metrics and Logs APIs. To use OpenTelemetry Logs and Metrics APIs, use [OTLP Ingest][12].

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

{{% tab "Python" %}}

## Compatibility requirements

The Datadog Python SDK supports library [instrumentations][13] using the OpenTelemetry Python Trace API.

OpenTelemetry provides an [example][14] for instrumenting a sample application.

## Setup

To use OpenTelemetry instrumentations with the Datadog Python SDK, perform the following steps:

 1. Follow the instructions in the [OpenTelemetry API][15] section in the Datadog Python library docs.
 2. Follow the steps for instrumenting your service with your chosen `opentelemetry-python-contrib` library.


[13]: https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation#readme
[14]: https://opentelemetry.io/docs/zero-code/python/example/
[15]: https://ddtrace.readthedocs.io/en/stable/api.html?highlight=opentelemetry%20api#module-ddtrace.opentelemetry

{{% /tab %}}

{{% tab "Ruby" %}}

## Compatibility requirements

The Datadog Ruby SDK supports library [instrumentation][18] using the OpenTelemetry Ruby Trace API.

OpenTelemetry provides an [example][19] for instrumenting a sample application.

## Setup

To use OpenTelemetry integrations with the Datadog Ruby SDK, perform the following steps:

  1. Follow the instructions in [configuring OpenTelemetry][20] in the Datadog Ruby SDK documentation.
  2. Follow the steps for instrumenting your service with your chosen `opentelemetry-ruby-contrib` library.

[18]: https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation#opentelemetry-instrumentation-libraries
[19]: https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation/faraday/example
[20]: /tracing/trace_collection/custom_instrumentation/ruby/otel/#configuring-opentelemetry-to-use-the-datadog-tracing-library


{{% /tab %}}

{{% tab "Go" %}}

## Compatibility requirements

The Datadog SDK for Go supports library instrumentations written using the [Opentelemetry-Go Trace API][21], including the [`opentelemetry-go-contrib/instrumentation`][22] libraries.

## Setup

To use OpenTelemetry integrations with the Datadog Go SDK, perform the following steps:

 1. Follow the instructions in the Imports and Setup sections of the [Go Custom Instrumentation using OpenTelemetry API][23] page.
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


[21]: https://github.com/open-telemetry/opentelemetry-go/tree/main/trace
[22]: https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation
[23]: https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/otel/#imports

{{% /tab %}}

<!-- {{% tab "NodeJS" %}}

## Compatibility requirements

## Setup

{{% /tab %}} -->

<!-- {{% tab "PHP" %}}

## Compatibility requirements

## Setup


{{% /tab %}} -->

{{% tab ".NET" %}}

## Compatibility requirements

The Datadog .NET SDK supports library instrumentations that come with [built-in OpenTelemetry support][1].

## Setup

To use Opentelemetry instrumentation libraries with the Datadog .NET SDK:

1. Set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.
2. Follow the steps to configure each library, if any, to generate OpenTelemetry-compatible instrumentation via `ActivitySource`

## Verified OpenTelemetry Instrumentation Libraries

| Library           | Versions | NuGet package                     | Integration Name     | Setup instructions            |
| ----------------- | -------- | --------------------------------- | -------------------- | ----------------------------- |
| Azure Service Bus | 7.14.0+ | [Azure.Messaging.ServiceBus][2]  | `AzureServiceBus`    | See `Azure SDK` section below |

### Azure SDK

The Azure SDK provides built-in OpenTelemetry support. Enable it by setting the `AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE` environment variable to `true` or by setting the `Azure.Experimental.EnableActivitySource` context switch to `true` in your application code. See [Azure SDK documentation][3] for more details.

[1]: https://opentelemetry.io/docs/languages/net/libraries/#use-natively-instrumented-libraries
[2]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[3]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features
{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/automatic_instrumentation/
[3]: https://opentelemetry.io/docs/concepts/instrumentation/libraries/
[12]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[16]: /opentelemetry/interoperability/environment_variable_support
[24]: /getting_started/tracing/#set-up-datadog-apm
