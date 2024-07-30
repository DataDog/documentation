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
- link: "/sensitive_data_scanner/"
  tag: "documentation"
  text: "Sensitive Data Scanner"
- link: "/agent/configuration/dual-shipping/#yaml-configuration"
  tag: "documentation"
  text: "Dual shipping with Observability Pipelines"
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
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates.
</div>

## Overview

{{< img src="observability_pipelines/op_marketecture_04182024.png" alt="A graphic showing different data sources on the left that flows into three hexagons named transform, reduce, and route, with arrows pointing to different destinations for the modified data" style="width:100%;" >}}

Observability Pipelines allows you to collect, process, and route logs in your own infrastructure. It comes with out-of-the-box [templates](#start-building-pipelines-with-out-of-the-box-templates) so that you can easily build and deploy pipelines.

The Observability Pipelines Worker is the software that runs in your infrastructure and centrally aggregates, processes, and routes your logs based on your use case. This means you can redact sensitive data, pre-process logs, and determine which destinations to send the logs to, before they leave your environment.

The Observability Pipelines UI provides a control plane to manage your Observability Pipelines Workers. You build and edit pipelines and deploy pipeline changes to your Workers from there. You can also enable monitors for your pipelines to evaluate their health.

## Get started

To set up a pipeline:

1. Navigate to [Observability Pipelines][1].
1. Select a template:
    - [Log volume control][2]
    - [Dual ship logs][3]
    - [Split logs][4]
    - [Archive logs to Datadog Archives][5]
    - [Sensitive data redaction][6]
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up you processors.
1. Install the Observability Pipelines Worker.
1. Enable monitors for your pipeline.

See [Set Up Pipelines][7] for more information.

See [Advanced Configurations][8] for bootstrapping options and for details on setting up the Worker with Kubernetes.

## Explore Observability Pipelines

### Build pipelines with out-of-the-box templates

{{< img src="observability_pipelines/templates.png" alt="" style="width:100%;" >}}

The [templates](#out-of-the-box-templates) are purpose-built for the following use cases:

#### Log Volume Control

Raw logs are noisy and only some logs are useful for further search and analysis during investigations. Use the Log Volume Control template to determine which logs you want to send to your indexed solution, whether it's a SIEM or log management solution, so that you can increase the value of the logs indexed and also remain within your planned budget.

#### Dual Ship Logs

As your organization grows, your observability needs for different use cases, such as security, archiving, and log management also change. This could mean having to trial different SIEM, archiving and log management solutions. However, managing log pipelines to different solutions can get complicated. Use the Dual Ship Logs template to centrally aggregate, process, and send copies of your logs to different destinations.

#### Archive Logs

If you are migrating to Datadog Log Management, use the Archive Logs template to help you make that transition. You can pre-process logs sent to your current vendor and separately pre-process logs sent to a cloud storage option for archiving. The archived logs are stored in a Datadog-rehydratable format, so that you have historical logs that can be rehydrated later in Datadog as needed.

#### Split Logs

When you have logs from different services and applications, you might need to send them to different downstream services for query, analysis, and alerting. For example, you want to send security logs to a SIEM and DevOps logs to Datadog. Use the Split Logs template to pre-process your logs and determine which logs should go to which destination.

#### Sensitive Data Redaction

Use the Sensitive Data Redaction template to detect and redact sensitive information on premises. The Observability Pipelines sensitive data scanner processor provides 70 out-of-the-box scanning rules, but you can also create your own custom scanning rules based on regex. The OOTB rules recognize standard patterns such as credit card numbers, email addresses, IP addresses, API and SSH keys, and access tokens.

#### Log Enrichment

Your organization's different services, systems, and application all generate logs containing layers of information and in different formats. This can make it difficult to extract the data you need when searching and analyzing the data for an investigation. Use the Log Enrichment template to standardize your logs and enrich it with information from a reference table, which could be a local file or a GeoIP database.

### Build pipelines in the Observability Pipelines UI

{{% observability_pipelines/use_case_images/log_volume_control %}}

Build your pipelines in the Observability Pipelines UI. After you select one of the out-the-box templates, the onboarding workflow walks you through setting up your source, processors, and destinations. Then installation page provides instructions on how to install the Worker in your environment (Docker, Kubernetes, Linux, or CloudFormation).

### Enable out-of-the-box monitors for your pipeline components

After you create your pipeline, enable out-of-the box monitors to get alerted when:

- There are increasing error rates for a component. This could happen because the component is processing data in unexpected formats or encountering other internal issues.
- There are spikes in data droppged by a component.
- The Observability Pipelines Worker has high CPU usage or memory usage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/log_volume_control/
[3]: /observability_pipelines/dual_ship_logs/
[4]: /observability_pipelines/split_logs/
[5]: /observability_pipelines/archive_logs/
[6]: /observability_pipelines/sensitive_data_redaction/
[7]: /observability_pipelines/set_up_pipelines/
[8]: /observability_pipelines/advanced_configurations/
