---
title: Set Up Server-Side Flag Evaluation Metrics
description: Configure the Datadog Agent and your application to emit and visualize flag evaluation metrics for server-side feature flags.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Documentation"
  text: "Feature Flag Graphs"
- link: "/metrics/"
  tag: "Documentation"
  text: "Metrics"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
---

## Overview

Flag evaluation metrics let you measure how often each variant of a feature flag is returned by your server-side application. Use these metrics to track flag adoption over time, verify targeting rules are working as expected, and graph flag evaluation data on dashboards.

<div class="alert alert-warning">The <code>feature_flag.evaluations</code> metric is experimental and may change or be removed in a future release.</div>

## Prerequisites

Before setting up flag evaluation metrics, confirm the following:

- [Server-side feature flags][1] are already configured.
- Datadog Agent 7.32.0 or later is running.
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` is set on your application.
- Your server-side tracer meets the minimum version for flag evaluation metrics support:

| Language | Minimum tracer version |
| -------- | ---------------------- |
| .NET     | 3.44.0                 |
| Go       | 2.8.0                  |
| Java     | 1.62.0                 |
| Node.js  | 5.99.0                 |
| PHP      | 1.21.1                 |
| Python   | 4.7.0                  |
| Ruby     | 2.32.0                 |

## Step 1: Enable the Agent OTLP receiver

Flag evaluation metrics are emitted over OpenTelemetry (OTLP). The Datadog Agent includes an OTLP receiver that is off by default. For setup instructions, see [OTLP Ingestion by the Datadog Agent][2].

You only need to enable the protocol your application uses (gRPC on port 4317, or HTTP on port 4318).

<div class="alert alert-info">If you are running Agent v7.61.0 or later in Docker, set <code>HOST_PROC=/proc</code> on the Agent container to work around a known issue with the OTLP pipeline.</div>

## Step 2: Configure your application

For all tracers except Java, set the following environment variable in addition to the standard [server-side feature flag configuration][1]. For Java, `DD_METRICS_OTEL_ENABLED` has no effect; see the [Java: Add the OpenTelemetry SDK dependencies](#java-add-the-opentelemetry-sdk-dependencies) section instead.

{{< code-block lang="bash" >}}
# Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

### Java: Add the OpenTelemetry SDK dependencies

The Java provider records `feature_flag.evaluations` through the OpenTelemetry SDK and exports it over OTLP, so the `opentelemetry-sdk-metrics` and `opentelemetry-exporter-otlp` dependencies must be on your application's classpath. Add them alongside your [Java feature flag dependencies][6]. Import the OpenTelemetry BOM so the OpenTelemetry API and SDK stay on the same version:

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation platform('io.opentelemetry:opentelemetry-bom:1.47.0')
    implementation 'io.opentelemetry:opentelemetry-sdk-metrics'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    implementation(platform("io.opentelemetry:opentelemetry-bom:1.47.0"))
    implementation("io.opentelemetry:opentelemetry-sdk-metrics")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
{{< code-block lang="xml" filename="pom.xml" >}}
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.opentelemetry</groupId>
            <artifactId>opentelemetry-bom</artifactId>
            <version>1.47.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk-metrics</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

On the Java tracer, the provider starts its OTLP metrics exporter automatically when the OpenTelemetry SDK is on the classpath. If the dependencies are missing, no metrics are emitted and the tracer logs `OpenTelemetry SDK is not on the classpath`.

<div class="alert alert-info">In Spring Boot applications, Spring Boot's OpenTelemetry autoconfiguration also creates an <code>OpenTelemetrySdk</code> bean. If the OpenTelemetry SDK version it resolves does not match the OpenTelemetry API version on the classpath, startup fails with a <code>BeanCreationException</code> for the <code>openTelemetry</code> bean and <code>NoClassDefFoundError: io/opentelemetry/sdk/internal/ScopeConfigurator</code>. Importing the <code>opentelemetry-bom</code> as shown above keeps the API and SDK on the same version and resolves the error.</div>

### Ruby: Add the OpenTelemetry metrics gems

For Ruby applications, add the OpenTelemetry metrics SDK and OTLP metrics exporter gems to your application bundle:

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
{{< /code-block >}}

Install the gems with `bundle install`. These gems provide the OpenTelemetry meter provider and OTLP metrics exporter. The Ruby tracer uses them when `DD_METRICS_OTEL_ENABLED=true` is set. If the gems are missing, the Ruby tracer does not emit `feature_flag.evaluations` metrics and logs `Failed to load OpenTelemetry metrics gems`.

### Endpoint configuration

By default, most tracers send OTLP metrics to the Agent at `DD_AGENT_HOST` on port `4318` (HTTP). If your application already sets `DD_AGENT_HOST` to reach the Agent, no endpoint configuration is required.

Set an OTLP endpoint explicitly in any of these cases:

- The Agent is not reachable at `DD_AGENT_HOST` on the default OTLP port (for example, a remote Agent or a non-default port).
- You use the **Java** tracer. Its flag evaluation metrics exporter supports OTLP/HTTP only (gRPC is not supported) on port `4318`. The Java tracer does not derive the endpoint from `DD_AGENT_HOST` and defaults to `http://localhost:4318`. Set `OTEL_EXPORTER_OTLP_ENDPOINT` to the Agent's HTTP endpoint when the Agent is not on `localhost`.
- You use the **Python** tracer. The Python tracer defaults to gRPC on port `4317`, not HTTP. Enable the gRPC OTLP receiver on the Agent, or override the protocol to use HTTP instead:

{{< code-block lang="bash" >}}
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
{{< /code-block >}}

To set the endpoint, use the standard OpenTelemetry variable:

{{< code-block lang="bash" >}}
# Point OTLP data at the Datadog Agent (HTTP, port 4318)
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318

# Or use gRPC (port 4317). For most tracers, the default protocol is http/protobuf,
# so set the protocol explicitly when switching to gRPC:
# OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4317
# OTEL_EXPORTER_OTLP_PROTOCOL=grpc
{{< /code-block >}}

Replace `<AGENT_HOST>` with the hostname or IP address of your Datadog Agent.

Docker Compose example:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
services:
  datadog-agent:
    environment:
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
      - HOST_PROC=/proc  # If running Agent v7.61.0+ in Docker

  app-go:
    environment:
      - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
      - DD_METRICS_OTEL_ENABLED=true
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://datadog-agent:4318
    depends_on:
      datadog-agent:
        condition: service_healthy
{{< /code-block >}}

## Step 3: Verify metrics are flowing

After deploying, confirm metrics are reaching Datadog:

1. Go to [Metrics Explorer][3] and search for `feature_flag.evaluations`.
2. If the metric does not appear within a few minutes of your application evaluating flags, check:
   - The Agent OTLP receiver is enabled and the correct port is exposed.
   - `OTEL_EXPORTER_OTLP_ENDPOINT` points to the Agent, not a separate collector.
   - Your application is actively evaluating flags with a server SDK at runtime (the code path is being executed).

## Step 4: Enable metric retention

By default, `feature_flag.evaluations` retains only one hour of data. To retain a longer history:

1. Go to [Metrics Summary][4] and search for `feature_flag.evaluations`.
2. Select the metric and enable **Historical Metrics**.

This is an opt-in setting and is not enabled automatically for OTLP metrics.

## Graph flag evaluations on a dashboard

Use the following query to graph flag evaluations by flag key and variant on a [dashboard][5]:

{{< code-block lang="text" >}}
sum:feature_flag.evaluations{*} by {feature_flag.key,feature_flag.result.variant}
{{< /code-block >}}

The `feature_flag.evaluations` metric is a counter with the following tags:

| Tag                                  | Description                                        |
| ------------------------------------ | -------------------------------------------------- |
| `feature_flag.key`                   | The flag key being evaluated                       |
| `feature_flag.result.variant`        | The variant returned by the evaluation             |
| `feature_flag.result.reason`         | The reason for the evaluation result               |
| `feature_flag.result.allocation_key` | The identifier for the evaluated targeting rules (emitted only when present) |
| `error.type`                         | The error type (emitted only on error evaluations) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/server/
[2]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /dashboards/
[6]: /feature_flags/server/java/#installation
