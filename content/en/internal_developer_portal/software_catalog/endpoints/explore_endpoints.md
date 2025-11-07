---
title: Exploring Endpoints
further_reading:
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Datadog Software Catalog"
aliases:
    - /tracing/api_catalog/explore_and_catalog_apis/
    - /api_catalog/explore_and_catalog_apis/
    - /tracing/api_catalog/explore_apis/
    - /api_catalog/explore_apis/
    - /service_catalog/endpoints/explore_endpoints/
    - /software_catalog/endpoints/explore_endpoints/
---

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Endpoints list in the Software Catalog, showing performance-related information for each endpoint." style="width:100%;" >}}

## Overview

The [Endpoints list][1] provides visibility into all HTTP endpoints across your Datadog organization's environments. Each endpoint displays its HTTP method (for example, `GET`), URL path (for example, `/payment/{shop_id}/purchase`), and associated service name (for example, `Payments`).

<div class="alert alert-info">The <strong>Endpoints</strong> list only supports HTTP endpoints.</div>

## Exploring endpoint performance

The Endpoints list shows performance data scoped to your selected environment and time frame:

- **Column sorting**: Click column headers to sort by metrics. For example, click **P95** to see endpoints with the top 95th percentile for latency.
- **Ownership tracking**: View team ownership in the **TEAM** column. This information is inherited from the associated API definition in the [Software Catalog][2]. The API owner owns all of the endpoints connected to the API.
- **Filtering and searching**: Search by service, path, or any primary tag, or filter using facets like **Service** and **Team**.
- **Scoping**: Specify the environment, additional primary tags (for example, `cluster_name`), and time frame.

{{< img src="tracing/software_catalog/scope-data.png" alt="Changing scope settings changes the data shown in the Endpoints list" >}}

## Viewing endpoint details

Use the endpoint details page to detect underperforming APIs and identify opportunities for optimization.

To access the endpoint details page:

1. Use the filtering, sorting, and searching options in the Endpoints list to find endpoints of interest.
1. Click an endpoint to view its details page.

The endpoint details page shows you metadata, performance metrics, errors, dependencies, and correlated telemetry from other areas of Datadog.

{{< img src="tracing/software_catalog/endpoint-details.png" alt="Click into an endpoint to open the endpoint details page and see information such as errors and dependencies." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /software_catalog/service_definitions/v3-0/#system-and-api-pages-in-software-catalog
