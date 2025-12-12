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

In Observability Pipelines, a pipeline is a sequential path with three types of components:
- [Source][1]: Receives data from your data source (for example, the Datadog Agent).
- [Processors][2]: Enrich and transform your data.
- [Destinations][3]: Where your processed data is sent.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="Pipeline with one source connected to two processor groups and two destinations" style="width:100%;" >}}

You can create a pipeline with one of the following methods:

- [Pipeline UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

## Set up a pipeline in the UI

{{< tabs >}}
{{% tab "Logs" %}}

1. Navigate to [Observability Pipelines][7].
1. Select a [template][4] based on your use case.
1. Select and set up your [source][1].
1. Add [processors][2] to transform, redact, and enrich your log data.
    - If you want to copy a processor, click the copy icon for that processor and then use `command-v` to paste it.
1. Select and set up [destinations][3] for your processed logs.

### Add or remove components

#### Add another processor group

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="The Pipelines page showing two processor groups sending logs to the same destination" style="width:100%;" >}}

If you want to add another group of processors for a destination:
1. Click the plus sign (**+**) at the bottom of the existing processor group.
1. Click the name of the processor group to update it.
1. Optionally, enter a group filter. See [Search Syntax][11] for more information.
1. Click **Add** to add processors to the group.
1. If you want to copy all processors in a group and paste them into the same processor group or a different group:
    1. Click the three dots on the processor group.
    1. Select **Copy all processors**.
    1. Select the desired processor group, and then paste the processors into it.
1. You can toggle the switch to enable and disable the processor group and also each individual processor.

**Notes**:
<br>- Configuring a pipeline with processor groups is available for Worker versions 2.7 and later.
<br>- There is a limit of 10 processor groups for a pipeline canvas.

#### Add another set of processors and destinations

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="The Pipelines page showing two processor groups sending logs to two different destinations" style="width:100%;" >}}

If you want to add another set of processors and destinations, click the plus sign (**+**) to the left of the processor group to add another set of processors and destinations to the source.

To delete a processor group, you need to delete all destinations linked to that processor group. When the last destination is deleted, the processor group is removed with it.

### Add another destination to a processor group

{{< img src="observability_pipelines/setup/another_destination.png" alt="The Pipelines page showing one processor group sending logs to two different destinations" style="width:100%;" >}}

If you want to add an additional destination to a processor group, click the plus sign (**+**) to the right of the processor group.

To delete a destination, click on the pencil icon to the top right of the destination, and select **Delete node**.

**Notes**:
- If you delete a destination from a processor group that has multiple destinations, only the deleted destination is removed.
- If you delete a destination from a processor group that only has one destination, both the destination and the processor group are removed.

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[4]: /observability_pipelines/configuration/explore_templates/
[5]: /observability_pipelines/configuration/update_existing_pipelines/
[6]: /observability_pipelines/configuration/install_the_worker/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /monitors/types/metric/
[9]: /observability_pipelines/guide/environment_variables/
[10]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[11]: /observability_pipelines/search_syntax/

{{% /tab %}}
{{% tab "Metrics" %}}

1. Navigate to [Observability Pipelines][1].
1. Select the [Metric Tag Governance][2] template.
1. Set up the [Datadog Agent][3] source.
1. Add [processors][4] to filter and transform your metrics.
    - If you want to copy a processor, click the copy icon for that processor and then use `command-v` to paste it.
1. Set up the [Datadog Metrics][5] destination.

### Add another processor group

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="The Pipelines page showing two processor groups sending logs to the same destination" style="width:100%;" >}}

If you want to add another group of processors for a destination:
1. Click the plus sign (**+**) at the bottom of the existing processor group.
1. Click the name of the processor group to update it.
1. Optionally, enter a group filter. See [Search Syntax][6] for more information.
1. Click **Add** to add processors to the group.
1. If you want to copy all processors in a group and paste them into the same processor group or a different group:
    1. Click the three dots on the processor group.
    1. Select **Copy all processors**.
    1. Select the desired processor group, and then paste the processors into it.
1. You can toggle the switch to enable and disable the processor group and also each individual processor.

**Notes**: There is a limit of 10 processor groups for a pipeline canvas.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /observability_pipelines/sources/datadog_agent/?tab=metrics
[4]: /observability_pipelines/processors/
[5]: /observability_pipelines/destinations/datadog_metrics/
[6]: /observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### Install the Worker and deploy the pipeline

After you have set up your source, processors, and destinations:

1. Click **Next: Install**.
1. Select the platform on which you want to install the Worker.
1. Enter the [environment variables][9] for your sources and destinations, if applicable.
1. Follow the instructions on installing the Worker for your platform. The command provided in the UI to install the Worker has the relevant environment variables populated.
    - See [Install the Worker][6] for more information.
    - **Note**: If you are using a proxy, see the `proxy` option in [Bootstrap options][10].
1. Enable out-of-the-box monitors for your pipeline.
    1. Navigate to the [Pipelines][7] page and find your pipeline.
    1. Click **Enable monitors** in the **Monitors** column for your pipeline.
    1. Click **Start** to set up a monitor for one of the suggested use cases.<br>
        - The metric monitor is configured based on the selected use case. You can update the configuration to further customize it. See the [Metric monitor documentation][8] for more information.

After you have set up your pipeline, see [Update Existing Pipelines][11] if you want to make any changes to it.

See [Advanced Worker Configurations][5] for bootstrapping options.

## Set up a pipeline with the API

<div class="alert alert-danger">Creating pipelines using the Observability Pipelines API is in Preview. Fill out the <a href="https://www.datadoghq.com/product-preview/observability-pipelines-api-and-terraform-support/"> form</a> to request access.</div>

1. You can use Observability Pipelines API to [create a pipeline][6].

1. After creating the pipeline, [install the Worker][7] to send data through the pipeline.
    - See [Environment Variables][9] for the list of environment variables you need for the different sources, processor, and destinations when you install the Worker.

**Note**: Pipelines created using the API are read-only in the UI. Use the [update a pipeline][8] endpoint to make any changes to an existing pipeline.

See [Advanced Worker Configurations][5] for bootstrapping options.

## Set up a pipeline with Terraform

<div class="alert alert-danger">Creating pipelines using Terraform is in Preview. Fill out the <a href="https://www.datadoghq.com/product-preview/observability-pipelines-api-and-terraform-support/"> form</a> to request access.</div>

1. You can use the [datadog_observability_pipeline][10] module to create a pipeline using Terraform.

1. After creating the pipeline, [install the Worker][7] to send data through the pipeline.
    - See [Environment Variables][9] for the list of environment variables you need for the different sources, processor, and destinations when you install the Worker.

Pipelines created using Terraform are read-only in the UI. Use the [datadog_observability_pipeline][10] module to make any changes to an existing pipeline.

See [Advanced Worker Configurations][5] for bootstrapping options.

## Clone a pipeline

To clone a pipeline in the UI:

1. Navigate to [Observability Pipelines][4].
1. Select the pipeline you want to clone.
1. Click the cog at the top right side of the page, then select **Clone**.

## Delete a pipeline

To delete a pipeline in the UI:

1. Navigate to [Observability Pipelines][4].
1. Select the pipeline you want to delete.
1. Click the cog at the top right side of the page, then select **Delete**.

**Note**: You cannot delete an active pipeline. You must stop all Workers for a pipeline before you can delete it.

## Pipeline requirements and limits

- A pipeline must have at least one destination. If a processor group only has one destination, that destination cannot be deleted.
- For log pipelines:
  - You can add a total of three destinations for a log pipeline.
  - A specific destination can only be added once. For example, you cannot add multiple Splunk HEC destinations.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /observability_pipelines/configuration/install_the_worker/?tab=docker#api-or-terraform-pipeline-setup
[8]: /api/latest/observability-pipelines/#update-a-pipeline
[9]: /observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /observability_pipelines/configuration/update_existing_pipelines/?