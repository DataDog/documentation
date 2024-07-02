---
title: Create a New Entry
kind: documentation
aliases:
  - /tracing/service_catalog/setup
  - /service_catalog/setup
further_reading:
- link: /tracing/service_catalog/adding_metadata
  tag: Documentation
  text: Adding metadata
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: External Site
  text: Create and manage service definitions with Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Learn about the Service Definition API
- link: /integrations/github
  tag: Documentation
  text: Learn about the GitHub Integration
- link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
  tag: Blog
  text: Import Backstage YAML files into Datadog
---

## Create user-defined entries 

To manage your own components that are not currently emitting performance metrics through APM, USM, or RUM products with Datadog Service Catalog, you can either manually add them by creating Service Definitions through the API or GitHub integration or [import](#import-data-from-other-sources) them from existing sources like ServiceNow or Backstage. These services are by default not associated with any Datadog telemetry, but you can link telemetries from Datadog or external sources manually using `service.datadog.yaml` files. 

To create a user-defined service, name your service in the `dd-service` field in a `service.datadog.yaml` file at the root of the repository, using one of the supported metadata schema versions. For example: 

#### Example
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

You can register multiple services in one YAML file by separating each definition with three dashes (`---`).

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
