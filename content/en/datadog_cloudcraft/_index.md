---
title: Cloudcraft in Datadog
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/"
  tag: "Blog"
  text: "Plan new architectures and track your cloud footprint with Cloudcraft (Standalone)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloudcraft in Datadog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Cloudcraft offers a powerful, live read-only visualization tool for cloud architecture, enabling you to explore, analyze, and manage your infrastructure with ease. Not to be confused with the [Standalone Cloudcraft documentation][1], this guide outlines the functionality, setup, and use cases of Cloudcraft *in Datadog*, detailing its benefits for various user personas, and highlighting key features and capabilities.

<div class="alert alert-info">This documentation applies to the Cloudcraft <em>in Datadog</em> product. For information on the standalone Cloudcraft product, please refer to the <a href="/cloudcraft">Cloudcraft (Standalone)</a> documentation.</div>

Cloudcraft's core functionality is its ability to generate detailed architecture diagrams. These diagrams visually represent AWS cloud resources, allowing you to explore and analyze your environments. Cloudcraft's diagrams are optimized for clarity and performance, providing an intuitive interface for navigating large-scale deployments. This helps teams to:

- Trace incidents back to their root causes through infrastructure dependencies.
- Determine if infrastructure is the cause of an incident, such as cross-region traffic causing latency or increased costs. 
- Analyze and address the most relevant security misconfigurations.
- Onboard new team members.
- Accelerate incident MTTR and proactive governance tasks by simplifying infrastructure navigation.

{{< img src="datadog_cloudcraft/cloudcraft_datadog.mp4" alt="Cloudcraft in Datadog video" video=true >}}

<div class="alert alert-info">Cloudcraft in Datadog is currently only available for AWS accounts.</a></div>

### Prerequisites

- [Resource collection][2] must be enabled for your AWS accounts.
- For the best experience, Datadog strongly recommends using the AWS-managed [`SecurityAudit`][5] policy, or the more permissive [`ReadOnlyAccess`][6] policy.
- To view security misconfigurations on the [Security findings overlay](#security-findings), [Cloud Security][3] must be enabled.

**Note**: Cloudcraft adapts to restrictive permissions by excluding inaccessible resources. For example, if you opt to not grant permission to list S3 buckets, the diagram will simply exclude those buckets. If permissions block certain resources, an alert is displayed in the UI.

## Getting started

To get started using [Cloudcraft][7], select one or more accounts, regions, and resources. The diagram automatically displays the Infrastructure diagram.

{{< img src="datadog_cloudcraft/getting_started.mp4" alt="Video showing getting started in Cloudcraft by selecting the Account, Region, and Resource" video=true;" >}}

**Note**: The account name in the **Account** dropdown originates from your AWS account tags in the AWS integration tile.

## Group By

With Group By, Cloudcraft divides your diagram into distinct sections based on different group types. This feature offers a clear and organized perspective of your resources, making it especially helpful for visualizing complex cloud environments.

Enable the **Show All Controls** toggle to display the available **Group By** options. You can also remove specific groupings by unchecking options like VPC and Region. To view the current nesting structure and add the Network ACL (Network Access Control List) layer, click the **More** dropdown.

{{< img src="datadog_cloudcraft/cloudcraft_group_by_2.mp4" alt="Video showing the Group by feature in Cloudcraft" video=true >}}

## Presets

Presets offer a convenient way to apply predefined sets of group-bys and filters, allowing you to view your resources from different perspectives. This feature simplifies the process of applying groupings and filters to your diagrams, allowing you to focus on specific aspects of your architecture.

Cloudcraft provides three built-in presets: [Infrastructure](#infrastructure-diagram), [Network](#network-diagram), and [Security](#security-diagram). These views are designed to address different operational needs.

{{< img src="datadog_cloudcraft/presets.png" alt="Screenshot of the three available presets in Cloudcraft" style="width:80%;" >}}

### Infrastructure diagram

The infrastructure view provides a broad overview, grouping resources by Account, Region, and VPC. This view is ideal for generating architecture diagrams for troubleshooting or high-level review.

The infrastructure diagram excludes components like EBS, NAT Gateway, and Transit Gateway, among others, to give you an uncluttered diagram, showing you the most important parts of your architecture.

{{< img src="datadog_cloudcraft/cloudcraft_infra_diagram_2.png" alt="Screenshot of the Infrastructure diagram in Cloudcraft" style="width:100%;" >}}

### Network diagram

The network view adds granularity by introducing Subnet grouping, making it especially useful for network teams seeking to identify latency sources and traffic patterns. In addition, a component may appear multiple times if they belong to multiple subnets.

This diagram excludes components such as EBS, S3, and SNS.

{{< img src="datadog_cloudcraft/cloudcraft_network_diagram.png" alt="Screenshot of the Network diagram in Cloudcraft" style="width:100%;" >}}

### Security diagram

The security view focuses on potential security exposures, grouping resources by Region, VPC, and Security Group. This view is essential for identifying security risks and understanding rules governing inbound and outbound service communications, and is perfect for mapping attack surfaces during penetration testing or security audits. 

This diagram excludes EBS, NAT Gateway, and other components that might clutter the security view. 

**Note**: By default, when you select the Security diagram view, the [Overlay](#overlays) feature defaults to **Security Findings**.

{{< img src="datadog_cloudcraft/cloudcraft_security_diagram.png" alt="Screenshot of the Security diagram in Cloudcraft" style="width:100%;" >}}

### Saved views 

Saved views allow you to save specific filters on your diagram that are most important to you, enabling efficient troubleshooting with scoped queries on your accounts, regions, environments, and resources.

To apply a saved view to your diagram:

- Navigate to [Infrastructure > Cloudcraft][7]. Select one or more accounts, regions, and resources. Apply any desired filters to your saved view, then click **+Save as new view**.
- Select the desired saved view from the menu at the top of the diagram view. The diagram automatically updates to reflect the chosen view.

{{< img src="datadog_cloudcraft/saved_views.png" alt="Screenshot of the saved views" style="width:50%;" >}}

## Explore resources

In any of the Cloudcraft presets, use the zoom and hover features to pinpoint the most critical resources. As you zoom in, additional resource names become visible. Hovering over a resource reveals a hover panel with basic information. Clicking on a resource opens a side panel that displays its Datadog observability, cost information, and security data, with cross-links to other Datadog products where relevant.

{{< img src="datadog_cloudcraft/zoom_feature_hover.mp4" alt="Video showing the zoom and hover feature in Cloudcraft and clicking on a resource to open the side panel" video=true >}}

## Filtering and search

Diagrams can be filtered by tags, such as team, application, or service, allowing you to concentrate on relevant resources while maintaining context through connected resources. Additionally, Cloudcraft provides a powerful search and highlight feature, enabling ease of location of specific resources or groups of resources.

Click the **\+Filter** menu to quickly filter your resources by commonly used tags such as service, team, region, and more. Additionally, click the **More Filters** option to filter by AWS tags, custom tags, and terraform tags. The filter option reloads the diagram to display only the infrastructure that matches the filter criteria.

{{< img src="datadog_cloudcraft/cloudcraft_filter.mp4" alt="Video showing the Filter feature in Cloudcraft" video=true >}}

### Search and highlight

Use the search bar to locate resources on the diagram by name, ID, or tag. This feature is highly effective for finding specific resources within your cloud architecture. It highlights the search criteria in the diagram, without creating a new diagram, by greying out the elements that do not match the search criteria.

{{< img src="datadog_cloudcraft/search_highlight.mp4" alt="Video showing the search and highlight feature in Cloudcraft" video=true >}}

## Overlays

Cloudcraft supports overlays that integrate various data sources and display them on top of the infrastructure diagram.

{{< img src="datadog_cloudcraft/overlays.png" alt="Screenshot of the overlay section in Cloudcraft" width="50%" >}}

### Security findings

The security findings overlay in Cloudcraft provides an overlay from Cloud Security misconfigurations, allowing you to quickly identify Cloud Security findings. This allows you to:

- Identify security issues in infrastructure diagrams.  
- View misconfigurations in context to analyze their impact and prioritize remediation.
- Assess security posture before deploying applications.

By default, the security overlay shows Critical, High, and Medium misconfigurations, but can be filtered at the bottom of the screen:

{{< img src="datadog_cloudcraft/csm_misconfigurations.png" alt="Screenshot of the Cloud Security Misconfigurations hover in the Cloudcraft overlay section" width="50%" >}}

### Agent Overlay

The Agent Overlay indicates whether the Agent is installed on your EC2 hosts using a collapsible legend. A green dot signifies the Agent is installed, while a grey dot indicates it is not installed on that resource.

{{< img src="datadog_cloudcraft/agent_overlay_2.png" alt="Screenshot of the Agent overlay in the Cloudcraft" width="100%" >}}

[1]: /cloudcraft
[2]: /integrations/amazon_web_services/#resource-collection
[3]: /security/cloud_security_management
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
[7]: https://app.datadoghq.com/cloud-maps


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
