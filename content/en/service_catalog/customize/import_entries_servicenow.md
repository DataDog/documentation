---
title: Import Entries from ServiceNow
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
- link: "https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/#get-cmdb-metadata-in-the-datadog-service-catalog"
  tag: "Blog"
  text: "Manage your infrastructure with ServiceNow CMDB and Datadog"
aliases:
    - /service_catalog/import_entries_integrations/
    - /service_catalog/enrich_default_catalog/import_entries_integrations
---

To populate your Datadog Service Catalog with services from your ServiceNow CMDB, use the Service Ingestion feature in the [Datadog-ServiceNow integration][2].

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /integrations/servicenow/#service-ingestion
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: /getting_started/tagging/unified_service_tagging
[5]: /tracing/service_catalog/service_definition_api/
[6]: /integrations/github/