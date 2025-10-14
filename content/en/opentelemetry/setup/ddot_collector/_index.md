---
title: Datadog Distribution of OpenTelemetry Collector
aliases:
- "/opentelemetry/agent/"
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-distribution-otel-collector/"
  tag: "Blog"
  text: "Unify OpenTelemetry and Datadog with the DDOT Collector"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning"><strong>The Datadog Distribution of OpenTelemetry Collector (DDOT) is not yet FedRAMP/FIPS compliant.</strong><br>
&bull; If you require a FedRAMP or FIPS-compliant data collection pipeline, use the <a href="/agent/configuration/fips-compliance/?tab=linux">FIPS-enabled Datadog Agent</a>.<br>
&bull; If you are a GovCloud customer whose only requirement is data residency in the GovCloud (US1-FED) data center, you <strong>may</strong> use the DDOT Collector.</div>
{{< /site-region >}}

{{< callout btn_hidden="true" >}}
The DDOT Collector for Kubernetes is <strong>Generally Available</strong>. You can get started by following the <a href="#get-started">instructions below</a>.
<br><br>
Deploying the DDOT Collector on Linux-based bare-metal hosts and virtual machines is <strong>in Preview</strong>. To get started, follow the <a href="/opentelemetry/setup/ddot_collector/install/linux">Linux documentation</a>.
{{< /callout >}}

## Overview

The Datadog distribution of OpenTelemetry (DDOT) Collector is an open source solution that combines the flexibility of OpenTelemetry (OTel) with the comprehensive observability capabilities of Datadog. This integrated solution includes:

- A curated set of [OpenTelemetry components](#included-components) optimized for performance and reliability with Datadog, with ability to add additional components of your choosing
- Full data collection and processing capabilities of the Datadog Agent for seamless integration and robust monitoring, including [Datadog Fleet Automation][9] support for the DDOT Collector (see [Key benefits](#key-benefits))
- [Custom Datadog components](#custom-datadog-components) designed to deliver the best onboarding experience

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." style="width:100%;" >}}

## Key benefits

The DDOT Collector offers:

### Comprehensive observability

- Access {{< translate key="integration_count" >}} Datadog integrations, [Live Container Monitoring][3], [Cloud Network Monitoring][7], and [Universal Service Monitoring][5] (with eBPF) and more
- Leverage OpenTelemetry community-contributed integrations to collect telemetry in OpenTelemetry Protocol (OTLP) native format
- Control your OTLP data with the Collector's processing and routing capabilities

### Simplified fleet management

- Remotely manage fleets of DDOT Collectors with [Datadog Fleet Automation][9]
- Gain visibility into your entire configuration, dependencies, and runtime environment
- Onboard faster with out-of-the-box tagging enrichment for OTLP data, automatically enabling [unified service tagging][1]

### Enterprise reliability and resources

- Benefit from Datadog's robust security practices, including regular vulnerability scans and analysis
- Access Datadog's global support team for assistance with onboarding and troubleshooting

## Included components

<div class="alert alert-info">
  <strong>Need additional OpenTelemetry components?</strong> If you need components beyond those included in the default package, follow <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> to extend the Datadog Agent's capabilities. For a list of components included by default, see the following  <a href="#opentelemetry-collector-components">OpenTelemetry Collector components</a> section.
</div>

### Support levels

Datadog provides different levels of support depending on the type of component:

- **Datadog Supported Components**: Datadog-owned components such as the [Datadog Connector][44], [Datadog Exporter][38], and [Infra Attribute Processor][50]. These components are maintained by Datadog, receive regular updates, and are prioritized for bug fixes and feature enhancements within OpenTelemetry community guidelines.

- **Community Supported Components**: [OpenTelemetry components](#opentelemetry-collector-components) included with the Agent by default. Datadog ensures these components are secure, stable, and compatible with the Agent.

- **Custom Components**: OpenTelemetry components that are not included with the Agent by default and are added through the [custom components process][2]. Datadog provides guidance on the integration process but does not provide direct support for these components' functionality. For issues with custom components, Datadog recommends engaging with the OpenTelemetry community or the component maintainers.

### OpenTelemetry Collector components

By default, the DDOT Collector ships with the following Collector components. You can also see the list in [YAML format][11].

{{% collapse-content title="Receivers" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="Processors" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- routingprocessor (deprecated and removed in v7.71.0; use the [routingconnector][56] instead)
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exporters" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Connectors" level="p" %}}

- [datadogconnector][44]
- [routingconnector][56] (available since version 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensions" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### Custom Datadog components

In addition to standard OpenTelemetry components, Datadog provides and maintains the following custom components:

{{% collapse-content title="Datadog components" level="p" %}}

- [Infrastructure Attribute Processor][50]: An OpenTelemetry processor component that automatically assigns [Kubernetes tags][53] to OTLP telemetry (metrics, traces, and logs) emitted by a pod or an individual container within a pod. This component enables [unified service tagging][54] and telemetry correlation for monitoring Kubernetes environments.

- [Converter][51]: An OpenTelemetry converter component that enhances user-provided configurations. It offers an API to return both the original and enhanced configurations, automatically checking for known misconfigurations to reduce errors. This ensures seamless integration of existing OpenTelemetry Collector configurations with the Agent.

- [DD Flare Extension][52]: An OpenTelemetry extension component for generating Agent Flare, which contains diagnostic information from both the DDOT Collector and the Agent for troubleshooting purposes.

{{% /collapse-content %}}

## Get started

Whether you're new to Datadog or already familiar with OpenTelemetry, the following guides help you get started according to your specific situation.

### Quick start with the default Agent package

The default Datadog Agent package includes a DDOT Collector with a [curated set of included OpenTelemetry components](#included-components) designed to meet most needs out of the box. This guide is suitable if you're:

- Setting up monitoring from scratch without needing OpenTelemetry components outside the [included components](#included-components)
- Using the Datadog Agent and want to test OpenTelemetry functionality with included components
- Transitioning from OpenTelemetry Collector to Datadog Agent without requiring components beyond those included by default
- (Optional) If you need OpenTelemetry components beyond what's provided in the default package, follow [Use Custom OpenTelemetry Components][2] to extend the Datadog Agent's capabilities.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}Quick start with the default Agent package{{< /nextlink >}}
{{< /whatsnext >}}

### Migrate from OpenTelemetry Collector to Datadog Agent

This guide helps you migrate from an existing OpenTelemetry Collector setup to the Datadog Agent, including scenarios where you need additional OpenTelemetry components. This guide is suitable if you're:

- Transitioning from OpenTelemetry Collector while preserving your existing setup
- Migrating your existing OpenTelemetry configurations to maintain continuity
- (Optional) If you need OpenTelemetry components beyond what's provided in the default package, follow [Use Custom OpenTelemetry Components][2] to extend the Datadog Agent's capabilities

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}Migrate from OpenTelemetry Collector to Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /opentelemetry/setup/ddot_collector/custom_components
[3]: /containers/
[4]: /security/sensitive_data_scanner/
[5]: /universal_service_monitoring/
[7]: /network_monitoring/cloud_network_monitoring/
[9]: /agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[51]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/converter#readme
[52]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/ddflareextension#readme
[53]: /containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags
[54]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[55]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
[56]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md
