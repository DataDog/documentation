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

Cloudcraft supports overlays that integrate data from multiple sources, enriching your diagrams with real-time insights. These views let you group and filter resources by key attributes, helping you focus on different parts of your architecture for troubleshooting, cost optimization, or security analysis. Each overlay is designed to address a specific operational goal, making it easy to adapt the diagram to your needs.

## Available overlays

Cloudcraft provides the following built-in overlays: 

- [Infrastructure](#infrastructure) (default) 
- [Agent](#agent)
- [Security](#security)
- [Cloud Cost Management (CCM)](#cloud-cost-management)

### Infrastructure

The infrastructure view provides a broad overview, grouping resources by Account, Region, and VPC. This view is ideal for generating architecture diagrams for troubleshooting or high-level review.

The infrastructure diagram excludes components like EBS, NAT Gateway, and Transit Gateway, among others, to give you an uncluttered diagram, showing you the most important parts of your architecture.

{{< img src="datadog_cloudcraft/cloudcraft_infra_diagram_with_ccm.png" alt="Infrastructure overlay in Cloudcraft" style="width:100%;" >}}

### Agent 

The Agent Overlay indicates whether the Agent is installed on your EC2 hosts using a collapsible legend at the bottom of the screen. A green dot signifies the Agent is installed, while a grey dot indicates it is not installed on that resource.

{{< img src="datadog_cloudcraft/agent_overlay_with_ccm.png" alt="Agent overlay in Cloudcraft, highlighting the collapsible legend at the bottom left hand side of the screen." width="100%" >}}

### Security

The security overlay highlights potential security exposures in your architecture, grouping resources by Region, VPC, and Security Group. It displays misconfigurations detected by Cloud Security, helping you:

- Identify security issues directly in infrastructure diagrams.
- Analyze misconfigurations in context to prioritize remediation.
- Assess security posture before deploying applications.

You can click on any any resource that contains security findings to open a side panel with more details, allowing deeper investigation without leaving the diagram.

This view is ideal for mapping attack surfaces during penetration tests or security audits. To keep the diagram focused, components like EBS volumes and NAT Gateways are excluded. 

By default, the security overlay shows Critical, High, and Medium misconfigurations, which you can filter at the bottom of the screen.

{{< img src="datadog_cloudcraft/cloudcraft_security_overlay_with_ccm.png" alt="Security overlay in Cloudcraft, highlighting the collapsible legend and the bottom left hand side of the screen, and the Investigate button on the side panel." style="width:100%;" >}}

### Cloud Cost Management 

The Cloud Cost overlay helps you identify and act on savings opportunities within your AWS architecture diagrams.
In this view:

- Recommendations are shown directly on resources with estimated monthly savings (for example, terminate unused RDS instances, migrate storage classes).
- Use the filter at the bottom of the screen to narrow recommendations by potential monthly savings range and recommendation type (**Terminate**, **Migrate**, **Downsize**, **Purchase**).

Clicking a resource opens a detailed side panel with:

- Current and projected monthly costs.
- A description of recommended changes.
- Quick actions to create a Jira issue or support case.
- Metrics and usage patterns explaining the recommendation.

This enables faster, in-context cost optimization without switching views.

{{< img src="datadog_cloudcraft/cloudcraft_ccm_overlay.png" alt="Cloud Cost Management(CCM) overlay in Cloudcraft, highlighting the collapsible savings legend at the bottom left hand side of the screen." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}