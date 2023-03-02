---
title: Datadog Security
kind: documentation
aliases:
  - compliance_monitoring
  - cloud_siem
  - security_platform
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance"
    tag: "Release Notes"
    text: "Check out the latest Datadog Security releases! (App login required)."
  - link: "/getting_started/cloud_siem"
    tag: "Documentation"
    text: "Begin detecting threats with Cloud SIEM"
  - link: "/security/cspm/getting_started"
    tag: "Documentation"
    text: "Start tracking misconfigurations with Cloud Security Posture Management"
  - link: "/security/cloud_workload_security/getting_started"
    tag: "Documentation"
    text: "Uncover kernel-level threats with Cloud Workload Security"
  - link: "https://securitylabs.datadoghq.com/"
    tag: "Security Labs"
    text: "Read about security-related topics on Datadog's Security Labs blog"
  - link: "https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/"
    tag: "Blog"
    text: "Elevate AWS threat detection with Stratus Red Team"
  - link: "https://www.datadoghq.com/blog/kubernetes-security-best-practices/"
    tag: "Blog"
    text: "Best practices for securing Kubernetes applications"
  - link: "https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/"
    tag: "Blog"
    text: "Best practices for network perimeter security in cloud-native environments"
  - link: "https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/"
    tag: "Blog"
    text: "Best practices for data security in cloud-native infrastructure"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED.
</div>
{{< /site-region >}}

## Overview

Bring speed and scale to your production security operations. Datadog Security delivers real-time threat detection, and continuous configuration audits across applications, hosts, containers, and cloud infrastructure. Coupled with the greater Datadog observability platform, Datadog Security brings unprecedented integration between security and operations aligned to your organizations shared goals.

Datadog Security includes [Application Security Management](#application-security-management), [Cloud SIEM](#cloud-siem), [Cloud Security Posture Management (CSPM)](#cloud-security-posture-management), and [Cloud Workload Security (CWS)](#cloud-workload-security).

{{< vimeo 669874306 >}}
</br>

## Application Security Management

[Application Security Management][1] (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS). ASM leverages [Datadog APM][2], the [Datadog Agent][3], and in-app detection rules to detect threats in your application environment.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) detects real-time threats to your application and infrastructure, like a targeted attack, an IP communicating with your systems which matches a threat intel list, or an insecure configuration. Cloud SIEM is powered by [Datadog Log Management][5]. With these areas combined, you can [automate remediation of threats detected by Datadog Cloud SIEM][6] to speed up your threat-response workflow.

{{< img src="security/security_monitoring/cloud_siem_homepage.png" alt="The Cloud SIEM home page showing the Security Overview section with widgets for important signals, suspicious actors, impacted resources, threat intel, and signal trends" width="100%">}}

## Cloud Security Posture Management

[Cloud Security Posture Management (CSPM)][7] tracks the security hygiene and compliance posture of your production environment, can automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks. See security posture scores across your infrastructure and trace each score back to the applicable benchmark or framework criteria.

{{< img src="security/cspm_overview.png" alt="Cloud Security Posture Management scores in Datadog" width="100%">}}

## Cloud Workload Security

[Cloud Workload Security (CWS)][8] monitors file and process activity across your environment to detect threats to your infrastructure, like AWS EC2 instances, and workloads, like Kubernetes clusters, in real time at the kernel level. Cloud Workload Security uses the unified Datadog Agent, so if you’re already using Datadog to monitor your environment, there’s no need to provision additional resources.

{{< img src="security/cws_overview.png" alt="Cloud Workload Security coverage views in Datadog" width="100%">}}

To get started with Datadog Security, navigate to the [Setup & Configuration][9] section in the Datadog app, which has detailed information for single or multi-configuration, or follow the getting started sections below to learn more about each area of the platform.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/
[2]: /tracing/
[3]: /agent/
[4]: /security/cloud_siem
[5]: /logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[7]: /security/cspm/
[8]: /security/cloud_workload_security/
[9]: https://app.datadoghq.com/security/configuration
