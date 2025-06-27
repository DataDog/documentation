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

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates.
</div>

## Overview

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="A graphic showing data being aggregated from a variety of sources, processed and enriched by the observability pipelines worker in your own environment, and then being routed to the security, analytics, and storage destinations of your choice" style="width:100%;" >}}

Observability Pipelines allows you to collect and process logs within your own infrastructure, before routing them to downstream integrations. Use out-of-the-box [templates](#build-pipelines-with-out-of-the-box-templates) to build and deploy pipelines based on your use case.

The Observability Pipelines Worker is the software that runs in your infrastructure. It centrally aggregates, processes, and routes your logs based on your use case. This means you can redact sensitive data, pre-process logs, and determine which destinations they should go to, all before the logs leave your environment.

The Observability Pipelines UI provides a control plane to manage your Observability Pipelines Workers. You build and edit pipelines and deploy pipeline changes to your Workers from there. You can also enable out-of-the-box monitors for your pipelines so that you can evaluate their health.

## Explore Observability Pipelines

### Build pipelines with out-of-the-box templates

{{< img src="observability_pipelines/templates_20241003.png" alt="The Observability Pipelines UI showing the six templates" style="width:100%;" >}}

Build pipelines with out-of-the-box templates for the following [use cases][6]:

- [Archive Logs][7]
- [Dual Ship Logs][8]
- [Generate Metrics][9]
- [Log Enrichment][10]
- [Log Volume Control][11]
- [Sensitive Data Redaction][12]
- [Split Logs][13]

### Build pipelines in the Observability Pipelines UI

{{< img src="observability_pipelines/dual_ship_pipeline.png" alt="Pipeline with one source connect to two processor groups and two destinations" style="width:100%;" >}}

Build your pipelines in the Observability Pipelines UI. After you select one of the out-the-box templates, the onboarding workflow walks you through setting up your source, processors, and destinations. The installation page provides instructions on how to install the Worker in your environment (Docker, Kubernetes, Linux, or CloudFormation).

### Enable out-of-the-box monitors for your pipeline components

After you create your pipeline, enable out-of-the box monitors to get alerted when:

- There are increasing error rates for a component. This could happen because the component is processing data in unexpected formats.
- The Observability Pipelines Worker has high CPU usage or memory usage.
- There are spikes in data dropped by a component.

## Get started

You must enable [Remote Configuration][1] to use Observability Pipelines.

See [Set Up Pipelines][2] to set up a pipeline in the UI. You can also set up pipelines using the [Observability Pipelines API][3] or [Terraform][4].

See [Advanced Configurations][5] for bootstrapping options and for details on setting up the Worker with Kubernetes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/#setup
[2]: /observability_pipelines/set_up_pipelines/
[3]: /observability_pipelines/set_up_pipelines/?tab=api#set-up-a-pipeline
[4]: /observability_pipelines/set_up_pipelines/?tab=terraform#set-up-a-pipeline
[5]: /observability_pipelines/advanced_configurations/
[6]: /observability_pipelines/use_cases/
[7]: /observability_pipelines/use_cases/#archive-logs
[8]: /observability_pipelines/use_cases/#dual-ship-logs
[9]: /observability_pipelines/use_cases/#generate-metrics
[10]: /observability_pipelines/use_cases/#log-enrichment
[11]: /observability_pipelines/use_cases/#log-volume-control
[12]: /observability_pipelines/use_cases/#sensitive-data-redaction
[13]: /observability_pipelines/use_cases/#split-logs
