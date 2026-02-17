---
title: Security
description: "Use the Security overlay in Cloudcraft to identify security exposures, misconfigurations, and vulnerabilities in your architecture."
further_reading:
- link: "/datadog_cloudcraft/overlays/infrastructure/"
  tag: "Documentation"
  text: "Infrastructure overlay"
- link: "/datadog_cloudcraft/overlays/observability/"
  tag: "Documentation"
  text: "Observability overlay"
- link: "/datadog_cloudcraft/overlays/ccm/"
  tag: "Documentation"
  text: "Cloud Cost Management overlay"
- link: "/security/"
  tag: "Documentation"
  text: "Cloud Security"
---

## Overview

The Security overlay highlights potential security exposures in your architecture, grouping resources by Region, VPC, and Security Group. It displays security findings detected by Cloud Security, helping you:

- Identify security issues directly in infrastructure diagrams
- Analyze findings in context, so you can prioritize remediation:
  - Misconfigurations
  - Identity risks
  - Sensitive data (S3 buckets only)
- Assess your security posture before deploying applications

This view is ideal for mapping attack surfaces during penetration tests or security audits. To keep the diagram focused, components like EBS volumes and NAT Gateways are excluded. 

## Investigate misconfigurations and identity risks

By default, the security overlay shows Critical, High, and Medium severity misconfigurations or identity risks, which you can filter in the legend.

You can click on any resource that has findings to open a side panel with more details, allowing deeper investigation without leaving the diagram. Click **Investigate** to get more context about the finding and learn how to remediate it.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_security_overlay_misconfigurations_2.png" alt="Security overlay in Cloudcraft with the misconfigurations filter applied in the collapsible legend in the bottom of the screen, and highlighting the Investigate button" style="width:100%;" >}}

## Investigate sensitive data

You can view sensitive data matches for your S3 buckets. Click a resource with matches to learn more about the bucket's sensitive data matches. Then, hover over a filename and click its **Inspect in AWS** button.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_security_overlay_sensitive_data_2.png" alt="Security overlay in Cloudcraft with the sensitive data filter applied, highlighting the collapsible legend in the bottom left of the screen, and the Inspect in AWS button on the side panel." style="width:100%;" >}}

## Investigate vulnerabilities

View security vulnerability matches associated with your EC2 instances. Click a resource that has a matching vulnerability. This opens a side panel which provides detailed vulnerability data for a selected EC2 instance, including severity, affected packages, and exploit status. For deeper analysis, click **Investigate** to get more context about the vulnerability and learn how to remediate it.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_security_vuln_2.png" alt="Security overlay in Cloudcraft with the vulnerabilities filter applied, highlighting the collapsible legend in the bottom left of the screen, and the Investigate button on the side panel." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

