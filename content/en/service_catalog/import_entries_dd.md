---
title: Import Entries from Datadog Telemetries
kind: documentation
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

## Manual Service Discovery through other Datadog telemetries

To discover additional services through existing Datadog telemetry such as infrastructure metrics, navigate to the [**Setup & Config** tab][3] on the top of the page and click on the **Import Entries** tab. You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][5].

{{< img src="tracing/service_catalog/import_entries.png" alt="Import Entries tab in the Service Catalog setup and configuration section" style="width:90%;" >}}

After you have imported some entries, they appear in the **Explore** tab. Entries may expire unless you add metadata such as the owner or contacts by [using the API][1] or the [GitHub integration][6].

To remove your imported services from the default **Explore** view, click **Clear Previously Imported Services**. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Service Catalog setup and configuration section" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/service_catalog/service_definition_api/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: /getting_started/tagging/unified_service_tagging
[6]: /integrations/github/
[15]: https://backstage.io/docs/features/software-catalog/descriptor-format/
[16]: https://docs.datadoghq.com/integrations/servicenow/#service-ingestion
[17]: https://docs.datadoghq.com/universal_service_monitoring/
[18]: https://docs.datadoghq.com/tracing/
