---
title: Exploring APIs
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

{{< img src="tracing/api_catalog/api-catalog-explorer.png" alt="API Catalog Explorer view" style="width:100%;" >}}

## Exploring endpoints

The [API Catalog][1] shows all endpoints in all environments in your Datadog organization. The performance data shown for each endpoint is scoped to the environment and time frame you select. You can browse and ask questions by querying different properties and metrics for more precise results, and you can filter using facets and tags.

In the table, click a header to sort by its column. For example, click **P99** to see endpoints with the highest 99th percentile for latency. **Note**: the **P99** column may not be displayed by default.

The table also shows **TEAM** ownership for the API. This information is inherited from the associated service definition in the [Service Catalog][2]. The service owner owns all of the endpoints connected to the service.

To filter the list or to search for an endpoint of interest, enter a query in the **Search** field. Search by service, path, or any other primary tag. Alternatively, select a combination of facets to filter by the **Service** or the **Team** the endpoint belongs to.

To scope the data shown in the table, specify an environment, another primary tag (such as `datacenter`), and a time frame in **Scope Metrics to**.

{{< img src="tracing/api_catalog/api-catalog-scope2.mp4" alt="Showing how changing scope settings changes the metrics shown in the API Catalog" video="true" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/