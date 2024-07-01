---
title: Service Definitions and Supported Versions
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

## Metadata structure and supported versions

Service Catalog uses service definition schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted and you can view warnings in the **Definition** tab on the side panel for any selected services. 

There are four supported versions of the schema:

- V2 is the earliest version, and contains some experimental features, such as `dd-team`, which are removed from v2.1.
- V2.1 supports additional UI elements such as service groupings and fields like `application`, `tier`, and `lifecycle`. `Application`, along with Teams, can be used as grouping variables in Service Catalog. `Lifecycle` helps you differentiate between `production`, `experimental`, or `deprecated` services to indicate development stages and apply different reliability and availability requirements. `Tier` indicates the criticality of services, to prioritize during incident triage. For example, `tier 1` typically represents the most critical services whose failure would result in severe customer impact, whereas `tier 4` services typically have no impacts on actual customer experience.
- V2.2 supports user annotation and overwriting auto-detected service type and languages using the fields `type` and `languages`. It also adds support for associating CI pipelines with a service using the field `ci-pipeline-fingerprints`. This version also includes less restrictive validation logic for `contact.type` and `link.type`, so users should expect fewer warnings while submitting YAML.
- V3.0 adds a `kind` field that supports schemas for additional component types including applications, internal and external libraries, queues, and datastores. Any components within an `application` implicitly inherit its metadata. Furthermore, this version supports manually declaring dependency relationships, in addition to the auto-detected topology through Distributed Tracing and Universal Service Monitoring.

For more information about the latest updates, see the schemas on GitHub.

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="Opt in to the private beta for metadata schema v3.0!" >}}
{{< /callout >}}

### Metadata Schema v3.0 (beta) 
The Entity Definition Schema is a structure that contains basic information about an entity. See the [full schema on GitHub][1].

#### New features in v3.0
##### Expanded data model
v3.0 supports multiple kinds of entities. You can organize your systems using various components such as applications, services, queues, and datastores.

##### Enhanced relationship mapping
With APM and USM data, you can automatically detect dependencies among components. v3.0 supports manual declaration to augment auto-detected application topology to ensure a complete overview of how components interact within your applications.

##### Inheritance of application metadata
Components within an application automatically inherit the application's metadata. It's no longer necessary to declare metadata for all related components one-by-one as in v2.1 and v2.2. 

#### Example YAML for `kind:application`
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: application
metadata:
  name: myapp
  namespace: default
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
  code:
    - paths:
      - baz/*.c
      - bat/**/*
      - ../plop/*.java
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

#### Specify common components that are part of multiple applications
If a single component is part of multiple applications, you must specify that component in the YAML for each application. For example, if the datastore `orders-postgres` is a component of both a postgres fleet and a web application, specify two YAMLs:

For the postgres fleet (`managed-postgres`), specify a definition for `kind:application`:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: application
spec:
  components:
    - datastore:orders-postgres
    - datastore:foo-postgres
    - datastore:bar-postgres
metadata:
  name: managed-postgres
  owner: db-team
{{< /code-block >}}

For the web application (`shopping-cart`), declare a separate definition for `kind:application`:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}

apiVersion: v3
kind: application
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


#### Explicit and implicit metadata inheritance 

##### Explicit Inheritance 
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

The `inheritFrom` field instructs the ingestion pipeline to inherit metadata from the entity's metadata referenced by `<entity_kind>:<name>`.

Note: The entity reference only applies to an entity from the same YAML file. 

##### Implicit Inheritance 
Components (`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`) inherit all metadata from the application that they belong to under the following conditions:
- There is only one application defined in the YAML file.
- The clause `inheritFrom:<entity_kind>:<name>` is absent in the YAML file.

#### v3.0 API endpoints (alpha)
##### Upsert entities 
POST https://api.datadoghq.com/api/unstable/catalog/definition
Permission: SERVICE_CATALOG_WRITE

{{< code-block lang="yaml" collapsible="true" >}}
curl --location 'https://api.datadoghq.com/api/unstable/catalog/definition' \
--header 'DD-API-KEY: <KEY>' \
--header 'DD-APPLICATION-KEY: <APP_KEY>' \
--data-raw '
apiVersion: v3
kind: application
metadata:
  name: shopping-cart-app
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
spec:
  code: 
  components:
    - service:shopping-cart-processing
    - service:shopping-cart-checkout
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-processing
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-checkout
'
{{< /code-block >}}

##### Get entities
GET https://api.datadoghq.com/api/unstable/catalog/definition
Permission: SERVICE_CATALOG_READ

{{< code-block lang="yaml" collapsible="true" >}}
curl --location 'https://api.datadoghq.com/api/unstable/catalog/definition' \
--header 'DD-API-KEY: <KEY>' \
--header 'DD-APPLICATION-KEY: <APP_KEY>'
{{< /code-block >}}

##### Get entities by ID 
GET https://api.datadoghq.com/api/unstable/catalog/definition/id/<id>
Permission: SERVICE_CATALOG_READ

{{< code-block lang="yaml" collapsible="true" >}}
curl --location 'https://api.datadoghq.com/api/unstable/catalog/definition/id/<id>' \
--header 'DD-API-KEY: <KEY>' \
--header 'DD-APPLICATION-KEY: <APP_KEY>'
{{< /code-block >}}

##### Get entities by reference 
GET https://api.datadoghq.com/api/unstable/catalog/definition/ref/<ref>
Permission: SERVICE_CATALOG_READ

{{< code-block lang="yaml" collapsible="true" >}}
curl --location 'https://api.datadoghq.com/api/unstable/catalog/definition/ref/<ref>' \
--header 'DD-API-KEY: <KEY>' \
--header 'DD-APPLICATION-KEY: <APP_KEY>'
{{< /code-block >}}

URL Parameter: `ref <kind>:<name>`

##### Delete entities by reference 
DELETE https://api.datadoghq.com/api/unstable/catalog/definition/ref/<ref>
Permission: SERVICE_CATALOG_WRITE

{{< code-block lang="yaml" collapsible="true" >}}
curl --location --request DELETE 'https://api.datadoghq.com/api/unstable/catalog/definition/ref/<ref>' \
--header 'DD-API-KEY: <KEY>' \
--header 'DD-APPLICATION-KEY: <APP_KEY>'
{{< /code-block >}}

URL Parameter: `ref <kind>:<name>`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
