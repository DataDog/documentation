---
title: Adding Metadata
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/api/latest/service-definition/"
  tag: "Documentation"
  text: "Service Definition API"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
  tag: "Source Code"
  text: "Service Definition Schema"
aliases:
  - /tracing/service_catalog/service_metadata_structure
  - /tracing/service_catalog/adding_metadata
  - /service_catalog/add_metadata
---

## Overview

You can add metadata to existing Service Catalog entries through the Datadog UI, API, or use automated pipelines through the GitHub integration or Terraform.

## Metadata structure and supported versions

Service Catalog uses service definition schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted and you can view warnings in the **Definition** tab on the side panel for any selected services. 

There are three supported versions of the schema:

- V2 is the earliest version, and contains some experimental features, such as `dd-team`, which are removed from v2.1.
- V2.1 supports additional UI elements such as service groupings and fields like `application`, `tier`, and `lifecycle`. `Application`, along with Teams, can be used as grouping variables in Service Catalog. `Lifecycle` helps you differentiate between `production`, `experimental`, or `deprecated` services to indicate development stages and apply different reliability and availability requirements. `Tier` indicates the criticality of services, to prioritize during incident triage. For example, `tier 1` typically represents the most critical services whose failure would result in severe customer impact, whereas `tier 4` services typically have no impacts on actual customer experience.
- V2.2 supports user annotation and overwriting auto-detected service type and languages using the fields `type` and `languages`. It also adds support for associating CI pipelines with a service using the field `ci-pipeline-fingerprints`. This version also includes less restrictive validation logic for `contact.type` and `link.type`, so users should expect fewer warnings while submitting YAML.
- V3.0 adds a `kind` field that supports schemas for additional component types including applications, internal and external libraries, queues, and datastores. Any components within an `application` implicitly inherit its metadata. Furthermore, this version supports manually declaring dependency relationships, in addition to the auto-detected topology through Distributed Tracing and Universal Service Monitoring.

For more information about the latest updates, see the schemas on GitHub.

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="Opt in to the private beta for metadata schema v3.0!" >}}
{{< /callout >}}

### Metadata Schema v3.0 (beta)
The Entity Definition Schema is a structure that contains basic information about an entity. See the [full schema on GitHub][16].

#### New features in v3.0 
##### Analysis units
Beyond services, you can organize your systems using various components such as applications, services, queues, and datastores. This holistic view supports better analysis and management.

##### Map relationships
With APM/USM data, you can automatically detect dependencies among components. The schema supports manual declaration to augment auto-detected application topology. This ensures a complete overview of how components interact within your applications.

##### Inheritance of application metadata
Components within an application automatically inherit the application's metadata, simplifying management and visibility.

##### Multi-ownership
For improved collaboration, you can assign multiple owners to any entity within your system, ensuring responsibilities are accurately defined.

##### Custom filters for APM metrics, logs, and events
With the `datadog` field in v3.0 schema, you can specify custom filters for logs and events associated with each component.

#### Example entity definition (`kind:application`)

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: application
metadata:
  name: myapp
  displayName: My App
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
integrations:
  pagerduty:
    serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  opsgenie:
    serviceURL: https://www.opsgenie.com/service/shopping-cart
    region: US
spec:
  components:
    - service:myservice
    - service:otherservice
extensions:
  datadoghq.com/shopping-cart:
    customField: customValue
datadog:
  performanceData:
    tags:
      - 'service:shopping-cart'
      - 'hostname:shopping-cart'
  events:
    - name: "deployment events"
      query: "app:myapp AND type:github"
    - name: "event type B"
      query: "app:myapp AND type:github"
  logs:
    - name: "critical logs"
      query: "app:myapp AND type:github"
    - name: "ops logs"
      query: "app:myapp AND type:github"
  pipelines:
    fingerprints:
      - fp1
      - fp2
{{< /code-block >}}

#### Example entity definition (`kind:service`, `kind:datastore`, `kind:queue`) 

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: shopping-cart
  displayName: Shopping Cart
  inheritFrom: service:otherService
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
integrations:
  pagerduty:
    serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  opsgenie:
    serviceURL: https://www.opsgenie.com/service/shopping-cart
    region: US
extensions:
  datadoghq.com/shopping-cart:
    customField: customValue
spec:
  lifecycle: production
  tier: "1"
  type: web
  languages:
    - go
    - python
  dependsOn:
    - service:serviceA
    - service:serviceB
datadog:
  performanceData:
    tags:
      - 'service:shopping-cart'
      - 'hostname:shopping-cart'
  events:
    - name: "deployment events"
      query: "app:myapp AND type:github"
    - name: "event type B"
      query: "app:myapp AND type:github"
  logs:
    - name: "critical logs"
      query: "app:myapp AND type:github"
    - name: "ops logs"
      query: "app:myapp AND type:github"
  pipelines:
    fingerprints:
      - fp1
      - fp2
  code:
    paths:
      - baz/*.c
      - bat/**/*
      - ../plop/*.java
{{< /code-block >}}


### Service Definition Schema (v2.2) (Recommended)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][15].

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


### Service Definition Schema (v2.1)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][1].

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.1
dd-service: web-store
team: shopist
contacts:
 - type: slack
   contact: https://datadogincidents.slack.com/archives/C01EWN6319S
application: shopist
description: shopist.com storefront
tier: tier1
lifecycle: production
links:
 - name: Demo Dashboard
   type: dashboard
   url: https://app.datadoghq.com/dashboard/krp-bq6-362
 - name: Common Operations
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Disabling Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Rolling Back Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Source
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
 - name: Deployment
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
 - name: Deployment Information
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
 - name: Service Documentation
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
tags: []
integrations:
 pagerduty:
   service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
External Resources (Optional)
{{< /code-block >}}

### Service Definition Schema (v2)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][2].

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2
dd-service: web-store
team: shopist
contacts:
  - type: slack
    contact: https://exampleincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.examplehq.com/dashboard/krp-bq6-362
  - name: Common Operations
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Disabling Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Rolling Back Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
repos:
  - name: Source
    provider: github
    url: https://github.com/Example/shopist/tree/prod/rails-storefront
  - name: Deployment
    provider: github
    url: https://github.com/Example/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
docs:
  - name: Deployment Information
    provider: link
    url: https://docs.datadoghq.com/
  - name: Service Documentation
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
    pagerduty: https://example.pagerduty.com/service-directory/XYZYX
External Resources (Optional)
{{< /code-block >}}

## Add metadata from the Datadog UI 

If your service is listed in Service Catalog and already has metadata associated with it, the original source is listed in the **Metadata Source** column on the **Ownership** view. Return to that source to make any updates you need to make.

If the service has not been assigned any service definition metadata, or if the service isn't listed in the Service Catalog yet, you can add it:

1. On the [Service Catalog][10] page, click **Setup & Config**. The **Manage Entries** tabs shows you how many services are without metadata.

2. Click **Create New Entry**.

3. Specify which service you are adding metadata to. This can be the name of a service already listed in the Service Catalog that doesn't have service definition metadata defined for it yet, or it can be the name of a service not sending any data.

4. Enter details for Team, On-call, Contacts, Documentation, Code repo, and Other links.

4. Switch to the **Code** view to see the JSON and cURL generated for the metadata you've entered. You can copy this code as a jumping off point for programmatically providing service definitions by API, Terraform, or GitHub, without having to learn the schema for service definitions.

5. If you have the [Service Catalog Write][13] permission, you can submit the metadata by clicking **Save Entry**, or by running the cURL command provided on the **Code** view.

## Automation options for adding metadata

### Store and edit service definitions in GitHub

Configure the [GitHub integration][17] to directly link from where you view the service's definition in the Service Catalog to where it's stored and editable in GitHub.

To install the GitHub integration, navigate to the [integration tile][7] and click **Link GitHub Account** in the **Repo Configuration** tab. 

#### Service definition YAML files

Datadog scans for the `service.datadog.yaml` file at the root of each repository with read permissions. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

#### Modify service definition

When the GitHub integration is set up for your service definitions, an **Edit in Github** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="An Edit in Github button appears in the Definition tab of a service in the Service Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Service Catalog. 

To prevent accidental overwriting, create and modify your service definition files with either the GitHub integration or the [Service Definition API endpoints][3]. Updating the same service using both the GitHub and the API may result in unintended overwriting.  

### Automate service definition updates with Terraform

The Service Catalog provides a service definition as a [Terraform resource][14]. Creating and managing services in the Service Catalog through automated pipelines requires [Datadog Provider][8] v3.16.0 or later.

For more information, see the [Datadog Provider documentation][9].

### Open-source metadata provider

As an alternative to the GitHub integration and Terraform, you can use an open-sourced GitHub Action solution named [Datadog Service Catalog Metadata Provider][12]. 

This GitHub Action allows you to register your services with the Service Catalog using a GitHub Action, with full control over when this information is sent to Datadog, and implement other compliance checks unique to your organization.

## IDE Plugins

Datadog provides a [JSON Schema][17] for service definitions so that when you are editing a service definition in a [supporting IDE][18], features such as autocomplete and validation are provided. The [JSON schema for Datadog service definitions][19] is registered with the open source [Schema Store][18].

The plugin supports the new v3.0 schema and includes information that will tell your IDEs which filenames it applies to—specifically, the files entity.datadog.yaml, entity.datadog.yml, and entity.datadog.json to quickly and accurately complete your entity definition file without referencing documentation. In the example below, the IDE automatically creates keys as you fill out the entity definition.

{{< img src="tracing/service_catalog/service_catalog_ide.mp4" video=true alt="Using the IDE plugin to atucomplete and validate definitions" style="width:100%;" >}}

## Build custom extensions 

The `extensions` field is supported in all versions including v2. You can incorporate this custom field into deployment processes to standardize and codify best practices.

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: web-store
team: shopist
...
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "//domains/examples/apps/hello-joe/config/k8s:release-staging"
          branch: "hello-joe/staging"
          schedule: "* * * * 1"
{{< /code-block >}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/schema/blob/main/service-catalog/v2.1/schema.json
[2]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[3]: /tracing/service_catalog/service_definition_api/
[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[10]: https://app.datadoghq.com/services
[12]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[13]: https://app.datadoghq.com/personal-settings/profile
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[15]: https://github.com/DataDog/schema/blob/main/service-catalog/v2.2/schema.json
[16]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[17]: http://json-schema.org/
[18]: https://www.schemastore.org/json/
[19]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
