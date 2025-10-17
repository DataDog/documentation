---
title: Set Up Software Catalog
aliases:
  - /software_catalog/set_up
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
  - link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
    tag: "Blog"
    text: "Manage Service Catalog entries with the Service Definition JSON Schema"
  - link: "https://www.datadoghq.com/blog/service-catalog-setup/"
    tag: "Blog"
    text: "Easily add tags and metadata to your services using the simplified Service Catalog setup"
  - link: "https://www.datadoghq.com/blog/github-actions-service-catalog/"
    tag: "Blog"
    text: "I use GitHub Ac­tions for Data­dog's Service Catalog, and you should, too"
  - link: "https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/"
    tag: "Blog"
    text: "Best practices for end-to-end service ownership with Datadog Service Catalog"
---

## Overview

Software Catalog entities are defined through [Entity Definitions][1], which are Kubernetes-style YAML configuration files. 

To populate Software Catalog, you can:
- Set up Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), infrastructure metrics, or logs, which automatically feed entity data into Software Catalog.
- Create entity definitions manually or through automation. 
- Import existing entity definitions from third parties. 

## Automatically discover entities from Datadog

By default, Software Catalog is automatically populated with entries discovered from APM, USM, and RUM. You can also manually import entries from other Datadog telemetries, like logs. 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}Discover from APM, USM, and RUM{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}Import from Infrastructure and Logs{{< /nextlink >}}
{{< /whatsnext >}}

### APM

When you instrument your application code with Datadog APM SDKs or OpenTelemetry, your applications emit traces and generate unsampled trace metrics. These traces and metrics power the entity discovery and dependency mapping capabilities in IDP. Your instrumentation choices (for example, your Datadog Agent version, your SDK version, and whether you use custom instrumentation or service overrides) affect the quality and accuracy of your dependency maps. See [Discover from APM, USM, and RUM][5] for details.

### USM

USM detects Golden Signal metrics (for example, requests, errors, and durations) and maps out application dependencies based on eBPF. It does not require instrumentation of your application code.

### RUM 

RUM provides frontend user experience data, including page performance, errors, session events, and views. If you have RUM applications, they appear in Software Catalog as **Frontend Apps** in the component selector. 

### Other Datadog telemetries

You can also import entities that are identified from Datadog telemetries like logs, host metrics, container metrics, network metrics, and process metrics. 

When you use [**Import Entities**][10] and choose a data source, Datadog queries that source and searches for valid `DD_SERVICE` tags. Entities are marked with the `kind:service` attribute.

**Note**: You should only do this if the `DD_SERVICE` tags are well maintained and do not contain irrelevant or incorrect tag values.

## Create entities

[Entity definitions][1], defined in entity YAML files, are the canonical source of truth in Software Catalog. You can: 
- Create entity definitions manually through Datadog.
- Store definitions in a version control system like Git, and set up [Source Code Integration][6] to sync definitions with IDP. Changes made to your files are reflected in Datadog within minutes.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/create_entities#through-the-datadog-ui" >}}Create through the Datadog UI{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/create_entities#through-automation" >}}Create through code automation{{< /nextlink >}}
{{< /whatsnext >}}

**Note**: To automatically correlate an entity to its telemetry, the `name` field in your definition must exactly match the primary identifier from the telemetry data. For most services, this is the `service` tag as defined in Datadog's Unified Service Tagging. See examples for [`kind:datastore`][7], [`kind:queue`][8], and other [`entity types`][9].

## Import entities

If you maintain software inventories in Backstage or ServiceNow CMDB, you can sync these inventories into Datadog's Software Catalog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage" >}}Import from Backstage{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow" >}}Import from ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

### Backstage 

You can bring your Backstage entities into Datadog's IDP in one of two ways:
1. Install [Datadog's Backstage plugin][11]. 
1. Import entity descriptor files from Backstage to IDP using the Datadog API, Terraform, or Datadog's GitHub integration. 

### ServiceNow

Sync your ServiceNow CMDB inventories with Datadog's Software Catalog by setting up a regular query against your ServiceNow CI tables.

## Define entity ownership

Link entities to teams to enable team-based filtering across Datadog products, route notifications to the right owners, and drive accountability through Scorecards and Campaigns. For details, see [Define ownership for Software Catalog entities][12].

## Verify configuration completeness 

Following monitoring best practices such as tracing, logging, and code profiling helps you ensure that you have all the data you need during incident triage. Software Catalog provides automatic checks for these recommended setups. 

To view the configuration completeness for an entity, click the entity in the [Software Catalog][2], then find the **Setup Guidance** tab:

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Software Catalog with the Setup Guidance tab highlighted." >}}

The Setup Guidance table does not necessarily reflect billing for individual products, but rather activity for the entity you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, `Infrastructure Monitoring` might have `Not Detected` specified, even if you have hosts or containers running infrastructure monitoring. 

## Configure role based access and permissions

For general information, see [Role Based Access Control][3] and [Role Permissions][4].

### Read permission

The Software Catalog read permission allows a user to read Software Catalog data, which enables the following features:
- Software Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Software Catalog write permission allows a user to modify Software Catalog data. The write permission is required for the following features:
- Inserting or updating a service definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a service definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /internal_developer_portal/software_catalog/entity_model
[2]: https://app.datadoghq.com/software
[3]: /account_management/rbac
[4]: /account_management/rbac/permissions
[5]: /internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[6]: /integrations/guide/source-code-integration/
[7]: /internal_developer_portal/software_catalog/entity_model/entity_types?tab=datastore#datastore-peer-tags
[8]: /internal_developer_portal/software_catalog/entity_model/entity_types?tab=queue#datastore-peer-tags
[9]: /internal_developer_portal/software_catalog/entity_model?tab=v30
[10]: https://app.datadoghq.com/software/settings/get-started
[11]: https://www.npmjs.com/package/@datadog/backstage-plugin-datadog-entity-sync-backend
[12]: /internal_developer_portal/software_catalog/set_up/ownership



