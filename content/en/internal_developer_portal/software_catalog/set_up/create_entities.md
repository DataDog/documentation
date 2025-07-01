---
title: Create Entities
disable_toc: false
aliases:
  - /software_catalog/set_up/new_to_datadog ## aliases for New to Datadog page
  - /tracing/software_catalog/setup
  - /software_catalog/setup
  - /tracing/service_catalog/setup
  - /service_catalog/setup
  - /software_catalog/create_entries/   ### aliases for Create Entries page 
  - /software_catalog/enrich_default_catalog/create_entries
  - /service_catalog/create_entries/
  - /service_catalog/enrich_default_catalog/create_entries
  - /api_catalog/add_entries
  - /service_catalog/customize/create_entries/
  - /software_catalog/customize/create_entries
further_reading:
  - link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
    tag: "External Site"
    text: "Create and manage service definitions with Terraform"
  - link: "/integrations/github"
    tag: "Documentation"
    text: "Learn about the GitHub Integration"
  - link: "/api/latest/service-definition/"
    tag: "API"
    text: "Learn about the Service Definition API"
  - link: "/api/latest/software-catalog/"
    tag: "API"
    text: "Learn about the Software Catalog API"
---

## Overview

To add [entity definitions][13] to Software Catalog, you can:
- manually create definitions through the Datadog UI.
- manage definitions in code and automate import through GitHub, Terraform, or the Datadog API.

## Through the Datadog UI

To create entity definitions in the Datadog UI:

1. Navigate to the [Software Catalog Setup & Config][3] page.
1. Click **Create a New Entry**.
1. Specify your service details, including metadata such as ownership and documentation links.
1. (Optional) Switch to **YAML** or **JSON** to see the generated code and cURL command. In the code editors, Datadog automatically flags invalid data. 

   {{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

1. Submit the metadata by clicking **Save Entry** or by running the provided cURL command.

   **Note**: You must have [Software Catalog Write permission][2] to save the entry. 


## Through automation

To automate import through GitHub, Terraform, the Datadog Software Metadata Provider, or the Datadog Service Definition API:

### Create the entity definition

1. Create `service.datadog.yaml` or `entity.datadog.yaml` to define your entity (Datadog accepts both file names).
1. Name your entity in the `dd-service` (schema version v2.2 or prior) or `name` (schema version v3.0+) field.

   For example:

   {{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
    schema-version: v2.2
    dd-service: my-unmonitored-cron-job
    team: e-commerce
    lifecycle: production
    application: shopping-app
    description: important cron job for shopist backend
    tier: "2"
    type: web
    contacts:
    - type: slack
    contact: https://datadogincidents.slack.com/archives/XXXXX
    links:
    - name: Common Operations
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    - name: Disabling Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    tags: []
    integrations:
    pagerduty:
    service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
    External Resources (Optional)
   {{< /code-block >}}

1. (Optional) Register multiple services in one YAML file by separating each definition with three dashes (`---`).

### Import the definition 

Import the definition in one of the following ways:

1. **Terraform**: Create and import the definition as a [Terraform resource][4]. 
   
   **Note**: Creating and managing services in the Software Catalog through automated pipelines requires [Datadog Provider][5] v3.16.0 or later.

1. **Datadog APIs**: Import your definition using the [Service Definition API][7] (for schema v2.x) or the [Software Catalog API][8] (for schema v3+), which are both open-sourced GitHub Action solutions.
1. **GitHub**: Configure the [Datadog GitHub integration](#github-integration) to manage and import your definitions.

#### GitHub integration

Configure the [GitHub integration][9] to directly link from where you view the service's definition in the Software Catalog to where it's stored and editable in GitHub. Datadog scans for the `service.datadog.yaml` and `entity.datadog.yaml` files throughout each repository with read permissions.

To install the GitHub integration:
1. Navigate to the [integration tile][10].
2. Click **Link GitHub Account** in the **Repo Configuration** tab.

When the GitHub integration is set up for your definitions, an **Edit in GitHub** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="An Edit in GitHub button appears in the Definition tab of a service in the Software Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Software Catalog. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

To prevent accidental overwriting, create and modify your definition files with either the GitHub integration or the [Definition API endpoints][11]. Updating the same service using both the GitHub and the API may result in unintended overwriting.  

##### Integration validation

To validate your service definitions ingested by Datadog's GitHub integration, you can view events when services are updated or when there is an error. To view validation errors in [Event Management][12], filter by `source:software_catalog` and `status:error`. Adjust the timeframe as needed.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Github event showing error message from service definition." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /internal_developer_portal/software_catalog/set_up#role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /api/latest/service-definition/
[8]: /api/latest/software-catalog/
[9]: /integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /internal_developer_portal/software_catalog/entity_model
