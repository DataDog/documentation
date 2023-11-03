---
title: Setting Up API Catalog
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

API Catalog uses APM instrumentation for distributed tracing to automatically discover endpoints in all environments in your Datadog organization. Endpoints for instrumented services and supported libraries are automatically populated into API Explorer.

## Setting up

You can enable the API Catalog in a Datadog organization that is already consuming APM data without any additional setup. APM-instrumented services and supported libraries are automatically discovered. 

If you can't find one of your APIs or endpoints in the API Catalog, make sure it's instrumented. If necessary, follow the instructions on the [Setup page][1] to make a service discoverable.

{{< img src="tracing/api_catalog/api-catalog-setup.png" alt="API Catalog Setup page showing instructions for instrumenting a Java service" style="width:80%;" >}}

Alternatively, you can add an API to the API Catalog by importing its OpenAPI definition. This approach is necessary if you don't want to instrument the API or if it's written in a framework that doesn't support instrumentation and auto-detection. To import the OpenAPI definition YAML or JSON file, click **Add an  API** on the [Catalog page][4]. 

{{< img src="tracing/api_catalog/api-catalog-setup-import.png" alt="API Catalog Setup page for importing an OpenAPI definition file." style="width:100%;" >}}

After you've set up the API Catalog with your APIs and endpoints, start exploring and adding catalog metadata on the [API Catalog Explorer page][5].

## Key terminology

API
: A set of protocols and tools that allow two applications to communicate.

API endpoint
: The address of a resource (URL) of a server or a service that implements the set of rules defined in the API, often through an HTTP, RESTful API interface. The API endpoint is responsible for making the API call response.<br /><br/>
The API Catalog displays API endpoints as the HTTP method (for example, `GET`), the URL path (for example, `/payment/{shop_id}/purchase`), and the name of the service this resource serves (for example, `Payments`).<br /><br/>
The API Catalog in **beta** supports only **HTTP** endpoints. 

Public APIs
: Customer-facing API endpoints that are accessible from the internet.

Private APIs
: Also called internal APIs. These are only for internal use in an organization and are used mainly for backend service communication. These are the most common type of APIs. 

Partner APIs
: Also called third-party APIs. These are another organization's public endpoints that your organization uses to provide your services (for example, Stripe, Google, and Facebook).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/setup
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
[4]: https://app.datadoghq.com/apis/catalog-page
[5]: https://app.datadoghq.com/apis/catalog