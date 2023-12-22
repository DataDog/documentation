---
title: Adding Entries to API Catalog
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/tracing/api_catalog/explore_and_catalog_apis/"
  tag: "Documentation"
  text: "Exploring and cataloging endpoints"
- link: "/tracing/api_catalog/monitor_apis/"
  tag: "Documentation"
  text: "Monitoring APIs"
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">API Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

API Catalog uses APM instrumentation for distributed tracing to automatically discover endpoints in all environments on your Datadog organization. For instrumented services and supported libraries, endpoints are automatically populated into API Catalog.

Register auto-discovered endpoints, or upload an OpenAPI file to benefit the full value of the API Catalog.

## Register auto-discovered endpoints

Register auto-discovered endpoints to groups of APIs to track their usage, set ownership, and set monitoring policies from a centralized location.

To register endpoints:

1. From the API Catalog, select the endpoints to register.
2. Click **Register Endpoints**.
3. Select the API(s) you want to group the endpoints into.
4. Click **Apply**.

{{< img src="tracing/api_catalog/api-catalog-register.png" alt="Select endpoints in API Catalog and click Register Endpoints button." style="width:65%;" >}}

After endpoints are registered, Datadog starts collecting a new endpoint metric for better monitoring capabilities. It might take a few minutes for the data to display if you try to create a new monitor.

Auto discovery isn't available for some frameworks. Check compatibility status in the **learn more** button on the app. If you still cannot find your endpoints, try uploading a definition file containing them. Datadog automatically starts collecting data on those endpoint definitions after they are uploaded.

## Upload OpenAPI file

Upload API definitions that you already own to see which endpoints are receiving traffic, which are not receiving traffic, and get performance and deployment information on top of your API definitions.

Supported formats are OpenAPI 2 and 3.

Datadog support custom OpenAPI tags to help manage metadata:
- dd_tags
- dd_team

```yaml
openapi: 3.0.2
info:
 title: API Name
 description: API Description
 version: 1.0.0
x-datadog:
 teamHandle: dd-team
paths:
 /api/v2/customers/{id}:
   get:
     summary: get customer information
     operationId: getCustomerInfo
     parameters:
       - in: path
         name: id
     responses:
       '200':
         description: Successful operation
         content:
           application/vnd.api+json:
             schema:
               type: object
               properties:
                 data:
                   type: array
                   description: Contains all customer information
                   items:
                     $ref: '#/components/schemas/customerInfo'
       '400':
         description: Invalid arguments
       '401':
         description: Unauthorized operation
       '500':
         description: An internal server error
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/setup
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
[4]: https://app.datadoghq.com/apis/catalog-page
[5]: https://app.datadoghq.com/apis/catalog