---
title: Exploring Endpoints
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
aliases:
    - /tracing/api_catalog/explore_and_catalog_apis/
    - /api_catalog/explore_and_catalog_apis/
    - /tracing/api_catalog/explore_apis/
    - /api_catalog/explore_apis/
---

{{< img src="tracing/service_catalog/endpoints-list.png" alt="**Endpoints** list in the Service Catalog, showing performance-related information for each." style="width:100%;" >}}

## Overview

The [**Endpoints** list][1] provides visibility into all HTTP endpoints across your Datadog organization's environments. Each endpoint displays its HTTP method (for example `GET`), URL path (for example, `/payment/{shop_id}/purchase`), and associated service name (for example, `Payments`).

<div class="alert alert-info">The <strong>Endpoints</strong> list only supports HTTP endpoints.</div>

## Exploring endpoint performance

The **Endpoints** list shows performance data scoped to your selected environment and time frame:

- **Column sorting**: Click column headers to sort by metrics. For example, click **P95** to see endpoints with the top 95th percentile for latency.
- **Ownership tracking**: View team ownership in the **TEAM** column. This information is inherited from the associated service definition in the [Service Catalog][2]. The service owner owns all of the endpoints connected to the service.
- **Filtering and searching**: Search by service, path, or any primary tag, or filter using facets like **Service** and **Team**.
- **Scoping**: Specify the environment, additional primary tags (for example, `cluster_name`), and time frame.

{{< img src="tracing/service_catalog/scope-data.png" alt="Changing scope settings changes the data shown in the Endpoints list" >}}

## Viewing endpoint details

Use the endpoints details page to detect underperforming APIs and identify opportunities for optimization.

To access the endpoint details page:

1. Use the filtering, sorting, and searching options in the **Endpoints** list to find endpoints of interest.
1. Click an endpoint to view its details page.

The endpoint details page shows you metadata, performance, errors, dependencies, and correlated telemetry from other areas of Datadog.

{{< img src="tracing/service_catalog/endpoint-details.png" alt="Click into an endpoint to see Errors graph and dependency graph. Click through to related traces to investigate." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/