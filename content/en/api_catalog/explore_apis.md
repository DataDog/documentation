---
title: Exploring APIs
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
aliases:
    - /tracing/api_catalog/explore_and_catalog_apis/
    - /api_catalog/explore_and_catalog_apis/
    - /tracing/api_catalog/explore_apis/
---

{{< img src="tracing/api_catalog/api-catalog-explorer.png" alt="API Catalog Explorer view" style="width:100%;" >}}

## Exploring endpoints

The [API Catalog][1] shows all endpoints in all environments in your Datadog organization. The performance data shown for each endpoint is scoped to the environment and time frame you select. You can browse and ask questions by querying different properties and metrics for more precise results, and you can filter using facets and tags.

- **Sort by a column in the table**: Click a header to sort by. For example, click **P99** to see endpoints with the highest 99th percentile for latency. **Note**: the **P99** column may not be displayed by default.

- **View API ownership information**: View the **TEAM** column for an endpoint. This information is inherited from the associated service definition in the [Service Catalog][2]. The service owner owns all of the endpoints connected to the service.

- **Filter or search the list of endpoints**: Enter a query in the **Search** field. Search by service, path, or any other primary tag. Alternatively, select a combination of facets to filter by the **Service** or the **Team** the endpoint belongs to.

- **Scope the displayed data**: Specify an environment, another primary tag (such as `datacenter`), and a time frame in **Show performance of:**.

The following example shows how to scope the displayed data to a specific environment and `cluster-name`:

{{< img src="tracing/api_catalog/api-catalog-scope4.png" alt="Showing how changing scope settings changes the metrics shown in API Catalog" >}}

## Detecting underperforming APIs and identifying opportunities for optimization

When exploring an endpoint, getting a higher resolution view of the API endpoint details is helpful.

Use the filtering, sorting, and searching options in API Catalog to find endpoints of interest.
Click an endpoint to view its details page. Here you can see performance, errors, issues, deployments, monitors, ownership, a dependency map, and metadata information in one central location. From the details page, you can also add custom tags to the endpoint. You can also investigate the various types of telemetry using links to other areas of Datadog. 

In the details page, you can:
- Look up a specific endpoint by path (for example, `/checkout`) when it shows a high error rate and a high request count.
- View the **Requests & Errors** graph and correlated **Response Code** graph to identify issues.
- Navigate to related telemetry like traces, logs, and errors.

{{< img src="tracing/api_catalog/api-catalog-endpoint-details-pivot-to-traces3.mp4" alt="Click into an endpoint to see Errors graph and dependency graph. Click through to related traces to investigate." video="true" >}}

The graphs on the details page are initially scoped to the same settings as the **Explorer** page. You can change those settings on the details page to suit your investigation by using the time frame selector and other scope dropdown menus. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/