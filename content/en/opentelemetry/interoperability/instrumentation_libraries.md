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
[Automatic instrumentation][2] is a way to instrument applications and libraries without directly modifying their source code.
Both OpenTelemetry and Datadog provide automatic instrumentations as part of their SDKs.

Datadog SDKs support adding [instrumentation libraries][3] from OpenTelemetry to their existing automatic instrumentations.
This provides observability for libraries not originally covered by Datadog SDKs without needing to change SDKs.

## Prerequisites

Before adding OpenTelemetry instrumentation libraries, set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

<div class="alert alert-warning">
When replacing an existing Datadog instrumentation with its OpenTelemetry equivalent, remember to disable the
Datadog instrumentation to avoid duplicate spans in the trace.
</div>

<div class="alert alert-info">
Setting `DD_TRACE_OTEL_ENABLED=true` is not required when using the Datadog SDK for Go.
</div>

## Language support

| Language | Minimum version required |
|----------|--------------------------|
| Java     | v1.35.0                  |
| Python   | v2.10.0                  |
| Ruby     | v2.1.0                   |
| Go       | v1.65.0                  |
| Node.js  | -                        |
| PHP      | -                        |
| .NET     | v2.53.0                  |

{{< tabs >}}

{{% tab "Java" %}}

## Compatibility requirements

The Datadog SDK for Java supports library instrumentations written using OpenTelemetry's [instrumentation API][4] and `javaagent` [extension API][5].

Each instrumentation must be packaged as an OpenTelemetry [extension][6] in its own jar.

OpenTelemetry has an [example extension project][7] that registers a custom [instrumentation for Servlet 3 classes][8].

The Datadog SDK for Java also accepts selected individual instrumentation jars produced by OpenTelemetry's [opentelemetry-java-instrumentation][9]
build, for example the [CFX instrumentation jar][10].

<div class="alert alert-warning">
Use of OpenTelemetry incubator APIs is not currently supported.
</div>

## Getting started

To use an OpenTelemetry instrumentation with the Datadog SDK for Java:
1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.
2. Copy the OpenTelemetry extension jar containing the instrumentation to the same container as the application.
3. Set the `otel.javaagent.extensions` system property or the `OTEL_JAVAAGENT_EXTENSIONS` environment variable to the path to the extension jar.

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
A comma-separated list of paths to extension jar files or folders containing extension jar files.

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

## Getting started

## Configuration

{{% /tab %}} -->

<!-- {{% tab "Ruby" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

<!-- {{% tab "Go" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}} -->

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

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/automatic_instrumentation/
[3]: https://opentelemetry.io/docs/concepts/instrumentation/libraries/
