---
title: Import Entries from Backstage
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
aliases:
    - /service_catalog/import_entries_integrations/
    - /service_catalog/enrich_default_catalog/import_entries_integrations
    - /service_catalog/customize/import_entries_integrations/
---

{{< img src="/tracing/service_catalog/service-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

If you already have data or services registered in Backstage, you can import these services into Datadog directly. 

If you use API or Terraform, replace the YAMLs in your requests. 

If you use GitHub integration, directly save your Backstage YAMLs to a repo with Datadog read permission. Datadog scans for files named [`catalog-info.yaml`][1] located at the root folder of a repo.

Upon import, the following occurs:
- Datadog recognizes `kind:component` and 'kind:system' in Backstage YAML; `kind:component` in Backstage is recognized as a service in Datadog
- `metadata.name` gets mapped to `dd-service`
- `metadata.namespace` gets mapped to a custom tag with the format `namespace:${metadata.namespace}`
- `spec.lifecycle` gets mapped to `lifecycle`
- `spec.owner` gets mapped to `team`
- `metadata.links` gets mapped to `links`
  - The annotation `github.com/project-slug` maps to a link with `type=repo` and `url=https://www.github.com/${github.com/project-slug}`
  - The annotations `pagerduty.com/service-id` and `pagerduty.com/account` are combined and map to `integration.pagerduty`
- `metadata.description` gets mapped to `description`
- `spec.system` gets mapped to `application`
- `spec.dependsOn` gets mapped to `dependsOn`
- Other `spec` values get mapped to custom tags

**Note**: The Service Catalog processes the entire YAML file as a whole. If any section of the YAML file does not have `kind:component` or `kind:system`, the entire `catalog-info.yaml file` is rejected. Schema version v3.0 is required to use kind:system and the `dependsOn` field.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://backstage.io/docs/features/software-catalog/descriptor-format/
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: /getting_started/tagging/unified_service_tagging
[5]: /tracing/service_catalog/service_definition_api/
[6]: /integrations/github/



