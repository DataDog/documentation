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

Datadog SDKs provide an implementation of the OpenTelemetry API that submits spans to the Datadog Agent using Datadog Span Exporters. To use the OpenTelemetry
Instramentations with Datadog SDKs ensure a Datadog Agent is configured.

<div class="alert alert-warning">
When replacing a Datadog instrumentation with its OpenTelemetry equivalent, disable the
Datadog instrumentation to avoid duplicate spans in the trace.
</div>

<div class="alert alert-warning">
Datadog SDKs implement the OpenTelemetry API by overriding the default implementations in the OpenTelemetry SDK. Using operations only supported by 
OpenTelemetry SDK are not supported (ex: SpanProcessors, OTLP Trace Exporters).
</div>

<div class="alert alert-warning">
Datadog SDKs do not support OpenTelemetry Metrics and Logs APIs. To use OpenTelemetry Logs and Metrics apis use [OTLP Ingest][12].
</div>

<div class="alert alert-info">
<code>DD_TRACE_OTEL_ENABLED</code> is not required for the Datadog Go and Ruby SDKs.
</div>


## Configuration

The following opentelemetry configuration options are supported by Datadog SDKs: [opentelemetry environment variable support][16]

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
[16]: /opentelemetry/interoperability/environment_variable_support

{{% /tab %}}

{{% tab "Python" %}}

## Compatibility requirements

The Datadog Python SDK supports library instrumentations using OpenTelemetry's [instrumentation API][13].

OpenTelemetry provides an [example][14] for instrumenting a sample application.

## Setup

To use an OpenTelemetry instrumentation with the Datadog Python SDK:

1. Follow the Datadog Python [Opentelemetry Api][15] docs to enable OpenTelemetry support.
2. Ensure a Datadog Agent is configured to accept traces from your [application][16].


[13]: https://github.com/open-telemetry/opentelemetry-python-contrib/tree/0a231e57f9722e6101194c6b38695addf23ab950/instrumentation#readme
[14]: https://opentelemetry.io/docs/zero-code/python/example/
[15]: https://ddtrace.readthedocs.io/en/stable/api.html?highlight=opentelemetry%20api#module-ddtrace.opentelemetry

{{% /tab %}}

{{% tab "Ruby" %}}

## Compatibility requirements

The Datadog Ruby SDK supports library instrumentations using OpenTelemetry's [instrumentation API][18].

OpenTelemetry provides an [example][19] for instrumenting a sample application.

## Setup

To use an OpenTelemetry instrumentation with the Datadog Ruby SDK:

1. Follow the Datadog Ruby [configuring Opentelemetry][20] docs to enable OpenTelemetry support.
2. Ensure a Datadog Agent is configured to accept traces from your [application][16].

[18]: https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation#opentelemetry-instrumentation-libraries
[19]: https://opentelemetry.io/docs/zero-code/python/example/
[20]: /tracing/trace_collection/custom_instrumentation/ruby/otel/#configuring-opentelemetry-to-use-the-datadog-tracing-library


{{% /tab %}}

<!-- {{% tab "Go" %}}

## Compatibility requirements

## Setup

{{% /tab %}} -->

<!-- {{% tab "NodeJS" %}}

## Compatibility requirements

## Setup

{{% /tab %}} -->

<!-- {{% tab "PHP" %}}

## Compatibility requirements

## Setup


{{% /tab %}} -->

<!-- {{% tab ".NET" %}}

## Compatibility requirements

## Setup

{{% /tab %}} -->

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/automatic_instrumentation/
[3]: https://opentelemetry.io/docs/concepts/instrumentation/libraries/
[12]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[16]: /getting_started/tracing/#set-up-datadog-apm
