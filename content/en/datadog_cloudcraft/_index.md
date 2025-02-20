---
title: Cloudcraft in Datadog
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloudcraft in Datadog is not supported on this site.</div>
{{< /site-region >}}

## Overview

Cloudcraft offers a powerful, live read-only visualization tool for cloud architecture, enabling you to explore, analyze, and manage your infrastructure with ease. Not to be confused with the [Standalone Cloudcraft documentation][1], this guide outlines the functionality, setup, and use cases of Cloudcraft *in Datadog*, detailing its benefits for various user personas, and highlighting key features and capabilities.

Cloudcraft's core functionality is its ability to generate detailed architecture diagrams. These diagrams visually represent AWS cloud resources, allowing you to explore and analyze your environments. Cloudcraft's diagrams are optimized for clarity and performance, providing an intuitive interface for navigating large-scale deployments. This helps teams to:

- Trace incidents back to their root causes through infrastructure dependencies.
- Determine if infrastructure is the cause of an incident, such as cross-region traffic causing latency or increased costs. 
- Analyze and address the most relevant security misconfigurations.
- Onboard new team members.
- Accelerate incident MTTR and proactive governance tasks by simplifying infrastructure navigation.

{{< img src="datadog_cloudcraft/cloudcraft_datadog.mp4" alt="Cloudcraft in Datadog video" video=true >}}

## Getting started 

To get started with Cloudcraft, users must add one or more AWS account integrations with sufficient permissions, and enable resource collection for them.

<div class="alert alert-info">Cloudcraft in Datadog is currently only available for AWS accounts.</a></div>

### Prerequisites

- [Resource collection][2] must be enabled for your AWS accounts.
- For the best experience, Datadog strongly recommends to use the AWS-managed [`SecurityAudit`][5] policy, or the more permissive [`ReadOnlyAccess`][6] policy. If you have advanced security requirements, it is possible to create a [custom IAM role with more limited permissions][4], however, this may not be compatible with other Datadog products.
- To view security misconfigurations, [CSM][3] must be enabled.

**Note**: Cloudcraft adapts to restrictive permissions by excluding inaccessible resources. For example, if you opt to not grant permission to list S3 buckets, the diagram will simply exclude those buckets. If permissions block certain resources, an alert is displayed in the user-interface(UI).

## Saved views

Saved views offer a convenient way to apply predefined sets of group-bys and filters, allowing you to view your resources from different perspectives. This feature simplifies the process of applying groupings and filters to your diagrams, allowing you to focus on specific aspects of your architecture.

Cloudcraft provides three built-in saved views: [Infrastructure](#infrastructure-diagram), [Network](#network-diagram), and [Security](#security-diagram). These views are designed to address different operational needs.

{{< img src="datadog_cloudcraft/saved_views_2.png" alt="Screenshot of the three available saved views in Cloudcraft" style="width:80%;" >}}

### Infrastructure diagram

The infrastructure view provides a broad overview, grouping resources by Account, Region and VPC. This view is ideal for generating architecture diagrams for troubleshooting or high-level review.

The infrastructure diagram excludes components like EBS, NAT Gateway, and Transit Gateway, among others, to give you an uncluttered diagram, showing you the most important parts of your architecture.

{{< img src="datadog_cloudcraft/cloudcraft_infra_diagram.png" alt="Screenshot of the Infrastructure diagram in Cloudcraft" style="width:100%;" >}}

### Network diagram

The network view adds granularity by introducing Subnet grouping, making it especially useful for network teams seeking to identify latency sources and traffic patterns. In addition, a component may appear multiple times if they belong to multiple subnets.

This diagram excludes components such as EBS, S3, and SNS.

{{< img src="datadog_cloudcraft/cloudcraft_network_diagram.png" alt="Screenshot of the Network diagram in Cloudcraft" style="width:100%;" >}}

### Security diagram

The security view focuses on potential security exposures, grouping resources by Region, VPC, and Security Group. This view is essential for identifying security risks and understanding rules governing inbound and outbound service communications, and is perfect for mapping attack surfaces during penetration testing or security audits. Additionally, you can click into a specific security group to see the inbound and outbound rules for that group.

This diagram excludes EBS, NAT Gateway, and other components that might clutter the security view. 

**Note**: By default, when you select the Security diagram view, the [Overlay]() feature defaults to **Security Findings**.

{{< img src="datadog_cloudcraft/cloudcraft_security_diagram.png" alt="Screenshot of the Security diagram in Cloudcraft" style="width:100%;" >}}

### Apply a saved view

To apply a saved view to your diagram:

- Navigate to [Infrastructure > Cloudcraft][7]. Select one or more accounts, regions, and resources.
- Select the desired saved view from the menu at the top of the diagram view. The diagram automatically updates to reflect the chosen view.

**Note**: The account name in the **Account** dropdown originates from your AWS account tags in the AWS integration tile.

{{< img src="datadog_cloudcraft/aws_integration.png" alt="Screenshot of the AWS integration, highlighting the account name tag" style="width:100%;" >}}

## Explore resources

In any of the Cloudcraft saved views, you utilize the zoom and hover features to pinpoint the most critical resources. As you zoom in, additional resource names become visible. Hovering over a resource reveals a hover panel with basic information. Clicking on a resource opens a side panel that displays its Datadog observability, cost information, and security data, with cross-links to other Datadog products where relevant.

{{< img src="datadog_cloudcraft/zoom_feature_hover.mp4" alt="Video showing the zoom and hover feature in Cloudcraft and clicking on a resource to open the side panel" video=true >}}

## Group by

With Group By, Cloudcraft divides your diagram into distinct sections based on different group types. This feature offers a clear and organized perspective of your resources, making it especially helpful for visualizing complex cloud environments.


[1]: /cloudcraft
[2]: /security/cloud_security_management/setup/cloud_integrations?tab=aws
[3]: /security/cloud_security_management
[4]: https://docs.datadoghq.com/cloudcraft/advanced/minimal-iam-policy/
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
[7]: https://app.datadoghq.com/cloud-maps
