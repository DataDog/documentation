---
title: Import Entities
disable_toc: false
aliases:
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
further_reading:
  - link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
    tag: "Blog"
    text: "Import Backstage YAML files into Datadog"
  - link: "https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/#get-cmdb-metadata-in-the-datadog-service-catalog"
    tag: "Blog"
    text: "Manage your infrastructure with ServiceNow CMDB and Datadog"
---


## Overview

If you already have data or services registered in Backstage or ServiceNow, you can import these services into Datadog directly. 

## Entities from Backstage

### Sync Backstage entities into Datadog Software Catalog

Use the [Datadog Backstage plugin][3] to automatically sync your Backstage catalog entities to the Datadog Software Catalog [entity model][5] on a configurable schedule. The plugin runs as a Backstage backend service and supports entity filtering (for example, you can sync only entities with a specific Backstage component type, such as services or repositories).

You need a Datadog [API key][6], [application key][7], and [Datadog site][8] to configure the plugin. For installation and configuration instructions, see the [plugin README][9].

### Import entity descriptor files from Backstage

{{< img src="/tracing/software_catalog/software-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

To import Backstage definitions:

- **API or Terraform**: Replace the YAMLs in your requests with Backstage YAMLs. 
- **GitHub integration**: Save your Backstage YAMLs in a repository with Datadog read permissions. Datadog scans for files named `catalog-info.yaml` in your repositories.

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

<div class="alert alert-danger">
The Software Catalog processes the entire YAML file as a whole. If any section of the YAML file does not have <code>kind:component</code> or <code>kind:system</code>, the entire <code>catalog-info.yaml</code> file is rejected. Schema version v3.0 is required to use kind:system and the <code>dependsOn</code> field.
</div>

#### Example YAML for catalog-info.yaml
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

## Import from ServiceNow

To populate your Datadog Software Catalog with services from your ServiceNow Configuration Management Database (CMDB), use the Service Ingestion feature in the [Datadog-ServiceNow integration][2].

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /integrations/servicenow/#service-ingestion
[3]: https://www.npmjs.com/package/@datadog/backstage-plugin-datadog-entity-sync-backend
[5]: /internal_developer_portal/software_catalog/entity_model/
[6]: /account_management/api-app-keys/#api-keys
[7]: /account_management/api-app-keys/#application-keys
[8]: /getting_started/site/
[9]: https://github.com/DataDog/datadog-backstage-plugins/blob/main/plugins/datadog-entity-sync-backend/README.md
