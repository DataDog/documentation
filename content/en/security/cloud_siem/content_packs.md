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

[Cloud SIEM Content Packs][1] provide out-of-the box content for key security integrations. The specific content depends on the integration and can include the following:

- Detection Rules to provide comprehensive coverage of your environment
- An interactive dashboard with detailed insights into the state of logs and security signals for the Content Pack
- Investigator, an interactive graphical interface for investigating suspicious activity by a user or resource
- Workflow Automations to automate actions and accelerate investigation and remediation of issues
- Configuration guides

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
- An interactive dashboard
- AWS Investigator
- Workflow Automations
- Configuration guides

### Azure Security

Protect your Azure environment by tracking attacker activity.

The [Azure Security Content Pack][4] includes:
- Detection Rules
- An interactive dashboard
- Azure Investigator
- Configuration guides

### GCP Audit Logs

Protect your GCP environment by monitoring audit logs.

The [GCP Audit Logs Content Pack][3] includes:
- Detection Rules
- An interactive dashboard
- GCP Investigator
- Configuration guides

### Kubernetes Audit Logs
Gain coverage by monitoring audit logs in your Kubernetes control plane.

The [Kubernetes Audit Logs Content Pack][5] includes:
- Detection Rules
- An interactive dashboard

## Authentication Content Packs

### 1Password

Monitor account activity with 1Password Events Reporting.

The [1Password Content Pack][7] includes:
- Detection Rules
- An interactive dashboard

### Auth0

Monitor and generate signals around Auth0 user activity.

The[ Auth0 Content Pack][8] includes:
- Detection Rules
- An interactive dashboard

### Jumpcloud

Tracks user activity by monitoring Jumpcloud audit logs.

The [Jumpcloud Content Pack][9] includes:
- Detection Rules

### Okta

Track user activity by monitoring Okta audit logs.

The [Okta Content Pack][6] includes:
- Detection Rules
- An interactive dashboard
- Workflow Automation

## Collaboration Content Packs

### Google Workspace

Optimize your security monitoring within Google Workspace.

The [Google Workspace Content Pack][10] includes:
- Detection Rules
- An interactive dashboard

### Microsoft 365

Monitor key security events from Microsoft 365 logs.

The [Microsoft 365 Content Pack][11] includes:
- Detection Rules
- An interactive dashboard

## Network Content Packs

### Cloudflare

Enhance security for your web applications.

The [Cloudflare Content Pack][12] includes:
- Detection Rules
- An interactive dashboard
- Workflow Automations

## Cloud developer tools Content Packs

### Github

Track user activity and code change history by monitoring Github audit logs.

The [Github Content Pack][13] includes:
- Detection Rules
- An interactive dashboard

## Endpoint Content Packs

### Crowdstrike

Improve the security posture of your endpoints with Crowdstrike.

The [Crowdstrike Content Pack][14] includes:
- Detection Rules
- An interactive dashboard

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: https://app.datadoghq.com/security/content-packs/aws-cloudtrail
[3]: https://app.datadoghq.com/security/content-packs/gcp-audit-logs
[4]: https://app.datadoghq.com/security/content-packs/azure
[5]: https://app.datadoghq.com/security/content-packs/kubernetes-audit-logs
[6]: https://app.datadoghq.com/security/content-packs/okta
[7]: https://app.datadoghq.com/security/content-packs/1password
[8]: https://app.datadoghq.com/security/content-packs/auth0
[9]: https://app.datadoghq.com/security/content-packs/jumpcloud
[10]: https://app.datadoghq.com/security/content-packs/google-workspace
[11]: https://app.datadoghq.com/security/content-packs/microsoft-365
[12]: https://app.datadoghq.com/security/content-packs/cloudflare
[13]: https://app.datadoghq.com/security/content-packs/github
[14]: https://app.datadoghq.com/security/content-packs/crowdstrike