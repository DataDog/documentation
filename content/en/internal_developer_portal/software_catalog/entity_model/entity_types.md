---
title: Entity Types
disable_toc: false
further_reading:
- link: "/internal_developer_portal/software_catalog/set_up/create_entities"
  tag: "Documentation"
  text: "Create entities in Software Catalog"
- link: "/internal_developer_portal/software_catalog/set_up/discover_entities"
  tag: "Documentation"
  text: "Learn how entities are discovered in Software Catalog"
- link: "/internal_developer_portal/software_catalog/set_up/import_entities"
  tag: "Documentation"
  text: "Import entities into Software Catalog"
---

## Overview

In Software Catalog, an entity represents the smallest building block of modern microservice-based architecture. As of [schema definition v3.0][1]+, an entity can be an instrumented APM service, a datastore, a system, an API, a queue, or even a custom-defined entity. 

See GitHub for [full schema definitions][2]. 

## Entity types

{{< tabs >}}

{{% tab "Service" %}}

In APM, a [service][1] (`kind:service`) is a group of related endpoints, queries, or jobs that perform a piece of work for your application. For example, a service could be a group of endpoints, a group of DB queries, or a group of periodic jobs. 

Through [custom instrumentation in APM][3], you can create an arbitrary `service`. In practice, microservice-based architecture includes multiple APM services, each measuring the performance of sub-components of the application through [Trace Metrics][2]. 

In Software Catalog, you can collect non-instrumented services by declaring them through [metadata][4] or importing through external sources like [Backstage][5] or [ServiceNow][6].

[1]: /glossary/#service
[2]: /opentelemetry/integrations/trace_metrics/
[3]: /tracing/trace_collection/custom_instrumentation/
[4]: /internal_developer_portal/software_catalog/set_up/create_entities
[5]: /internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage
[6]: /internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow

{{% /tab %}}

{{% tab "System" %}}

In Software Catalog, a system (`kind:system`) is a group of entities that cooperate to perform a broader function. For example, you can group multiple instrumented APM services into a system because they are operated by the same team. You can also use `system` to represent a full microservice-based architecture, and include components like APIs, datastores, queues, and other common building blocks.


**Note**: **System** in Datadog has the same meaning as in Backstage's [System Model][1]. 

To define components within a system, you can specify values for the `components` key in the `spec` field of the entity's v3 definition.

Example YAML for `kind:system`:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: product-recommendation
  description: Surfaces personalized product suggestions in Shopist
  displayName: "Product Recommendation"
  tags:
  - product:recommendations
  - business-line:shared-components
  owner: shopist
  additionalOwners:
    - name: Shopist Support Team
      type: Operator
spec:
  lifecycle: production
  tier: "0"
  components:
  - service: product-recommendation
  - service: orders-app
  - api: products
  - system: shopist-user-trends
{{< /code-block >}}

This user-defined system appears in Software Catalog as shown:
{{< img src="/tracing/software_catalog/product-rec-systemV3.png" alt="System page for Product Recommendations system in Software Catalog" style="width:90%;" >}}

This page holds relationship data of components between the system and upstream/downstream dependencies as well as scorecards, logs, and events aggregated across all system components. 

**Note**: If a single component is part of multiple systems, you must specify that component in the YAML for each system. 

[1]: https://backstage.io/docs/features/software-catalog/system-model/
[2]: /internal_developer_portal/software_catalog/entity_model/ai-generated-systems/

{{% /tab %}}

{{% tab "API" %}}

In Software Catalog, an API (`kind:API`) refers to a collection of endpoints that belong together logically. APIs offer an alternative way to group endpoints beyond APM services (the mapping between endpoints and services are not modifiable). 

To define components within an API, you can specify values for the `components` key in the `spec` field of the entity's v3 definition. 

You can also include an OpenAPI spec in your entity definition in two ways: inline, or through a file reference.

**Inline:** 
Add the OpenAPI definition under the spec field using `type: openapi`.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
{
 "apiVersion": "v3",
 "kind": "api",
 "metadata": {
   "name": "payments",
   "displayName": "Payments",
   "owner": "Payments Team",
   "links": [
     {
       "name": "Deployment Information",
       "type": "doc",
       "url": "https://wiki/products
"
     },
     {
       "name": "Source",
       "type": "repo",
       "provider": "github",
       "url": "https://github.com/"
     },
     {
       "name": "Performance Dashboard",
       "type": "dashboard",
       "url": "https://datadoghq.com"
     }
   ]
 },
 "integrations": {
   "pagerduty": {
     "serviceURL": "https://www.pagerduty.com/service-directory/products"
   }
 },
 "spec": {
   "type": "openapi",
   "implementedBy": [
     "service:payment",
     "service:payments-go"
   ],
   "interface": {
     "definition": {
       "info": {
         "title": "Payments"
       },
       "openapi": "3.0.0",
       "paths": {
         "/add_item": {
           "post": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         },
         "/add_purchases": {
           "post": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         },
         "/admin/update_user": {
           "post": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         },
         "/carts": {
           "get": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         }
       }
     }
   },
   "lifecycle": "production",
   "tier": "Tier 0"
 }
}
{{< /code-block >}}

**File reference:** 
Point to an OpenAPI file stored in GitHub using the `fileref` field.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
{
 "apiVersion": "v3",
 "kind": "api",
 "metadata": {
   "name": "payments",
   "displayName": "Payments",
   "owner": "Payments Team",
 },
 "spec": {
   "type": "openapi",
   "implementedBy": [
     "service:payment",
     "service:payments-go"
   ],
   "interface": {
     fileRef: https://github.com/openapi.yaml
   },
   "lifecycle": "production",
   "tier": "Tier 0"
 }
}
{{< /code-block >}}

The user-defined API appears in Software Catalog as shown:
{{< img src="/tracing/software_catalog/api-page-v3.png" alt="API page for Payments API in Software Catalog" style="width:90%;" >}}

This page holds relationship data of how the API interacts with dependencies, the API components, an OpenAPI preview, and logs and events aggregated across all endpoints. 

**Test API Endpoints** 

You can use the **Play Request** feature in Software Catalog to send test HTTP requests to your endpoints and inspect the responses. 

To send a test request: 

1. Navigate to an endpoint in Software Catalog.
2. Click an endpoint to open its details in the side panel.
3. Click **Play Request** to configure and send the request.

{{< img src="/tracing/software_catalog/play-request.png" alt="Play Request modal to test API requests in Software Catalog" style="width:90%;" >}}

Before sending the request, you can configure the following: 
- **Inputs**: Provide values for any required query parameters, path variables, or request body fields.
- **Authentication**: Select an authentication method if required by the endpoint.
- **Location**: Choose where the request should be sent from:
    - Public Location (default)
    - Private Location, for APIs accessible only within your private network. These must be configured using [Synthetics Private Locations][2]. Any Private Locations you've already set up appear automatically in the dropdown.

**Note**: Software Catalog contains HTTP endpoints that are automatically discovered by APM. The concept of endpoints correspond to [APM resources][1] for an APM web service.

[1]: /tracing/glossary/#resources
[2]: /synthetics/platform/private_locations

{{% /tab %}}

{{% tab "Datastore" %}}

In Software Catalog, a datastore (`kind:datastore`) represents a data storage component or database that services depend on. Datastores can represent relational databases (such as PostgreSQL or MySQL), NoSQL datastores (such as Redis or MongoDB), data warehouses, and caches.

Datastore entities can be:
- [**Inferred by APM**][1] when instrumented services make outbound calls to a database (for example, a PostgreSQL query).
- [**Manually defined**][2] to represent uninstrumented datastores or enrich inferred ones with additional metadata.

**Note**: If Database Monitoring is enabled, the datastore entity page displays query throughput, latency, and error rates. Otherwise, the page shows basic trace-derived metrics and dependency relationships.

### Example YAML definitions

{{% collapse-content title="YAML definition for an inferred datastore" level="h4" expanded=false id="id-for-anchoring" %}}

This example shows a `kind:datastore` definition for a database automatically detected by APM.

**Note**: The `metadata.name` value must exactly match the [peer tags](#datastore-peer-tags) used by APM.

```
apiVersion: v3
kind: datastore
metadata:
  name: peer.db.name:web-store-mongo,peer.db.system:mongodb                
  displayName: "Store Inventory DB (MongoDB)"   
  description: Stores order transaction data for Shopist e-commerce
  owner: shopist            
  additionalOwners:
    - name: infra-team
      type: team
  links:
    - name: "DB Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/orders-db
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/orders-db-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/ORD123  
spec:
  lifecycle: "production"              
  tier: "Tier 1"               
```

{{% /collapse-content %}}

{{% collapse-content title="YAML definition for a manually defined datastore" level="h4" expanded=false id="id-for-anchoring" %}}

This example shows a `kind:datastore` definition for a manually declared datastore.

```
apiVersion: v3
kind: datastore
metadata:
  name: web-store-mongo               
  displayName: "Store Inventory DB (MongoDB)"   
  description: Stores order transaction data for Shopist e-commerce
  owner: shopist            
  additionalOwners:
    - name: infra-team
      type: team
  links:
    - name: "DB Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/orders-db
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/orders-db-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/ORD123  
spec:
  lifecycle: "production"              
  tier: "Tier 1"               
```

{{% /collapse-content %}}

### Datastore peer tags

For inferred entities, Datadog uses standard span attributes to construct `peer.*` tags. The `metadata.name` value in your entity definition must exactly match the inferred peer tags. Manually defined datastores do not need to follow this convention. 

Common peer tags for datastore entities:

Peer Tag | Source Attributes
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`

Learn more about [peer tags and inferred entities][3].


[1]: /internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[2]: /internal_developer_portal/software_catalog/set_up/create_entities
[3]: /tracing/services/inferred_services/?tab=agentv7600#naming-inferred-entities

{{% /tab %}}


{{% tab "Queue" %}}

In Software Catalog, a queue (`kind:queue`) represents a message queue or stream-based messaging component that services interact with. Queues can represent systems such as Apache Kafka, Amazon SQS, RabbitMQ, and Google Pub/Sub.

Queue entities can be:
- [**Inferred by APM**][1] when instrumented services produce to or consume from a messaging system.
- [**Manually defined**][2] to represent uninstrumented queues or enrich inferred ones with additional metadata.

**Note**: If [Data Streams Monitoring][3] is enabled, the queue entity page displays metrics such as throughput, service latency, and processing errors. Otherwise, the page shows basic trace-derived metrics and service dependency relationships.

### Example YAML definitions

{{% collapse-content title="YAML for an inferred queue" level="h4" expanded=false id="inferred-queue" %}}

This example shows a `kind:queue` definition for a queue automatically detected by APM.

**Note**: The `metadata.name` value must exactly match the [peer tags](#queue-peer-tags) used by APM.

```
apiVersion: v3
kind: queue
metadata:
  name: peer.messaging.destination:checkout-events
  displayName: "Checkout Events Queue (Kafka)"
  description: Captures all checkout-related events for downstream processing
  owner: shopist
  additionalOwners:
    - name: platform-team
      type: team
  links:
    - name: "Queue Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/checkout-events
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/checkout-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/MESSAGING123
spec:
  lifecycle: "production"
  tier: "Tier 1"
```

{{% /collapse-content %}}

{{% collapse-content title="YAML for a manually defined queue" level="h4" expanded=false id="manual-queue" %}}

This example shows a `kind:queue` definition for a manually declared queue.

```
apiVersion: v3
kind: queue
metadata:
  name: checkout-events-kafka
  displayName: "Checkout Events Queue (Kafka)"
  description: Captures all checkout-related events for downstream processing
  owner: shopist
  additionalOwners:
    - name: platform-team
      type: team
  links:
    - name: "Queue Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/checkout-events
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/checkout-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/MESSAGING123
spec:
  lifecycle: "production"
  tier: "Tier 1"
```

{{% /collapse-content %}}

### Queue peer tags

For inferred entities, Datadog uses standard span attributes to construct `peer.*` tags. The `metadata.name` value in your entity definition must exactly match the inferred peer tags. Manually defined queues do not need to follow this convention. 

Common peer tags for `kind:queue` entities:

Peer Tag | Source Attributes
--------------------|-------------------
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.sqs.queue` | `queuename`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `ampqb.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`

Learn more about [peer tags and inferred entities][4].

[1]: /internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[2]: /internal_developer_portal/software_catalog/set_up/create_entities
[3]: /data_streams/
[4]: /tracing/services/inferred_services/?tab=agentv7600#naming-inferred-entities

{{% /tab %}}

{{% tab "Frontend" %}}
In Software Catalog, a frontend (`kind:frontend`) represents a frontend application—such as a browser-based single-page application or mobile app—that interacts with services and APIs. Frontend entities offer a structured way to model user-facing applications in the same catalog alongside backend services.


{{% collapse-content title="YAML for RUM app by name" level="h4" expanded=false id="rum-app-name" %}}

This example shows a `kind:frontend` definition for a frontend application in RUM, linked by the name. You can find the name and ID under [Manage Applications][1], or you can click **Add Metadata** on an existing frontend app in Software Catalog to autofill the ID.

### Example YAML definitions
```yaml
apiVersion: v3
kind: frontend
metadata:
  name: checkout-webapp
  displayName: Checkout Web App
  description: Main frontend experience for the checkout flow in Shopist
  owner: shopist-frontend
  additionalOwners:
    - name: ux-platform-team
  type: team
  links:
    - name: "UX Design Guidelines"
      type: doc
      url: https://wiki.internal/checkout-design
    - name: "Frontend Source Code"
      type: repo
      provider: github
      url: https://github.com/shopist/checkout-webapp
spec:
  type: browser
  lifecycle: production
  tier: tier1
  dependsOn:
    - service:checkout-api
    - service:payment-service
  componentOf:
    - system:shopist-checkout-platform
```

[1]: https://app.datadoghq.com/rum/list

{{% /collapse-content %}}

{{% collapse-content title="YAML for RUM app by ID" level="h4" expanded=false id="rum-app-id" %}}

This example shows a `kind:frontend` definition for a frontend application in RUM, linked by the ID. You can find the name and ID under [Manage Applications][1], or you can click **Add Metadata** on an existing frontend app in Software Catalog to autofill the ID.

### Example YAML definitions
```yaml
apiVersion: v3
kind: frontend
metadata:
  name: rum_application:750904cc-cdde-4d06-b427-5d3fec477219
  displayName: Checkout Web App
  description: Main frontend experience for the checkout flow in Shopist
  owner: shopist-frontend
  additionalOwners:
    - name: ux-platform-team
  type: team
  links:
    - name: "UX Design Guidelines"
      type: doc
      url: https://wiki.internal/checkout-design
    - name: "Frontend Source Code"
      type: repo
      provider: github
      url: https://github.com/shopist/checkout-webapp
spec:
  type: browser
  lifecycle: production
  tier: tier1
  dependsOn:
    - service:checkout-api
    - service:payment-service
  componentOf:
    - system:shopist-checkout-platform
```

[1]: https://app.datadoghq.com/rum/list

{{% /collapse-content %}}

{{% collapse-content title="YAML for manually defined frontend app" level="h4" expanded=false id="manually-created" %}}

This example shows a `kind:frontend` definition for a manually declared frontend app.

### Example YAML definitions
```yaml
apiVersion: v3
kind: frontend
metadata:
  name: checkout-webapp
  displayName: Checkout Web App
  description: Main frontend experience for the checkout flow in Shopist
  owner: shopist-frontend
  additionalOwners:
    - name: ux-platform-team
  type: team
  links:
    - name: "UX Design Guidelines"
      type: doc
      url: https://wiki.internal/checkout-design
    - name: "Frontend Source Code"
      type: repo
      provider: github
      url: https://github.com/shopist/checkout-webapp
spec:
  type: browser
  lifecycle: production
  tier: tier1
  dependsOn:
    - service:checkout-api
    - service:payment-service
  componentOf:
    - system:shopist-checkout-platform
```

{{% /collapse-content %}}

When this definition is created:

- The frontend app appears under the Frontend Apps section in Software Catalog.
- If a RUM application exists with the same name or ID, its telemetry is automatically linked. You can find the name and ID under [Manage Applications][1], or you can click **Add Metadata** on an existing frontend app in Software Catalog to autofill the ID.
- The entity aggregates metadata, dependencies, and real-time RUM performance metrics in a unified view.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}

{{% tab "Custom entities" %}}

You can define custom entity types beyond service, system, datastore, queue, and API. Custom entities allow you to represent any component or resource that is important to your organization but does not fit into the standard categories.

First, define the kinds you want to use with [this API][1]. Only entities of the kinds you've explicitly set up are accepted. After you've defined the allowed kinds, entities of that kind can be defined in the UI or programmatically sent through the existing [Software Catalog APIs][2], [GitHub integration][4], and [Terraform module][3]. In the example below, a user is declaring a library with links, tags, and owning teams.

Example YAML:
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

[1]: /api/latest/software-catalog/#create-or-update-kinds
[2]: /api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /integrations/github/

{{% /tab %}}

{{< /tabs >}}

[1]: /internal_developer_portal/software_catalog/entity_model
[2]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[3]: https://docs.datadoghq.com/api/latest/software-catalog/#create-or-update-entities


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

