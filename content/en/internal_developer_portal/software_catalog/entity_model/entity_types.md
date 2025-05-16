---
title: Entity Types
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

TODO

## Entity groups: System and API Pages in Software Catalog

Defining entities of `kind:system` and `kind:api` creates hierarchical groupings of entities including services, queues, datastores, and endpoints. To define components within a system or API, you can specify values for the `components` key in the `spec` field of the entity's v3 definition. 

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

The user-defined system above appears in Software Catalog as shown below. This page holds relationship data of components between the system and upstream/downstream dependencies as well as scorecards, logs, and events aggregated across all system components. 

{{< img src="/tracing/software_catalog/product-rec-systemV3.png" alt="System page for Product Recommendations system in Software Catalog" style="width:90%;" >}}

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

The user-defined API appears in Software Catalog as shown below. This page holds relationship data of how the API interacts with dependencies, the API components, an OpenAPI preview, and logs and events aggregated across all endpoints. 

{{< img src="/tracing/software_catalog/api-page-v3.png" alt="API page for Payments API in Software Catalog" style="width:90%;" >}}

## Entity types

{{< tabs >}}
{{% tab "Service" %}}

{{% /tab %}}

{{% tab "Datastore" %}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}