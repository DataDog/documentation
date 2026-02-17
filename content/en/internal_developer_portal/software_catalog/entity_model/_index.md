---
title: Entity Model
aliases:
  - /software_catalog/service_definitions/
  - /software_catalog/adding_metadata
  - /tracing/software_catalog/service_metadata_structure
  - /tracing/software_catalog/adding_metadata
  - /software_catalog/add_metadata
  - /service_catalog/adding_metadata
  - /tracing/service_catalog/service_metadata_structure
  - /tracing/service_catalog/adding_metadata
  - /service_catalog/add_metadata
  - /service_catalog/service_definitions
  - /service_catalog/service_definitions/v2-0  ## aliases for child version pages
  - /software_catalog/service_definitions/v2-0
  - /service_catalog/service_definitions/v2-1
  - /software_catalog/service_definitions/v2-1
  - /service_catalog/service_definitions/v2-2
  - /software_catalog/service_definitions/v2-2
  - /service_catalog/service_definitions/v3-0
  - /software_catalog/service_definitions/v3-0
  - /software_catalog/apis   ## aliases for definitions/apis page
  - /tracing/faq/service_definition_api/
  - /tracing/software_catalog/service_definition_api
  - /software_catalog/service_definition_api
  - /tracing/service_catalog/service_definition_api
  - /service_catalog/service_definition_api
  - /tracing/api_catalog/api_catalog_api/
  - /api_catalog/api_catalog_api
  - /service_catalog/apis
further_reading:
  - link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
    tag: "External Site"
    text: "Create and manage definitions with Terraform"
  - link: "/api/latest/service-definition/"
    tag: "API"
    text: "Learn about the Definition API"
  - link: "/integrations/github"
    tag: "Documentation"
    text: "Learn about the GitHub Integration"
  - link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
    tag: "Blog"
    text: "Import Backstage YAML files into Datadog"
  - link: "https://www.datadoghq.com/blog/service-catalog-schema-v3/"
    tag: "Blog"
    text: "Improve developer experience and collaboration with Service Catalog schema version 3.0"
  - link: "https://www.datadoghq.com/blog/software-catalog-custom-entities/"
    tag: "Blog"
    text: "Model your architecture with custom entities in the Datadog Software Catalog"
algolia:
  tags: [ "codeLocations" ]
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Entity Model schema v3.0 is not available in the selected site at this time.</div>

{{< /site-region >}}

## Overview

Software Catalog uses definition schemas to store and display relevant metadata about your entities. The schemas have built-in validation rules to ensure that only valid values are accepted. You can view warnings in the **Definition** tab on the Software Catalog side panel for any selected services.

{{< img src="/tracing/internal_developer_portal/entity-model-flow-chart.png" alt="A flow chart showing how components of Software Catalog connect with each other and with your cloud environment " style="width:100%;" >}}

## Supported versions

Datadog supports four versions of the definition schema:

- **v3.0**: Latest version with expanded data model, multi-ownership support, manual dependency declaration, and enhanced features for complex infrastructure.
- **v2.2**: Supports user annotations for custom metadata and CI pipeline associations to link services with their build processes.
- **v2.1**: Supports service groupings for improved organization and introduces additional fields for more comprehensive service descriptions.
- **v2**: Earliest supported version, providing essential fields for basic service metadata and documentation.

Each version builds upon the previous one, adding new functionality while maintaining backwards compatibility. Choose the version that best suits your needs and infrastructure complexity.

## Version comparison

The following features are supported in each version:

| Feature                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Basic Metadata                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Service Groupings             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| User Annotations              | {{< X >}}   | {{< X >}} |           |           |
| CI Pipeline Associations      | {{< X >}}   | {{< X >}} |           |           |
| Expanded Data Model           | {{< X >}}   |           |           |           |
| Multi-ownership               | {{< X >}}   |           |           |           |
| Manual Dependency Declaration | {{< X >}}   |           |           |           |

For detailed information about each version, including full schemas and example YAML files, see the individual version pages in [Supported versions](#supported-versions).

## Version details

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Opt in to the Preview for the latest version of Software Catalog." >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### Key features
- **Expanded data model**: v3.0 supports multiple kinds of entities. You can organize your systems using various components such as systems, services, queues, and datastores.
- **Multi-ownership**: You can assign multiple owners to any objects defined through the v3.0 schema to specify multiple points of contact.
- **Enhanced relationship mapping**: With APM and USM data, you can automatically detect dependencies among components. v3.0 supports manual declaration to augment auto-detected system topology to ensure a complete overview of how components interact within your systems.
- **Inheritance of system metadata**: Components within a system automatically inherit the system's metadata. It's no longer necessary to declare metadata for all related components one-by-one as in v2.1 and v2.2.
- **Precise code location**: Add the mapping of your code location for your service. The `codeLocations` section in v3.0 specifies the locations of the code with the repository that contains the code and its associated `paths`. The `paths` attribute is a list of [globs][4] that should match paths in the repository.
- **Filtered logs & events**: Declare saved logs and event queries for a `system` through the `logs` and `events` sections and view results on the System page.
- **Custom entities**: Define custom entity types beyond Service, System, Datastore, Queue, and API. Scope scorecards and actions to specific entity types.
- **(Upcoming) Integrations**: Integrate with third-party tools to dynamically source information related to your components (for example, GitHub pull requests, PagerDuty incidents, and GitLab pipelines). Report on and write scorecard rules against any third-party source.
- **(Upcoming) Group by product or domain**: Organize components by product, enabling multiple layers of hierarchical grouping.

### Schema structure

You can see the [full schema definitions on Github][1].

V3.0 contains the following changes from v2.2:
- `schema_version` is now `apiVersion`
- `kind` field is new and defines the type of component: service, queue, datastore, system, or API
- `dd-service` is now `metadata.name`
- `team` is now `owner` and `additionalOwners` if there are multiple teams
- `lifecycle`, `tier`, `languages`, and `type` are now under `spec`
- `links`, `contacts`, and `description`, and `tags` are now under metadata
- `application` has been enhanced to become its own kind: `system`. It no longer exists as a discrete field on a service.

### Example YAML files

{{% collapse-content title="Component of <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: system
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
    codeLocations:
      - repositoryURL: https://github.com/myorganization/myrepo.git
        paths:
          - path/to/service/code/**
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
{{% /collapse-content %}}

{{% collapse-content title="Component of <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: library
  metadata:
    name: my-library
    displayName: My Library
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
  {{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Components that are part of multiple systems" level="h4" expanded=false id="id-for-anchoring" %}}
  If a single component is part of multiple systems, you must specify that component in the YAML for each system. For example, if the datastore `orders-postgres` is a component of both a postgres fleet and a web application, specify two YAMLs:

  For the postgres fleet (`managed-postgres`), specify a definition for `kind:system`:
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: system
  spec:
    components:
      - datastore:orders-postgres
      - datastore:foo-postgres
      - datastore:bar-postgres
  metadata:
    name: managed-postgres
    owner: db-team
  {{< /code-block >}}

  For the web application (`shopping-cart`), declare a separate definition for `kind:system`:
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}

  apiVersion: v3
  kind: system
  spec:
    lifecycle: production
    tier: critical
    components:
      - service:shopping-cart-api
      - service:shopping-cart-processor
      - queue:orders-queue
      - datastore:orders-postgres
  metadata:
    name: shopping-cart
    owner: shopping-team
    additionalOwners:
      - name: sre-team
        type: operator
  ---
  apiVersion: v3
  kind: datastore
  metadata:
    name: orders-postgres
    additionalOwners:
      - name: db-team
        type: operator
  ---
  apiVersion: v3
  kind: service
  metadata:
    name: shopping-cart-api
  ---
  apiVersion: v3
  kind: service
  metadata:
    name: shopping-cart-processor
  ---
  {{< /code-block >}}
{{% /collapse-content %}}

### Explicit and implicit metadata inheritance

#### Explicit inheritance

The `inheritFrom` field instructs the ingestion pipeline to inherit metadata from the entity's metadata referenced by `<entity_kind>:<name>`.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### Implicit inheritance
Components (`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`) inherit all metadata from the system that they belong to under the following conditions:
- There is only one system defined in the YAML file.
- The clause `inheritFrom:<entity_kind>:<name>` is absent in the YAML file.

### Migrating to v3.0
v3.0 supports the same methods of creating metadata as previous versions, including Github, API, Terraform, Backstage, ServiceNow, and the UI. However, there are new [API endpoints][5] and a new [Terraform resource][6] for v3.0.

### API reference documentation
To create, get, and delete definitions for all entity types like endpoints, systems, datastores, and queues, see the [Software Catalog API reference][8].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: https://github.com/DataDog/schema/tree/main/service-catalog
[3]: /code_analysis/faq/#identifying-the-code-location-in-the-service-catalog
[4]: https://en.wikipedia.org/wiki/Glob_(programming)
[5]: /api/latest/software-catalog/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[7]: software_catalog/customize/import_entries_backstage
[8]: /api/latest/software-catalog/

{{% /tab %}}

{{% tab "v2.2" %}}

### Key features
- User annotations
- Overwriting auto-detected service type and languages using `type` and `languages`
- Associate CI pipeline with a service using `ci-pipeline-fingerprints`
- Less restrictive validation logic for `contact.type` and `link.type`

### Schema structure

The [full schema is available on GitHub][1].

Example YAML:
```yaml
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
```

### API reference documentation

- To create, get, and delete service definitions, see the [Service Definitions API reference][4].
- To create, get, and delete definitions for new component types like systems, datastores, and queues, see the [Software Catalog API reference][3].
- To create and update service scorecard rules and outcomes, see the [Service Scorecards API reference][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /api/latest/service-scorecards/
[3]: /api/latest/software-catalog/
[4]: /api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### Key features
- New UI elements such as service groupings and fields for `application`, `tier`, and `lifecycle`
- `Application` and `Teams` can be used as grouping variables in Software Catalog
- `Lifecycle` field indicates development stage to differentiate between `production`, `experimental`, or `deprecated` services
- `Tier` field indicates service criticality for prioritizing during incident triage

### Schema structure

The [full schema is available on GitHub][1].

Example YAML:
```yaml
schema-version: v2.1
dd-service: delivery-state-machine
team: serverless
application: delivery-state-machine
tier: tier0
lifecycle: production
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist-serverless/tree/main/delivery-state-machine
    type: repo
  - name: Deployment
    provider: github
    url: https://github.com/DataDog/shopist-serverless/blob/main/delivery-state-machine/serverless.yml
    type: repo
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
    type: doc
tags:
  - "app:serverless-delivery"
  - "tier:3"
  - "business-unit:operations"
```

### API reference documentation

- To create, get, and delete service definitions, see the [Service Definitions API reference][4].
- To create, get, and delete definitions for new component types like systems, datastores, and queues, see the [Software Catalog API reference][3].
- To create and update service scorecard rules and outcomes, see the [Service Scorecards API reference][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.1
[2]: /api/latest/service-scorecards/
[3]: /api/latest/software-catalog/
[4]: /api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.0" %}}

### Key features
- Basic service metadata
- Team associations
- Contact information
- External links

### Schema structure

The [full schema is available on GitHub][1].

Example YAML:
```yaml
schema-version: v2
dd-service: delivery-api
team: distribution-management
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
repos:
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
docs:
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
  pagerduty: https://datadog.pagerduty.com/service-directory/PXZNFXP
```

### API reference documentation

- To create, get, and delete service definitions, see the [Service Definitions API reference][4].
- To create, get, and delete definitions for new component types like systems, datastores, and queues, see the [Software Catalog API reference][3].
- To create and update service scorecard rules and outcomes, see the [Service Scorecards API reference][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /api/latest/service-scorecards/
[3]: /api/latest/software-catalog/
[4]: /api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## Build custom extensions

<div class="alert alert-info">Custom extensions are in Limited Availability for all schema versions.</div>

Custom extensions allow you to attach organization-specific metadata to entities, enabling support for custom tooling and workflows. For example, use the `extensions` field to include release notes, compliance tags, or ownership models in your entity definitions.

Datadog also supports specific extension keys for certain features. These include:
- `datadoghq.com/dora-metrics`: Define source code path patterns for filtering Git commits when calculating [DORA metrics][21].
- `datadoghq.com/cd-visibility`: Control which commits are considered as part of a deployment in [CD Visibility][22].

The following example defines a custom extension used to manage release scheduling across environments:
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: payment-platform
  displayName: "Payment Platform"
  links:
    - name: Runbook
      type: runbook
      url: https://runbook/payment-platform
  contacts:
    - name: Payment Team
      type: team
      contact: https://www.slack.com/archives/payments
  owner: payments-team
  additionalOwners:
    - name: finance-team
      type: stakeholder
spec:
  components:
    - service:payment-api
    - queue:payment-requests
    - datastore:payment-db
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "ci-tool://shopist/k8s/staging-deploy"
          branch: "main"
          schedule: "0 9 * * 1"
{{< /code-block >}}


## Schema validation through IDE plugin

Datadog provides a [JSON Schema][18] for definitions so that when you are editing a definition in a [supporting IDE][19], features such as autocomplete and validation are provided.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode recognizing problem to fix" style="width:100%;" >}}

The [JSON schema for Datadog definitions][20] is registered with the open source [Schema Store][19].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://app.datadoghq.com/services
[6]: /integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[18]: http://json-schema.org/
[19]: https://www.schemastore.org
[20]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[21]: /dora_metrics/setup/#handling-multiple-services-in-the-same-repository
[22]: /continuous_delivery/features/code_changes_detection?tab=github#specify-service-file-path-patterns
