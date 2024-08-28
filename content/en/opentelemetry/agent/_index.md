---
title: Datadog Agent with Embedded Collector
private: true
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-agent-with-otel-collector/"
  tag: "Blog"
  text: "Unify OpenTelemetry and Datadog with the embedded OTel Collector in the Agent"
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Beta!">}}
  The Datadog Agent with embedded OpenTelemetry Collector is in private beta. To request access, fill out this form.
{{< /callout >}} 

## Overview

The Datadog Agent with embedded OpenTelemetry Collector is an open source Collector distribution that combines the flexibility of OpenTelemetry with the comprehensive observability capabilities of Datadog. This integrated solution includes:

- A carefully selected set of [OpenTelemetry components][8] optimized for performance and reliability with Datadog, synchronized with the OpenTelemetry Contrib repository.
- Full data collection and processing capabilities provided by the Datadog Agent, ensuring seamless integration and robust monitoring.
- Built-in Datadog pipelines and extensions designed to deliver the best onboarding experience, enabling you to quickly leverage Datadog's full potential.

{{< img src="/opentelemetry/embedded_collector/architecture.png" alt="Architecture overview for Collector embedded in the Datadog Agent." style="width:100%;" >}}

## Key benefits

- **Access comprehensive observability**: Gain access to Datadog's extensive observability solutions, including 750+ integrations, Live Container Monitoring, Network Performance Monitoring, and Universal Service Monitoring (via eBPF), alongside your existing OpenTelemetry capabilities with the embedded OTel Receivers, Processors, and Exporters. Simultaneously leverage the growing number of OTel community-contributed integrations to collect telemetry in OTLP native format, and exercise control over your OTLP data with full access to the Collector's powerful processing and routing capabilities.
- **Simplified fleet management**: Remotely manage fleets of embedded OpenTelemetry Collectors with Datadog Fleet Automation. Onboard faster without manual configurations, benefiting from out-of-the-box data enrichment with universal service tagging and Kubernetes tag extraction for your OTLP data.
- **Dedicated support**: Receive dedicated assistance for onboarding and troubleshooting from Datadog's global support team when using the Datadog Agent with the embedded OTel Collector and Datadog's observability platform. Take advantage of enterprise-grade support and resources to ensure a smooth experience.

- **Data enrichment**: Receive out-of-the-box data enrichment with [universal service tagging][1] and [Kubernetes tag extraction][2], combined with [Container Monitoring][3] that leverages both OpenTelemetry-native data and Datadog's specialized data.
- **Advanced data processing**: Access advanced data processing at the edge using OpenTelemetry (like tail-based sampling) with Datadog's native capabilities (such as [Sensitive Data Scanning][4]) for efficient and secure data handling.
- **Flexibility with Datadog features**: Maintain OpenTelemetry compatibility accessing advanced Datadog products and features, including [Universal Service Monitoring][5] (USM) and [Network Performance Monitoring][7] (NPM).

## Get started

{{< whatsnext desc="Choose the guide based on your current setup and requirements:" >}}
    {{< nextlink href="/opentelemetry/agent/install_agent_with_collector" >}}Start from scratch with a new Datadog Agent and no prior OpenTelemetry configuration{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/agent/agent_with_custom_components" >}}Use custom OpenTelemetry components that aren't included in the default Agent{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/agent/migration" >}}Migrate an existing OpenTelemetry Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /containers/kubernetes/tag/
[3]: /containers/
[4]: /sensitive_data_scanner/
[5]: /universal_service_monitoring/
[6]: /universal_service_monitoring/
[7]: /network_monitoring/performance/
[8]: /opentelemetry/agent/install_agent_with_collector#included-components