---
title: Set Up Software Catalog for New Datadog Users
aliases:
  - /software_catalog/create_entries/   ### aliases for Create Entries page 
  - /software_catalog/enrich_default_catalog/create_entries
  - /service_catalog/create_entries/
  - /service_catalog/enrich_default_catalog/create_entries
  - /api_catalog/add_entries
  - /service_catalog/customize/create_entries/
  - /software_catalog/customize/create_entries
  - /software_catalog/import_entries_integrations/     ## aliases for Import Entries from Backstage page 
  - /software_catalog/enrich_default_catalog/import_entries_integrations
  - /software_catalog/customize/import_entries_integrations/
  - /service_catalog/import_entries_integrations/
  - /service_catalog/enrich_default_catalog/import_entries_integrations
  - /service_catalog/customize/import_entries_integrations/
  - /service_catalog/customize/import_entries_backstage/
  - /software_catalog/customize/import_entries_backstage
  - /service_catalog/customize/import_entries_servicenow/   ## alias for Import Entries from ServiceNow page
  - /software_catalog/customize/import_entries_servicenow
  - /tracing/software_catalog/guides/validating-service-definition  ## aliases for Validating Service Definition page
  - /software_catalog/guides/validating-service-definition
  - /tracing/service_catalog/guides/validating-service-definition
  - /service_catalog/guides/validating-service-definition
  - /service_catalog/use_cases/validating_service_definition
  - /software_catalog/use_cases/validating_service_definition
further_reading:
  - link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
    tag: "External Site"
    text: "Create and manage service definitions with Terraform"
  - link: "/api/latest/service-definition/"
    tag: "API"
    text: "Learn about the Service Definition API"
  - link: "/integrations/github"
    tag: "Documentation"
    text: "Learn about the GitHub Integration"
  - link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
    tag: "Blog"
    text: "Import Backstage YAML files into Datadog"
  - link: "https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/#get-cmdb-metadata-in-the-datadog-service-catalog"
    tag: "Blog"
    text: "Manage your infrastructure with ServiceNow CMDB and Datadog"
  - link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
    tag: "Source Code"
    text: "Service Definition Schema"
  - link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
    tag: "Blog"
    text: "Manage Service Catalog entries with the Service Definition JSON Schema"
---

## Overview 

If you're new to Datadog, you can [automatically populate Software Catalog][10] by setting up Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), infrastructure metrics, or logs.

Alternatively, you can add components to Software Catalog by:

-  Manually creating service definitions through the Datadog UI, the Datadog API, Terraform, or a GitHub integration.
-  Importing existing services from sources like ServiceNow or Backstage.

By default, these services are not associated with Datadog telemetry, but you can link telemetry data from Datadog or external sources manually using entity definition YAML files.

## Build a Software Catalog

Create service definitions for each component you want to add to your Software Catalog. 

### Create service definitions through code 

To create a service definition using the [Datadog Service Definition API][8], [Terraform][7], or [GitHub integration][9]:

1. Create or find `service.datadog.yaml` or `entity.datadog.yaml` (Datadog accepts both file names).
1. Name your component in the `dd-service` (schema version v2.2 or prior) or `name` (schema version v3.0+) field.

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
1. Import your service(s) through one of the following:

   - [The Datadog API][4]
   - [Terraform][5]
   - [Datadog's GitHub integration][6]

### Create service definitions in the Datadog UI

Alternatively, create service definitions in the Datadog UI:

1. Navigate to the [Software Catalog Setup & Config page][1].
2. Click **Create a New Entry**.
3. Select the **Code** tab.
4. Paste the schema content.

### Validate service definitions

A mistake in a service definition file could cause you to create a service with invalid data or introduce an error into the metadata of an existing service. 

To prevent this, validate your service definition files in one of the following ways:

#### Datadog UI validation

If you create service definitions in the Datadog UI, Datadog automatically flags invalid data. 

{{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

#### IDE extension validation

Built-in validation mechanisms prevent you from sending incorrect metadata into Software Catalog. 

#### GitHub Integration validation

To validate your service definitions ingested by Datadog's GitHub integration, you can view events when services are updated or when there is an error. To view validation errors in [Event Management][2],  filter by `source:software_catalog` and `status:error`. Adjust the timeframe as needed.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Github event showing error message from service definition." >}}

## Import entries from Backstage

If you already have data or services registered in Backstage, you can import these services into Datadog directly. 

{{< img src="/tracing/software_catalog/software-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

To import Backstage definitions:

- **API or Terraform**: Replace the YAMLs in your requests with Backstage YAMLs. 
- **GitHub integration**: Save your Backstage YAMLs in a repository with Datadog read permissions. Datadog scans for files named [`catalog-info.yaml`][1] in your repositories.

During import, Datadog maps Backstage data to Datadog data:
| Backstage Field | Datadog Mapping |
|-----------------|-----------------|
| `kind:component` and `kind:system` | Datadog recognizes these; `kind:component` is recognized as a service |
| `metadata.name` | `dd-service` |
| `metadata.namespace` | Custom tag with format `namespace:${metadata.namespace}` |
| `spec.lifecycle` | `lifecycle` |
| `spec.owner` | `team` |
| `metadata.links` | `links` |
| Annotation `github.com/project-slug` | Link with `type=repo` and `url=https://www.github.com/${github.com/project-slug}` |
| Annotations `pagerduty.com/service-id` and `pagerduty.com/account` | Combined and mapped to `integration.pagerduty` |
| `metadata.description` | `description` |
| `spec.system` | `application` |
| `spec.dependsOn` | `dependsOn` |
| Other `spec` values | Mapped to custom tags |

<div class="alert alert-warning">
The Software Catalog processes the entire YAML file as a whole. If any section of the YAML file does not have <code>kind:component</code> or <code>kind:system</code>, the entire <code>catalog-info.yaml</code> file is rejected. Schema version v3.0 is required to use kind:system and the <code>dependsOn</code> field.
</div>

### Example YAML for catalog-info.yaml
{{< code-block lang="yaml" filename="catalog-info.yaml" collapsible="true" >}}
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: artist-web
  description: The place to be, for great artists
spec:
  type: service
  lifecycle: production
  owner: artist-relations-team
  system: artist-engagement-portal
  dependsOn:
    - service:email-service
{{< /code-block >}}

## Import entries from ServiceNow

To populate your Datadog Software Catalog with services from your ServiceNow Configuration Management Database (CMDB), use the Service Ingestion feature in the [Datadog-ServiceNow integration][3].

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/settings/get-started
[2]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_catalog%20status%3Aerror&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&view=all&from_ts=1736452185424&to_ts=1736453085424&live=true
[3]: /integrations/servicenow/#service-ingestion
[4]: /api/latest/service-definition/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[6]: /integrations/github/
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[8]: /api/latest/service-definition/
[9]: /software_catalog/service_definitions/#store-and-edit-definitions-in-github
[10]: /software_catalog/set_up/existing_datadog_user
