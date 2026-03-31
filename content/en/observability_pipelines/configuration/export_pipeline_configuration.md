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

Setting up and updating a pipeline with Terraform or the API can be time-consuming, manual, and prone to syntax errors. Instead, you can create a pipeline or update an existing pipeline in the UI, and then export the configuration to JSON or Terraform to programmatically create or update the pipeline.


## Export the configuration of a pipeline in draft mode

When building a pipeline that has not been deployed yet, you can set up the pipeline in the UI, and then export the pipeline configuration to JSON or Terraform to programmatically create it.

1. Navigate to [Observability Pipelines][1].
1. [Set up a pipeline][2] by adding your source, processors, and destinations.
1. After your pipeline has been configured, click **Export Pipeline**.
   {{< img src="observability_pipelines/export_pipeline/export_draft_pipeline.png" alt="The export button highlighted in the pipeline UI" style="width:100%;" >}}
1. Click the copy or download button to export the configuration as JSON or Terraform.
   {{< img src="observability_pipelines/export_pipeline/export_json_modal.png" alt="The export modal showing the pipeline configuration in JSON" style="width:100%;" >}}
1. Install the Worker through the API or Terraform to start processing data through the pipeline.
   - [API documentation][3]
   - [Terraform documentation][4]

## Export the configuration of a deployed pipeline

Deployed pipelines have a Worker installed to send data through the pipeline. A deployed pipeline can be active or inactive.

### Export a pipeline's configuration

When viewing deployed pipelines in the UI, you can export the configuration to JSON or Terraform to programmatically create it.

1. Navigate to [Observability Pipelines][1].
1. Select a deployed pipeline (status can be `active` or `inactive`) to view the configuration.
1. Click **Export Pipeline**.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline.png" alt="The export button on a deployed pipeline page" style="width:100%;" >}}
1. Click the copy or download button to export the configuration as JSON or Terraform.
1. Configure and make changes to the Worker through the API or Terraform before deploying programmatically.
   - [API documentation][5]
   - [Terraform documentation][4]

### Export a pipeline's configuration after making edits to the pipeline

When editing a deployed pipeline, you can add new components such as [Packs][6] or update volume control rules in the UI and export the configuration to JSON or Terraform to deploy the changes programmatically.

1. Navigate to [Observability Pipelines][1].
1. Select a deployed pipeline (status can be either `active` or `inactive`) to view the configuration.
1. Make changes to your source, destinations, or processors.
1. Before exiting the pipeline, click **Export Pipeline**.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline_edit.png" alt="The export button highlighted on the pipeline edit page" style="width:100%;" >}}
1. Click the copy or download button to export the configuration as JSON or Terraform.
   - **Note**: After making updates to your pipeline in the UI, the exported configuration includes the latest changes, even if you haven't save the changes.
   {{< img src="observability_pipelines/export_pipeline/export_terraform_modal.png" alt="The export modal showing the pipeline configuration in Terraform" style="width:100%;" >}}
1. Click the Observability Pipelines logo on the top left side of the page to exit the pipeline without saving the changes made in the UI.
   {{< img src="observability_pipelines/export_pipeline/exit_export_deployed_pipeline.png" alt="The Observability Pipelines log highlighted on the pipeline page" style="width:100%;" >}}
1. Use the copied or downloaded configuration to programmatically update your pipeline.
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
