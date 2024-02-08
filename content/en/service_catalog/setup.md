---
title: Adding Entries to Service Catalog
kind: documentation
aliases:
  - /tracing/service_catalog/setup
further_reading:
- link: "/tracing/service_catalog/adding_metadata"
  tag: "Documentation"
  text: "Adding metadata"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: "Terraform"
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

## Overview

Datadog Service Catalog is a centralized hub for your development teams to discover and understand critical components in your runtime envrionments. If you are using products that provide application performance telemetries such as APM, USM, and RUM, you can take advantage of the auto-discovery feature. If not, you can create your Service Catalog based on your existing knowledge base (with open-source solutions like Backstage or managed solutions like ServiceNow) or create entries from `service` tags from other Datadog products like infrastructure monitoring and Log Management. 

## Automatic service discovery

Datadog Service Catalog includes both eBPF-based autodiscovery with [Universal Service Monitoring][17] and distributed tracing based detection with [APM][18]. RUM applications are included in the Service Catalog as well. If you are using any of these products, your catalog is pre-populated with entries.

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Opt in to the private beta!" >}}
Datadog automatically discovers the dependencies of instrumented services, including databases or third-party APIs, even if the dependency hasn't been instrumented. The Service Catalog lists these as separate entries. To differentiate auto-detected components from instrumented services, you can request access to the private beta for inferred services.
{{< /callout >}}

## Create user-defined services

You can add services to Service Catalog that are not associated with any Datadog telemetry. To create such an entry, name your service in the `dd-service` field in a `service.datadog.yaml` file at the root of the repository, using one of the supported metadata schema versions. For example: 

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.1
dd-service: my-unmonitored-cron-job
team: shopist
contacts:
 - type: slack
   contact: https://datadogincidents.slack.com/archives/XXXXX
application: shopist
description: important cron job for shopist backend
tier: tier1
lifecycle: production
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

You can register multiple services in one YAML file by separating each definition with three dashes (`---`).

## Discover additional services

To discover other services through existing Datadog telemetry such as infrastructure metrics, navigate to the [**Setup & Config** tab][3] on the top of the page and click on the **Import Entries** tab. You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][5].

{{< img src="tracing/service_catalog/import_entries.png" alt="Import Entries tab in the Service Catalog setup and configuration section" style="width:90%;" >}}

Once you have imported some entries, they appear in the **Explore** tab. Entries may expire unless you add metadata such as the owner or contacts by [using the API][1] or the [GitHub integration][6].

To remove your imported services from the default **Explore** view, click **Clear Previously Imported Services**. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Service Catalog setup and configuration section" style="width:90%;" >}}

## Import data from other sources

### Backstage 

{{< img src="/tracing/service_catalog/service-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

If you already have data or services registered in Backstage, you can import these services into Datadog directly. 

If you use API or Terraform, replace the YAMLs in your requests. 

If you use GitHub integration, directly save your Backstage YAMLs to a repo with Datadog read permission. Datadog scans for files named [`catalog-info.yaml`][15] located at the root folder of a repo.

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

You can populate your Datadog Service Catalog with services from your ServiceNow CMDB by using the Service Ingestion feature in the [Datadog-ServiceNow integration][16].


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
