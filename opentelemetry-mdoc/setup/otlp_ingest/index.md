---
title: Datadog OTLP Intake Endpoint
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  OTLP Intake Endpoint
---

# Datadog OTLP Intake Endpoint

{% callout %}
The Datadog OTLP intake endpoint is in Preview. To request access, contact your account representative.
{% /callout %}

## Overview{% #overview %}

Datadog's OpenTelemetry protocol (OTLP) intake API endpoint allows you to send observability data directly to Datadog. With this feature, you don't need to run the [Datadog Agent](http://localhost:1313/opentelemetry/otlp_ingest_in_the_agent/) or [OpenTelemetry Collector + Datadog Exporter](http://localhost:1313/opentelemetry/setup/collector_exporter/).

{% image
   source="http://localhost:1313/images/opentelemetry/setup/direct-ingest.675dcfafdeeca4017efe7eb10ad44571.png?auto=format"
   alt="Diagram: OpenTelemetry SDK sends data directly to Datadog through the intake endpoint." /%}

You might prefer this option if you're looking for a straightforward setup and want to send telemetry directly to Datadog without using the Datadog Agent or OpenTelemetry Collector.

- [OTLP logs intake endpoint](http://localhost:1313/opentelemetry/setup/intake_endpoint/otlp_logs)
- [OTLP metrics intake endpoint](http://localhost:1313/opentelemetry/setup/intake_endpoint/otlp_metrics)

## Further reading{% #further-reading %}

- [Send Data to Datadog](http://localhost:1313/opentelemetry/setup)
