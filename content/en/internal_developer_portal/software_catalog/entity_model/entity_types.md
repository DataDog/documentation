---
title: Entity Types
disable_toc: false
---

## Overview

In Software Catalog, an entity represents the smallest building block of modern microservice-based architecture. As of [schema definition v3.0][1]+, an entity can be an instrumented APM service, a datastore, a system, an API, a queue, or even a custom-defined entity. 

See GitHub for [full schema definitions][1]. 

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

{{% /tab %}}

{{% tab "API" %}}

In Software Catalog, an API (`kind:API`) refers to a collection of endpoints that belong together logically. APIs offer an alternative way to group endpoints beyond APM services (the mapping between endpoints and services are not modifiable). 

To define components within an API, you can specify values for the `components` key in the `spec` field of the entity's v3 definition. 

Example YAML for `kind:api`:
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

The user-defined API appears in Software Catalog as shown:
{{< img src="/tracing/software_catalog/api-page-v3.png" alt="API page for Payments API in Software Catalog" style="width:90%;" >}}

This page holds relationship data of how the API interacts with dependencies, the API components, an OpenAPI preview, and logs and events aggregated across all endpoints. 

**Note**: Software Catalog contains HTTP endpoints that are automatically discovered by APM. The concept of endpoints correspond to [APM resources][1] for an APM web service.

[1]: /tracing/glossary/#resources

{{% /tab %}}

{{% tab "Custom entities" %}}

You can define custom entity types beyond service, system, datastore, queue, and API.

Example YAML:
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: custom.library
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

{{% /tab %}}

{{< /tabs >}}


[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: /tracing/services/inferred_services/?tab=agentv7551#naming-inferred-entities