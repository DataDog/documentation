---
title: Manage Logs and Metrics with Terraform

disable_toc: false
---

## Overview
You can use [Terraform][1] to interact with the Datadog API and manage your logs and metrics. This guide provides example use cases and includes links to commonly used Datadog resources and data sources in the Terraform registry.

You can also [import][2] your existing resources into your Terraform configuration, and reference existing resources as Terraform [data sources][3].

## Set up the Datadog Terraform Provider

If you haven't already, configure the [Datadog Terraform provider][4] to interact with Datadog APIs through a Terraform configuration.

## Log configuration

### Set up multiple indexes

Set up [multiple indexes][5] if you want to segment your logs for different retention periods or daily quotas, usage monitoring, and billing. For example, if you have logs that only need to be retained for 7 days, while other logs need to be retained for 30 days, use multiple indexes to separate out the logs by the two retention periods. See [Inclusion filters][6] and [Exclusion filters][7] documentation for information on defining queries for them. Since ingested logs go into the first index whose filter they match, [order your indexes][8] according to your use case.

### Set up a custom pipeline

Log pipelines are a chain of sequential processors that extract meaningful information or attributes from the content to reuse as facets. Each log that goes through the pipelines is matched against each pipeline filter. If it matches the filter, then all the processors are applied to the log before moving to the next pipeline. Set up a [custom pipeline][9] to parse and enrich your logs. See the [Processors documentation][10] for details on the available processors. You can also [reorder your pipelines][11] to make sure logs are getting processed in the correct order.

Integration pipelines are automatically installed when you send logs from certain sources (for example, the NGINX integration). You can reorder these pipelines with the [logs integration pipelines resource][12].

### Set up multiple archives for long-term storage

Set up [Log Archives][13] if you want to store your logs for longer periods of time. Log Archives sends your logs to a storage-optimized system, such as Amazon S3, Azure Storage, or Google Cloud Storage. You can also [reorder your archives][14] as needed.

### Generate metrics from ingested logs

[Generate log-based metrics][15] to summarize log data from your ingested logs. For example, you can generate a count metric of logs that match a query or match a distribution metric of a numeric value contained in the logs, such as request duration. See [Generate Metrics from Ingested Logs][16] for more information.

## Metric configuration

A metric's metadata includes the metric name, description, and unit. Use the [metric metadata resource][17] to modify the information.

Tags add dimensions to your metrics so that they can be filtered, aggregated, and compared in visualizations. Use the [metric tag configuration resource][18] to modify your metrics tags in Terraform. See [Getting Started with Tags][19] for more information on using tags.


[1]: https://www.terraform.io/
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /integrations/terraform/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index
[6]: /logs/log_configuration/indexes/#indexes-filters
[7]: /logs/log_configuration/indexes/#exclusion-filters
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index_order
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_custom_pipeline
[10]: /logs/log_configuration/processors/?tab=ui
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_pipeline_order
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_integration_pipeline
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive_order
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_metric
[16]: https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics/
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_metadata
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_tag_configuration
[19]: /getting_started/tagging/