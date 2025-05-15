---
title: Set Up Software Catalog
aliases:
  - /tracing/software_catalog/guides/validating-service-definition  ## aliases for Validating Service Definition page
  - /software_catalog/guides/validating-service-definition
  - /tracing/service_catalog/guides/validating-service-definition
  - /service_catalog/guides/validating-service-definition
  - /service_catalog/use_cases/validating_service_definition
  - /software_catalog/use_cases/validating_service_definition
  - /software_catalog/customize/   ## aliases for Customize page 
  - /software_catalog/manage_entries/     
  - /software_catalog/enrich_default_catalog/
  - /service_catalog/manage_entries/
  - /service_catalog/enrich_default_catalog/
  - /service_catalog/customize/
  - /software_catalog/best-practices
  - /software_catalog/guides/best-practices
  - /service_catalog/guides/best-practices
  - /service_catalog/use_cases/best_practices
  - /software_catalog/use_cases/best_practices
  - /software_catalog/navigating  ## aliases for Navigate page 
  - /tracing/software_catalog/browsing
  - /software_catalog/browsing
  - /tracing/service_catalog/browsing
  - /service_catalog/browsing
  - /service_catalog/navigating
  - /software_catalog/manage ## aliases for Manage page 
  - /tracing/software_catalog/investigating
  - /software_catalog/investigating/
  - /tracing/software_catalog/guides/understanding-service-configuration
  - /software_catalog/guides/understanding-service-configuration/
  - /tracing/service_catalog/investigating
  - /service_catalog/investigating/
  - /tracing/service_catalog/guides/understanding-service-configuration
  - /service_catalog/guides/understanding-service-configuration/
  - /api_catalog/add_metadata
  - /api_catalog/owners_and_tags
  - /service_catalog/manage
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

Software Catalog entities are defined through [Entity Definitions][1], which are Kubernetes-style YAML configuration files. 

To populate Software Catalog, you can:
- Set up Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), infrastructure metrics, or logs, which will automatically feed entity data into Software Catalog.
- Create entity definitions manually or through automation. 
-  Import existing entity definitions from third parties. 

By default, these services are not associated with Datadog telemetry, but you can link telemetry data from Datadog or external sources manually using entity definition YAML files.

## Automatically discover entities from Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}Discover from APM, USM, and RUM{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}Import from Infrastructure and Logs{{< /nextlink >}}
{{< /whatsnext >}}

## Create entities

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/create_entities#through-the-datadog-ui" >}}Create through the Datadog UI{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/create_entities#through-automation" >}}Create through code automation{{< /nextlink >}}
{{< /whatsnext >}}

## Import entities

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/import-entities#import-from-backstage" >}}Import from Backstage{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/import-entities#import-from-servicenow" >}}Import from ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

## Verify configuration completeness 

Following monitoring best practices such as tracing, logging, and code profiling helps you ensure that you have all the data you need during incident triage. Software Catalog provides automatic checks for these recommended setups. 

To view the configuration completeness for an entity, click the entity in the [Software Catalog][5], then find the **Setup Guidance** tab:

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Software Catalog with the Setup Guidance tab highlighted." >}}

The Setup Guidance table does not necessarily reflect billing for individual products, but rather activity for the entity you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, `Infrastructure Monitoring` might have `Not Detected` specified, even if you have hosts or containers running infrastructure monitoring. 

## Role based access and permissions

For general information, see [Role Based Access Control][25] and [Role Permissions][26].
### Read permission

The Software Catalog read permission allows a user to read Software Catalog data, which enables the following features:
- Software Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Software Catalog write permission allows a user to modify Software Catalog data. The write permission is required for the following features:
- Inserting or Updating a Service Definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a Service Definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

[1]: /internal_developer_portal/software_catalog/entity_model
[5]: https://app.datadoghq.com/software
[24]: /tracing/services/service_page/
[25]: /account_management/rbac
[26]: /account_management/rbac/permissions



[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/software/settings/get-started
[13]: /getting_started/tagging/unified_service_tagging
[14]: /tracing/software_catalog/service_definition_api/
[15]: /integrations/github/
[16]: /tracing/
[17]: /universal_service_monitoring/
[18]: /tracing/services/inferred_services
[19]: /tracing/guide/service_overrides/#remove-service-overrides
[20]: /tracing/guide/service_overrides/
[21]: /software_catalog/endpoints/
[22]: https://app.datadoghq.com/software/settings/get-started?currentTab=import
[23]: /tracing/services/inferred_services



