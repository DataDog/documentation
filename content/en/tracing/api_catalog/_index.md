---
title: Datadog API Catalog
kind: documentation
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/"
  tag: "Blog"
  text: "Manage API performance, security, and ownership with Datadog API Catalog"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/synthetics/api_tests/http_tests/"
  tag: "Documentation"
  text: "Synthetic API Tests"
- link: "/security/application_security/how-appsec-works/#api-security"
  tag: "Documentation"
  text: "ASM API Security"
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">API Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< beta-callout url="" btn_hidden="true">}}
Datadog API Catalog is in beta.
{{< /beta-callout >}}

{{< img src="tracing/api_catalog/api-catalog-catalog-api-details.png" alt="API Catalog showing a list of endpoints for an API called Checkout, along with information about ownership, service and environment, tags, and links to related monitors, tests, and performance data." style="width:100%;" >}}

## Overview

The API Catalog provides a single view and entry point for exploring the performance, reliability, and ownership of all your API endpoints in one place. It's a central place where your whole company can find up-to-date information about the characteristics of the APIs used by internal services (private APIs) and external users (publicly exposed APIs). 

Monitor your mission-critical API-driven business features, standardize and validate APIs performance expectations, and alert when performance deviates from them.

The API Catalog enables your teams to:
- Provide high availability and uptime of critical APIs and the business features that rely on them to function.
- Prevent API regressions and instability issues.
- Quickly triage incidents.

API Catalog combines data from across Datadog to provide opinionated workflows so you can explore and monitor your APIs from different sources in one unified view. API Catalog provides:

- **Automated discoverability** - One inventory for all public, private, and partner APIs, where _endpoints_ are the organizing principle.
- **Correlation of and direct linking to API metadata** from different Datadog sources.
- **API endpoint metrics**, such as **Last Seen**, **Requests**, **Latency**, and **Errors**, to identify performance issues and track API health.
- **Alerting** on endpoints that deviate from defined performance expectations and thresholds.
- Resolving incidents faster with API **ownership information** (team, on-call, communication channels) directly associated with each endpoint, to know who to reach when something goes wrong.
- A view of the coverage and status of **API monitors, synthetic tests, and security signals**, with direct access to more information for your incident, troubleshooting, and vulnerability investigations.

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

## Getting started

If you're already monitoring the performance of your services using APM, API Catalog automatically detects endpoints in your instrumented services. 

See [Setting up API Catalog][3] for more information, including how to add APIs and endpoints for services that aren't auto-discovered.

## Exploring and cataloging your endpoints

Use the API Catalog Explorer page to navigate through all endpoints, filtering, searching, and using facets and time frame to find particular endpoints of interest.

Add meaningful tags and ownership information to the endpoint to make you catalog most useful for investigations and team communication.

Read [Exploring and cataloging endpoints][6] for more details.

## Monitoring your APIs

Use your full catalog to start managing your APIs and endpoints:
- Find and fix under-performing endpoints.
- Track their reliability against standards and objectives.
- Watch for anomalies.
- Investigate errors.
- Ensure test coverage.
- Close security gaps.

Read [Monitoring APIs][7] for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/
[3]: /tracing/api_catalog/get_started/
[6]: /tracing/api_catalog/explore_and_catalog_apis/
[7]: /tracing/api_catalog/monitor_apis/