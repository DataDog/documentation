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

[Cloud SIEM Content Packs][1] provide out-of-the box content for key security integrations. Depending on the integration, a Content Pack can include the following:

- [Detection Rules][2] to provide comprehensive coverage of your environment
- An interactive dashboard with detailed insights into the state of logs and security signals for the Content Pack
- [Investigator][3], an interactive graphical interface for investigating suspicious activity by a user or resource
- [Workflow Automation][4], to automate actions and accelerate investigation and remediation of issues
- Configuration guides

{{< whatsnext desc="Content Packs are grouped into the following categories:" >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-audit-content-packs" >}}<u>Cloud Audit</u>: AWS CloudTrail, Azure Security, GCP Audit Logs, Kubernetes Audit Logs{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#authentication-content-packs" >}}Authentication{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#collaboration-content-packs" >}}Collaboration{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#network-content-packs" >}}Network{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-developer-tools-content-packs" >}}Cloud developer tools{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#endpoint-content-packs" >}}Endpoint{{< /nextlink >}}
{{< /whatsnext >}}

## Cloud Audit Content Packs

### AWS CloudTrail

Monitor the security and compliance levels of your AWS operations.

The [AWS CloudTrail Content Pack][5] includes:
- Detection Rules
- An interactive dashboard
- AWS Investigator
- Workflow Automation
- Configuration guides

### Azure Security

Protect your Azure environment by tracking attacker activity.

The [Azure Security Content Pack][6] includes:
- Detection Rules
- An interactive dashboard
- Azure Investigator
- Configuration guides

### GCP Audit Logs

Protect your GCP environment by monitoring audit logs.

The [GCP Audit Logs Content Pack][7] includes:
- Detection Rules
- An interactive dashboard
- GCP Investigator
- Configuration guides

### Kubernetes Audit Logs
Gain coverage by monitoring audit logs in your Kubernetes control plane.

The [Kubernetes Audit Logs Content Pack][8] includes:
- Detection Rules
- An interactive dashboard

## Authentication Content Packs

### 1Password

Monitor account activity with 1Password Events Reporting.

The [1Password Content Pack][9] includes:
- Detection Rules
- An interactive dashboard

### Auth0

Monitor and generate signals around Auth0 user activity.

The [Auth0 Content Pack][10] includes:
- Detection Rules
- An interactive dashboard

### JumpCloud

Tracks user activity by monitoring JumpCloud audit logs.

The [JumpCloud Content Pack][11] includes:
- Detection Rules

### Okta

Track user activity by monitoring Okta audit logs.

The [Okta Content Pack][12] includes:
- Detection Rules
- An interactive dashboard
- Workflow Automation

## Collaboration Content Packs

### Google Workspace

Optimize your security monitoring within Google Workspace.

The [Google Workspace Content Pack][13] includes:
- Detection Rules
- An interactive dashboard

### Microsoft 365

Monitor key security events from Microsoft 365 logs.

The [Microsoft 365 Content Pack][14] includes:
- Detection Rules
- An interactive dashboard

## Network Content Packs

### Cloudflare

Enhance security for your web applications.

The [Cloudflare Content Pack][15] includes:
- Detection Rules
- An interactive dashboard
- Workflow Automation

## Cloud developer tools Content Packs

### GitHub

Track user activity and code change history by monitoring GitHub audit logs.

The [GitHub Content Pack][16] includes:
- Detection Rules
- An interactive dashboard

## Endpoint Content Packs

### CrowdStrike

Improve the security posture of your endpoints with CrowdStrike.

The [CrowdStrike Content Pack][17] includes:
- Detection Rules
- An interactive dashboard

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: /security/detection_rules/
[3]: /security/cloud_siem/investigator
[4]: /service_management/workflows/
[5]: https://app.datadoghq.com/security/content-packs/aws-cloudtrail
[6]: https://app.datadoghq.com/security/content-packs/azure
[7]: https://app.datadoghq.com/security/content-packs/gcp-audit-logs
[8]: https://app.datadoghq.com/security/content-packs/kubernetes-audit-logs
[9]: https://app.datadoghq.com/security/content-packs/1password
[10]: https://app.datadoghq.com/security/content-packs/auth0
[11]: https://app.datadoghq.com/security/content-packs/jumpcloud
[12]: https://app.datadoghq.com/security/content-packs/okta
[13]: https://app.datadoghq.com/security/content-packs/google-workspace
[14]: https://app.datadoghq.com/security/content-packs/microsoft-365
[15]: https://app.datadoghq.com/security/content-packs/cloudflare
[16]: https://app.datadoghq.com/security/content-packs/github
[17]: https://app.datadoghq.com/security/content-packs/crowdstrike
