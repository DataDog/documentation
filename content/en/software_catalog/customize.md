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
---

Customize your engineering team's experience in Software Catalog with the following features.

## Create a customized landing page

Developer Homepage is a personalized dashboard experience that enables developers to access prioritized tasks, pull requests, alerts, and insights--all in one place.

{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" header="Developer Home is in Preview. Opt in here!" >}}
{{< /callout >}}

## Enrich auto-detected services with metadata 
To specify on-call, source code, or documentation for your services, you can add metadata to any existing services using the UI, APIs, or [other automation][10]. v3 is the recommended version.

### Entity Definition Schema (v3) (Recommended)
The Entity Definition Schema is a structure that contains basic information about a software component. 

For more details, see the [Definition Schema v3.0][3].

### Service Definition Schema (v2.2)

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

{{< img src="tracing/software_catalog/change_service_color.png" alt="Click the service icon to select a different icon color." style="width:80%;" >}}

## Update the service type and language
With [Software Catalog metadata schema 2.2][5], you can specify the type and language for user-defined services or overwrite the auto-detected type and language for instrumented services. Correctly label the service type and language to help other teams further understand what your services do and how to interact with them. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /universal_service_monitoring/
[2]: /tracing/
[3]: /software_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /actions/actions_catalog/
[7]: /tracing/services/inferred_services
[8]: /tracing/guide/service_overrides/#remove-service-overrides
[9]: /tracing/guide/service_overrides/
[10]: /software_catalog/service_definitions/#add-metadata-with-automation
[11]: /software_catalog/endpoints/discover_endpoints/
[12]: /integrations/github/
