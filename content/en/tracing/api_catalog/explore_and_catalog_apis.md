---
title: Exploring and Cataloging APIs
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

In the table, click a header to sort by its column. For example, click **P99** to see endpoints with the highest 99th percentile for latency. Note that the **P99** column may not be displayed by default.

The table also shows **TEAM** ownership for the API. This information is inherited from the associated service definition in the [Service Catalog][2]. The service owner owns all of the endpoints connected to the service.

To filter the list or to search for an endpoint of interest, enter a query in the **Search** field. Search by service, path, or any other primary tag. Alternatively, select a combination of facets to filter by the **Service** or the **Team** the endpoint belongs to.

To scope the data shown in the table, specify an environment, another primary tag (such as `datacenter`), and a time frame in **Scope Metrics to**.

{{< img src="tracing/api_catalog/api-catalog-scope2.mp4" alt="Showing how changing scope settings changes the metrics shown in the API Catalog" video="true" >}}


<!-- image TKTK -->
### Classify endpoints with shared expectations

In addition to tagging an endpoint from its details page, you can add tags to multiple endpoints at once. To do this, select multiple endpoint check boxes, and click **Edit Tags**.  Use these labels to describe business logic, importance, or other useful grouping information. Applying these labels can help you view and access groups of endpoints defined by your own criteria. This is helpful to create assets such as monitors and dashboards for endpoint groups with common characteristics.

For example, if you want to create latency alerts for endpoints that are particularly sensitive to performance problems, tag those endpoints with a tag like `Latency sensitive`. 

Or tag endpoints that handle sensitive data with a tag like `PII` and alert when endpoints with that tag have a `401 Unauthorized` response. Other examples of useful tags include:

- `critical to feature X`
- `newly added - V2`
- `contains password`
- `contains PII`
- Business logic (for example, `payments`)
- Specific customer group (`subscribers`)

When you add a tag, it appears in the list of facets beside the catalog. Click a facet to filter the list and add the tag to the Search query field.


## Establishing ownership 

The **Team** column on the Explorer page and each endpoint details page shows the name of the team that owns the API that the endpoint is associated with. If ownership hasn't been assigned, click the **Register Endpoints** dropdown and choose an owner to assign one.

You can see which team owns each endpoint, and click a team name to see more details. For example, you can see more information about the team and their dashboards, the on-call engineer, and how to reach them (email, Slack, PagerDuty) to resolve incidents involving a specific API endpoint.

{{< img src="tracing/api_catalog/api-catalog-endpoint-details.png" alt="The team details panel in the endpoint details page, showing the name and communication information for the team that owns the endpoint" style="width:100%;" >}}

<!--## Assess monitoring gaps TKTK -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/