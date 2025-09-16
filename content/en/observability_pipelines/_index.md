---
title: Observability Pipelines
disable_toc: false
further_reading:
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
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="A graphic showing data being aggregated from a variety of sources, processed and enriched by the observability pipelines worker in your own environment, and then being routed to the security, analytics, and storage destinations of your choice" style="width:100%;" >}}

Datadog Observability Pipelines allows you to collect, process, and route logs within your own infrastructure, giving you complete control over your observability data before it leaves your environment.

With out-of-the-box templates, you can build pipelines that redact sensitive data, enrich logs, filter noise, and route events to destinations like Datadog, SIEM tools, or cloud storage.

## Key components

### Observability Pipelines Worker

Runs within your infrastructure to aggregate, process, and route logs.

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates. See <a href="https://docs.datadoghq.com/observability_pipelines/configuration/install_the_worker/?tab=docker#upgrade-the-worker">Upgrade the Worker</a> to update to the latest Worker version</a>.
</div>

### Observability Pipelines UI

A centralized control plane where you can:
- Build and edit pipelines with guided templates.
- Deploy and manage Workers.
- Enable monitors to track pipeline health.

## Get started

1. Navigate to [Observability Pipelines][1].
1. Select a template based on your use case.
1. Set up your pipeline:
  1. Choose a log source
  1. Configure processors
  1. Add one or more destinations
1. Install the Worker in your environment
1. Enable monitors for real-time observability into your pipeline health.

See [Set Up Pipelines][2] for detailed instructions.

## Common use cases and templates

Observability Pipelines includes prebuilt templates for common log routing and transformation workflows. You can fully customize or combine them to meet your needs.

{{< img src="observability_pipelines/templates_20241003.png" alt="The Observability Pipelines UI showing the six templates" style="width:100%;" >}}

| Template | Description |
|----------|-------------|
| Log Volume Control | Reduce indexed log volume by filtering low-value logs before they're stored. |
| Dual Ship Logs | Send the same log stream to multiple destinations (for example, Datadog and a SIEM). |
| Archive Logs | Store raw logs in Amazon S3, Google Cloud Storage, or Azure Storage for long-term retention and rehydration. |
| Split Logs | Route logs by type (for example, security vs. application) to different tools. |
| Sensitive Data Redaction | Detect and remove PII and secrets using built-in or custom rules. |
| Log Enrichment | Add metadata from reference tables or static mappings for more effective querying. |
| Generate Metrics | Convert high-volume logs into count or distribution metrics to reduce storage needs. |

See [Explore templates][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/configuration/set_up_pipelines/
[3]: /observability_pipelines/configuration/explore_templates/