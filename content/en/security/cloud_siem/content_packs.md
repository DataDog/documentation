---
title: Content Packs
disable_toc: false
further_reading:
- link: "/security/cloud_siem/detection_rules"
  tag: "Documentation"
  text: "Create log detection rules"
- link: "security/cloud_siem/investigator"
  tag: "Documentation"
  text: "Learn more about the Investigator"
- link: "/security/cloud_siem/investigate_security_signals"
  tag: "Documentation"
  text: "Investigate security signals"
- link: "https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/"
  tag: "Blog"
  text: "What's new in Cloud SIEM Content Packs: September 2024"
- link: "https://www.datadoghq.com/blog/microsoft-365-detections/"
  tag: "Blog"
  text: "How attackers take advantage of Microsoft 365 services"
- link: "https://www.datadoghq.com/blog/google-workspace-detections/"
  tag: "Blog"
  text: "Detect malicious activity in Google Workspace apps with Datadog Cloud SIEM"
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
    {{< nextlink href="/security/cloud_siem/content_packs/#cloud-security-content-packs" >}}<u>Cloud Security</u>: Google Security Command Center, Wiz{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#authentication-content-packs" >}}<u>Authentication</u>: 1Password, Auth0, Cisco DUO, JumpCloud, Okta{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#collaboration-content-packs" >}}<u>Collaboration</u>: Google Workspace, Microsoft 365, Slack Audit Logs{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#network-content-packs" >}}<u>Network</u>: Check Point Quantum Firewall, Cisco Meraki, Cisco Secure Firewall, Cisco Umbrella DNS, Cloudflare, Palo Alto Networks Firewall, Palo Alto Panorama, Zeek{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#web-security-content-packs" >}}<u>Web Security</u>: NGINX{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-developer-tools-content-packs" >}}<u>Cloud developer tools</u>: GitHub{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#endpoint-content-packs" >}}<u>Endpoint</u>: CrowdStrike{{< /nextlink >}}
{{< /whatsnext >}}

## Cloud Audit Content Packs

### AWS CloudTrail

Monitor the security and compliance levels of your AWS operations.

The [AWS CloudTrail Content Pack][5] includes:
- [Detection Rules][6]
- An interactive dashboard
- AWS Investigator
- Workflow Automation
- [Configuration guide][43]

### Azure Security

Protect your Azure environment by tracking attacker activity.

The [Azure Security Content Pack][7] includes:
- [Detection Rules][8]
- An interactive dashboard
- Azure Investigator
- [Configuration guide][44]

### GCP Audit Logs

Protect your GCP environment by monitoring audit logs.

The [GCP Audit Logs Content Pack][9] includes:
- [Detection Rules][10]
- An interactive dashboard
- GCP Investigator
- [Configuration guide][45]

### Kubernetes Audit Logs
Gain coverage by monitoring audit logs in your Kubernetes control plane.

The [Kubernetes Audit Logs Content Pack][11] includes:
- [Detection Rules][12]
- An interactive dashboard

## Cloud Security Content Packs

### Google Security Command Center

Track and analyze Google Security Command Center findings.

The [Google Security Command Center Content Pack][46] includes:
- [Detection Rules][47]
- An interactive dashboard

### Wiz

View and monitor Wiz audit logs and issues, including toxic combinations.

The [Wix Content Pack][48] includes:
- An interactive dashboard

## Authentication Content Packs

### 1Password

Monitor account activity with 1Password Events Reporting.

The [1Password Content Pack][13] includes:
- [Detection Rules][14]
- An interactive dashboard

### Auth0

Monitor and generate signals around Auth0 user activity.

The [Auth0 Content Pack][15] includes:
- [Detection Rules][16]
- An interactive dashboard

### Cisco DUO

Monitor and analyze MFA and secure access logs from Cisco DUO.

The [Cisco DUO Content Pack][31] includes:
- [Detection Rules][32]
- An interactive dashboard

### JumpCloud

Tracks user activity by monitoring JumpCloud audit logs.

The [JumpCloud Content Pack][17] includes:
- [Detection Rules][18]

### Okta

Track user activity by monitoring Okta audit logs.

The [Okta Content Pack][19] includes:
- [Detection Rules][20]
- An interactive dashboard
- Workflow Automation

## Collaboration Content Packs

### Google Workspace

Optimize your security monitoring within Google Workspace.

The [Google Workspace Content Pack][21] includes:
- [Detection Rules][22]
- An interactive dashboard

### Microsoft 365

Monitor key security events from Microsoft 365 logs.

The [Microsoft 365 Content Pack][23] includes:
- [Detection Rules][24]
- An interactive dashboard

### Slack Audit Logs

View, analyze, and monitor Slack audit logs.

The [Slack Content Pack][33] includes:
- [Detection Rules][34]
- An interactive dashboard

## Network Content Packs

### Check Point Quantum Firewall

Monitor and alert on your network's Check Point Quantum firewalls.

The [Check Point Quantum Firewall Content Pack][49] includes:
- [A Detection Rule][50]
- An interactive dashboard

### Cisco Meraki

Monitor Cisco Meraki logs and identify attacker activity.

The [Cisco Meraki Content Pack][35] includes:
- [A Detection Rule][36]
- An interactive dashboard

### Cisco Secure Firewall

Gain insights into Cisco Secure Firewall logs.

The [Cisco Secure Firewall Content Pack][51] includes:
- An interactive dashboard

### Cisco Umbrella DNS

Collect and monitor logs from Cisco Umbrella to gain insights into DNS and Proxy logs.

The [Cisco Umbrella Content Pack][39] includes:
- [Detection Rules][40]
- An interactive dashboard

### Cloudflare

Enhance security for your web applications.

The [Cloudflare Content Pack][25] includes:
- [Detection Rules][26]
- An interactive dashboard
- Workflow Automation

### Palo Alto Networks Firewall

Analyze traffic and detect threats with Palo Alto Networks Firewall.

The [Palo Alto Networks Firewall Content Pack][37] includes:
- [Detection Rules][38]
- An interactive dashboard

### Palo Alto Panorama

Monitor and detect your Palo Alto Panorama firewalls.

The [Palo Alto Panorama Content Pack][52] includes:
- An interactive dashboard

### Zeek

Analyze and store Corelight / Zeek logs to gain insights into network threats.

The [Zeek Content Pack][53] includes:
- [Detection Rules][54]
- Interactive dashboards

## Web Security Content Packs

### NGINX

Monitor and respond to web-based risks with NGINX.

The [NGINX Content Pack][41] includes:
- [Detection Rules][42]
- An interactive dashboard

## Cloud developer tools Content Packs

### Atlassian Jira and Confluence Audit Records

Monitor, secure, and optimize your Atlassian's Jira and Confluence environments.

The [Atlassian Jira and Confluence Audit Records Content Pack][55] includes:
- An interactive dashboard

### GitHub

Track user activity and code change history by monitoring GitHub audit logs.

The [GitHub Content Pack][27] includes:
- [Detection Rules][28]
- An interactive dashboard

### Snowflake

Collect Snowflake logs to monitor for threats, conduct hunts, and perform investigations.

The [Snowflake Content Pack][56] includes:
- [Detection Rules][57]
- An interactive dashboard

## Endpoint Content Packs

### CrowdStrike

Improve the security posture of your endpoints with CrowdStrike.

The [CrowdStrike Content Pack][29] includes:
- [Detection Rules][30]
- An interactive dashboard

### Jamf Protect

Endpoint security and mobile threat defense (MTD) for Mac and mobile devices.

The [Jamf Protect Content Pack][58] includes:
- [Detection Rules][59]
- An interactive dashboard

### SentinelOne

Integrate SentinelOne Singularity Endpoint alerts and threats into Cloud SIEM.

The [SentinelOne Content Pack][60] includes:
- [Detection Rules][61]
- An interactive dashboard

### Windows Event Logs

Monitor and analyze your Windows system for potential threats with Windows Event Logs.

The [Windows Event Logs Content Pack][62] includes:
- [Detection Rules][63]
- An interactive dashboard

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: /security/detection_rules/
[3]: /security/cloud_siem/investigator
[4]: /service_management/workflows/
[5]: https://app.datadoghq.com/security/content-packs/aws-cloudtrail
[6]: /security/default_rules/#cloudtrail
[7]: https://app.datadoghq.com/security/content-packs/azure
[8]: /security/default_rules/#azuresecurity
[9]: https://app.datadoghq.com/security/content-packs/gcp-audit-logs
[10]: /security/default_rules/#gcp
[11]: https://app.datadoghq.com/security/content-packs/kubernetes-audit-logs
[12]: /security/default_rules/#kubernetes
[13]: https://app.datadoghq.com/security/content-packs/1password
[14]: /security/default_rules/#1password
[15]: https://app.datadoghq.com/security/content-packs/auth0
[16]: /security/default_rules/#auth0
[17]: https://app.datadoghq.com/security/content-packs/jumpcloud
[18]: /security/default_rules/#jumpcloud
[19]: https://app.datadoghq.com/security/content-packs/okta
[20]: /security/default_rules/#okta
[21]: https://app.datadoghq.com/security/content-packs/google-workspace
[22]: /security/default_rules/#gsuite
[23]: https://app.datadoghq.com/security/content-packs/microsoft-365
[24]: /security/default_rules/#microsoft-365
[25]: https://app.datadoghq.com/security/content-packs/cloudflare
[26]: /security/default_rules/#cloudflare
[27]: https://app.datadoghq.com/security/content-packs/github
[28]: /security/default_rules/#github-telemetry
[29]: https://app.datadoghq.com/security/content-packs/crowdstrike
[30]: /security/default_rules/#crowdstrike
[31]: https://app.datadoghq.com/security/content-packs/cisco-duo
[32]: /security/default_rules/#cisco-duo
[33]: https://app.datadoghq.com/security/content-packs/slack
[34]: /security/default_rules/#slack
[35]: https://app.datadoghq.com/security/content-packs/meraki
[36]: /security/default_rules/#meraki
[37]: https://app.datadoghq.com/security/content-packs/pan-firewall
[38]: /security/default_rules/#panfirewall
[39]: https://app.datadoghq.com/security/content-packs/cisco-umbrella-dns
[40]: /security/default_rules/#cisco-umbrella-dns
[41]: https://app.datadoghq.com/security/content-packs/nginx
[42]: /security/default_rules/#nginx
[43]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[44]: /security/cloud_siem/guide/azure-config-guide-for-cloud-siem
[45]: /security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
[46]: https://app.datadoghq.com/security/content-packs/google-security-command-center
[47]: /security/default_rules/#googlesecuritycommandcenter
[48]: https://app.datadoghq.com/security/content-packs/wiz
[49]: https://app.datadoghq.com/security/content-packs/checkpoint-quantum-firewall
[50]: /security/default_rules/#checkpoint-quantum-firewall
[51]: https://app.datadoghq.com/security/content-packs/cisco-secure-firewall
[52]: https://app.datadoghq.com/security/content-packs/pan-panorama
[53]: https://app.datadoghq.com/security/content-packs/zeek
[54]: /security/default_rules/#zeek
[55]: https://app.datadoghq.com/security/content-packs/atlassian-audit
[56]: https://app.datadoghq.com/security/content-packs/snowflake
[57]: /security/default_rules/#snowflake
[58]: https://app.datadoghq.com/security/content-packs/jamf-protect
[59]: /security/default_rules/#jamfprotect
[60]: https://app.datadoghq.com/security/content-packs/sentinel-one
[61]: /security/default_rules/#sentinelone
[62]: https://app.datadoghq.com/security/content-packs/windows-event-logs
[63]: /security/default_rules/#windows
