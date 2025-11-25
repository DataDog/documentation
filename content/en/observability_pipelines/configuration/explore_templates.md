---
title: Explore Templates
disable_toc: false
further_reading:
- link: "observability_pipelines/set_up_pipelines#set-up-a-pipeline"
  tag: "Documentation"
  text: "Set up pipelines"
---

## Overview

When you create a pipeline in the Observability Pipelines UI, select one of the out-the-box templates to build and deploy pipelines based on your use case.

{{< img src="observability_pipelines/templates_20251125.png" alt="The Observability Pipelines UI showing the seven templates" style="width:100%;" >}}

## Templates

The templates are built for the following use cases:

{{< tabs >}}
{{% tab "Logs" %}}

### Archive Logs

Use the Archive Logs template to store logs in a cloud storage solution (Amazon S3, Google Cloud Storage, or Azure Storage). The archived logs are stored in a Datadog-rehydratable format so that they can be rehydrated in Datadog as needed. This is useful when:

- You have a high volume of noisy logs, but might need to index them in Datadog Log Management ad hoc for an investigation.
- You are migrating to Datadog Log Management and want to have historical logs after completing the migration.
- You have a retention policy to fulfill compliance requirements but don't necessarily need to index those logs.

### Dual Ship Logs

As your organization grows, your observability needs for different use cases, such as security, archiving, and log management, also change. This could mean having to trial different archiving, SIEM, and log management solutions. However, managing log pipelines to different solutions can be complicated. Use the Dual Ship Logs template to send your logs to different destinations, so you can evaluate different tools and workflows with minimal disruption to your production environment.

### Generate Log-based Metrics

Some log sources, such as firewalls and network appliances, generate a large volume of log events that contain log data that don't need to be stored. Often, you just want to see a summary of the logs and compare it to historical data. Log-based metrics are also a cost-efficient way to summarize log data from your entire ingest stream. Use the Generate Metrics template to generate a count metric of logs that match a query or a distribution metric of a numeric value contained in the logs, such as a request duration.

These are the available metric types:
  | Metric type  | Description                                                                                                                                     | Example                                                                                             |
  | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
  | COUNT        | Represents the total number of event occurrences in one time interval. This value can be reset to zero, but cannot be decreased.                | You want to count the number of logs with `status:error`.                                         |
  | GAUGE        | Represents a snapshot of events in one time interval.                                                                                           | You want to measure the latest CPU utilization per host for all logs in the production environment. |
  | DISTRIBUTION | Represent the global statistical distribution of a set of values calculated across your entire distributed infrastructure in one time interval. | You want to measure the average time it takes for an API call to be made.                           |


### Log Enrichment

Your organization's different services, systems, and applications all generate logs containing layers of information and in different formats. To manage these logs, you might need to standardize their format and add information to make it easier to search and analyze them. For example, each log source has its own unique format. This can make it difficult to search and analyze during investigations if they have not been reformatted and standardized. You could also have additional information, such as customer IDs or IP addresses, that you want to add to your logs.

### Log Volume Control

Raw logs are noisy, and only some logs are useful for further search and analysis during investigations. Use the Log Volume Control template to determine which logs to send to your indexed solution, such as a SIEM or log management solution. This helps you to increase the value of your indexed logs and also remain within your planned budget.

### Sensitive Data Redaction

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks.

Use the Sensitive Data Redaction template to detect and redact sensitive information on premises. The Observability Pipelines sensitive data scanner processor provides 70 out-of-the-box scanning rules, but you can also create your own custom scanning rules using regular expressions. The OOTB rules recognize standard patterns such as credit card numbers, email addresses, IP addresses, API and SSH keys, and access tokens.

### Split Logs

When you have logs from different services and applications, you might need to send them to different downstream services for querying, analysis, and alerting. For example, you might want to send security logs to a SIEM solution and DevOps logs to Datadog. Use the Split Logs template to preprocess your logs separately for each destination before sending them downstream.

{{% /tab %}}
{{% tab "Metrics" %}}

### Metrics Volume Control

<div class="alert alert-info">
Metrics Volume Control is in Preview.</div>

Metrics capture signals about your environment and offer insight into your system health, business workflows, and security activities. These metrics are sent from your various applications, network devices, and nodes, but the value of individual metrics can vary significantly. 

To help you manage the quality and volume of your metrics, use the Metrics Volume Control template to process them in Observability Pipelines before sending them to your destinations. You can use processors to keep only the metrics you need, standardize metrics tagging, and remove unwanted tags to prevent high cardinality.

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
