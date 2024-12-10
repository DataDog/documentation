---
title: Group By and Presets
---

Cloudcraft's **Group By** and **Presets** features offer powerful tools for creating focused, customized diagrams of your cloud infrastructure. These tools provide a structured approach to visualize cloud architecture, catering to specific use cases like infrastructure, network, and security requirements.

By utilizing grouping and preset configurations, users can quickly generate focused diagrams, improving workflow efficiency and resource management. Whether you're troubleshooting, conducting security audits, or analyzing network performance, these features help you create focused, insightful diagrams quickly and easily.

## Group By

With **Group By**, Cloudcraft divides your diagram into distinct sections based on different group types. This feature provides a clear, organized view of your resources, even when they belong to multiple groups, which is particularly useful for visualizing complex cloud environments where resources may overlap across different categories.

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
3. The diagram will automatically update to reflect the chosen preset.

### Infrastructure diagram

{{< img src="cloudcraft/getting-started/group-by-presets/infrastructure-diagram.png" alt="Infrastructure diagram showing servers, databases, security components, and the relationship between them." responsive="true" style="width:100%;">}}

The infrastructure preset provides a broad overview, grouping resources by Region and VPC in AWS, and by Region and VNet in Azure. This preset is ideal for quickly generating architecture diagrams for troubleshooting or high-level review.

- In AWS, it deactivates components like EBS, NAT Gateway, and Transit Gateway, among others.
- In Azure, components such as Azure VNGW and Azure Disk are disabled.

### Security diagram

{{< img src="cloudcraft/getting-started/group-by-presets/security-diagram.png" alt="Security diagram showing servers, databases, security components, and the relationship between them." responsive="true" style="width:100%;">}}

The security preset focuses on potential security exposures, grouping resources by Region, VPC, and Security Group in AWS. This view is essential for identifying security risks and understanding rules governing inbound and outbound service communications, and is perfect for mapping attack surfaces during penetration testing or security audits.

- This preset does not currently support Azure configurations.
- In AWS, similar to infrastructure, it disables EBS, NAT Gateway, and other components that might clutter the security view.

### Network diagram

{{< img src="cloudcraft/getting-started/group-by-presets/network-diagram.png" alt="Network diagram showing servers, databases, security components, and the relationship between them." responsive="true" style="width:100%;">}}

The Network preset adds granularity by introducing Subnet grouping, making it especially useful for network teams seeking to identify latency sources and traffic patterns.

- In AWS, it disables components such as EBS, S3, and SNS.
- In Azure, it deactivates Azure Disk and the Network Security Group components.

## Custom Presets

For use cases that require a tailored view, Cloudcraft allows you to customize groupings and filters to create personalized presets.

1. Adjust the filter and group-by settings to suit your requirements.
2. Save your custom configuration as a new preset by clicking the **Save as preset** button.

Once saved, these custom presets can be reused across multiple diagrams, ensuring consistency in style and presentation organization-wide.
