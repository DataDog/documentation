---
title: DDOT Collector
description: The DDOT Collector is an OpenTelemetry Collector that Datadog builds and supports. Deploy it on Kubernetes with OpenTelemetry tooling, with or without the Datadog Agent.
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

{{< callout header="false" btn_hidden="true" >}}
The DDOT Collector is in Preview.
{{< /callout >}}

## Overview

The Datadog OpenTelemetry (DDOT) Collector is an open source distribution of the OpenTelemetry Collector, built and maintained by Datadog. Use it to collect, process, and route telemetry with standard OpenTelemetry configuration. It doesn't require the Datadog Agent.

{{< img src="/opentelemetry/setup/otel-ddot-collector.png" alt="Your application, instrumented with a DDOT SDK or an OpenTelemetry SDK, sends OTLP to the DDOT Collector, which sends your telemetry to Datadog with the Datadog Exporter. An optional Datadog Agent runs alongside it for features that need the Agent." style="width:100%;" >}}

- **Use OpenTelemetry tooling**: Deploy the Collector on Kubernetes with the OpenTelemetry Operator or Helm charts.
- **Configure your pipelines**: Receive telemetry from [DDOT SDKs][67], OpenTelemetry SDKs, and other sources. Process it, and route it to Datadog and to other destinations.
- **Start with included components**: Use the curated set of [OpenTelemetry](#opentelemetry-collector-components) and [Datadog components](#datadog-components) on this page.
- **Get troubleshooting support**: Datadog Support troubleshoots Datadog-supported components. For coverage of community and custom components, see [Support levels][57].

You can run the Datadog Agent alongside the Collector for features that need the Agent. For the OpenTelemetry Collector that runs alongside the Agent, see [Agent's Collector][69]. On platforms other than Kubernetes, use the [upstream OpenTelemetry Collector][68] or the [Datadog Agent][64].

## Get started

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/getting_started/kubernetes/?tab=ddot" >}}
    <h3>Kubernetes quickstart</h3>
    Install the DDOT Collector and instrument an application with Datadog's installer script.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/kubernetes/" >}}
    <h3>Install the DDOT Collector on Kubernetes</h3>
    Deploy and configure the Collector yourself, with the OpenTelemetry Operator or the Collector Helm chart.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Included components

The DDOT Collector includes the OpenTelemetry Collector components listed in this section. **[Placeholder: Can you add components to the DDOT Collector image, and how?]** For the Agent's Collector, see the [custom components guide][2].

### Support levels

For details on Datadog, community, and custom component support, see [Support levels][57] on the Compatibility page.

### OpenTelemetry Collector components

By default, the DDOT Collector includes these components. This list matches DDOT 7.84. The list is also available in [YAML format][11].

{{% collapse-content title="Receivers" level="p" %}}

- [dockerstatsreceiver][58] (available since version 7.56.0)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [k8sclusterreceiver][70]
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
- [tailsamplingprocessor][36]
- [transformprocessor][37]

The `routingprocessor` was removed in version 7.71.0. Use the [routingconnector][56] instead.

{{% /collapse-content %}}

{{% collapse-content title="Exporters" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Connectors" level="p" %}}

- [countconnector][71]
- [datadogconnector][44]
- [routingconnector][56] (available since version 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensions" level="p" %}}

- [datadogextension][62] (available since version 7.72.0)
- [healthcheckextension][46]
- [k8sleaderelector][72]
- [observer][47]
- [pprofextension][48]
- [storage/filestorage][63] (available since version 7.56.0)
- [zpagesextension][49]

{{% /collapse-content %}}

### Datadog components

In addition to standard OpenTelemetry components, Datadog provides and maintains the following custom components:

{{% collapse-content title="Datadog components" level="p" %}}

- [Infrastructure Attribute Processor][50]: An OpenTelemetry processor component that assigns [Kubernetes tags][53] to OTLP telemetry (metrics, traces, and logs) from a pod or a container in a pod. Datadog uses these tags to correlate your telemetry with your Kubernetes infrastructure. For how `service`, `env`, and `version` are set, see [unified service tagging][54].

- [Converter][51]: An OpenTelemetry converter component that enhances user-provided configurations. It offers an API to return both the original and enhanced configurations, automatically checking for known misconfigurations to reduce errors.


{{% /collapse-content %}}

The Agent's Collector also includes the [DD Flare Extension][52], which adds the Collector's diagnostic information to an Agent flare.

## OpenTelemetry Collector versions

Each DDOT release includes these OpenTelemetry Collector versions:

| DDOT version | Beta version | Stable version |
|--------------|--------------|----------------|
| 7.84.x       | v0.159.0     | v1.65.0        |
| 7.83.x       | v0.158.0     | v1.64.0        |
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |
| 7.80.x       | v0.152.0     | v1.58.0        |

{{% collapse-content title="Earlier versions" level="p" %}}

| DDOT version | Beta version | Stable version |
|--------------|--------------|----------------|
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

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /opentelemetry/setup/ddot_collector/custom_components
[11]: https://github.com/DataDog/datadog-agent/blob/7.84.0/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[67]: /opentelemetry/instrument/dd_sdks/ddot_setup/
[68]: /opentelemetry/setup/collector_exporter/
[69]: /opentelemetry/setup/agent/#agents-collector
[70]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/README.md
[71]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/countconnector/README.md
[72]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/k8sleaderelector/README.md
