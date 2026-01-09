---
title: Observability Pipelines
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Manage metric volume and tags in your environment with Observability Pipelines
- link: "/observability_pipelines/configuration/explore_templates/"
  tag: "documentation"
  text: "Set up pipelines"
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "documentation"
  text: "Explore use cases and templates"
- link: "/observability_pipelines/configuration/install_the_worker/"
  tag: "documentation"
  text: "Install the Observability Pipelines Worker"
- link: "/agent/configuration/dual-shipping/#yaml-configuration"
  tag: "documentation"
  text: "Dual shipping with Observability Pipelines"
- link: "/observability_pipelines/guide/strategies_for_reducing_log_volume/"
  tag: "documentation"
  text: "Strategies for Reducing Log Volume"
- link: "https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/"
  tag: "blog"
  text: "Redact sensitive data from your logs on-prem by using Observability Pipelines"
- link: "https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/"
  tag: "blog"
  text: "Dual ship logs with Datadog Observability Pipelines"
- link: "https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/"
  tag: "blog"
  text: "Control your log volumes with Datadog Observability Pipelines"
- link: "https://www.datadoghq.com/blog/observability-pipelines-archiving/"
  tag: "blog"
  text: "Archive your logs with Observability Pipelines for a simple and affordable migration to Datadog"
- link: "https://www.datadoghq.com/blog/observability-pipelines/"
  tag: "blog"
  text: "Aggregate, process, and route logs easily with Datadog Observability Pipelines"
- link: "https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/"
  tag: "blog"
  text: "Stream logs in the OCSF format to your preferred security vendors or data lakes with Observability Pipelines"
- link: "https://www.datadoghq.com/blog/observability-pipelines-route-logs-microsoft-sentinel/"
  tag: "blog"
  text: "Simplify your SIEM migration to Microsoft Sentinel with Datadog Observability Pipelines"
- link: "https://www.datadoghq.com/blog/sled-observability-pipelines/"
  tag: "blog"
  text: "How state, local, and education organizations can manage logs flexibly and efficiently using Datadog Observability Pipelines"
- link: "https://www.datadoghq.com/blog/optimize-high-volume-logs/"
  tag: "blog"
  text: "How to optimize high-volume log data without compromising visibility"
- link: "https://www.datadoghq.com/blog/archive-search/"
  tag: "Blog"
  text: "Search your historical logs more efficiently with Datadog Archive Search"
- link: "https://www.datadoghq.com/blog/introducing-datadog-cloudprem/"
  tag: "blog"
  text: "Store and search logs at petabyte scale in your own infrastructure with Datadog CloudPrem"
- link: "https://www.datadoghq.com/blog/manage-high-volume-logs-with-observability-pipeline-packs/"
  tag: "blog"
  text: "Control logging costs on any SIEM or data lake using Packs with Observability Pipelines"
- link: "https://www.datadoghq.com/blog/observability-pipelines-otel-cost-control/"
  tag: "Blog"
  text: "Use OpenTelemetry with Observability Pipelines for vendor-neutral log collection and cost control"
---

## Overview

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="A graphic showing data being aggregated from a variety of sources, processed and enriched by the observability pipelines worker in your own environment, and then being routed to the security, analytics, and storage destinations of your choice" style="width:100%;" >}}

Datadog Observability Pipelines allows you to collect and process logs and metrics ({{< tooltip glossary="preview" case="title" >}}) within your own infrastructure, and then route the data to different destinations. It gives you control over your observability data before it leaves your environment.

With out-of-the-box templates, you can build pipelines that redact sensitive data, enrich data, filter out noisy events, and route data to destinations like Datadog, SIEM tools, or cloud storage.

## Key components

### Observability Pipelines Worker

The Observability Pipelines Worker runs within your infrastructure to aggregate, process, and route data.

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates. See <a href="/observability_pipelines/configuration/install_the_worker/#upgrade-the-worker">Upgrade the Worker</a> to update to the latest Worker version</a>.
</div>

### Observability Pipelines UI

The Observability Pipelines UI provides a centralized control plane where you can:

- Build and edit pipelines with guided templates.
- Deploy and manage Workers.
- Enable monitors to track pipeline health.

## Get started

1. Navigate to [Observability Pipelines][1].
1. Select a [template](#common-use-cases-and-templates) based on your use case.
1. Set up your pipeline:
    1. Choose a log [source][2].
    1. Configure [processors][3].
    1. Add one or more [destinations][4].
1. [Install the Worker][5] in your environment
1. Enable monitors for real-time observability into your pipeline health.

See [Set Up Pipelines][6] for detailed instructions.

## Common use cases and templates

Observability Pipelines includes prebuilt templates for common data routing and transformation workflows. You can fully customize or combine them to meet your needs.

{{< img src="observability_pipelines/eight_templates.png" alt="The Observability Pipelines UI showing the eight templates" style="width:100%;" >}}

### Templates

{{< tabs >}}
{{% tab "Logs" %}}

| Template | Description |
|----------|-------------|
| Archive Logs | Store raw logs in Amazon S3, Google Cloud Storage, or Azure Storage for long-term retention and rehydration. |
| Dual Ship Logs | Send the same log stream to multiple destinations (for example, Datadog and a SIEM). |
| Generate Log-based Metrics | Convert high-volume logs into count or distribution metrics to reduce storage needs. |
| Log Enrichment | Add metadata from reference tables or static mappings for more effective querying. |
| Log Volume Control | Reduce indexed log volume by filtering low-value logs before they're stored. |
| Sensitive Data Redaction | Detect and remove personally identifiable information (PII) and secrets using built-in or custom rules. |
| Split Logs | Route logs by type (for example, security vs. application) to different tools. |

{{% /tab %}}
{{% tab "Metrics" %}}

<div class="alert alert-info">
Metric Tag Governance is in Preview. Fill out the <a href="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/">form</a> to request access.</div>

| Template | Description |
|----------|-------------|
| Metric Tag Governance | Manage the quality and volume of your metrics by keeping only the metrics you need, standardizing metrics tagging, and removing unwanted tags to prevent high cardinality. |

{{% /tab %}}
{{< /tabs >}}

See [Explore templates][7] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/sources/
[3]: /observability_pipelines/processors/
[4]: /observability_pipelines/destinations/
[5]: /observability_pipelines/configuration/install_the_worker/
[6]: /observability_pipelines/configuration/set_up_pipelines/
[7]: /observability_pipelines/configuration/explore_templates/
