---
title: Exploring and cataloging your endpoints
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

## Exploring endpoints

The [API Catalog Explorer][1] page shows all endpoints in all environments in your Datadog organization. The performance data shown for each endpoint is scoped to the environment and time frame you select. You can browse and ask questions by querying different properties and metrics to get more precise results, using facets and tags for quick filtering.

In the list table, **sort** by any of the columns by clicking a header. For example, click **P99** to see endpoints with the highest 99th percentile for latency.

The table also shows **team ownership** for the API. This information is inherited from the associated service definition in the [Service Catalog][2]. The service owner owns all of the endpoints connected to the service.

To **filter the list** of endpoints or to search for a particular endpoint of interest, enter a query in the **Search** field. Search by service, path, or any other primary tag. 

Or select a combination of facets on the left, filtering by the owning **service** or the **team** they belong to.

To **scope the data** shown in the table, specify an environment, another primary tag (such as datacenter), and a time frame.

{{< img src="tracing/api_catalog/api-catalog-scope.mp4" alt="Showing how changing scope settings changes the metrics shown in the API Catalog" video="true" >}}

You can [define tags](#group-apis-to-express-a-feature-or-business-logic) to use as facets so you can easily find groups of endpoints you're most interested in.

## Investigating endpoint details

When exploring an endpoint, getting a higher resolution view of the API endpoint details is helpful.

Click an endpoint in the list to open a details page that shows performance, ownership, and metadata information for the endpoint, collected from various areas of Datadog, into one place. Here you can add custom tags. You can also launch deeper investigations of the various types of telemetry using links into other areas of Datadog. 

For example, you can:
- Look up a specific endpoint by path (for example, `/checkout`) when it shows a high error rate and a high request count.
- View the Error/Hits graph and correlated Response Code graph to identify issues.
- Navigate to related telemetry like traces and logs.

{{< img src="tracing/api_catalog/endpoint-details-pivot-to-traces.mp4" alt="Click into an endpoint to see Errors graph, and click through to related traces to investigate." video="true" >}}

The performance graphs on the page are initially scoped to the same settings as on the API Catalog page, and you can change those settings on the details page to suit your investigation by using the time frame selector and other scope dropdown menus. 


## Exploring endpoints during incidents

When investigating an incident, getting a detailed resolution view of the API endpoint can lead to a faster understanding of the root cause.

In addition, you can quickly identify the owning team of each endpoint, the on-call engineer, and how to reach them (email, Slack, PagerDuty) to help resolve incidents involving a specific API endpoint.

The ownership information -- team, on-call information, communication details -- is derived from the service definition supplied from the Service Catalog.

{{< img src="tracing/api_catalog/api-catalog-team-details.png" alt="The team details panel in the endpoint details page, showing the name and communication information for the team that owns the endpoint, as defined in Service Catalog" style="width:100%;" >}}

## Group APIs to express a feature or business logic

In addition to tagging an endpoint in its details page, you can **group endpoints by adding tags to multiple endpoints at once**. Select multiple endpoint check boxes, and click **Edit tags** to provide labels that describe business logic, importance, or other useful grouping information. Applying these labels can help you quickly view and access groups of endpoints defined by your own criteria, and create assets such as monitors and dashboards for endpoint groups with common ground and expectations.

For example, if you want to create latency alerts for endpoints that are particularly sensitive to performance problems, tag those endpoints with a tag like `Latency sensitive`. 

Or tag endpoints that handle sensitive data with a tag like `PII` and alert when endpoints with that tag have a `401 Unauthorized` response. Other examples of useful tags:

- `critical to feature X`
- `newly added - V2`
- `contains password`
- `contains PII`
- Business logic (for example, `payments` )
- Specific customer group (`subscribers`)

When you add a tag, it appears in the list of facets on the left of the catalog. Click a facet to filter the list and add the tag to the Search query field.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/