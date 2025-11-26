---
title: Set Up Pipelines
disable_toc: false
aliases:
  - /observability_pipelines/set_up_pipelines/
further_reading:
- link: "observability_pipelines/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update an existing pipeline"
- link: "observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/"
  tag: "Documentation"
  text: "Advanced Worker configurations for Observability Pipelines"
- link: "observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/"
  tag: "Documentation"
  text: "Run multiple pipelines on a host"
- link: "observability_pipelines/monitoring_and_troubleshooting/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Observability Pipelines"
---

## Overview

<div class="alert alert-info">The pipelines and processors outlined in this documentation are specific to on-premises logging environments. To aggregate, process, and route cloud-based logs, see <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a>.</div>

In Observability Pipelines, a pipeline is a sequential path with three types of components: source, processors, and destinations. The Observability Pipeline [source][1] receives logs from your log source (for example, the Datadog Agent). The [processors][2] enrich and transform your data, and the [destination][3] is where your processed logs are sent.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="Pipeline with one source connected to two processor groups and two destinations" style="width:100%;" >}}

## Set up a pipeline

{{< tabs >}}
{{% tab "Pipeline UI" %}}

Set up your pipelines and its sources, processors, and destinations in the Observability Pipelines UI.

1. Navigate to [Observability Pipelines][13].
1. Select a template based on your use case.
    - [Archive Logs][4]
    - [Dual Ship Logs][5]
    - [Generate Metrics][6]
    - [Log Enrichment][7]
    - [Log Volume Control][8]
    - [Sensitive Data Redaction][9]
    - [Split Logs][10]
1. Select and set up your [source][1].
1. Add [processors][3] to transform, redact, and enrich log data.
  - If you want to copy a processor, click the copy icon for that processor and then use `command-v` to paste it.
1. Select and set up [destinations][2] for your processed logs.

### Add or remove components

#### Add another processor group

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="The Pipelines page showing two processor groups sending logs to the same destination" style="width:100%;" >}}

If you want to add another group of processors for a destination:
1. Click the plus sign (**+**) at the bottom of the existing processor group.
1. Click the name of the processor group to update it.
1. Optionally, enter a group filter. See [Filter Syntax](#filter-query-syntax) for more information.
1. Click **Add** to add processors to the group.
1. If you want to copy all the processors in a group and paste them into the same processor group or a different group:
    1. Click the three dots on the processor group.
    1. Select **Copy all processors**.
    1. Select the processor group you want to paste the processors into and then use `command-v` to paste them.
1. You can toggle the switch to enable and disable the processor group and also each individual processor.

<br>**Notes**:
<br>- Configuring a pipeline with processor groups is available for Worker versions 2.7 and later.
<br>- There is a limit of 10 processor groups for a pipeline canvas.

#### Add another set of processors and destinations

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="The Pipelines page showing two processor groups sending logs to two different destinations" style="width:100%;" >}}

If you want to add another set of processors and destinations, click the plus sign (**+**) to the left of the processor group to add another set of processors and destinations to the source.
- To delete a processor group, you need to delete all destinations linked to that processor group. When the last destination is deleted, the processor group is removed with it.

#### Add another destination to a processor group

{{< img src="observability_pipelines/setup/another_destination.png" alt="The Pipelines page showing one processor group sending logs to two different destinations" style="width:100%;" >}}

If you want to add an additional destination to a processor group, click the plus sign (**+**) to the right of the processor group.
- To delete a destination, click on the pencil icon to the top right of the destination, and select **Delete node**.
  - If you delete a destination from a processor group that has multiple destinations, only the deleted destination is removed.
  - If you delete a destination from a processor group that only has one destination, both the destination and the processor group are removed.

#### Pipeline requirements and limits

- A pipeline must have at least one destination. If a processor group only has one destination, that destination cannot be deleted.
- You can add a total of three destinations for a pipeline.
- A specific destination can only be added once. For example, you cannot add multiple Splunk HEC destinations.

### Install the Worker and deploy the pipeline

After you have set up your source, processors, and destinations:

1. Click **Next: Install**.
1. Select the platform on which you want to install the Worker.
1. Enter the [environment variables][15] for your sources and destinations, if applicable.
1. Follow the instructions on installing the Worker for your platform. The command provided in the UI to install the Worker has the relevant environment variables populated. See [Install the Observability Pipelines Worker][12] for more information.
    - **Note**: If you are using a proxy, see the `proxy` option in [Bootstrap options][16].
1. Enable out-of-the-box monitors for your pipeline.
    1. Navigate to the [Pipelines][1] page and find your pipelines.
    1. Click **Enable monitors** in the **Monitors** column for your pipeline.
    1. Click **Start** to set up a monitor for one of the suggested use cases.<br>
      The new metric monitor page is configured based on the use case you selected. You can update the configuration to further customize it. See the [Metric monitor documentation][14] for more information.

After you have set up your pipeline, see [Update Existing Pipelines][11] if you want to make any changes to it.

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[4]: /observability_pipelines/#archive-logs
[5]: /observability_pipelines/#dual-ship-logs
[6]: /observability_pipelines/#generate-metrics
[7]: /observability_pipelines/#log-enrichment
[8]: /observability_pipelines/#log-volume-control
[9]: /observability_pipelines/#sensitive-data-redaction
[10]: /observability_pipelines/#split-logs
[11]: /observability_pipelines/configuration/update_existing_pipelines/
[12]: /observability_pipelines/configuration/install_the_worker/
[13]: https://app.datadoghq.com/observability-pipelines
[14]: /monitors/types/metric/
[15]: /observability_pipelines/guide/environment_variables/
[16]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options

{{% /tab %}}
{{% tab "API" %}}

<div class="alert alert-danger">Creating pipelines using the Observability Pipelines API is in Preview. Fill out the <a href="https://www.datadoghq.com/product-preview/observability-pipelines-api-and-terraform-support/"> form</a> to request access.</div>

1. You can use Observability Pipelines API to [create a pipeline][1].
1. After creating the pipeline, [install the Worker][2] to send logs through the pipeline.
    - See [Environment Variables][4] for the list of environment variables you need for the different sources, processor, and destinations when you install the Worker.

**Note**: Pipelines created using the API are read-only in the UI. Use the [update a pipeline][3] endpoint to make any changes to an existing pipeline.

[1]: /api/latest/observability-pipelines/#create-a-new-pipeline
[2]: /observability_pipelines/configuration/install_the_worker/?tab=docker#api-or-terraform-pipeline-setup
[3]: /api/latest/observability-pipelines/#update-a-pipeline
[4]: /observability_pipelines/guide/environment_variables/

{{% /tab %}}
{{% tab "Terraform" %}}

<div class="alert alert-danger">Creating pipelines using Terraform is in Preview. Fill out the <a href="https://www.datadoghq.com/product-preview/observability-pipelines-api-and-terraform-support/"> form</a> to request access.</div>

1. You can use the [datadog_observability_pipeline][1] module to create a pipeline using Terraform.
1. After creating the pipeline, [install the Worker][2] to send logs through the pipeline.
    - See [Environment Variables][3] for the list of environment variables you need for the different sources, processor, and destinations when you install the Worker.

Pipelines created using Terraform are read-only in the UI. Use the [datadog_observability_pipeline][1] module to make any changes to an existing pipeline.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: /observability_pipelines/configuration/install_the_worker/?tab=docker#api-or-terraform-pipeline-setup
[3]: /observability_pipelines/guide/environment_variables/

{{% /tab %}}
{{< /tabs >}}

See [Advanced Worker Configurations][5] for bootstrapping options.

### Index your Worker logs

Make sure your Worker logs are [indexed][6] in Log Management for optimal functionality. The logs provide deployment information, such as Worker status, version, and any errors, that is shown in the UI. The logs are also helpful for troubleshooting Worker or pipelines issues. All Worker logs have the tag `source:op_worker`.

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
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /logs/log_configuration/indexes/
