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

{{% cloud-siem-content-packs %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: /security/detection_rules/
[3]: /security/cloud_siem/investigator
[4]: /service_management/workflows/