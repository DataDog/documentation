---
title: Import Entries from External Integrations
further_reading:
- link: "/tracing/service_catalog/adding_metadata"
  tag: "Documentation"
  text: "Adding metadata"
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
---

## Import data from other sources

### Backstage 

{{< img src="/tracing/service_catalog/service-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

If you already have data or services registered in Backstage, you can import these services into Datadog directly. 

If you use API or Terraform, replace the YAMLs in your requests. 

If you use GitHub integration, directly save your Backstage YAMLs to a repo with Datadog read permission. Datadog scans for files named [`catalog-info.yaml`][1] located at the root folder of a repo.

Upon import, the following occurs:
- Datadog only recognizes `kind:component` in Backstage YAMLs as services
- `metadata.name` gets mapped to `dd-service`
- `metadata.namespace` gets mapped to a custom tag with the format `namespace:${metadata.namespace}`
- `spec.lifecycle` gets mapped to `lifecycle`
- `spec.owner` gets mapped to `team`
- `metadata.links` gets mapped to `links`
  - The annotation `github.com/project-slug` maps to a link with `type=repo` and `url=https://www.github.com/${github.com/project-slug}`
- `metadata.description` gets mapped to `description`
- `spec.system` gets mapped to `application`
- Other `spec` values get mapped to custom tags

### ServiceNow

You can populate your Datadog Service Catalog with services from your ServiceNow CMDB by using the Service Ingestion feature in the [Datadog-ServiceNow integration][2].

## Manual Service discovery through other Datadog telemetries

To discover additional services through existing Datadog telemetry such as infrastructure metrics, navigate to the [**Setup & Config** tab][3] on the top of the page and click on the **Import Entries** tab. You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][4].

{{< img src="tracing/service_catalog/import_entries.png" alt="Import Entries tab in the Service Catalog setup and configuration section" style="width:90%;" >}}

After you have imported some entries, they appear in the **Explore** tab. Entries may expire unless you add metadata such as the owner or contacts by [using the API][5] or the [GitHub integration][6].

To remove your imported services from the default **Explore** view, click **Clear Previously Imported Services**. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Service Catalog setup and configuration section" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://backstage.io/docs/features/software-catalog/descriptor-format/
[2]: /integrations/servicenow/#service-ingestion
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: /getting_started/tagging/unified_service_tagging
[5]: /tracing/service_catalog/service_definition_api/
[6]: /integrations/github/



