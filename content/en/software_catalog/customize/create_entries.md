---
title: Create a New Entry
aliases:
  - /tracing/software_catalog/setup
  - /software_catalog/setup
  - /software_catalog/create_entries/
  - /software_catalog/enrich_default_catalog/create_entries
  - /tracing/service_catalog/setup
  - /service_catalog/setup
  - /service_catalog/create_entries/
  - /service_catalog/enrich_default_catalog/create_entries
  - /api_catalog/add_entries
  - /service_catalog/customize/create_entries/
further_reading:
- link: "/software_catalog/customize/validating_service_definition"
  tag: "Documentation"
  text: "Validate service definition YAMLs as you create them"
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

## Overview 

To manage components that do not emit performance metrics through APM, USM, or RUM products, you can add them to Software Catalog by doing one of the following:

-  Manually creating Service Definitions through the API, Terraform, or a GitHub integration
-  Importing existing services from sources like [ServiceNow][1] or [Backstage][2]

Because these services are not automatically linked to Datadog telemetry, you need to manually define their metadata and dependencies using entity definition YAML files. This allows you to track and organize them within the Software Catalog, even if they don't generate telemetry data.

## Create user-defined entries 

To create a user-defined component, name your component in the `dd-service` (if using schema version v2.2 or prior) or `name` field (if using schema version v3.0 or later) in a `service.datadog.yaml` or `entity.datadog.yaml` file using one of the supported metadata schema versions. Datadog accepts both `service.datadog.yaml` and `entity.datadog.yaml` file names. For example: 

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

[1]: /software_catalog/customize/import_entries_servicenow
[2]: /software_catalog/customize/import_entries_backstage
