---
title: Datadog Distribution of OpenTelemetry Collector
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  Distribution of OpenTelemetry Collector
---

# Datadog Distribution of OpenTelemetry Collector

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com



{% alert level="danger" %}
**The Datadog Distribution of OpenTelemetry Collector (DDOT) is not yet FedRAMP/FIPS compliant.**• If you require a FedRAMP or FIPS-compliant data collection pipeline, use the [FIPS-enabled Datadog Agent](http://localhost:1313/agent/configuration/fips-compliance/?tab=linux).• If you are a GovCloud customer whose only requirement is data residency in the GovCloud (US1-FED) data center, you **may** use the DDOT Collector.
{% /alert %}


{% /callout %}

{% callout %}
##### Join the Preview!

The DDOT Collector for Kubernetes is **Generally Available**. You can get started by following the instructions below.Deploying the DDOT Collector on Linux-based bare-metal hosts and virtual machines is **in Preview**. To get started, follow the [Linux documentation](http://localhost:1313/opentelemetry/setup/ddot_collector/install/linux).
{% /callout %}

## Overview{% #overview %}

The Datadog distribution of OpenTelemetry (DDOT) Collector is an open source solution that combines the flexibility of OpenTelemetry (OTel) with the comprehensive observability capabilities of Datadog. This integrated solution includes:

- A curated set of OpenTelemetry components optimized for performance and reliability with Datadog, with ability to add additional components of your choosing
- Full data collection and processing capabilities of the Datadog Agent for seamless integration and robust monitoring, including [Datadog Fleet Automation](http://localhost:1313/agent/fleet_automation/) support for the DDOT Collector (see Key benefits)
- Custom Datadog components designed to deliver the best onboarding experience

{% image
   source="http://localhost:1313/images/opentelemetry/setup/ddot-collector-2.48e827fe0ea4d62cd26a81521e9fa584.png?auto=format"
   alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." /%}

## Key benefits{% #key-benefits %}

The DDOT Collector offers:

### Comprehensive observability{% #comprehensive-observability %}

- Access 1,000 Datadog integrations, [Live Container Monitoring](http://localhost:1313/containers/), [Cloud Network Monitoring](http://localhost:1313/network_monitoring/cloud_network_monitoring/), and [Universal Service Monitoring](http://localhost:1313/universal_service_monitoring/) (with eBPF) and more
- Leverage OpenTelemetry community-contributed integrations to collect telemetry in OpenTelemetry Protocol (OTLP) native format
- Control your OTLP data with the Collector's processing and routing capabilities

### Simplified fleet management{% #simplified-fleet-management %}

- Remotely manage fleets of DDOT Collectors with [Datadog Fleet Automation](http://localhost:1313/agent/fleet_automation/)
- Gain visibility into your entire configuration, dependencies, and runtime environment
- Onboard faster with out-of-the-box tagging enrichment for OTLP data, automatically enabling [unified service tagging](http://localhost:1313/getting_started/tagging/unified_service_tagging/)

### Enterprise reliability and resources{% #enterprise-reliability-and-resources %}

- Benefit from Datadog's robust security practices, including regular vulnerability scans and analysis
- Access Datadog's global support team for assistance with onboarding and troubleshooting

## Included components{% #included-components %}

{% alert level="info" %}
**Need additional OpenTelemetry components?** If you need components beyond those included in the default package, follow [Use Custom OpenTelemetry Components](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components) to extend the Datadog Agent's capabilities. For a list of components included by default, see the following OpenTelemetry Collector components section.
{% /alert %}

### Support levels{% #support-levels %}

Datadog provides different levels of support depending on the type of component:

- **Datadog Supported Components**: Datadog-owned components such as the [Datadog Connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md), [Datadog Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md), and [Infra Attribute Processor](https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme). These components are maintained by Datadog, receive regular updates, and are prioritized for bug fixes and feature enhancements within OpenTelemetry community guidelines.

- **Community Supported Components**: OpenTelemetry components included with the Agent by default. Datadog ensures these components are secure, stable, and compatible with the Agent.

- **Custom Components**: OpenTelemetry components that are not included with the Agent by default and are added through the [custom components process](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components). Datadog provides guidance on the integration process but does not provide direct support for these components' functionality. For issues with custom components, Datadog recommends engaging with the OpenTelemetry community or the component maintainers.

### OpenTelemetry Collector components{% #opentelemetry-collector-components %}

By default, the DDOT Collector ships with the following Collector components. You can also see the list in [YAML format](https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml).

{% collapsible-section %}
Receivers
- [filelogreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md)

- [fluentforwardreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md)

- [hostmetricsreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md)

- [jaegerreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md)

- [otlpreceiver](https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md)

- [prometheusreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md)

- [receivercreator](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md)

- [zipkinreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md)

- [nopreceiver](https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme)

{% /collapsible-section %}

{% collapsible-section %}
Processors
- [attributesprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md)

- [batchprocessor](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md)

- [cumulativetodeltaprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md)

- [filterprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md)

- [groupbyattributeprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md)

- [k8sattributesprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md)

- [memorylimiterprocessor](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md)

- [probabilisticsamplerprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md)

- [resourcedetectionprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md)

- [resourceprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md)

- routingprocessor (deprecated and removed in v7.71.0; use the [routingconnector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md) instead)

- [tailsamplingprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md)

- [transformprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md)

{% /collapsible-section %}

{% collapsible-section %}
Exporters
- [datadogexporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md)

- [debugexporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md)

- [loadbalancingexporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md)

- [otlpexporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md)

- [otlphttpexporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md)

- [sapmexporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md)

- [nopexporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md)

{% /collapsible-section %}

{% collapsible-section %}
Connectors
- [datadogconnector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md)

- [routingconnector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md) (available since version 7.68.0)

- [spanmetricsconnector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md)

{% /collapsible-section %}

{% collapsible-section %}
Extensions
- [healthcheckextension](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md)

- [observer](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md)

- [pprofextension](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md)

- [zpagesextension](https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md)

{% /collapsible-section %}

### Custom Datadog components{% #custom-datadog-components %}

In addition to standard OpenTelemetry components, Datadog provides and maintains the following custom components:

{% collapsible-section %}
Datadog components
- [Infrastructure Attribute Processor](https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme): An OpenTelemetry processor component that automatically assigns [Kubernetes tags](http://localhost:1313/containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags) to OTLP telemetry (metrics, traces, and logs) emitted by a pod or an individual container within a pod. This component enables [unified service tagging](http://localhost:1313/getting_started/tagging/unified_service_tagging/?tab=kubernetes) and telemetry correlation for monitoring Kubernetes environments.

- [Converter](https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/converter#readme): An OpenTelemetry converter component that enhances user-provided configurations. It offers an API to return both the original and enhanced configurations, automatically checking for known misconfigurations to reduce errors. This ensures seamless integration of existing OpenTelemetry Collector configurations with the Agent.

- [DD Flare Extension](https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/ddflareextension#readme): An OpenTelemetry extension component for generating Agent Flare, which contains diagnostic information from both the DDOT Collector and the Agent for troubleshooting purposes.

{% /collapsible-section %}

## Get started{% #get-started %}

Whether you're new to Datadog or already familiar with OpenTelemetry, the following guides help you get started according to your specific situation.

### Quick start with the default Agent package{% #quick-start-with-the-default-agent-package %}

The default Datadog Agent package includes a DDOT Collector with a curated set of included OpenTelemetry components designed to meet most needs out of the box. This guide is suitable if you're:

- Setting up monitoring from scratch without needing OpenTelemetry components outside the included components
- Using the Datadog Agent and want to test OpenTelemetry functionality with included components
- Transitioning from OpenTelemetry Collector to Datadog Agent without requiring components beyond those included by default
- (Optional) If you need OpenTelemetry components beyond what's provided in the default package, follow [Use Custom OpenTelemetry Components](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components) to extend the Datadog Agent's capabilities.

- [Quick start with the default Agent package](http://localhost:1313/opentelemetry/setup/ddot_collector/install/kubernetes)

### Migrate from OpenTelemetry Collector to Datadog Agent{% #migrate-from-opentelemetry-collector-to-datadog-agent %}

This guide helps you migrate from an existing OpenTelemetry Collector setup to the Datadog Agent, including scenarios where you need additional OpenTelemetry components. This guide is suitable if you're:

- Transitioning from OpenTelemetry Collector while preserving your existing setup
- Migrating your existing OpenTelemetry configurations to maintain continuity
- (Optional) If you need OpenTelemetry components beyond what's provided in the default package, follow [Use Custom OpenTelemetry Components](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components) to extend the Datadog Agent's capabilities

- [Migrate from OpenTelemetry Collector to Datadog Agent](http://localhost:1313/opentelemetry/guide/migrate/ddot_collector)

## Further reading{% #further-reading %}

- [Unify OpenTelemetry and Datadog with the DDOT Collector](https://www.datadoghq.com/blog/datadog-distribution-otel-collector/)
