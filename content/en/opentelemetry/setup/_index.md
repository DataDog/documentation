---
title: Send Data to Datadog
aliases:
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "https://www.datadoghq.com/blog/otel-deployments/"
  tag: "Blog"
  text: "How to select your OpenTelemetry deployment"
---

There are multiple ways to send OpenTelemetry data to Datadog. Choose the method that best fits your infrastructure and requirements:

| Method                          | Best For                                                                 | Key Benefits                                                                                                                                                                                                                                  | Documentation                                 |
|---------------------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| <strong>OTel Collector</strong> | New or existing OTel users wanting a vendor-neutral setup                | <ul><li>Complete vendor neutrality</li><li>Send traces, metrics, and logs to Datadog without installing the Datadog Agent or tracing libraries</li><li>Advanced processing capabilities (for example, [tail-based sampling][4])</li></ul> | [Send data using the OTel Collector][2]       |
| <strong>Datadog Agent</strong>  | Existing Datadog users or teams requiring Agent-based features:<ul><li><strong>[DDOT Collector][5]:</strong> Recommended for Kubernetes environments</li><li><strong>[OTLP Ingest][1]:</strong> Recommended for all other environments</li></ul> | <ul><li>Access to full Datadog Agent capabilities</li><li>Enhanced monitoring capabilities including:<ul><li>Fleet Automation</li><li>Live Container Monitoring</li><li>Kubernetes Explorer</li><li>Live Processes</li><li>Cloud Network Monitoring</li><li>Universal Service Monitoring</li><li>{{< translate key="integration_count" >}}+ Datadog integrations</li></ul></li></ul> | [Send data using the Datadog Agent][1] |
| <strong>Agentless Deployment</strong>  | Situations requiring direct connection without additional infrastructure | <ul><li>Direct data transmission</li><li>No additional components needed</li></ul>                                                                                                                                                            | [Send data using the intake endpoint][3]      |

<div class="alert alert-info"><strong>Still not sure which setup is right for you?</strong><br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/agent
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/intake_endpoint
[4]: /opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /opentelemetry/agent
[6]: /opentelemetry/setup/otlp_ingest_in_the_agent
