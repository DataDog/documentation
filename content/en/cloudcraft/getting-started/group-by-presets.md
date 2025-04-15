---
title: Group By and Presets
---

Cloudcraft's **Group By** and **Presets** features empower users to create custom, insightful diagrams tailored to specific use cases such as infrastructure, network, or security. These tools streamline the visualization of cloud architecture, making it easier to analyze and manage resources.

Whether troubleshooting, performing security audits, or evaluating network performance, these features enhance workflow efficiency by enabling users to generate precise, focused diagrams with ease.

## Group By

With **Group By**, Cloudcraft divides your diagram into distinct sections based on different group types. This feature provides a clear, organized view of your resources, which is particularly useful for visualizing complex cloud environments.

### AWS grouping options

In AWS, you can group resources by:
- Region
- VPC
- Security Group
- Subnet
- Network ACL

### Azure grouping options

In Azure, you can group resources by:
- Resource Group
- Region
- VNet
- Subnet

## Presets

**Presets** offer a convenient way to apply predefined sets of group-bys and filters, allowing you to quickly view your resources from different perspectives. This feature simplifies the process of applying groupings and filters to your diagrams, allowing you to focus on specific aspects of your architecture.

**Cloudcraft provides three built-in presets:** Infrastructure, Network, and Security. These presets are designed to address different operational needs.

{{< img src="cloudcraft/getting-started/group-by-presets/diagram-presets.png" alt="Cloudcraft interface showing preset options with the infrastructure diagram preset selected." responsive="true" style="width:100%;">}}

To apply a preset to your diagram:

1. Switch to the **Live** tab within Cloudcraft.
2. Select the desired preset from the menu at the top of the diagram view.
3. The diagram automatically updates to reflect the chosen preset.

### Infrastructure diagram

{{< img src="cloudcraft/getting-started/group-by-presets/infrastructure-diagram.png" alt="Infrastructure diagram showing servers, databases, security components, and the relationship between them." responsive="true" style="width:100%;">}}

The infrastructure preset provides a broad overview, grouping resources by Region and VPC in AWS, and by Region and VNet in Azure. This preset is ideal for quickly generating architecture diagrams for troubleshooting or high-level review.

- In AWS, it excludes components like EBS, NAT Gateway, and Transit Gateway, among others, to give you an uncluttered diagram, showing you the most important parts of your architecture.
- In Azure, components such as Azure VNGW and Azure Disk are not shown.

### Security diagram

{{< img src="cloudcraft/getting-started/group-by-presets/security-diagram.png" alt="Security diagram showing servers, databases, security components, and the relationship between them." responsive="true" style="width:100%;">}}

The security preset focuses on potential security exposures, grouping resources by Region, VPC, and Security Group in AWS. This view is essential for identifying security risks and understanding rules governing inbound and outbound service communications, and is perfect for mapping attack surfaces during penetration testing or security audits.

- This preset does not currently support Azure configurations.
- In AWS, similar to infrastructure, it excludes EBS, NAT Gateway, and other components that might clutter the security view. In addition, a component may appear multiple times if they belong to multiple subnets.

### Network diagram

{{< img src="cloudcraft/getting-started/group-by-presets/network-diagram.png" alt="Network diagram showing servers, databases, security components, and the relationship between them." responsive="true" style="width:100%;">}}

The Network preset adds granularity by introducing Subnet grouping, making it especially useful for network teams seeking to identify latency sources and traffic patterns.

- In AWS, it excludes components such as EBS, S3, and SNS.
- In Azure, it excludes Azure Disk and the Network Security Group components.

## Custom Presets

For use cases that require a tailored view, Cloudcraft allows you to customize groupings and filters to create personalized presets.

1. Adjust the filter and group-by settings to suit your requirements.
2. Save your custom configuration as a new preset by clicking the **Save as preset** button.

Once saved, these custom presets can be reused by anyone with access to the blueprint.
