---
title: Cloudcraft in Datadog
description: "Visualize and analyze AWS cloud infrastructure with live Cloudcraft diagrams in Datadog for troubleshooting, security analysis, and cost optimization."
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/"
  tag: "Blog"
  text: "Plan new architectures and track your cloud footprint with Cloudcraft (Standalone)"
- link: "https://www.datadoghq.com/blog/introducing-cloudcraft/"
  tag: "Blog"
  text: "Create rich, up-to-date visualizations of your AWS infrastructure with Cloudcraft in Datadog"
- link: "https://www.datadoghq.com/blog/cloudcraft-security/"
  tag: "Blog"
  text: "Visually identify and prioritize security risks using Cloudcraft"
---

## Overview

Cloudcraft offers a powerful, live read-only visualization tool for cloud architecture, enabling you to explore, analyze, and manage your infrastructure with ease. Not to be confused with the [Standalone Cloudcraft documentation][1], this guide outlines the functionality, setup, and use cases of Cloudcraft *in Datadog*, detailing its benefits for various user personas, and highlighting key features and capabilities.

<div class="alert alert-info">This documentation applies to the Cloudcraft <em>in Datadog</em> product. For information on the standalone Cloudcraft product, please refer to the <a href="/cloudcraft">Cloudcraft (Standalone)</a> documentation.</div>

Cloudcraft's core functionality is its ability to generate detailed architecture diagrams. These diagrams visually represent AWS cloud resources, allowing you to explore and analyze your environments. Cloudcraft's diagrams are optimized for clarity and performance, providing an intuitive interface for navigating large-scale deployments. This helps teams to:

- Trace incidents back to their root causes through infrastructure dependencies.
- Determine if infrastructure is the cause of an incident, such as cross-region traffic causing latency or increased costs. 
- Analyze and address the most relevant security misconfigurations.
- Onboard new team members.
- Accelerate incident MTTR and proactive governance tasks by simplifying infrastructure navigation.

{{< img src="datadog_cloudcraft/cloudcraft_with_ccm_2.mp4" alt="Cloudcraft in Datadog video" video=true >}}

<div class="alert alert-info">Cloudcraft in Datadog is currently only available for AWS accounts.</a></div>

### Prerequisites

- To access Cloudcraft in Datadog, you need the `cloudcraft_read` [permission](#permissions).
- [Resource collection][2] must be enabled for your AWS accounts.
- For the best experience, Datadog strongly recommends using the AWS-managed [`SecurityAudit`][5] policy, or the more permissive [`ReadOnlyAccess`][6] policy.
- Viewing content on the [Security overlay][10] requires additional products to be enabled:
  - To view security misconfigurations and identity risks, [Cloud Security][3] must be enabled.
  - To view sensitive data, [Sensitive Data Scanner][12] must be enabled. For a user to turn the layer on, they must have the [`data_scanner_read`][13] permission.

**Note**: Cloudcraft adapts to restrictive permissions by excluding inaccessible resources. For example, if you don't grant permission to list S3 buckets, the diagram excludes those buckets. If permissions block certain resources, an alert displays in the UI.

<div class="alert alert-warning">Enabling resource collection can impact your AWS CloudWatch costs. To avoid these charges, disable <strong>Usage</strong> metrics in the <strong>Metric Collection</strong> tab of the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a>.<br/>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="AWS Usage toggle in account settings" style="width:100%;" >}}</div>

## Getting started

To get started using Cloudcraft, use the following steps:
1. Navigate to [**Infrastructure > Resources > Cloudcraft**][7]. 
2. A real-time diagram of the resources is displayed in your environment.

 **Note**: For environments with more than 10,000 resources, you must filter the diagram by account, region, or tags before it can be displayed.

{{< img src="datadog_cloudcraft/getting_started_3.mp4" alt="Video showing getting started in Cloudcraft by selecting the Account, Region, and Resource" video=true;" >}}

**Note**: The account name in the **Account** dropdown originates from your AWS account tags in the AWS integration tile.

### Group By

With Group By, Cloudcraft divides your diagram into distinct sections based on different group types. This feature offers a clear and organized perspective of your resources, making it especially helpful for visualizing complex cloud environments.

Enable the **Show All Controls** toggle to display the available **Group By** options. You can also remove specific groupings by unchecking options like VPC and Region. To view the current nesting structure and add the Network ACL (Network Access Control List) layer, click the **More** dropdown.

{{< img src="datadog_cloudcraft/cloudcraft_group_by_with_ccm.png" alt="Group by feature in Cloudcraft, highlighting the Group By menu" >}}

#### Group by tags

You can group resources by AWS tags, such as app, service, team, or cost center, to organize your view by team or workload.

**Note**: Grouping by tags is supported for AWS tags only. Tags from the Datadog Agent (for example ,`env`, or `team` tags from local configuration) are not supported.

{{< img src="datadog_cloudcraft/group_by_tag.mp4" alt="Group by tag feature in Cloudcraft, grouping by Team and Cost Center" video=true >}}

### Saved views 

Saved views allow you to save specific filters on your diagram that are most important to you, enabling efficient troubleshooting with scoped queries on your accounts, regions, environments, and resources.

To apply a saved view to your diagram:

- Navigate to [**Infrastructure > Resources > Cloudcraft**][7]. Select one or more accounts, regions, and resources. Apply any desired filters to your saved view, then click **+Save as new view**.
- Select the desired saved view from the menu at the top of the diagram view. The diagram automatically updates to reflect the chosen view.

{{< img src="datadog_cloudcraft/saved_views.png" alt="Screenshot of the saved views" style="width:50%;" >}}

### Explore resources

Use the zoom and hover features to pinpoint the most critical resources. As you zoom in, additional resource names become visible. Hovering over a resource displays a panel with basic information, while clicking on a resource opens a side panel with observability, cost, and security data, along with cross-links to other relevant Datadog products.

{{< img src="datadog_cloudcraft/cloudcraft_with_ccm_2.mp4" alt="Video showing the zoom and hover feature in Cloudcraft and clicking on a resource to open the side panel" video=true >}}

#### Projection toggle

Toggle the projection from 3D (default) to 2D to visualize your resources from a top-down view.

{{< img src="datadog_cloudcraft/cloudcraft_2D.png" alt="Cloudcraft landing page with the 2D toggle enabled" >}}


### Filtering and search

Diagrams can be filtered by tags, such as team, application, or service, allowing you to concentrate on relevant resources while maintaining context through connected resources. Additionally, Cloudcraft provides a powerful search and highlight feature, enabling ease of location of specific resources or groups of resources.

Click the **\+Filter** menu to quickly filter your resources by commonly used tags such as service, team, region, and more. Additionally, click the **More Filters** option to filter by AWS tags, custom tags, and terraform tags. The filter option reloads the diagram to display only the infrastructure that matches the filter criteria.

{{< img src="datadog_cloudcraft/cloudcraft_filter.png" alt="Filter feature in Cloudcraft" >}}

### Search and highlight

Use the search bar to locate resources on the diagram by name, ID, or tag. This feature is highly effective for finding specific resources within your cloud architecture. It highlights the search criteria in the diagram, without creating a new diagram, by greying out the elements that do not match the search criteria.

{{< img src="datadog_cloudcraft/search_highlight_2.mp4" alt="Video showing the search and highlight feature in Cloudcraft" video=true >}}

## Permissions

To access Cloudcraft in Datadog, you need the `cloudcraft_read` permission. This permission is included in the Datadog Read Only Role by default. If your organization uses custom roles, add this permission to the appropriate role. For more information on managing permissions, see the [RBAC documentation][14].

## Next steps

Learn how to navigate between [built-in overlays][4] to view your architecture from different perspectives. Each overlay is designed to support specific operational goals, such as:

- [Infrastructure][8]: High-level view of services and resources.
- [Observability][9]: Indicates which hosts have the Agent installed and what observability features are enabled.
- [Security][10]: IAM, firewall, and security group visibility.
- [Cloud Cost Management][11]: Track and optimize resource spend.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloudcraft
[2]: /integrations/amazon_web_services/#resource-collection
[3]: /security/cloud_security_management
[4]: /datadog_cloudcraft/overlays
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
[7]: https://app.datadoghq.com/cloud-maps
[8]: /datadog_cloudcraft/overlays#infrastructure
[9]: /datadog_cloudcraft/overlays#observability
[10]: /datadog_cloudcraft/overlays#security
[11]: /datadog_cloudcraft/overlays#cloud-cost-management
[12]: /security/sensitive_data_scanner
[13]: /account_management/rbac/permissions/#compliance
[14]: /account_management/rbac/permissions/#infrastructure
