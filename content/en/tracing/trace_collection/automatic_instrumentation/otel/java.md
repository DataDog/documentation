---
title: Using OpenTelemetry Instrumentations with Java
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: "/opentelemetry/interoperability/"
      tag: "Documentation"
      text: "Interoperability with Datadog"
---
## Overview

Datadog SDKs support adding instrumentations from OpenTelemetry alongside their built-in instrumentations.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

