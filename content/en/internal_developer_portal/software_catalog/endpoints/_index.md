---
title: Endpoint Observability
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/"
  tag: "Blog"
  text: "Manage API performance, security, and ownership with Datadog API Catalog"
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Datadog Software Catalog"
- link: "/synthetics/api_tests/http_tests/"
  tag: "Documentation"
  text: "Synthetic API Tests"
- link: "/security/application_security/how-it-works/#api-security"
  tag: "Documentation"
  text: "AAP API Security"
- link: "https://www.datadoghq.com/blog/primary-risks-to-api-security/"
  tag: "Blog"
  text: "Mitigate the primary risks to API security"
aliases:
    - /tracing/api_catalog/get_started
    - /tracing/api_catalog/
    - /api_catalog/
    - /api_catalog/endpoint_discovery/
    - /software_catalog/endpoints/discover_endpoints
    - /service_catalog/endpoints/discover_endpoints
    - /service_catalog/endpoints/
    - /software_catalog/endpoints
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
 Endpoint Observability is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Endpoints list in the Software Catalog, showing performance-related information for each endpoint." style="width:100%;" >}}

## Overview

The Software Catalog's [Endpoints list][12] consolidates everything you need to know about your API endpoints. It provides a comprehensive view of performance, reliability, and ownership across all your APIs, whether they serve internal teams or external users. This helps you and your teams effectively monitor mission-critical, API-driven features and ensure they meet performance expectations.

## Use cases

The Endpoints list combines data from across Datadog to provide opinionated workflows. You can do the following:

- **Discover APIs automatically**: Maintain a complete inventory of your public, private, and partner APIs, organized by endpoint.
- **Surface correlated data**: Navigate from endpoints to traces, logs, and metrics from different Datadog sources.
- **Identify performance issues**: Use metrics such as *Last Seen*, *Requests*, *Latency*, and *Errors* to track API health.
- **Receive alerts**: Define performance expectations and thresholds that trigger alerts.
- **Assign ownership information**: Set teams, on-call, and communication channel information to each endpoint so you know whom to reach when errors occur.
- **Ensure comprehensive coverage**: Track the status of API monitors, synthetic tests, and security signals, with direct links to detailed information for investigations.

## Getting started

Your endpoints automatically populate in the Endpoints list if you use [Datadog APM][8] to monitor HTTP services.

### Exploring endpoints

Browse and query properties and metrics that are related to your endpoints.

Read [Exploring Endpoints][11] for more information.

### Monitoring endpoints

Manage and monitor your APIs and endpoints to:

- Find and fix underperforming endpoints.
- Track their reliability against standards and objectives.
- Watch for anomalies.
- Investigate errors.
- Ensure test coverage.
- Close security gaps.

Read [Monitoring Endpoints][7] for more information.

### Assigning owners to endpoints

Add ownership information to endpoints to streamline investigations and team communication.

Read [Assigning Owners][6] for more information.

### Adding endpoints to the list

Assign automatically detected endpoints to API groups to track usage, define ownership, and configure monitoring policies from a centralized location. Alternatively, upload an OpenAPI or Swagger file to unlock the full capabilities of the Endpoints list.

Read [Adding Entries][9] for more information.

### Adding metadata to APIs

Add metadata to APIs through the Datadog UI or API, or use automated pipelines through the GitHub integration or Terraform.

Read [Adding Metadata to APIs][10] for more information.

## Key terminology

| Term         | Definition                                                                                                                                                                                                                    |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API          | A set of protocols and tools that allows two applications to communicate.                                                                                                                                                      |
| API endpoint | The address (URL) of a resource of a server or service that implements the rules defined in the API, often through an HTTP or RESTful interface. The API endpoint processes requests and provides the corresponding responses. |
| Public APIs  | Customer-facing API endpoints that are accessible from the internet.                                                                                                                                                          |
| Private APIs | Also called *internal APIs*. These are designed exclusively for internal use within an organization and are used mainly for backend service communication. These are the most common type of API.                                                   |
| Partner APIs | Also called *third-party APIs*. These are public endpoints provided by another organization (for example, Stripe, Google, or Facebook) that your organization uses to provide its services.                                             |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /api_catalog/explore_apis/
[6]: /software_catalog/manage
[7]: /internal_developer_portal/software_catalog/endpoints/monitor_endpoints/
[8]: /tracing/trace_collection/
[9]: /software_catalog/customize/create_entries
[10]: /software_catalog/service_definitions/#add-metadata-to-endpoints
[11]: /internal_developer_portal/software_catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint
