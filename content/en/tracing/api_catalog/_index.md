---
title: Datadog API Catalog
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

{{< beta-callout url="https://datadoghq.com" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  Datadog API Catalog is in beta! Use this form request access. 
{{< /beta-callout >}} 

## Overview

The API Catalog provides a single view and entry point into exploring the performance, reliability, and ownership of all your API Endpoints in one place. It's a central place where your whole company can find constantly up-to-date information about the characteristics of the APIs used by internal services (private APIs) and external users (publicly exposed APIs). 

Monitor your mission-critical API-driven business features by continuously discovering and tracking the performance of the APIs that you expose to your customers, and the ones your services rely on to function. Standardize performance expectations for APIs and constantly validate these expectations, alerting when performance deviates from them.

This enables your efforts to:
- Provide high availability and uptime of critical business features.
- Have fewer regressions and instability issues.
- Triage incidents quicker.
- Optimize resources allocation.

API Catalog brings together data from across Datadog provide opinionated workflows so you can explore and monitor your APIs from different sources in one unified view. API Catalog provides:

- **Automated discoverability** - One inventory for all public, private, and partner APIs, where _endpoints_ are the organizing principle.
- **Correlation of all API metadata** from different Datadog sources.
- **API endpoint metrics** such as Last Seen, Requests, Latency, and Errors, to identify performance issues and track API health.
- **Monitoring and governance workflows** such as:
  - Alerting on Endpoints that deviate from defined performance expectations and thresholds.
  - Resolving incidents faster with API ownership information directly associated with each endpoint, to know who to reach when something goes wrong

### Some background terminology

API
: A set of protocol and tools that allow two applications to communicate.

API endpoint
: The URL for a server or a service, often through an HTTP, RESTful API interface, that implements the set of rules defined in the API. APIs operate through responses and requests -- a client makes a request and the API endpoint makes a response.<br /><br/>
API endpoints in the API Catalog are comprised by the HTTP Method (for example, `GET`), the URL's Path (the structure of the location of the resource, such as `/payment/{shop_id}/purchase`) and the Service this resource serves (for example, `Payments`)<br /><br/>
The API Catalog in beta supports only HTTP RESTful endpoints. 

Public APIs
: Publicly exposed API through the internet. An organization's way to expose services and apps to customers. In most cases, public APIs are used by web and mobile apps, but it's becoming more common to have public APIs that expose new revenue streams alongside web app. Customers expect APIs to be a central part of your product offering, and they set up workflows and automation that leverage those APIs.

Private APIs
: Also called internal APIs. Intended solely for internal use within a company or organization. They’re the most common type of API as they’re quick to develop and don’t need to be as robust as products intended for public consumption

Partner APIs
: Also called third party APIs. APIs that your app consumes that belong to a different organization (the third party). You leverage those APIs to provide your own service, and you are dependent on them for some features to work. For example, Paypal, Stripe, or other payment APIs, authentication providers including federated ones like Google or Facebook.

## Exploring your endpoints

The [API Catalog][1] view shows all endpoints in all environments in your Datadog organization. The performance data shown for each endpoint is scoped to the environments and time frame you select. You can browse and ask valuable questions by querying on different properties and metrics to get more precise results, using facets and tags for quick filtering.

In the list table, **sort** by any of the columns by clicking a header. For example, click **P99** to see endpoints with the highest 99th percentile for latency.

The table also shows **team ownership** for the API. This information is inherited from the associated service's definition in the [Service Catalog][2]. A service owner owns all of the endpoints that are connected to the service.

To **filter the list** of endpoints or to search for a particular endpoint of interest, enter a query in the **Search** field. Search by service, path, or any other primary tag you wish. Or select a combination of facets on the left.

To **scope the data** shown in the table, specify an environment and timeframe.

You can [define tags](#group-apis-to-express-a-feature-or-business-logic) to use as facets so you can easily find groups of endpoints you're most interested in.

**Note**: The `API Type` facet is based on auto-generated tags and has values of `public` and `unknown` (which usually indicates a private endpoint).


## Investigating endpoint details

Click an endpoint in the list to open a details page that shows performance, governance, and metadata information for the endpoint, collected from various areas of Datadog into one place. Here you can edit the short name and description, and add custom tags. You can also launch deeper investigations of the various types of telemetry using links into other areas of Datadog. 

The performance graphs on the page are initially scoped to the same settings as on the API Catalog page, and you can change those settings in the details page to suit your investigation by using the time frame selector and other scope drop-downs. 


## Exploring endpoints during incidents

When you investigate an incident, getting a higher resolution view through the API endpoints can lead to faster understanding of the root cause. Resolve incidents faster with **API ownership information** -- team, on-call information, communication details -- directly associated with each endpoint, to know who to reach when something goes wrong. 

The ownership information displayed on API Catalog pages is derived from the underlying Service definition supplied to the Service Catalog.

<!-- screen shot tktk -->

## Group APIs to express a feature or business logic

In addition to tagging an endpoint in its details page, you can **group endpoints by adding tags to multiple endpoints at once**. Select multiple endpoint check boxes, and click **Edit tags** to provide business logic, importance, or other useful grouping information labels to the selected endpoints. This can help you quickly view and access groups of endpoints defined by your own criteria, and create assets such as monitors and dashboards for endpoint groups with common ground and expectations.

For example, if you want to create latency alerts for endpoints that are particularly sensitive to performance problems, tag those endpoints with a tag like `Latency sensitive`. Or tag endpoints that handle sensitive data with a tag like `PII` and alert when endpoints with that tag have a `401 Unauthorized` response. Other examples of useful tags:

- `critical to feature X`
- `newly added - V2`
- `contains password`
- `contains PII`
- Business logic (for example, `payments` )
- Specific customer group (`subscribers`)

When you add a tag, it appears in the list of facets on the left of the catalog. Click a facet to filter the list and add the tag to the Search query field.


## Setting up

Automatically built on top of APM data, API Catalog can be turned on with no additional setup required. Only APM Only APM instrumented services and supported libraries are discoverable. 

To set up your API Catalog list:
- [Instrument the services][3] with APM. 
- [Define service ownership information][2] using Service Catalog.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
