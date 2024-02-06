---
title: Establishing Owners and Tagging Endpoints
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

<!-- image TKTK -->

## Establishing owners

The **TEAM** column on the Explorer page and each endpoint details page shows the name of the team that owns the API that the endpoint is associated with.

To assign ownership to an endpoint:

1. From the **Explorer** page, select the endpoint(s) that need owners.
2. Click **Register Endpoints**.
3. Search for and then select the teams that should own the endpoint.
4. Click **Apply**.

If ownership hasn't been assigned, click the **Register Endpoints** dropdown and choose an owner to assign one.

You can see which team owns each endpoint, and click a team name to see more details. For example, you can see more information about the team and their dashboards, the on-call engineer, and how to reach them (email, Slack, PagerDuty) to resolve incidents involving a specific API endpoint.

{{< img src="tracing/api_catalog/api-catalog-endpoint-details.png" alt="The team details panel in the endpoint details page, showing the name and communication information for the team that owns the endpoint" style="width:100%;" >}}

<!--## Assess monitoring gaps TKTK -->

## Tagging endpoints

Tag endpoints to classify them with shared expectations. You can individually tag endpoints or tag multiple endpoints at one time.

To tag an endpoint:

1. From the **Explorer** page, select an endpoint to view its details.
2. Click the Edit icon in **CUSTOM TAGS**.
3. Add or search for a tag.
4. Click **Apply Changes**.

To tag multiple endpoints at one time:

1. From the **Explorer** page, select checkboxes next to multiple endpoints.
2. Click **Edit Tags**.
3. Add or search for a tag.
4. Click **Apply Changes**.

When you add a tag, it appears in the list of facets beside the catalog. Click a facet to filter the list and add the tag to the **Search** query field.

Use tags to describe business logic, importance, or other useful grouping information. Applying these labels can help you view and access groups of endpoints defined by your own criteria. This is helpful to create assets such as monitors and dashboards for endpoint groups with common characteristics.

For example, if you want to create latency alerts for endpoints that are particularly sensitive to performance problems, tag those endpoints with a tag like `Latency sensitive`. Additionally, tag endpoints that handle sensitive data with a tag like `PII` and alert when endpoints with that tag have a `401 Unauthorized` response.

Other examples of useful tags include:

- `critical to feature X`
- `newly added - V2`
- `contains password`
- `contains PII`
- Business logic (for example, `payments`)
- Specific customer group (`subscribers`)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}