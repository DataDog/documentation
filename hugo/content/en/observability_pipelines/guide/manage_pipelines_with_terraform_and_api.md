---
title: Manage Observability Pipelines with the API or Terraform
description: Learn how to create and update pipelines using the API or Terraform.
disable_toc: false
further_reading:
- link: "/observability_pipelines/set_up_pipelines"
  tag: "documentation"
  text: "Set up a pipeline"
- link: "/api/latest/observability-pipelines/"
  tag: "documentation"
  text: "Observability Pipelines API"
---

## Overview

If you manage many Observability Pipelines deployments and want to reduce manual configuration errors, you can use the API or Terraform to programmatically manage your pipelines. This guide describes how to configure and update your pipelines with the [API](#manage-pipelines-with-the-api) or [Terraform](#manage-pipelines-with-terraform).

## Prerequisites

Before you begin, make sure you:

- Have Datadog API and application keys for authentication.<br>**Note**: The API key must be [enabled for Remote Configuration][1].
- If you are going to use Terraform:
  - Have the latest version of Terraform installed on your machine.
  - Reviewed the [Datadog's Terraform Provider][2] and [Observability Pipelines resource][3].
- If you are going to use the API, reviewed the [Observability Pipelines API][4] endpoint specifications and additional configuration parameters.

## Manage pipelines with the API

You can perform CRUD (Create, Read, Update, Delete) operations with the Observability Pipelines API. This section describes how to use these endpoints in your workflow. For each example request, replace the following placeholders:

- `<PIPELINE_ID>` with the identifier obtained when the pipeline was created
- `<DD_API_KEY>` with your Datadog API key
- `<DD_APP_KEY>` with your Datadog application key

The example payloads also include sample `id` values (such as `my-processor-group` and `datadog-agent-source`) for sources, processors, and destinations. These are names you choose and can rename to fit your own conventions. The `type` values (such as `datadog_agent`, `filter`, and `datadog_logs`) are fixed and must match a supported component type.


### Create a pipeline

To [create a pipeline][5], send a `POST` request with a JSON payload that defines the pipeline's name and its main components: sources, processors, and destinations.

Example request:

```bash
curl -X POST "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "config": {
        "destinations": [
          { "id": "datadog-logs-destination", "type": "datadog_logs", "inputs": ["my-processor-group"] }
        ],
        "pipeline_type": "logs",
        "processor_groups": [
          {
            "enabled": true,
            "id": "my-processor-group",
            "include": "service:my-service",
            "inputs": [
              "datadog-agent-source"
            ],
            "processors": [
              { "id": "filter-processor", "enabled": true, "type": "filter", "include": "service:my-service" }
            ]
          }
        ],
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ]
      },
      "name": "Main Observability Pipeline"
    },
    "type": "pipelines"
  }
}'
```

### Retrieve a pipeline configuration

To [audit or verify an existing pipeline configuration][6], send a `GET` request with the specific pipeline ID.

Example request:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

### Update an existing pipeline

To [update an existing pipeline's configuration][7], send a `PUT` request with the pipeline changes in the JSON payload.

Example request:

```bash
curl -X PUT "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "name": "Updated Pipeline Name",
      "config": {
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ],
        "processors": [
          { "id": "filter-processor", "type": "filter", "include": "service:my-updated-service", "inputs": ["datadog-agent-source"] }
        ],
        "destinations": [
          { "id": "updated-datadog-logs-destination", "type": "datadog_logs", "inputs": ["filter-processor"] }
        ]
      }
    },
    "type": "pipelines"
  }
}'
```

### Delete a pipeline

To [delete a pipeline][8], send a `DELETE` request to the corresponding endpoint. A successful deletion results in a `204` status code indicating that the pipeline has been removed.

**Note**: The delete operation is irreversible. Use this endpoint only when you're certain that the pipeline is no longer needed.

Example request:

```bash
curl -X DELETE "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

## Manage pipelines with Terraform

You can use Terraform resources to create and deploy a pipeline.

### Create a pipeline using Terraform

Define a pipeline using the [datadog_observability_pipeline][9] resource. Maintain this file in your version control system to track changes.

Set the following environment variables before you run Terraform, so that credentials aren't stored in your configuration file:
```shell
export DD_API_KEY=<DD_API_KEY>
export DD_APP_KEY=<DD_APP_KEY>
export DD_HOST={{< region-param key="dd_api" code="true" >}}
```

Example Terraform pipeline configuration:

```hcl
terraform {
  required_providers {
    datadog = {
      source = "DataDog/datadog"
      version = "~> 3.84"
    }
  }
}

provider "datadog" {}

resource "datadog_observability_pipeline" "main" {
  name = "Main Observability Pipeline"

  config {
    source {
      id = "datadog-agent-source"

      datadog_agent {}
    }

    processor_group {
      id      = "filter-processor"
      enabled = true
      include = "service:my-service"
      inputs  = ["datadog-agent-source"]

      processor {
        id      = "filter-1"
        enabled = true
        include = "service:my-service"

        filter {}
      }
    }

    destination {
      id     = "datadog-logs-destination"
      inputs = ["filter-processor"]

      datadog_logs {}
    }
  }
}
```

Replace `service:my-service` with a search query that matches the logs you want the pipeline to process.

### Deploy a pipeline with Terraform

After you define a new pipeline configuration or update an existing configuration, run the following Terraform commands to deploy your pipeline configuration:

```bash
terraform init
terraform plan
terraform apply
```

- `terraform init` initializes your working directory.
- `terraform plan` previews the changes being made.
- `terraform apply` applies the changes, which creates or updates your pipeline accordingly.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /api/latest/observability-pipelines/
[5]: /api/latest/observability-pipelines/create-a-new-pipeline/
[6]: /api/latest/observability-pipelines/get-a-specific-pipeline/
[7]: /api/latest/observability-pipelines/update-a-pipeline/
[8]: /api/latest/observability-pipelines/delete-a-pipeline/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline