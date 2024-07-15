---
title: Using OpenTelemetry Instrumentations with Datadog SDKs
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
  tags: ['otel drop-in instrumentation']
---

[Instrumentation](/tracing/trace_collection/) is the act of adding observability code to an application. [Automatic instrumentation](/tracing/trace_collection/automatic_instrumentation/) is a way to instrument applications and libraries without directly modifying their source code. Both OpenTelemetry and Datadog provide instrumentations as part of their SDKs, with varying amounts of coverage between them.

Datadog SDKs support adding instrumentations from OpenTelemetry alongside their original instrumentations. This gives users the same experience using OpenTelemetry instrumentations with Datadog SDKs as with the OpenTelemetry SDK.

## Language support

{{< tabs >}}

{{% tab "Java" %}}

## Compatibility requirements

Support for adding OpenTelemetry instrumentations at runtime was introduced in v1.35.0 of Datadog's SDK for Java.

Each instrumentation should be packaged as an OpenTelemetry [extension](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/examples/extension/README.md).
The SDK also accepts selected individual instrumentation jars produced by OpenTelemetry's [opentelemetry-java-instrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main) build,
for example the [CFX instrumentation jar](https://search.maven.org/search?q=a:opentelemetry-javaagent-jaxws-2.0-cxf-3.0).

**Note**: Use of OpenTelemetry incubator APIs is not currently supported.

## Getting started

To begin using an OpenTelemetry instrumentation with the Datadog SDK for Java:
1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to true
2. Download (or build) the OpenTelemetry instrumentation as an extension jar
3. Set the `otel.javaagent.extensions` system property or the `OTEL_JAVAAGENT_EXTENSIONS` environment variable to
   the path to the extension jar

## Configuration

All configuration options below have system property and environment variable equivalents.
If the same key type is set for both, the system property configuration takes priority.
System properties can be set as JVM flags.

`dd.trace.otel.enabled`
: **Environment Variable**: `DD_TRACE_OTEL_ENABLED`<br>
**Default**: `false`<br>
Must be set to `true` to enable use of OpenTelemetry instrumentations.

`otel.javaagent.extensions`
: **Environment Variable**: `OTEL_JAVAAGENT_EXTENSIONS`<br>
**Default**: `false`<br>
A comma-separated list of paths to extension jar files, or folders containing extension jar files.

OpenTelemetry's [Agent Configuration](https://opentelemetry.io/docs/zero-code/java/agent/configuration/) page describes additional properties which are also recognized by the Datadog SDK.

## Verified OpenTelemetry Instrumentations

| Instrumentation Name | Source Location  | Maven Artifact  |
|----------------------|------------------|-----------------|
| `cxf`                | [instrumentation/jaxws/jaxws-2.0-cxf-3.0/javaagent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/jaxws/jaxws-2.0-cxf-3.0/javaagent) | [opentelemetry-javaagent-jaxws-2.0-cxf-3.0](https://search.maven.org/search?q=a:opentelemetry-javaagent-jaxws-2.0-cxf-3.0) |

{{% /tab %}}

{{% tab "Python" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}}

{{% tab "Ruby" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}}

{{% tab "Go" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}}

{{% tab "NodeJS" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}}

{{% tab "PHP" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}}

{{% tab ".NET" %}}

## Compatibility requirements

## Getting started

## Configuration

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
