---
title: Set Up Pipelines
disable_toc: false
further_reading:
- link: "observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines"
- link: "observability_pipelines/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update an existing pipeline"
- link: "observability_pipelines/advanced_configurations/"
  tag: "Documentation"
  text: "Advanced configurations for Observability Pipelines"
- link: "observability_pipelines/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Observability Pipelines"
---

## Overview

<div class="alert alert-info">The pipelines and processors outlined in this documentation are specific to on-premises logging environments. To aggregate, process, and route cloud-based logs, see <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a>.</div>

In Observability Pipelines, a pipeline is a sequential path with three types of components: source, processors, and destinations. The Observability Pipeline [source][1] receives logs from your log source (for example, the Datadog Agent). The [processors][2] enrich and transform your data, and the [destination][3] is where your processed logs are sent. For some templates, your logs are sent to more than one destination. For example, if you use the Archive Logs template, your logs are sent to a cloud storage provider and another specified destination.

## Set up a pipeline
{{< tabs >}}
{{% tab "Pipeline UI" %}}
Set up your pipelines and its [sources][1], [processors][2], and [destinations][3] in the Observability Pipelines UI. The general setup steps are:

1. Navigate to [Observability Pipelines][4].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. [Install the Observability Pipelines Worker][13].
1. Enable monitors for your pipeline.

For detailed setup instructions, select a template-specific documentation and then select your source from that page:
  - [Log volume control][4]
  - [Dual ship logs][5]
  - [Split logs][6]
  - [Archive logs to Datadog Archives][7]
  - [Sensitive data redaction][8]
  - [Log Enrichment][9]
  - [Generate Metrics][10]

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[4]: /observability_pipelines/set_up_pipelines/log_volume_control/
[5]: /observability_pipelines/set_up_pipelines/dual_ship_logs/
[6]: /observability_pipelines/set_up_pipelines/split_logs/
[7]: /observability_pipelines/set_up_pipelines/archive_logs/
[8]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/
[9]: /observability_pipelines/set_up_pipelines/log_enrichment/
[10]: /observability_pipelines/set_up_pipelines/generate_metrics/

{{% /tab %}}

{{% tab "API" %}}

Use the API to [create a pipeline][1]. After the pipeline has been created, [install the Worker][2] to start sending logs through the pipeline.

[1]: /api/latest/observability-pipelines/#create-a-new-pipeline
[2]: /observability_pipelines/install_the_worker/

{{% /tab %}}
{{% tab "Terraform" %}}

Use the [Terraform module][1] to create a pipeline. After the pipeline has been created, [install the Worker][2] to start sending logs through the pipeline.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: /observability_pipelines/install_the_worker/

{{% /tab %}}
{{< /tabs >}}

See [Advanced Configurations][11] for bootstrapping options and for details on setting up the Worker with Kubernetes.

After you have set up your pipeline, see [Update Existing Pipelines][12] if you want to make any changes to it.

### Index your Worker logs

Make sure your Worker logs are [indexed][14] in Log Management for optimal functionality. The logs provide deployment information, such as Worker status, version, and any errors, that is shown in the UI. The logs are also helpful for troubleshooting Worker or pipelines issues. All Worker logs have the tag `source:op_worker`.

## Clone a pipeline

1. Navigate to [Observability Pipelines][4].
1. Select the pipeline you want to clone.
1. Click the cog at the top right side of the page, then select **Clone**.

## Delete a pipeline

1. Navigate to [Observability Pipelines][4].
1. Select the pipeline you want to delete.
1. Click the cog at the top right side of the page, then select **Delete**.

**Note**: You cannot delete an active pipeline. You must stop all Workers for a pipeline before you can delete it.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[11]: /observability_pipelines/advanced_configurations/
[12]: /observability_pipelines/update_existing_pipelines/
[13]: /observability_pipelines/install_the_worker/
[14]: /logs/log_configuration/indexes/
