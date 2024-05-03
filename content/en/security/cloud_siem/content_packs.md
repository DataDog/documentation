---
title: Content Packs
kind: documentation
disable_toc: false
further_reading:
- link: "/security/cloud_siem/log_detection_rules"
  tag: "Documentation"
  text: "Create log detection rules"
- link: "security/cloud_siem/investigator"
  tag: "Documentation"
  text: "Learn more about the Investigator"
- link: "/security/cloud_siem/investigate_security_signals"
  tag: "Documentation"
  text: "Investigate security signals"
---

## Overview

[Cloud SIEM Content Packs][1] provide out-of-the box content for key security integrations. The content can include the following:

- Detection Rules
- Dashboard
- Investigator
- Workflow Automation
- Configuration guide

{{< whatsnext desc="Content Packs are grouped into the following categories:" >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-audit-content-packs" >}}Cloud Audit{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#authentication-content-packs" >}}Authentication{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#collaboration-content-packs" >}}Collaboration{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#network-content-packs" >}}Network{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-developer-tools-content-packs" >}}Cloud developer tools{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#endpoint-content-packs" >}}Endpoint{{< /nextlink >}}
{{< /whatsnext >}}

## Cloud Audit Content Packs

### AWS CloudTrail

Monitor security and compliance levels of your AWS operations.

The [AWS CloudTrail Content Pack][2] includes:
- Detection Rules
- Dashboard
- AWS Investigator
- Workflow Automation
- Configuration guide

### GCP Audit Logs

Protect your GCP environment by monitoring audit logs.

The GCP Audit Logs Content Pack includes:
- Detection Rules
- Dashboard
- GCP Investigator
- Configuration guide

### Azure Security

Protect your Azure environment ny tracking attacker activity.

The Azure Security Content Pack includes:
- Detection Rules
- Dashboard
- Azure Investigator
- Configuration guide

### Kubernetes Audit Logs
Gain coverage by monitoring audit logs in your Kubernetes control plane.

The Kubernetes Audit Logs Content Pack includes:
- Detection Rules
- Dashboard

<!-- ### Cloud Audit content summary

| Name  | Detection rules | Dashboard | Investigator| Workflow Automation| Configuration guide|
| ----| :-----------: |:-----------: |:-----------: |:-----------: |:-----------: |
| [AWS CloudTrail][1] | {{< X >}} | {{< X >}} | AWS Investigator |{{< X >}} |{{< X >}} |{{< X >}} |
| GCP Audit Logs | {{< X >}} | {{< X >}} | GCP Investigator | |{{< X >}} |{{< X >}} |
| Azure Security | {{< X >}} | {{< X >}} | Azure Investigator| |{{< X >}} |{{< X >}} |
| Kubernetes Audit Logs | {{< X >}} | {{< X >}} | | | | | -->

## Authentication Content Packs

### Okta

Track user activity by monitoring Okta audit logs.

The Okta Content Pack includes:
- Detection Rules
- Dashboard
- Workflow Automation

### 1Password

Monitor account activity with 1Password Events Reporting.

The 1Password Content Pack includes:
- Detection Rules
- Dashboard

### Auth0

Monitor and generate signals around Auth0 user activity.

The Auth0 Content Pack includes:
- Detection Rules
- Dashboard

### Jumpcloud

Tracks user activity by monitoring Jumpcloud audit logs.

The Jumpcloud Content Pack includes:
- Detection Rules

## Collaboration Content Packs

### Google Workspace

Optimize your security monitoring within Google Workspace.

The Google Workspace Content Pack includes:
- Detection Rules
- Dashboard

### Microsoft 365

Monitor key security events from Microsoft 365 logs.

The Microsoft 365 Content Pack includes:
- Detection Rules
- Dashboard

## Network Content Packs

### Cloudflare

Enhance security for your web applications.

The Cloudflare Content Pack includes:
- Detection Rules
- Dashboard
- Workflow Automation

## Cloud developer tools Content Packs

### Github

Track user activity and code change history by monitoring Github audit logs.

The Github Content Pack includes:
- Detection Rules
- Dashboard

## Endpoint Content Packs

### Crowdstrike

Improve the security posture of your endpoints with Crowdstrike.

The Crowdstrike Content Pack includes:
- Detection Rules
- Dashboard

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: https://app.datadoghq.com/security/content-packs/aws-cloudtrail