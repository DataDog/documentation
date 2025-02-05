---
title: Customize the Software Catalog
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
    - /service_catalog/manage_entries/
    - /service_catalog/enrich_default_catalog/
---

You can customize your engineering team's landing experience in Software Catalog. Developer Home is a new personalized dashboard experience in beta, designed to help developers access prioritized tasks, pull requests, alerts, and insights all in one place.

{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" header="Opt in to the private beta for Developer Homepage experience!" >}}
{{< /callout >}}

## Automatic discovery

Datadog Software Catalog is pre-populated with entries detected through [APM][2], eBPF-based autodiscovery with [Universal Service Monitoring][1], and RUM applications.

With APM, Datadog can automatically discover the dependencies for an instrumented service, such as a database, a queue, or a third-party dependencies, even if that dependency hasn't been instrumented yet. These uninstrumented dependencies are categorized as separate *services*. Datadog changed service names of client spans (span.kind:client) to represent dependencies of your instrumented services. For example, a span representing a client call from a service auth-dotnet to a PostgreSQL database would be tagged with service:auth-dotnet-postgres. 

If you are using APM and would like to remove the automatically named *services* from your Software Catalog and Service Map, you can opt in to new [inferred entities experience][7], which allows you to filter Software Catalog entries by entity type, such as database, queue, or third-party dependencies. You can optionally [remove][8] any [service overrides][9] like service:my-service-http-client from your catalog or map.

For information about discovering endpoints, see [Discovering Endpoints from APM][11].

## Enrich auto-detected services with metadata 
To specify on-call, source code, or documentation for your services, you can add metadata to any existing services using the UI, APIs, or [other automation][10]. 2.2 is the recommended version. To try experimental features like enhanced relationship mapping and precise code location, opt in to the beta program for [schema 3.0][3] by [submitting a request][4].

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="Opt in to the Preview for metadata schema v3.0!" >}}
{{< /callout >}}

### Service Definition Schema (v2.2) (Recommended)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][5].

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

## Find Software Catalog actions
To explore the complete set of actions specifically related to Software Catalog, navigate to the [Datadog Action Catalog][6]. Filter for the actions you need:

1. **Access the Action Catalog**: Look for the Action Catalog within your Datadog Workflow Automation environment.
2. **Search Functionality**: Use the search bar to search for keywords like "Software Catalog" or more specific terms related to desired actions (for example, "get service dependencies").

### Available Software Catalog Actions

Below is a comprehensive list of actions available for Software Catalog in Datadog Workflow Automation. Note that this list may evolve as new actions are added. 

- **Retrieve Service Information**
  - "Get service definition" for a single service
  - "List service definitions" to get all definitions from Datadog Software Catalog
  - "Get service dependencies" to get a service's immediate upstream and downstream services
- **Incident Triage**
  - "Get service PagerDuty on call"
  - When integrated with other actions, you can trigger workflows based on critical events (for example, execute runbooks). 

## Change the service color
The service color is used in trace visualizations. Click the service type icon to change it.

{{< img src="tracing/service_catalog/change_service_color.png" alt="Click the service icon to select a different icon color." style="width:80%;" >}}

## Update the service type and language
With [Software Catalog metadata schema 2.2][5], you can specify the type and language for user-defined services or overwrite the auto-detected type and language for instrumented services. Correctly label the service type and language to help other teams further understand what your services do and how to interact with them. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /universal_service_monitoring/
[2]: /tracing/
[3]: /service_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /actions/actions_catalog/
[7]: /tracing/services/inferred_services
[8]: /tracing/guide/service_overrides/#remove-service-overrides
[9]: /tracing/guide/service_overrides/
[10]: /service_catalog/service_definitions/#add-metadata-with-automation
[11]: /service_catalog/endpoints/discover_endpoints/
[12]: /integrations/github/
