---
title: Send Data to Datadog
aliases:
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
---

## Overview

There are multiple ways to send OpenTelemetry data to Datadog. Choose the method that best fits your infrastructure and requirements:

### Use the OpenTelemetry Collector

**Best for**: New or existing OTel users that want a completely vendor-neutral setup.

The OpenTelemetry Collector with Datadog Exporter provides:
- Complete vendor neutrality for sending OpenTelemetry data to Datadog
- Flexible deployment options
- No need to install the Datadog Agent or tracing libraries

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Learn more about using the OTel Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Use OTLP Ingest in the Datadog Agent 

**Best for**: Environments already using the Datadog Agent or requiring Agent-based features.

OTLP Ingest in the Datadog Agent provides:
- Native integration with Datadog Agent features
- Streamlined deployment with existing Agent infrastructure

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Learn more about using OTLP ingest in the Agent{{< /nextlink >}}
{{< /whatsnext >}}


### Use the OTLP intake endpoint 

**Best for**: Environments where you need a direct connection without additional infrastructure.

The OTLP Intake Endpoint provides:
- Direct data transmission without additional components
- Simplified setup and maintenance

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/intake_endpoint" >}}Learn more about using the intake endpoint{{< /nextlink >}}
{{< /whatsnext >}}

### Use OpenTelemetry API with Datadog's tracing library

**Best for**: Organizations wanting vendor-neutral instrumentation while accessing Datadog's full feature set.

This approach provides:
- Access to all Datadog's advanced features
- Vendor-neutral code for custom instrumentation
- A migration path for OpenTelemetry-instrumented applications

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/api_support" >}}Learn more about using the OpenTelemetry API with Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}