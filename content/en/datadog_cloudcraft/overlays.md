---
title: Overlays
description: "Use Cloudcraft overlays to view AWS infrastructure from different perspectives including observability, security, cost management, and infrastructure."
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/"
  tag: "Blog"
  text: "Plan new architectures and track your cloud footprint with Cloudcraft (Standalone)"
- link: "https://www.datadoghq.com/blog/cloudcraft-observability-overlay/"
  tag: "Blog"
  text: "Visually identify observability gaps with Cloudcraft in Datadog"
---

## Overview

Cloudcraft supports overlays that integrate data from multiple sources, enriching your diagrams with real-time insights. These views let you group and filter resources by key attributes, helping you focus on different parts of your architecture for troubleshooting, cost optimization, or security analysis. Each overlay is designed to address a specific operational goal, making it easy to adapt the diagram to your needs.

## Available overlays

Cloudcraft provides the following built-in overlays: 

- [Infrastructure](#infrastructure) (default) 
- [Observability](#observability)
- [Security](#security)
- [Cloud Cost Management (CCM)](#cloud-cost-management)

### Infrastructure

The infrastructure view provides a broad overview, grouping resources by Account, Region, and VPC. This view is ideal for generating architecture diagrams for troubleshooting or high-level review.

The infrastructure diagram excludes components like EBS, NAT Gateway, and Transit Gateway to reduce visual clutter and highlight the most important parts of your architecture.

{{< img src="datadog_cloudcraft/infra_overlay_4.png" alt="Infrastructure overlay in Cloudcraft." style="width:100%;" >}}

### Observability 

The Observability overlay shows where the Datadog Agent is installed and what features are enabled per host, such as Application Performance Monitoring (APM), Cloud Network Monitoring (CNM), Log Management, and more. This helps you to assess visibility gaps across your environment.

On the Observability overlay, you can take action on individual resources or groups of resources:

- Click a single host to open a side panel with direct links to Fleet Automation, where you can deploy configurations or upgrade the Agent.
- Click a resource group, such as a subnet or VPC, to open a side panel that allows you to apply bulk updates across all the hosts in that resource group.
- To select multiple (but not all) hosts, hold down the <kbd>Command</kbd> key on Mac or the <kbd>Control</kbd> key on Windows while clicking on each host.

{{< img src="datadog_cloudcraft/observability_overlay_with_fleet_2.mp4" alt="Observability overlay in Cloudcraft, showing the bulk update feature and navigating to Fleet Automation." video=true >}}

In the bottom left legend, the **View Datadog coverage by** dropdown allows you to inspect the installation status for specific features. Each row shows:

- Feature name (for example, APM, Logs, CNM)
- Numerical coverage: X / Y (for example, 16/35), where:
  - X is the number of resources with that feature enabled
  - Y is the total number of relevant resources in the current view or filter

Legend:

| Pin Color | Description                                               |
|-----------|-----------------------------------------------------------|
| Green     | Agent and feature are both enabled                        |
| Gray      | Feature is not enabled                                    |
| Yellow    | Agent is installed but requires an upgrade               |

The observability overlay tracks coverage for the following products:

| Feature           | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| Agent version     | Verifies if the Datadog Agent is installed and its version         |
| APM               | Application Performance Monitoring (traces collected)        |
| CNM               | Cloud Network Monitoring coverage                                 |
| Logs              | Log Management collection status                                              |
| CWS               | Cloud Workload Protection coverage                                   |
| CSPM              | Cloud Security Misconfigurations coverage                         |
| Process           | Process monitoring enabled                                         |
| CSM VM Hosts      | Coverage of Cloud Security Vulnerabilities on hosts          |
| CSM VM Containers | Coverage of Cloud Security Vulnerabilities on containers                |
| USM | Coverage of Universal Service Monitoring                |

### Security

The security overlay highlights potential security exposures in your architecture, grouping resources by Region, VPC, and Security Group. It displays security findings detected by Cloud Security, helping you:

- Identify security issues directly in infrastructure diagrams
- Analyze findings in context, so you can prioritize remediation:
  - Misconfigurations
  - Identity risks
  - Sensitive data (S3 buckets only)
- Assess your security posture before deploying applications

This view is ideal for mapping attack surfaces during penetration tests or security audits. To keep the diagram focused, components like EBS volumes and NAT Gateways are excluded. 

#### Investigate misconfigurations and identity risks

By default, the security overlay shows Critical, High, and Medium severity misconfigurations or identity risks, which you can filter in the legend.

You can click on any resource that has findings to open a side panel with more details, allowing deeper investigation without leaving the diagram. Click **Investigate** to get more context about the finding and learn how to remediate it.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_security_overlay_misconfigurations_2.png" alt="Security overlay in Cloudcraft with the misconfigurations filter applied in the collapsible legend in the bottom of the screen, and highlighting the Investigate button" style="width:100%;" >}}

#### Investigate sensitive data

You can view sensitive data matches for your S3 buckets. Click a resource with matches to learn more about the bucket's sensitive data matches. Then, hover over a filename and click its **Inspect in AWS** button.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_security_overlay_sensitive_data_2.png" alt="Security overlay in Cloudcraft with the sensitive data filter applied, highlighting the collapsible legend in the bottom left of the screen, and the Inspect in AWS button on the side panel." style="width:100%;" >}}

#### Investigate vulnerabilities

View security vulnerability matches associated with your EC2 instances. Click a resource that has a matching vulnerability. This opens a side panel which provides detailed vulnerability data for a selected EC2 instance, including severity, affected packages, and exploit status. For deeper analysis, click **Investigate** to get more context about the vulnerability and learn how to remediate it.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_security_vuln_2.png" alt="Security overlay in Cloudcraft with the vulnerabilities filter applied, highlighting the collapsible legend in the bottom left of the screen, and the Investigate button on the side panel." style="width:100%;" >}}

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

{{< img src="datadog_cloudcraft/overlays/cloudcraft_ccm_overlay_4.png" alt="Cloud Cost Management (CCM) overlay in Cloudcraft, highlighting the recommendations option in the collapsible legend at the bottom left hand side of the screen." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/fleet_automation
