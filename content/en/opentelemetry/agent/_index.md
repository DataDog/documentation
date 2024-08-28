---
title: Datadog Agent with Embedded Collector
private: true
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Beta!">}}
  The Datadog Agent with embedded OpenTelemetry Collector is in private beta. To request access, fill out this form.
{{< /callout >}} 

## Overview

The Datadog Agent with embedded OpenTelemetry Collector is an open source Collector distribution that combines the flexibility of OpenTelemetry with the comprehensive observability capabilities of Datadog. This integrated solution includes:

- Built-in Datadog pipelines and extensions
- Support for traces, metrics, and logs
- A curated set of components for optimal performance with Datadog

{{< img src="/opentelemetry/embedded_collector/architecture.png" alt="Architecture overview for Collector embedded in the Datadog Agent." style="width:100%;" >}}

## Key benefits

- **Data enrichment**: Receive out-of-the-box data enrichment with [universal service tagging][1] and [Kubernetes tag extraction][2], combined with [Container Monitoring][3] that leverages both OpenTelemetry-native data and Datadog's specialized data.
- **Advanced data processing**: Access advanced data processing at the edge using OpenTelemetry (like tail-based sampling) with Datadog's native capabilities (such as [Sensitive Data Scanning][4]) for efficient and secure data handling.
- **Flexibility with Datadog features**: Maintain OpenTelemetry compatibility accessing advanced Datadog products and features, including [Universal Service Monitoring][5] (USM) and [Network Performance Monitoring][7] (NPM).

## Get started

{{< whatsnext desc="Choose the guide based on your current setup and requirements:" >}}
    {{< nextlink href="/opentelemetry/agent/install_agent_with_collector" >}}Start from scratch with a new Datadog Agent and no prior OpenTelemetry configuration{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/agent/agent_with_custom_components" >}}Use custom OpenTelemetry components that aren't included in the default Agent{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/agent/migration" >}}Migrate an existing OpenTelemetry Collector{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /containers/kubernetes/tag/
[3]: /containers/
[4]: /sensitive_data_scanner/
[5]: /universal_service_monitoring/
[6]: /universal_service_monitoring/
[7]: /network_monitoring/performance/