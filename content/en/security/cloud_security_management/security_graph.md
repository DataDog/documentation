---
title: Visualize relationships with Security Graph
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-security-graph/"
    tag: "Blog"
    text: "Visualize cloud security relationships with Datadog Security Graph"
---

{{< callout url="https://www.datadoghq.com/product-preview/security-graph" header="Join the Preview!">}}
  Security Graph is in Limited Availability.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Security Graph is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

One of the most persistent challenges in cloud security is understanding how compute, storage, identity, and networking components interact with each other. With Security Graph, you can model your cloud environment as a relationship graph. Visualize and query the connections between your cloud resources, such as EC2 instances, IAM roles, S3 buckets, and security groups, combining data from your Agentless and Agent-based cloud scans. Investigate these relationships so you can surface indirect access paths, assess identity risks, and respond more effectively to emerging threats.

**Note**: Security Graph only supports AWS resources.

{{< img src="security/csm/security_graph.png" alt="Security Graph displaying an example EC2 instance" width="100%">}}

## Select or create a query

There are two ways to specify the kinds of resources and relationships you want to see in Security Graph:
<!-- - Write a query in natural language (for example, "Non-admin IAM roles that can assume admin IAM roles") -->
- Select a pre-made query from the homepage.
- Build your query yourself, by specifying resource types and the relationships between them.

<!-- If you use a natural language or pre-made query, the technical details automatically populate in the query. You can modify the query to fine-tune your results. -->

If you use a pre-made query, the technical details automatically populate in the query. You can modify the query to fine-tune your results.

### Create and modify queries

Whether you're using an automatically generated query or creating one yourself, you can use the query builder to refine your results.

1. Under **Build your own query**, beside **Search for**, select a resource type from the list.
1. (Optional) To add additional details about the resource type you selected, click **+**, then click **Where**. In the field that appears, select a tag and enter a value for that tag to filter by.
1. (Optional) To filter by an additional resource type, click **+**, then click **That**. In the field that appears, select a relationship you want the additional resource type to have to the one above. If another **Where** field appears, specify additional tag values for this resource type.
1. Add additional resource types and tag values as required. You can also click the **Delete** icon to remove a condition, or click **Clear query** to start over.

As you modify the query, Security Graph automatically updates to show relevant resources. Beside **View**, you can click **Graph** to view the resources in a relationship graph, or click **Table** to see them in a table instead.

## Learn more about a resource

- When you're viewing resources in a graph, you can click a resource to view more information:
  - Copy key information about the resource, like the ID, account, or team.
  - Filter the resources in your current query by a specific tag value.
  - View more details about the resource.
  - View security findings associated with the resource.
- When you're viewing resources in a table, you can click a resource to view additional information in the side panel.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}