---
title: DDOT Collector
description: The DDOT Collector is an OpenTelemetry Collector that Datadog builds. Deploy it with OpenTelemetry tooling, and add the Datadog Agent only if you need it.
aliases:
- "/opentelemetry/agent/"
further_reading:
- link: "https://learn.datadoghq.com/courses/using-ddot"
  tag: "Learning Center"
  text: "Using the Datadog Distribution of OpenTelemetry Collector"
- link: "https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/"
  tag: "Blog"
  text: "Instrument and monitor Boomi integration flows with OpenTelemetry and Datadog"
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralize and govern your OpenTelemetry pipeline with the DDOT gateway
- link: "https://www.datadoghq.com/blog/datadog-distribution-otel-collector/"
  tag: "Blog"
  text: "Unify OpenTelemetry and Datadog with the DDOT Collector"
- link: "https://www.datadoghq.com/architecture/monitoring-kubernetes-with-datadog-distribution/"
  tag: "Architecture Center"
  text: "Monitoring Kubernetes with Datadog Distribution of the OpenTelemetry (DDOT) Collector"

---

## Overview

Looking for the DDOT Collector that runs inside the Datadog Agent? See [Collector in the Agent][69].

The Datadog OpenTelemetry (DDOT) Collector is an OpenTelemetry Collector that Datadog builds. Deploy it with standard OpenTelemetry tooling, such as the OpenTelemetry Operator and Helm charts. It sends your telemetry to Datadog without the Datadog Agent.

- **Components**: A [curated set of OpenTelemetry components](#included-components) and [custom Datadog components](#custom-datadog-components).
- **Data it receives**: OTLP from applications instrumented with the OpenTelemetry SDK or the [DDOT SDK][67].
- **Pipelines**: Standard OpenTelemetry Collector configuration. You can route telemetry to Datadog and to other destinations.
- **Support**: Datadog Support troubleshoots the components that [Support levels][57] lists as Datadog-supported.
- **Platforms**: These docs cover the DDOT Collector on Kubernetes. On other platforms, use the [upstream OpenTelemetry Collector][68] or the [Collector in the Agent][64], the OpenTelemetry Collector that runs inside the Datadog Agent.

## Get started

- [Install the DDOT Collector on Kubernetes][65]: Deploy the Collector with the OpenTelemetry Operator or Helm chart, and check that your data arrives.
- [Add the Datadog Agent (optional)][66]: Add the Agent for Datadog features that need it.

## Included components

<div class="alert alert-info">
  <strong>Need additional OpenTelemetry components?</strong> <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> explains how to build a Datadog Agent image with more components for the Collector in the Agent. For the components included by default, see the following <a href="#opentelemetry-collector-components">OpenTelemetry Collector components</a> section.
</div>

### OpenTelemetry Collector versions

The following table shows which OpenTelemetry Collector versions are included in each DDOT release:

| DDOT version | Beta version | Stable version |
|--------------|--------------|----------------|
| 7.84.x       | v0.159.0     | v1.65.0        |
| 7.83.x       | v0.158.0     | v1.64.0        |
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |
| 7.80.x       | v0.152.0     | v1.58.0        |
| 7.79.x       | v0.150.0     | v1.56.0        |
| 7.78.x       | v0.147.0     | v1.53.0        |
| 7.77.x       | v0.145.0     | v1.51.0        |
| 7.76.x       | v0.144.0     | v1.50.0        |
| 7.75.x       | v0.142.0     | v1.48.0        |
| 7.74.x       | v0.140.0     | v1.46.0        |
| 7.73.x       | v0.138.0     | v1.44.0        |
| 7.72.x       | v0.136.0     | v1.42.0        |
| 7.71.x       | v0.133.0     | v1.39.0        |
| 7.70.x       | v0.131.0     | v1.37.0        |
| 7.69.x       | v0.129.0     | v1.35.0        |

### Support levels

For details on Datadog, community, and custom component support, see [Support levels][57] on the Compatibility page.

### OpenTelemetry Collector components

By default, the DDOT Collector ships with the following Collector components. You can also see the list in [YAML format][11].

{{% collapse-content title="Receivers" level="p" %}}

- [dockerstatsreceiver][58] (available since version 7.56.0)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [k8sobjectsreceiver][59] (available since version 7.56.0)
- [kubeletstatsreceiver][60] (available since version 7.56.0)
- [otlpreceiver][20]
- [podmanreceiver][61] (available since version 7.56.0)
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

- [datadogextension][62] (available since version 7.72.0)
- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [storage/filestorage][63] (available since version 7.56.0)
- [zpagesextension][49]

{{% /collapse-content %}}

### Custom Datadog components

In addition to standard OpenTelemetry components, Datadog provides and maintains the following custom components:

{{% collapse-content title="Datadog components" level="p" %}}

- [Infrastructure Attribute Processor][50]: An OpenTelemetry processor component that assigns [Kubernetes tags][53] to OTLP telemetry (metrics, traces, and logs) from a pod or a container in a pod. Datadog uses these tags to correlate your telemetry with your Kubernetes infrastructure. For how `service`, `env`, and `version` are set, see [unified service tagging][54].

- [Converter][51]: An OpenTelemetry converter component that enhances user-provided configurations. It offers an API to return both the original and enhanced configurations, automatically checking for known misconfigurations to reduce errors.

- [DD Flare Extension][52]: An OpenTelemetry extension component that adds the Collector's diagnostic information to an Agent flare, for troubleshooting. It works only with the Collector in the Agent.

{{% /collapse-content %}}

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
[57]: /opentelemetry/compatibility/#support-levels
[58]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md
[59]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sobjectsreceiver/README.md
[60]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kubeletstatsreceiver/README.md
[61]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/podmanreceiver/README.md
[62]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/datadogextension/README.md
[63]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/storage/filestorage/README.md
[64]: /opentelemetry/setup/agent/
[65]: /opentelemetry/setup/ddot_collector/kubernetes/
[66]: /opentelemetry/setup/ddot_collector/kubernetes/#add-the-datadog-agent-optional
[67]: /opentelemetry/instrument/dd_sdks/
[68]: /opentelemetry/setup/collector_exporter/
[69]: /opentelemetry/setup/agent/#collector-in-the-agent
