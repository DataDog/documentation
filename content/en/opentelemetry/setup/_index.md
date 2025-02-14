---
title: Send Data to Datadog
aliases:
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
---

There are multiple ways to send OpenTelemetry data to Datadog. Choose the method that best fits your infrastructure and requirements:

| Method                       | Best For                                                                 | Key Benefits                                                                                                        | Documentation                                 |
|------------------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| <strong>OTLP Ingest in Datadog Agent</strong> | Existing Datadog users or teams requiring Agent-based features           | <ul><li>Access to Agent-based features</li><li>Live Container Monitoring</li><li>Cloud Network Monitoring</li></ul> | [Send data using OTLP ingest in the Agent][1] |
| <strong>Full OTel</strong>      | New or existing OTel users wanting a vendor-neutral setup                | <ul><li>Complete vendor neutrality</li><li>Tail-based sampling</li><li>Data transformations</li></ul>               | [Send data using the OTel Collector][2]       |
| <strong>OTLP Intake Endpoint</strong>         | Situations requiring direct connection without additional infrastructure | <ul><li>Direct data transmission</li><li>No additional components needed</li>                                       | [Send data using the intake endpoint][3]      |

<div class="alert alert-info"><strong>Still not sure which setup is right for you?</strong></br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/otlp_ingest_in_the_agent
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/intake_endpoint
