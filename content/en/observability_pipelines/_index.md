---
title: Observability Pipelines
disable_toc: false
further_reading:
- link: "/logs/log_collection/"
  tag: "documentation"
  text: "Log collection and integrations"
- link: "data_security/logs/"
  tag: "documentation"
  text: "Log Management data security"
- link: "/security/sensitive_data_scanner/"
  tag: "documentation"
  text: "Sensitive Data Scanner"
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

Observability Pipelines allows you to collect and process logs within your own infrastructure, before routing them to downstream integrations. Use out-of-the-box [templates](#build-pipelines-with-out-of-the-box-templates) to build and deploy pipelines based on your use case.

The Observability Pipelines Worker is the software that runs in your infrastructure. It centrally aggregates, processes, and routes your logs based on your use case. This means you can redact sensitive data, pre-process logs, and determine which destinations they should go to, all before the logs leave your environment.

The Observability Pipelines UI provides a control plane to manage your Observability Pipelines Workers. You build and edit pipelines and deploy pipeline changes to your Workers from there. You can also enable out-of-the-box monitors for your pipelines so that you can evaluate their health.

## Get started

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates. See <a href="https://docs.datadoghq.com/observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker">Upgrade the Worker</a> to update to the latest Worker version</a>.
</div>

To set up a pipeline:

1. Navigate to [Observability Pipelines][1].
1. Select a template:
    - [Log volume control][2]
    - [Dual ship logs][3]
    - [Split logs][4]
    - [Archive logs to Datadog Archives][5]
    - [Sensitive data redaction][6]
    - [Log Enrichment][7]
    - [Generate Metrics][8]
1. Select and set up your [source][9].
1. Select and set up your [destinations][10].
1. Set up your [processors][11].
1. [Install the Observability Pipelines Worker][14].
1. Enable monitors for your pipeline.

See [Set Up Pipelines][12] for more information.

See [Advanced Configurations][13] for bootstrapping options and for details on setting up the Worker with Kubernetes.

## Explore Observability Pipelines

### Build pipelines with out-of-the-box templates

{{< img src="observability_pipelines/templates_20241003.png" alt="The Observability Pipelines UI showing the six templates" style="width:100%;" >}}

The templates are built for the following use cases:

#### Log Volume Control

Raw logs are noisy, and only some logs are useful for further search and analysis during investigations. Use the Log Volume Control template to determine which logs to send to your indexed solution, such as a SIEM or log management solution. This helps you to increase the value of your indexed logs and also remain within your planned budget.

#### Dual Ship Logs

As your organization grows, your observability needs for different use cases, such as security, archiving, and log management, also change. This could mean having to trial different archiving, SIEM, and log management solutions. However, managing log pipelines to different solutions can be complicated. Use the Dual Ship Logs template to centrally aggregate, process, and send copies of your logs to different destinations.

#### Archive Logs

Use the Archive Logs template to store logs in a cloud storage solution (Amazon S3, Google Cloud Storage, or Azure Storage). The archived logs are stored in a Datadog-rehydratable format, so that they can be rehydrated in Datadog as needed. This is useful when:

- You have a high volume of noisy logs, but might need to index them in Datadog Log Management ad hoc for an investigation.
- You are migrating to Datadog Log Management and want to have historical logs after completing the migration.
- You have a retention policy to fulfill compliance requirements but don't necessarily need to index those logs.

#### Split Logs

When you have logs from different services and applications, you might need to send them to different downstream services for querying, analysis, and alerting. For example, you might want to send security logs to a SIEM solution and DevOps logs to Datadog. Use the Split Logs template to preprocess your logs separately for each destination before sending them downstream.

#### Sensitive Data Redaction

Use the Sensitive Data Redaction template to detect and redact sensitive information on premises. The Observability Pipelines sensitive data scanner processor provides 70 out-of-the-box scanning rules, but you can also create your own custom scanning rules using regular expressions. The OOTB rules recognize standard patterns such as credit card numbers, email addresses, IP addresses, API and SSH keys, and access tokens.

#### Log Enrichment

Your organization's different services, systems, and applications all generate logs containing layers of information and in different formats. This can make it difficult to extract the data you need when searching and analyzing the data for an investigation. Use the Log Enrichment template to standardize your logs and enrich them with information, such as data from a reference table.

#### Generate Metrics

Some log sources, such as firewalls and network appliances, generate a large volume of log events that contain log data that don't need to be stored. Often, you just want to see a summary of the logs and compare it to historical data. Log-based metrics are also a cost-efficient way to summarize log data from your entire ingest stream. Use the Generate Metrics template to generate a count metric of logs that match a query or a distribution metric of a numeric value contained in the logs, such as a request duration.

### Build pipelines in the Observability Pipelines UI

{{% observability_pipelines/use_case_images/generate_metrics %}}

Build your pipelines in the Observability Pipelines UI. After you select one of the out-the-box templates, the onboarding workflow walks you through setting up your source, processors, and destinations. The installation page provides instructions on how to install the Worker in your environment (Docker, Kubernetes, Linux, or CloudFormation).

### Enable out-of-the-box monitors for your pipeline components

After you create your pipeline, enable out-of-the box monitors to get alerted when:

- There are increasing error rates for a component. This could happen because the component is processing data in unexpected formats.
- The Observability Pipelines Worker has high CPU usage or memory usage.
- There are spikes in data dropped by a component.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/log_volume_control/
[3]: /observability_pipelines/dual_ship_logs/
[4]: /observability_pipelines/split_logs/
[5]: /observability_pipelines/archive_logs/
[6]: /observability_pipelines/sensitive_data_redaction/
[7]: /observability_pipelines/log_enrichment/
[8]: /observability_pipelines/set_up_pipelines/generate_metrics/
[9]: /observability_pipelines/sources/
[10]: /observability_pipelines/destinations/
[11]: /observability_pipelines/processors/
[12]: /observability_pipelines/set_up_pipelines/
[13]: /observability_pipelines/advanced_configurations/
[14]: /observability_pipelines/install_the_worker/