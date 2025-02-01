---
title: Datadog OTLP Intake Endpoint
further_reading:
- link: "/opentelemetry/setup"
  tag: "Documentation"
  text: "Send Data to Datadog"
---

{{< callout header="false" btn_hidden="true">}}
  The Datadog OTLP intake endpoint is in Preview.
{{< /callout >}} 

## Overview

Datadog's OpenTelemetry protocol (OTLP) intake API endpoint allows you to send observability data directly to Datadog. With this feature, you don't need to run the [Datadog Agent][1] or [OpenTelemetry Collector + Datadog Exporter][2].

You might prefer this option if you're looking for a straightforward setup and want to send traces directly to Datadog without using the Datadog Agent or OpenTelemetry Collector.

- [OTLP logs intake endpoint][3]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/intake_endpoint/otlp_logs
