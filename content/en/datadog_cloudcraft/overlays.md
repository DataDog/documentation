---
title: Overlays
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/"
  tag: "Blog"
  text: "Plan new architectures and track your cloud footprint with Cloudcraft (Standalone)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloudcraft in Datadog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Cloudcraft supports overlays that integrate data from multiple sources, making it easier to apply groupings and filters to your diagrams so you can focus on specific parts of your architecture.

Cloudcraft provides the following built-in overlays: 

- [Infrastructure](#infrastructure) (default) 
- [Agent](#agent)
- [Security](#security)
- [Cloud Cost Management (CCM)](#cloud-cost-management)

{{< img src="datadog_cloudcraft/presets_2.png" alt="Screenshot of the available overlays in Cloudcraft" style="width:80%;" >}}

### Infrastructure

The infrastructure view provides a broad overview, grouping resources by Account, Region, and VPC. This view is ideal for generating architecture diagrams for troubleshooting or high-level review.

The infrastructure diagram excludes components like EBS, NAT Gateway, and Transit Gateway, among others, to give you an uncluttered diagram, showing you the most important parts of your architecture.

{{< img src="datadog_cloudcraft/cloudcraft_infra_diagram_2.png" alt="Screenshot of the Infrastructure diagram in Cloudcraft" style="width:100%;" >}}

### Agent 

The Agent Overlay indicates whether the Agent is installed on your EC2 hosts using a collapsible legend. A green dot signifies the Agent is installed, while a grey dot indicates it is not installed on that resource.

{{< img src="datadog_cloudcraft/agent_overlay_2.png" alt="Screenshot of the Agent overlay in the Cloudcraft" width="100%" >}}

### Security

The security view focuses on potential security exposures, grouping resources by Region, VPC, and Security Group. This view is essential for identifying security risks and understanding rules governing inbound and outbound service communications, and is perfect for mapping attack surfaces during penetration testing or security audits. 

This diagram excludes EBS, NAT Gateway, and other components that might clutter the security view. 

**Note**: By default, when you select the Security diagram view, the [Overlay](#overlays) feature defaults to **Security Findings**.

{{< img src="datadog_cloudcraft/cloudcraft_security_diagram.png" alt="Screenshot of the Security diagram in Cloudcraft" style="width:100%;" >}}

The security findings overlay in Cloudcraft provides an overlay from Cloud Security misconfigurations, allowing you to quickly identify Cloud Security findings. This allows you to:

- Identify security issues in infrastructure diagrams.  
- View misconfigurations in context to analyze their impact and prioritize remediation.
- Assess security posture before deploying applications.

By default, the security overlay shows Critical, High, and Medium misconfigurations, but can be filtered at the bottom of the screen:

{{< img src="datadog_cloudcraft/csm_misconfigurations.png" alt="Screenshot of the Cloud Security Misconfigurations hover in the Cloudcraft overlay section" width="50%" >}}

### Cloud Cost Management 

The Cloud Cost Management (CCM) diagram

{{< img src="datadog_cloudcraft/cloudcraft_ccm_diagram.png" alt="Screenshot of the Cloud Cost Management diagram in Cloudcraft" style="width:100%;" >}}




## Further reading

{{< partial name="whats-next/whats-next.html" >}}