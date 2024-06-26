---
title: Assigning Owners to APIs
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

<!-- image TKTK -->

## Assigning owners

In API Catalog, you manage ownership at the API level, where each API represents a group of endpoints. The owners of APIs are called *teams*.

You can find the teams that own an API on the API page, endpoint side panel, and in the **Explorer** table. Teams are represented by a pill containing a name like `Orders`. Click the team name to see additional details like the team members, contact links, and more. Team details are useful to resolve incidents related to specific endpoints.

{{< img src="tracing/api_catalog/api-catalog-endpoint-owners.png" alt="The team details panel in the endpoint details page, showing the name and communication information for the team that owns the endpoint" style="width:100%;" >}}

To assign owners from the Datadog UI:

1. Make sure the [API endpoints are registered][1].
2. From the **API** column, click the API you want to assign an owner to.
3. Beside the **N/A** pill at the top-left, click the pencil icon.
4. Select a team from the list.
5. Click **Confirm**.

To assign owners within the API specification file:

1. Add the team name to the `x-datadog.teamHandle` property:
   {{< highlight yaml "hl_lines=6-7" >}}
openapi: 3.0.2
info:
 title: API Name
 description: API Description
 version: 1.0.0
x-datadog:
 teamHandle: <dd-team>
{{< /highlight >}}
2. [Import the OpenAPI/Swagger file][2].

<!--## Assess monitoring gaps TKTK -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api_catalog/add_entries/
[2]: /api_catalog/add_entries/#import-openapiswagger-file