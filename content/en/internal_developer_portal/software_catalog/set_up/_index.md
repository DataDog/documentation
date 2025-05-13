---
title: Set Up Software Catalog
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
  - /software_catalog/set_up/existing_datadog_user ## aliases for Existing Datadog User page
  - /software_catalog/import_entries_dd/
  - /software_catalog/enrich_default_catalog/import_entries_dd
  - /service_catalog/import_entries_dd/
  - /service_catalog/enrich_default_catalog/import_entries_dd
  - /service_catalog/customize/import_entries_dd
  - /software_catalog/customize/import_entries_dd
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

Software Catalog components are defined through [Entity Definitions][1], which are Kubernetes-style YAML configuration files. 

If you're new to Datadog, you can [automatically populate Software Catalog][2] by setting up Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), infrastructure metrics, or logs.

Alternatively, or to extend the auto-populated Software Catalog, you can:

- Create definitions through the Datadog UI.
- Create definitions in platforms like GitHub and leverage Datadog integrations to automatically import them. 
- Import existing components from sources like ServiceNow or Backstage.

By default, these services are not associated with Datadog telemetry, but you can link telemetry data from Datadog or external sources manually using entity definition YAML files.

## Add components

To add components, you can:
- manually add through the Datadog UI.
- automate import through GitHub, Terraform, the Datadog Software Metadata Provider, or the Datadog Service Definition API.

### Through the Datadog UI

To create component definitions in the Datadog UI:

1. Navigate to the [Software Catalog Setup & Config][3] page.
1. Click **Create a New Entry**.
1. Specify your service details, including metadata such as ownership and documentation links.
1. (Optional) Switch to **YAML** or **JSON** to see the generated code and cURL command. In the code editors, Datadog automatically flags invalid data. 

   {{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

1. Submit the metadata by clicking **Save Entry** or by running the provided cURL command.

   **Note**: You must have [Software Catalog Write permission](#role-based-access-and-permissions) to save the entry. 

### Through automation

To automate import through GitHub, Terraform, the Datadog Software Metadata Provider, or the Datadog Service Definition API:

#### Create the component definition

1. Create `service.datadog.yaml` or `entity.datadog.yaml` to define your component (Datadog accepts both file names).
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

#### Import the definition 

{{< tabs >}}
{{% tab "GitHub" %}}

Configure the [GitHub integration][1] to directly link from where you view the service's definition in the Software Catalog to where it's stored and editable in GitHub. Datadog scans for the `service.datadog.yaml` and `entity.datadog.yaml` files throughout each repository with read permissions.

To install the GitHub integration:
1. Navigate to the [integration tile][2].
2. Click **Link GitHub Account** in the **Repo Configuration** tab.

When the GitHub integration is set up for your definitions, an **Edit in GitHub** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="An Edit in GitHub button appears in the Definition tab of a service in the Software Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Software Catalog. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

To prevent accidental overwriting, create and modify your definition files with either the GitHub integration or the [Definition API endpoints][3]. Updating the same service using both the GitHub and the API may result in unintended overwriting.  

#### Integration validation

To validate your service definitions ingested by Datadog's GitHub integration, you can view events when services are updated or when there is an error. To view validation errors in [Event Management][4], filter by `source:software_catalog` and `status:error`. Adjust the timeframe as needed.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Github event showing error message from service definition." >}}

[1]: /integrations/github/
[2]: https://app.datadoghq.com/integrations/github
[3]: /software_catalog/apis/
[4]: https://app.datadoghq.com/event/explorer

{{% /tab %}}

{{% tab "Terraform" %}}

The Software Catalog provides a definition as a [Terraform resource][1]. Creating and managing services in the Software Catalog through automated pipelines requires [Datadog Provider][2] v3.16.0 or later.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest


{{% /tab %}}

{{% tab "Metadata provider" %}}

As an alternative to the GitHub integration and Terraform, you can use an open-sourced GitHub Action solution named [Datadog Software Catalog Metadata Provider][1].

[1]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider

{{% /tab %}}

{{% tab "Service definition API" %}}

As an alternative to the GitHub integration and Terraform, you can use an open-sourced GitHub Action solution named [Datadog Service Definition API][1].

[1]: /api/latest/service-definition/

{{% /tab %}}
{{< /tabs >}}

### IDE plugin 

Datadog provides a [JSON Schema][53] for definitions so that when you are editing a definition in a [supporting IDE][54], features such as autocomplete and validation are provided.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode recognizing problem to fix" style="width:100%;" >}}

The [JSON schema for Datadog definitions][55] is registered with the open source [Schema Store][54].

## Discover components from other Datadog products

Software Catalog automatically discovers components from Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), and Real User Monitoring (RUM). You can also configure it to import components from infrastructure metrics and logs.

{{% collapse-content title="APM, USM, RUM" level="h3" expanded=false id="id-for-anchoring" %}}

Datadog Software Catalog is pre-populated with entries detected through [APM][41], eBPF-based autodiscovery with [Universal Service Monitoring][42], and RUM applications.

All automatically detected components appear in the Component Selector within Software Catalog.

APM and USM automatically detect the following component types: `service`,`datastore`, `queue`, `external providers`, `inferred services`, and `endpoints`. APM SDKs identify dependencies of instrumented services and classify them as databases, queues, or third-party APIs—even if those dependencies are not directly instrumented. Custom instrumentation may affect how components are auto-discovered and how the `service tag` is assigned. To learn more, see [APM Inferred Services][43].

RUM is responsible for discovering `frontend apps` components.

**Managing automatically-named services:**
- You can opt-in to [inferred entities][43] to filter out entities by type (database, queue, third-party).
- You can optionally [remove service overrides][44] such as `service:my-service-http-client` from your catalog or map.

For information about discovering endpoints, see [Discovering Endpoints from APM][45].

**Note**: The [performance metrics][46] for a component are tied to its [primary operations][47]. If a service is detected only by USM, the performance view shows [USM metrics][49]; if a component is detected only by APM, or by both APM and USM, the performance view shows APM [trace metrics][48].

[41]: tracing/
[42]: universal_service_monitoring/
[43]: tracing/services/inferred_services/
[44]: tracing/guide/service_overrides/#remove-service-overrides
[45]: software_catalog/endpoints/
[46]: https://app.datadoghq.com/software?lens=performance
[47]: tracing/guide/configuring-primary-operation/
[48]: tracing/metrics/metrics_namespace/
[49]: universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics

{{% /collapse-content %}}

{{% collapse-content title="Infrastructure and logs" level="h3" expanded=false id="id-for-anchoring" %}}

You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][31] to populate the Software Catalog. To discover `kind:service` components through Datadog infrastructure metrics or logs, navigate to the Software Catalog [**Import Entries** tab][32]. 

{{< img src="tracing/software_catalog/import_entries.png" alt="Import Entries tab in the Software Catalog setup and configuration section" style="width:90%;" >}}

After importing, entries appear in the **Explore** tab. Entries may expire unless you add metadata, such as the owner or contacts, by [using the API][34] or the [GitHub integration][35].

To remove imported services from the default **Explore** view, click **Clear Previously Imported Services** on the [**Import Entries** tab][32]. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Software Catalog setup and configuration section" style="width:90%;" >}}

[31]: getting_started/tagging/unified_service_tagging/
[32]: https://app.datadoghq.com/software/settings/get-started
[34]: software_catalog/apis/
[35]: integrations/github/


{{% /collapse-content %}}


## Import components from external sources

If you already have data or services registered in Backstage or Service Now, you can import these services into Datadog directly. 


{{< tabs >}}
{{% tab "Backstage" %}}

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

[1]: https://app.datadoghq.com/software/settings/get-started

{{% /tab %}}

{{% tab "ServiceNow" %}}

To populate your Datadog Software Catalog with services from your ServiceNow Configuration Management Database (CMDB), use the Service Ingestion feature in the [Datadog-ServiceNow integration][1].

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}

[1]: /integrations/servicenow/#service-ingestion

{{% /tab %}}
{{< /tabs >}}

## Configuration completeness 

Following monitoring best practices such as tracing, logging, and code profiling helps you ensure that you have all the data you need during incident triage. Software Catalog provides automatic checks for these recommended setups. 

To view the configuration completeness for a service, click the service in the [Software Catalog][5], then find the **Setup Guidance** tab:

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Software Catalog with the Setup Guidance tab highlighted." >}}

Alternatively, on the [*Service* page][24], click **Service Config** on the lower-left side:

{{< img src="tracing/software_catalog/service-page-service-config.png" alt="Service page with the Service Config link highlighted." >}}

The Setup Guidance table does not necessarily reflect billing for individual products, but rather activity for the service you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, `Infrastructure Monitoring` might have `Not Detected` specified, even if you have hosts or containers running infrastructure monitoring. 

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
[2]: /software_catalog/set_up/existing_datadog_user/#discover-components-from-other-datadog-products
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: /software_catalog/set_up/existing_datadog_user
[5]: https://app.datadoghq.com/software
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
[24]: /tracing/services/service_page/
[25]: /account_management/rbac/?tab=datadogapplication
[26]: /account_management/rbac/permissions
[53]: http://json-schema.org/
[54]: https://www.schemastore.org/json/
[55]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json

