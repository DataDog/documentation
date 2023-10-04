---
title: Setting Up API Catalog
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">API Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

API Catalog uses APM instrumentation for distributed tracing to automatically discover endpoints in all environments in your Datadog organization. Endpoints for instrumented services and supported libraries are automatically populated into API Explorer.

## Setting up

Because it is built on APM data, you can turn on API Catalog in a Datadog organization that is already consuming APM data, and no other setup required. APM-instrumented services and supported libraries are automatically discovered. 

If you can't find one of your APIs or endpoints in the Catalog, check that it is instrumented, and if needed, **add APM instrumentation** by following the instructions on the [Setup page][1].

To add an API to the Catalog without instrumenting it, or if it's written in a framework that doesn't support instrumentation and auto-detection, **import its OpenAPI definition** YAML or JSON file by clicking **Add API** on the [Catalog page][4]. 

Next, start exploring and adding catalog metadata to the detected or imported APIs and endpoints, in the [API Catalog Explorer page][5].

## Key terminology

API
: A set of protocols and tools that allow two applications to communicate.

API endpoint
: The address of a resource (URL) of a server or a service that implements the set of rules defined in the API, often through an HTTP, RESTful API interface. The API endpoint responsible for making the API call response.<br /><br/>
The API Catalog displays API endpoints as: the HTTP method (for example, `GET`), the URL path (the structure of the location of the resource, such as `/payment/{shop_id}/purchase`), and the name of the service this resource serves (for example, `Payments`)<br /><br/>
The API Catalog in **beta** supports only **HTTP** endpoints. 

Public APIs
: Customer-facing API endpoints that are accessible from the internet.

Private APIs
: Also called internal APIs. Intended solely for internal use within a company or organization, used mainly for backend service communication. The most common type of APIs.

Partner APIs
: Also called third-party APIs. Another organization's public endpoints that your organization uses to provide your services (for example, Stripe, Google, and Facebook).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/setup
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
[4]: https://app.datadoghq.com/apis/catalog-page
[5]: https://app.datadoghq.com/apis/catalog