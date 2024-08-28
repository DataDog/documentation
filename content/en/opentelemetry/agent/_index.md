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

The Datadog Agent with embedded OpenTelemetry (OTel) Collector is an open source Collector distribution that combines the flexibility of OpenTelemetry with the comprehensive observability capabilities of Datadog. This integrated solution includes:

- A curated set of [OpenTelemetry components][8] optimized for performance and reliability with Datadog.
- Full data collection and processing capabilities of the Datadog Agent for seamless integration and robust monitoring
- Built-in Datadog pipelines and extensions designed to deliver the best onboarding experience

{{< img src="/opentelemetry/embedded_collector/architecture.png" alt="Architecture overview for Collector embedded in the Datadog Agent." style="width:100%;" >}}

## Get started

Whether you're new to Datadog or already familiar with OpenTelemetry, the following guides help you get started according to your specific situation.

### Quick start with the default Agent package

The default Datadog Agent package includes an embedded Collector with a [curated set of built-in OpenTelemetry components][8] designed to meet most needs out of the box. This guide is suitable if you're:

- Setting up monitoring from scratch without needing additional OpenTelemetry components
- Using the Datadog Agent and want to test OpenTelemetry functionality with built-in components
- Transitioning from OpenTelemetry Collector to Datadog Agent without requiring extra OpenTelemetry components

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/install_agent_with_collector" >}}Quick start with the default Agent package{{< /nextlink >}}
{{< /whatsnext >}}

### Use custom OpenTelemetry components

If you need OpenTelemetry components beyond what's provided in the default package, you can use the bring-your-OTel-components workflow to extend the Datadog Agent's capabilities. This guide is suitable if you're:

- Adding custom OpenTelemetry components to the Datadog Agent
- Building and deploying a customized Agent image with your required components

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/agent_with_custom_components" >}}Use custom OpenTelemetry components{{< /nextlink >}}
{{< /whatsnext >}}

### Migrate from OpenTelemetry Collector to Datadog Agent

This guide helps you migrate from an existing OpenTelemetry Collector setup to the Datadog Agent, including scenarios where you need additional OpenTelemetry components. This guide is suitable if you're:

- Transitioning from OpenTelemetry Collector while preserving your existing setup
- Migrating your existing OpenTelemetry configurations to maintain continuity
- (Optional) Customizing with additional components beyond the built-in options

Follow this guide to add necessary OpenTelemetry components and migrate your configurations to Datadog, ensuring a smooth transition and maintaining continuity in your observability pipeline.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/migration" >}}Migrate from OpenTelemetry Collector to Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Key benefits

The Datadog Agent with embedded OpenTelemetry Collector offers:

### Comprehensive observability

- Access 750+ Datadog integrations, [Live Container Monitoring][3], [Network Performance Monitoring][7], and [Universal Service Monitoring][5] (with eBPF) and more
- Leverage OpenTelemetry community-contributed integrations to collect telemetry in OpenTelemetry Protocol (OTLP) native format
- Control your OTLP data with the Collector's processing and routing capabilities

### Simplified fleet management

- Remotely manage fleets of embedded OpenTelemetry Collectors with [Datadog Fleet Automation][9]
- Gain visibility into your entire configuration, dependencies, and runtime environment
- Onboard faster with out-of-the-box tagging enrichment for OTLP data, automatically enabling [unified service tagging][1]

### Enterprise reliability and resources

- Benefit from Datadog's robust security practices, including regular vulnerability scans and analysis
- Receive dedicated assistance from Datadog's global support team for onboarding and troubleshooting

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[3]: /containers/
[4]: /sensitive_data_scanner/
[5]: /universal_service_monitoring/
[7]: /network_monitoring/performance/
[8]: /opentelemetry/agent/install_agent_with_collector#included-components
[9]: /agent/fleet_automation/