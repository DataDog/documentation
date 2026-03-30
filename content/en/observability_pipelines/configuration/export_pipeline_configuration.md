---
title: Export a Pipeline Configuration to JSON or Terraform
disable_toc: false
further_reading:
- link: "observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up a pipeline"
- link: "observability_pipelines/configuration/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update an existing pipeline"
- link: "https://docs.datadoghq.com/api/latest/observability-pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines API"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline"
  tag: "Documentation"
  text: "Observability Pipelines Terraform resource"
---

## Overview

Setting up and updating a pipeline with Terraform or the API can be time-consuming, manual, and prone to syntax errors. Instead, you can create a pipeline or update existing pipelines in the UI, and then export the configuration to JSON or Terraform to programmatically create or update the pipeline.

Building a pipeline in the UI helps you make changes to your configuration before exporting and using the API or Terraform to deploy it programmatically.

## Export the configuration of a draft pipeline

When building a pipeline that has not been deployed yet, you can set up the pipeline in the UI, and then export the pipeline configuration to JSON or Terraform.

1. Navigate to [Observability Pipelines][1].
1. [Set up a pipeline][2] by adding your source, processors, and destinations.
1. After your pipeline has been configured, click **Export Pipeline**.
   {{< img src="observability_pipelines/export_pipeline/export_draft_pipeline.png" alt="Export button on a draft pipeline" style="width:100%;" >}}
1. Copy or download the JSON or Terraform file to programmatically deploy your pipeline.
   {{< img src="observability_pipelines/export_pipeline/export_json_modal.png" alt="Export JSON modal" style="width:100%;" >}}
1. Install the Worker through the API or Terraform to start processing data through the pipeline.
   - [API documentation][3]
   - [Terraform documentation][4]

## Export the configuration of a deployed pipeline

Deployed pipelines can be active or inactive pipelines.

### Export the current pipeline's configuration

When viewing deployed pipelines in the UI, you can export the configuration to JSON or Terraform and apply changes as code.

1. Navigate to [Observability Pipelines][1].
1. Select a deployed pipeline (status can be either `active` or `inactive`) to view the configuration.
1. Click **Export Pipeline**.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline.png" alt="Export button on a deployed pipeline" style="width:100%;" >}}
1. Copy or download the JSON or Terraform file.
1. Configure and make changes to the Worker through the API or Terraform before deploying programmatically.
   - [API documentation][5]
   - [Terraform documentation][4]

### Export the configuration after making edits to a pipeline

When editing a deployed pipeline, you can add new components such as [Packs][6] or update volume control rules in the UI and export the configuration to JSON or Terraform to deploy the changes programmatically.

1. Navigate to [Observability Pipelines][1].
1. Select a deployed pipeline (status can be either `active` or `inactive`) to view the configuration.
1. Make changes to your source, destinations, or processors.
1. Before exiting the pipeline, click **Export Pipeline**.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline_edit.png" alt="Export button after editing a deployed pipeline" style="width:100%;" >}}
1. Copy or download the updated JSON or Terraform file.
   - **Note**: After making updates to your pipeline in the UI, the exported configuration includes the latest changes.
   {{< img src="observability_pipelines/export_pipeline/export_terraform_modal.png" alt="Export Terraform modal" style="width:100%;" >}}
1. Exit the pipeline by clicking the Observability Pipelines logo in the upper left corner to make sure changes are not saved from the UI.
   {{< img src="observability_pipelines/export_pipeline/exit_export_deployed_pipeline.png" alt="Exit the pipeline without saving changes" style="width:100%;" >}}
1. Configure and make changes using the Observability Pipelines API or Terraform.
   - [API documentation][5]
   - [Terraform documentation][4]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-in-the-ui
[3]: https://docs.datadoghq.com/api/latest/observability-pipelines/#create-a-new-pipeline
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://docs.datadoghq.com/api/latest/observability-pipelines/#update-a-pipeline
[6]: /observability_pipelines/packs/
