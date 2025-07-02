---
title: Correlate Data
description: Learn how to correlate your OpenTelemetry traces, metrics, logs, and other telemetry in Datadog to get a unified view of your application's performance.
aliases:
  - /opentelemetry/otel_logs/
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
---

## Overview

Getting a unified view of your application's performance requires connecting its traces, metrics, logs, and user interactions. This guide provides the steps to correlate your OpenTelemetry data in Datadog, allowing you to seamlessly navigate between all related telemetry in a single view.

Foundational Tagging: The Prerequisite for All Correlation
To tie your telemetry together, Datadog uses three standard tags: env, service, and version. Configuring these tags is the most critical step for enabling correlation across the Datadog platform.

When using OpenTelemetry, you set these tags by defining a standard set of resource attributes. Datadog automatically maps these attributes to the correct tags.

OpenTelemetry Resource Attribute

Datadog Tag

service.name

service

deployment.environment

env

service.version

version

You can set these attributes in your application's environment variables, SDK, or in the OpenTelemetry Collector.

Configuration
{{< tabs >}}
{{% tab "Environment Variables" %}}

Set the OTEL_RESOURCE_ATTRIBUTES environment variable with your service's information:

export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"

{{% /tab %}}
{{% tab "SDK" %}}

Create a Resource with the required attributes and associate it with your TracerProvider in your application code.

Here's an example using the OpenTelemetry SDK for Python:

from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
    "service.name": "<SERVICE>",
    "deployment.environment": "<ENV>",
    "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)

{{% /tab %}}
{{% tab "Collector" %}}

Use the transform processor in your Collector configuration to set the resource attributes on your telemetry data:

processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["service.name"], "my-service")
          - set(attributes["deployment.environment"], "production")
          - set(attributes["service.version"], "1.2.3")

{{% /tab %}}
{{< /tabs >}}

Correlating Core Telemetry
Traces and Metrics
Why it matters: Connecting traces to infrastructure metrics allows you to pivot from a slow request directly to the CPU and memory metrics of the host it ran on, helping you instantly determine if resource contention was the root cause.

Essential Attributes
Correlation between traces and infrastructure metrics relies on the following resource attributes:

host.name: For correlating with host metrics (CPU, memory, disk).

container.id: For correlating with container metrics.

Setup Instructions
Enable the Host Metrics Receiver
To collect system metrics, enable the hostmetrics receiver in your OpenTelemetry Collector configuration. This receiver gathers metrics like CPU, memory, disk, and network usage.

Add the following to your Collector configuration file (config.yaml):

receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      cpu:
      disk:
      load:
      filesystem:
      memory:
      network:
      paging:
      processes:

service:
  pipelines:
    metrics:
      receivers: [hostmetrics]
      # ... other processors and exporters

Ensure Consistent Host and Container Tagging
For correlation to work, the host.name (or container.id) attribute on your traces must match the corresponding attribute on the metrics collected by the hostmetrics receiver. The OpenTelemetry Collector running as an agent on the host typically discovers this automatically.

Traces and Logs
Why it matters: Connecting traces and logs allows you to jump from a specific span in a trace to the exact logs that were generated during that operation, making debugging faster and more intuitive.

{{< alert "warning" >}}
Previous documentation that described complex, language-specific conversions of span_id is outdated and no longer necessary.
{{< /alert >}}

Connecting traces and logs has been simplified. The only requirement is to inject the active trace_id and span_id from your application's trace context into your logs.

Setup Instructions
Configure Automatic Context Injection
Most OpenTelemetry logging instrumentation can automatically inject the active trace context into your logs. Ensure this feature is enabled for your logging library. Your logs must be sent in JSON format for Datadog to parse the attributes correctly.

Verify the Log Output
After configuration, your JSON logs should contain the trace_id and span_id attributes, which Datadog uses to link the log to the exact trace and span that was active when the log was generated.

Here is an example of a properly formatted JSON log entry:

{
  "timestamp": 1720557413000,
  "level": "INFO",
  "message": "Processing user request",
  "service": "my-service",
  "env": "production",
  "version": "1.2.3",
  "trace_id": "8738839999436033394",
  "span_id": "1006654203791334032"
}

{{< alert "info" >}}
For complete, working examples of trace and log correlation for various languages, see the <a href="https://github.com/DataDog/opentelemetry-examples" target="_blank">Datadog OpenTelemetry Examples repository</a>.
{{< /alert >}}

Correlating with Datadog Products
Real User Monitoring (RUM)
Why it matters: By connecting RUM and APM, you can follow a user's journey from a slow button click on your website all the way to the specific backend database query that caused the delay.

This is achieved by configuring the RUM SDK to inject trace context headers into requests made to your backend. The default injection style is tracecontext, Datadog.

{{< tabs >}}
{{% tab "Browser" %}}

Ensure you have completed the standard Browser RUM setup.

Modify allowedTracingUrls in your RUM SDK initialization to specify which propagator to use for which backend endpoint.

import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    // ...otherConfig,
    allowedTracingUrls: [
      { match: "[https://api.example.com](https://api.example.com)", propagatorTypes: ["tracecontext"]}
    ]
})
```propagatorTypes` accepts a list of desired propagators:
  - `datadog`: Datadog's propagator (`x-datadog-*`)
  - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
  - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
  - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)


{{% /tab %}}
{{% tab "iOS" %}}

Ensure you have completed the standard iOS RUM setup.

Use .traceWithHeaders(hostsWithHeaders:sampleRate:) to specify which tracing headers to inject for requests to your backend hosts.

RUM.enable(
    with: RUM.Configuration(
        applicationID: "<rum application id>",
        urlSessionTracking: .init(
            firstPartyHostsTracing: .traceWithHeaders(
                hostsWithHeaders: [
                    "api.example.com": [.tracecontext]
                ],
                sampleRate: 100
            )
        )
    )
)
```TracingHeaderType` is an enum that includes `.datadog`, `.tracecontext`, `.b3`, and `.b3multi`.


{{% /tab %}}
{{% tab "Android" %}}

Ensure you have completed the standard Android RUM setup.

Configure your OkHttpClient interceptor with a map of your backend hosts and the desired TracingHeaderType for each.

val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                        "example.eu" to setOf(TracingHeaderType.DATADOG))

val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
    .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```TracingHeaderType` is an enum that includes `.DATADOG`, `.TRACECONTEXT`, `.B3`, and `.B3MULTI`.


{{% /tab %}}
{{< /tabs >}}

For React Native, Flutter, and Kotlin Multiplatform, refer to the platform-specific RUM documentation for configuring firstPartyHosts, firstPartyHostsWithTracingHeaders, or the datadogKtorPlugin respectively.

Database Monitoring (DBM)
Why it matters: Connect backend traces to detailed database performance data in Datadog, including query metrics and execution plans, to identify the exact queries that are slowing down your application.

Step 1: Instrument Your Database Spans
For DBM correlation to work, your database spans must include the following attributes.

Attribute

Description

Example

span.type

Required. The type of span. Must be sql, postgres, mysql, or sql.query.

sql

span.service

Required. The name of the service executing the query. This should match your foundational service tag.

my-web-app

span.resource

Required. The raw SQL query text. This is critical for Datadog's obfuscation and normalization.

SELECT * FROM users WHERE id = ?

db.name

The logical database or schema name being queried.

user_accounts

db.system

The database technology.

postgres

Step 2: Configure Your Ingest Path
Depending on how you send traces to Datadog, you may need to enable specific feature gates to ensure database spans are processed correctly.

{{< tabs >}}
{{% tab "OTel Collector" %}}

OpenTelemetry Collector with Datadog Exporter

When starting the Collector, enable the datadog.EnableOperationAndResourceNameV2 feature gate. This gate is available in v0.118.0 and later.

otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableOperationAndResourceNameV2

{{% /tab %}}
{{% tab "Datadog Agent (OTLP Ingest)" %}}

Datadog Agent with OTLP Ingest

In your Datadog Agent configuration, ensure the DD_APM_FEATURES environment variable includes enable_operation_and_resource_name_logic_v2. For more information, see the Agent Configuration Documentation.

{{% /tab %}}
{{% tab "Datadog Agent (Embedded OTel)" %}}

Datadog Agent with embedded OTel Collector

If you are using the Datadog Helm chart (v3.107.0 or later), set the feature gates in your values.yaml. For more information, see the Datadog Helm Chart Documentation.

datadog:
  otelCollector:
    featureGates: datadog.EnableOperationAndResourceNameV2

{{% /tab %}}
{{< /tabs >}}

APM and Infrastructure
Why it matters: Connecting your APM traces to Kubernetes metrics allows you to view pod and container performance directly in the Infrastructure tab of the APM Service Page.

This correlation requires configuring specific receivers in your OpenTelemetry Collector to gather Kubernetes metrics.

{{< alert "info" >}}
This feature is in active development. Detailed documentation on configuring the required Kubernetes receivers is forthcoming.
{{< /alert >}}

What's Next?
Now that your telemetry is correlated, you can explore the unified views in Datadog:

Service Catalog: View the health of all your services in one place.

Trace Explorer: Search and analyze individual requests as they travel across your services.

Log Explorer: Search and filter all your logs, and pivot to related traces with a single click.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}