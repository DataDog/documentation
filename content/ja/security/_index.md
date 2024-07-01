---
title: Datadog Security
aliases:
  - /compliance_monitoring
  - /cloud_siem
  - /security_platform
  - /security/security_monitoring
  - /security_monitoring/explorer/
  - /cloud_siem/explorer/
  - /security_platform/explorer
  - /security/explorer
  - /security_platform/security_signal_management
  - /security/security_signal_management
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance"
    tag: Release Notes
    text: Check out the latest Datadog Security releases! (App login required).
  - link: "https://www.datadoghq.com/guided-tour/security/"
    tag: Guided Tour
    text: See a Product Guided Tour
  - link: /getting_started/cloud_siem
    tag: Documentation
    text: Begin detecting threats with Cloud SIEM
  - link: /security/cloud_security_management/misconfigurations/
    tag: Documentation
    text: Start tracking misconfigurations with CSM Misconfigurations
  - link: /security/threats/setup
    tag: Documentation
    text: Uncover kernel-level threats with CSM Threats
  - link: "https://securitylabs.datadoghq.com/"
    tag: Security Labs
    text: Read about security-related topics on Datadog's Security Labs blog
  - link: "https://dtdg.co/fe"
    tag: Foundation Enablement
    text: Join an interactive session to elevate your security and threat detection
  - link: "https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/"
    tag: Blog
    text: Elevate AWS threat detection with Stratus Red Team
  - link: "https://www.datadoghq.com/blog/kubernetes-security-best-practices/"
    tag: Blog
    text: Best practices for securing Kubernetes applications
  - link: "https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/"
    tag: Blog
    text: Best practices for network perimeter security in cloud-native environments
  - link: "https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/"
    tag: Blog
    text: Best practices for data security in cloud-native infrastructure
  - link: "https://www.datadoghq.com/blog/chaos-engineering-for-security/"
    tag: Blog
    text: Security-focused chaos engineering experiments for the cloud
  - link: "https://www.datadoghq.com/blog/datadogs-approach-devsecops/"
    tag: Blog
    text: Datadog's approach to DevSecOps
cascade:
    algolia:
        rank: 70
---

## Overview

Bring speed and scale to your production security operations. Datadog Security delivers real-time threat detection, and continuous configuration audits across applications, hosts, containers, and cloud infrastructure. Coupled with the greater Datadog observability platform, Datadog Security brings unprecedented integration between security and operations aligned to your organizations shared goals.

Datadog Security includes [Application Security Management](#application-security-management), [Cloud SIEM](#cloud-siem), and [Cloud Security Management](#cloud-security-management). To learn more, check out the [30-second Product Guided Tour][14].

## Application Security Management

[Application Security Management][1] (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS). ASM leverages [Datadog APM][2], the [Datadog Agent][3], and in-app detection rules to detect threats in your application environment. Check out the product [Guided Tour](https://www.datadoghq.com/guided-tour/security/application-security-management/) to see more.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) detects real-time threats to your application and infrastructure, like a targeted attack, an IP communicating with your systems which matches a threat intel list, or an insecure configuration. Cloud SIEM is powered by [Datadog Log Management][5]. With these areas combined, you can [automate remediation of threats detected by Datadog Cloud SIEM][6] to speed up your threat-response workflow. Check out the dedicated [Guided Tour](https://www.datadoghq.com/guided-tour/security/cloud-siem/) to see more.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="The Cloud SIEM home page showing the Security Overview section with widgets for important signals, suspicious actors, impacted resources, threat intel, and signal trends" width="100%">}}

## Cloud Security Management

[Cloud Security Management (CSM)][10] delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation. Powered by observability data, security teams can determine the impact of a threat by tracing the full attack flow and identify the resource owner where a vulnerability was triggered.

CSM includes [Threats][12], [Misconfigurations][11], [Identity Risks][15], and [Vulnerabilities][16]. To learn more, check out the dedicated [Guided Tour][13].

{{< img src="security/csm/csm_overview_2.png" alt="The Security Inbox on the Cloud Security Management overview shows a list of prioritized security issues" width="100%">}}

To get started with Datadog Security, navigate to the [**Security** > **Setup**][9] page in Datadog, which has detailed information for single or multi-configuration, or follow the getting started sections below to learn more about each area of the platform.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/
[2]: /tracing/
[3]: /agent/
[4]: /security/cloud_siem
[5]: /logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[9]: https://app.datadoghq.com/security/configuration
[10]: /security/cloud_security_management/
[11]: /security/cloud_security_management/misconfigurations/
[12]: /security/threats/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /security/cloud_security_management/identity_risks/
[16]: /security/cloud_security_management/vulnerabilities/
