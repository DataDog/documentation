---
title: Using OpenTelemetry Instrumentation Libraries with Datadog SDKs
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > Using
  OpenTelemetry Instrumentation Libraries with Datadog SDKs
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/instrument/instrumentation_libraries/index.html
---

# Using OpenTelemetry Instrumentation Libraries with Datadog SDKs

Datadog supports OpenTelemetry-compatible instrumentations which provides observability for libraries not covered by Datadog SDKs without changing SDKs. You can extend Datadog's tracing capabilities to these frameworks.

## Prerequisites{% #prerequisites %}

1. **Enable OpenTelemetry support**: Set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`. This step isn't required for the Datadog Go and Ruby APM SDKs.

1. **Run the Datadog Agent**: Datadog SDKs provide an implementation of the OpenTelemetry API and submit spans to a Datadog Agent. Ensure the Datadog Agent is [running](https://docs.datadoghq.com/getting_started/tracing/#set-up-datadog-apm) to use OpenTelemetry instrumentation with Datadog SDKs.

1. **Disable duplicate instrumentation**: When replacing a Datadog instrumentation with its OpenTelemetry equivalent, disable the Datadog instrumentation to prevent duplicate spans from appearing in the trace.

## Configuration{% #configuration %}

You can configure Datadog SDKs by setting the same [environment variables supported by OpenTelemetry](https://docs.datadoghq.com/opentelemetry/interoperability/environment_variable_support).

## Language support{% #language-support %}

Datadog SDKs implement the OpenTelemetry API by overriding the default implementations in the OpenTelemetry SDK. However, note the following limitations:

Operations specific to the OpenTelemetry SDK are not supported (for example, SpanProcessors or OTLP Trace Exporters). Datadog SDKs do not support OpenTelemetry Metrics and Logs APIs. To use OpenTelemetry Logs and Metrics APIs, use OTLP Ingest.

| Language | Minimum version |
| -------- | --------------- |
| Java     | 1.35.0          |
| Python   | 2.10.0          |
| Ruby     | 2.1.0           |
| Go       | 1.67.0          |
| Node.js  | 4.3.0           |
| PHP      | 0.94.0          |
| .NET     | 2.53.0          |

{% tab title="Java" %}
## Compatibility requirements{% #compatibility-requirements %}

1. The Datadog Java SDK supports library instrumentations using OpenTelemetry's [instrumentation API](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation-api/src/main/java/io/opentelemetry/instrumentation/api/instrumenter/) and `javaagent` [extension API](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/javaagent-extension-api/src/main/java/io/opentelemetry/javaagent/extension/instrumentation/).
1. Each instrumentation must be packaged as an OpenTelemetry [extension](https://opentelemetry.io/docs/zero-code/java/agent/extensions/) in its own JAR.
1. OpenTelemetry provides an [example extension project](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/README.md) that registers a custom [instrumentation for Servlet 3 classes](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/src/main/java/com/example/javaagent/instrumentation/DemoServlet3InstrumentationModule.java).
1. The Datadog SDK for Java also accepts select individual instrumentation JARs produced by OpenTelemetry's [opentelemetry-java-instrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/) build, for example the [R2DBC instrumentation JAR](https://search.maven.org/search?q=a:opentelemetry-javaagent-r2dbc-1.0).

{% alert level="warning" %}
OpenTelemetry incubator APIs are not supported.
{% /alert %}

## Setup{% #setup %}

To use an OpenTelemetry instrumentation with the Datadog Java SDK:

1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.
1. Copy the OpenTelemetry extension JAR containing the instrumentation to the same container as the application.
1. Set the `otel.javaagent.extensions` system property or the `OTEL_JAVAAGENT_EXTENSIONS` environment variable to the extension JAR path.

## Example{% #example %}

Here's a step-by-step example using R2DBC in Java to illustrate how you can add OpenTelemetry instrumentation into your service and begin sending data to Datadog, ensuring you capture all the missing spans.

```sh
git clone https://github.com/eugenp/tutorials
cd tutorials/spring-reactive-modules/spring-reactive-data

curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

Download the OpenTelemetry R2DBC agent and run your Spring Boot application with both the Datadog Java agent and the OpenTelemetry R2DBC agent.

```sh
curl -Lo opentelemetry-javaagent-r2dbc.jar \
  'https://repo1.maven.org/maven2/io/opentelemetry/javaagent/instrumentation/opentelemetry-javaagent-r2dbc-1.0/2.5.0-alpha/opentelemetry-javaagent-r2dbc-1.0-2.5.0-alpha.jar'

mvn spring-boot:run -Dstart-class=com.baeldung.pagination.PaginationApplication \
  -Dspring-boot.run.jvmArguments='-javaagent:dd-java-agent.jar -Ddd.trace.otel.enabled=true -Dotel.javaagent.extensions=opentelemetry-javaagent-r2dbc.jar -Ddd.trace.split-by-tags=db.name,db.sql.table -Ddd.trace.debug=true'
```

Open `http://127.0.0.1:8080/products` to exercise the product query. With this setup, you are using OpenTelemetry's instrumentation to ensure full observability for R2DBC queries.

{% alert level="warning" %}
Versions 2.6.0-alpha and later of these OpenTelemetry instrumentations are not supported by the Datadog Java SDK.
{% /alert %}

## Verified OpenTelemetry extensions{% #verified-opentelemetry-extensions %}

| Framework           | Versions | OpenTelemetry Extension                                                                                                    | Instrumentation Names |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Apache CXF (Jax-WS) | 3.0+     | [opentelemetry-javaagent-jaxws-2.0-cxf-3.0](https://search.maven.org/search?q=a:opentelemetry-javaagent-jaxws-2.0-cxf-3.0) | `otel.cxf`            |
| R2DBC               | 1.0+     | [opentelemetry-javaagent-r2dbc-1.0](https://search.maven.org/search?q=a:opentelemetry-javaagent-r2dbc-1.0)                 | `otel.r2dbc`          |

{% /tab %}

{% tab title="Python" %}
## Compatibility requirements{% #compatibility-requirements %}

1. The Datadog Python SDK supports library [instrumentations](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation#readme) using the OpenTelemetry Python Trace API.
1. OpenTelemetry provides an [example](https://opentelemetry.io/docs/zero-code/python/example/) for instrumenting a sample application.

## Setup{% #setup %}

To use OpenTelemetry instrumentations with the Datadog Python SDK, perform the following steps:

1. Follow the instructions in the [OpenTelemetry API](https://ddtrace.readthedocs.io/en/stable/api.html?highlight=opentelemetry%20api#module-ddtrace.opentelemetry) section in the Datadog Python library docs.
1. Follow the steps for instrumenting your service with your chosen `opentelemetry-python-contrib` library.

## Example{% #example %}

The following is an example instrumenting the OpenTelemetry's kafka-python library with the Datadog Python SDK:

```python
from kafka import KafkaProducer, KafkaConsumer
from opentelemetry.instrumentation.kafka import KafkaInstrumentor
from opentelemetry import trace

# Instrument Kafka with OpenTelemetry
KafkaInstrumentor().instrument()

# Kafka configuration
KAFKA_TOPIC = 'demo-topic0'
KAFKA_BROKER = 'localhost:9092'

def produce_message():
    producer = KafkaProducer(bootstrap_servers=KAFKA_BROKER)
    message = b'Hello, OpenTelemetry!'
    
    # No manual span creation, relying on automatic instrumentation
    producer.send(KAFKA_TOPIC, message)
    producer.flush()
    
    print(f"Produced message: {message}")

def consume_message():
    consumer = KafkaConsumer(KAFKA_TOPIC, bootstrap_servers=KAFKA_BROKER, auto_offset_reset='earliest', group_id='demo-group')
    
    # No manual span creation, relying on automatic instrumentation
    for message in consumer:
        print(f"Consumed message: {message.value}")
        break  # For simplicity, consume just one message

if __name__ == "__main__":
    # manual span here 
    tracer = trace.get_tracer(__name__)
    with tracer.start_as_current_span("Span") as parent_span:
        parent_span.set_attribute("Hello", "World")
        produce_message()
        consume_message()
```

{% /tab %}

{% tab title="Go" %}
## Compatibility requirements{% #compatibility-requirements %}

The Datadog SDK for Go supports library instrumentations written using the [OpenTelemetry-Go Trace API](https://github.com/open-telemetry/opentelemetry-go/tree/main/trace), including the [`opentelemetry-go-contrib/instrumentation`](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation) libraries.

**Note**: This documentation uses v2 of the Go tracer, which Datadog recommends for all users. If you are using v1, see the [migration guide](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/migration) to upgrade to v2.

OpenTelemetry support has not changed between v1 and v2 of the Go Tracer.

## Setup{% #setup %}

To use OpenTelemetry integrations with the Datadog Go SDK, perform the following steps:

1. Follow the instructions in the Imports and Setup sections of the [Go Custom Instrumentation using OpenTelemetry API](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/otel/#imports) page.
1. Follow the steps for instrumenting your service with your chosen `opentelemetry-go-contrib` library.

## Example{% #example %}

The following is an example instrumenting the `net/http` library with the Datadog Tracer and OpenTelemetry's `net/http` integration:

```go
import (
	"fmt"
	"log"
	"net/http"

  ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
  ddtracer "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

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

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/interoperability/go-otel-dropin-support.97e01dcae7d6f8fec2a5d60ede3226e0.png?auto=format"
   alt="go-dd-otelhttp" /%}

{% /tab %}

{% tab title="Node.js" %}
## Compatibility requirements{% #compatibility-requirements %}

The Datadog Node.js SDK supports library [instrumentations](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node#supported-instrumentations) using the OpenTelemetry Node.js Trace API.

## Setup{% #setup %}

To use OpenTelemetry instrumentations with the Datadog Node.js SDK, perform the following steps:

1. Follow the Setup instructions in [Node.js Custom Instrumentation using OpenTelemetry API](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs/#setup).
1. Follow the steps for instrumenting your service with your chosen `opentelemetry-js-contrib` library.

## Example{% #example %}

The following example demonstrates how to instrument the `http` and `express` OpenTelemetry integrations with the Datadog Node.js SDK:

```js
const tracer = require('dd-trace').init()
const { TracerProvider } = tracer
const provider = new TracerProvider()
provider.register()

const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express')

// Register the instrumentation with the Datadog trace provider
// and the OpenTelemetry instrumentation of your choice
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingRequestHook (req) {
        // Ignore spans created from requests to the agent
        return req.path === '/v0.4/traces' || req.path === '/v0.7/config' ||
        req.path === '/telemetry/proxy/api/v2/apmtelemetry'
      },
      ignoreOutgoingRequestHook (req) {
        // Ignore spans created from requests to the agent
        return req.path === '/v0.4/traces' || req.path === '/v0.7/config' ||
        req.path === '/telemetry/proxy/api/v2/apmtelemetry'
      }
    }),
    new ExpressInstrumentation()
  ],
  tracerProvider: provider
})

const express = require('express')
const http = require('http')

// app code below ....
```

## Configuration{% #configuration %}

To avoid duplicate spans, disable the corresponding Datadog instrumentations.

Set the `DD_TRACE_DISABLED_INSTRUMENTATIONS` environment variable to a comma-separated list of integration names to disable. For example, to disable Datadog instrumentations for the libraries used in the Setup example, set the following:

```sh
DD_TRACE_DISABLED_INSTRUMENTATIONS=http,dns,express,net
```

{% /tab %}

{% tab title="PHP" %}
## Compatibility requirements{% #compatibility-requirements %}

The Datadog PHP SDK supports library [instrumentation](https://github.com/open-telemetry/opentelemetry-php-contrib/tree/main/src/Instrumentation) using the `stable` OpenTelemetry PHP Trace API. OpenTelemetry provides an [example](https://opentelemetry.io/docs/zero-code/php/) for instrumenting a sample PHP application.

## Setup{% #setup %}

To use OpenTelemetry integrations with the Datadog PHP SDK:

1. Follow the instructions in [configuring OpenTelemetry](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/php/otel/#setup) in the Datadog PHP SDK documentation.
1. Follow the steps for instrumenting your service with your chosen `opentelemetry-php-contrib` library.

## Example{% #example %}

You can find a sample [PHP application](https://github.com/DataDog/trace-examples/tree/master/php/Slim4OtelDropIn) with OpenTelemetry and Datadog auto instrumentations in the `DataDog/trace-examples` GitHub repository.

## Configuration{% #configuration %}

To avoid duplicate spans, you can disable the corresponding Datadog integrations. Set the `DD_TRACE_<INTEGRATION>_ENABLED` environment variable to `0` or `false` to disable an integration(see [Integration names](https://docs.datadoghq.com/tracing/trace_collection/library_config/php/#integration-names)).

Use the integration name when setting integration-specific configuration for example: Laravel is `DD_TRACE_LARAVEL_ENABLED`.

```sh
DD_TRACE_LARAVEL_ENABLED=false
```

{% /tab %}

{% tab title=".NET" %}
## Compatibility requirements{% #compatibility-requirements %}

The Datadog .NET SDK supports library instrumentations that come with [built-in OpenTelemetry support](https://opentelemetry.io/docs/languages/net/libraries/#use-natively-instrumented-libraries).

## Setup{% #setup %}

To use OpenTelemetry instrumentation libraries with the Datadog .NET SDK:

1. Set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.
1. Follow the steps to configure each library, if any, to generate OpenTelemetry-compatible instrumentation via `ActivitySource`

## Example{% #example %}

The following example demonstrates how to instrument the `Hangfire` OpenTelemetry integrations with the Datadog .NET SDK:

```csharp
using System;
using Hangfire;
using Hangfire.MemoryStorage;
using OpenTelemetry.Trace;
using OpenTelemetry.Resources;
using OpenTelemetry.Instrumentation.Hangfire;
using OpenTelemetry;

class Program
{
    static void Main(string[] args)
    {
        // Create an OpenTelemetry TracerProvider to initialize the OpenTelemetry Hangfire instrumentation and build the configuration
        var openTelemetry = Sdk.CreateTracerProviderBuilder()
            .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("hangfire-demo2"))
            .AddHangfireInstrumentation() // This line generates the OpenTelemetry spans
            .Build();

        // Configure Hangfire to use memory storage
        GlobalConfiguration.Configuration.UseMemoryStorage();

        // Create a new Hangfire server
        using (var server = new BackgroundJobServer())
        {
            // Enqueue a background job
            BackgroundJob.Enqueue(() => RunBackgroundJob());

            Console.WriteLine("Hangfire Server started. Press any key to exit...");
            Console.ReadKey();
        }

        // Dispose OpenTelemetry resources
        openTelemetry?.Dispose();
    }

    // Define the background job method
    public static void RunBackgroundJob()
    {
        Console.WriteLine("Hello from Hangfire!");
    }
}
```

## Verified OpenTelemetry Instrumentation Libraries{% #verified-opentelemetry-instrumentation-libraries %}

| Library           | Versions | NuGet package                                                                           | Integration Name  | Setup instructions            |
| ----------------- | -------- | --------------------------------------------------------------------------------------- | ----------------- | ----------------------------- |
| Azure Service Bus | 7.14.0+  | [Azure.Messaging.ServiceBus](https://www.nuget.org/packages/Azure.Messaging.ServiceBus) | `AzureServiceBus` | See `Azure SDK` section below |

### Azure SDK{% #azure-sdk %}

The Azure SDK provides built-in OpenTelemetry support. Enable it by setting the `AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE` environment variable to `true` or by setting the `Azure.Experimental.EnableActivitySource` context switch to `true` in your application code. See [Azure SDK documentation](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features) for more details.
{% /tab %}

{% tab title="Ruby" %}
## Compatibility requirements{% #compatibility-requirements %}

The Datadog Ruby SDK supports library [instrumentation](https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation#opentelemetry-instrumentation-libraries) using the OpenTelemetry Ruby Trace API.

OpenTelemetry provides an [example](https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation/faraday/example) for instrumenting a sample application.

## Setup{% #setup %}

To use OpenTelemetry integrations with the Datadog Ruby SDK, perform the following steps:

1. Follow the instructions in [configuring OpenTelemetry](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ruby/otel/#configuring-opentelemetry-to-use-the-datadog-tracing-library) in the Datadog Ruby SDK documentation.
1. Follow the steps for instrumenting your service with your chosen `opentelemetry-ruby-contrib` library.

{% /tab %}

## Further reading{% #further-reading %}

- [Instrument a custom method to get deep visibility into your business logic](https://docs.datadoghq.com/tracing/guide/instrument_custom_method)
- [Connect your Logs and Traces together](https://docs.datadoghq.com/tracing/connect_logs_and_traces)
- [Explore your services, resources, and traces](https://docs.datadoghq.com/tracing/visualization/)
- [Learn More about Datadog and the OpenTelemetry initiative](https://www.datadoghq.com/blog/opentelemetry-instrumentation/)
