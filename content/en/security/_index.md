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
    tag: "Release Notes"
    text: "Check out the latest Datadog Security releases! (App login required)."
  - link: "https://www.datadoghq.com/guided-tour/security/"
    tag: "Guided Tour"
    text: "See a Product Guided Tour"
  - link: "/getting_started/cloud_siem"
    tag: "Documentation"
    text: "Begin detecting threats with Cloud SIEM"
  - link: "/security/cloud_security_management/misconfigurations/"
    tag: "Documentation"
    text: "Start tracking misconfigurations with Cloud Security Misconfigurations"
  - link: "/security/workload_protection/"
    tag: "Documentation"
    text: "Uncover kernel-level threats with Workload Protection"
  - link: "https://securitylabs.datadoghq.com/"
    tag: "Security Labs"
    text: "Read about security-related topics on Datadog's Security Labs blog"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session to elevate your security and threat detection"
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
  - link: "https://www.datadoghq.com/blog/chaos-engineering-for-security/"
    tag: "Blog"
    text: "Security-focused chaos engineering experiments for the cloud"
  - link: "https://www.datadoghq.com/blog/datadogs-approach-devsecops/"
    tag: "Blog"
    text: "Datadog's approach to DevSecOps"
  - link: "https://www.datadoghq.com/blog/investigate-denial-of-service-attacks/"
    tag: "Blog"
    text: "Investigating a complex denial-of-service attack"
  - link: "https://www.datadoghq.com/blog/optimize-and-secure-azure-functions/"
    tag: "Blog"
    text: "Tips to optimize and secure Azure Functions"
  - link: "https://www.datadoghq.com/blog/datadog-detection-as-code/"
    tag: "Blog"
    text: "How we use Datadog for detection as code"
  - link: "https://www.datadoghq.com/blog/lateral-movement-entra-id-azure/"
    tag: "Blog"
    text: "Detect lateral movement in hybrid Azure environments"
  - link: "https://www.datadoghq.com/blog/secrets-management/"
    tag: "Blog"
    text: "Identify the secrets that make your cloud environment more vulnerable to an attack"
  - link: "https://www.datadoghq.com/blog/cloud-security-roundup-infrastructure-identity/"
    tag: "Blog"
    text: "Cloud security research and guide roundup: Infrastructure and access"
  - link: "https://www.datadoghq.com/blog/cloud-security-roundup-devsecops-threat-detection-ai/"
    tag: "Blog"
    text: "Cloud security research and guide roundup: DevSecOps, threat detection, and AI"
  - link: "https://www.datadoghq.com/blog/key-security-metrics/"
    tag: "Blog"
    text: "Key metrics for measuring your organization's security posture"
  - link: "https://www.datadoghq.com/blog/datadogs-approach-sre-security/"
    tag: "Blog"
    text: "Security and SRE: How Datadog's combined approach aims to tackle security and reliability challenges"
  - link: "https://www.datadoghq.com/blog/cloud-security-roundup-2025"
    tag: "Blog"
    text: "2025 cloud security roundup: How attackers abused identities, supply chains, and AI"
  - link: "https://www.datadoghq.com/blog/nodejs-vulnerability-apm"
    tag: "Blog"
    text: "Mitigation for Node.js denial-of-service vulnerability affecting Datadog APM"
cascade:
    algolia:
        rank: 70
---

## Overview

Bring speed and scale to your production security operations. Datadog Security delivers real-time threat detection, and continuous configuration audits across applications, hosts, containers, and cloud infrastructure. Coupled with the greater Datadog observability platform, Datadog Security brings unprecedented integration between security and operations aligned to your organization's shared goals.

Datadog Security includes: 
- [Cloud SIEM](#cloud-siem)
- [Code Security](#code-security)
- [Cloud Security](#cloud-security)
- [App and API Protection](#app-and-api-protection)
- [Workload Protection](#workload-protection)
- [Sensitive Data Scanner](#sensitive-data-scanner)
 
To learn more, check out the [30-second Product Guided Tour][14].

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) detects real-time threats to your application and infrastructure, like a targeted attack, an IP communicating with your systems which matches a threat intel list, or an insecure configuration. Cloud SIEM is powered by [Datadog Log Management][5]. With these areas combined, you can [automate remediation of threats detected by Datadog Cloud SIEM][6] to speed up your threat-response workflow. Check out the dedicated [Guided Tour](https://www.datadoghq.com/guided-tour/security/cloud-siem/) to see more.

{{< img src="security/security_monitoring/cloud_siem_overview_2025.png" alt="The Cloud SIEM home page showing the Security Overview section with widgets for important signals, suspicious actors, impacted resources, threat intel, and signal trends" width="100%">}}

## Code Security

[Code Security][20] scans your first-party code and open source libraries used in your applications in both your repositories and running services, providing end-to-end visibility from development to production. It encompasses the following capabilities:

- [Static Code Analysis (SAST)][27] for identifying security and quality issues in your first-party code
- [Software Composition Analysis (SCA)][28] for identifying open source dependencies in both your repositories and your services
- [Runtime Code Analysis (IAST)][29] for identifying vulnerabilities in the first-party code within your services
- [Secret Scanning][30] for identifying and validating leaked secrets (in Preview)

With IDE integrations, pull request comments, and CI/CD gates, Code Security helps teams implement DevSecOps throughout the organization:
- **Developers:** early vulnerability detection, code quality improvements, faster development as developers spend less time debugging and patching.
- **Security Administrators:** enhanced security posture, improved patch management in response to early vulnerability alerts, and compliance monitoring.
- **Site Reliability Engineers (SREs):** automated security checks throughout CI/CD workflow, security compliance, and system resilience. SAST reduces manual overhead for SREs and ensures that each release is thoroughly tested for vulnerabilities.  

{{< img src="code_security/gitlab_integration_light.png" alt="A SAST finding within a GitLab repository" width="100%">}}

## Cloud Security

[Cloud Security][10] delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation. Powered by observability data, security teams can determine the impact of a threat by tracing the full attack flow and identify the resource owner where a vulnerability was triggered.

Cloud Security includes [Workload Protection][12], [Misconfigurations][11], [Identity Risks][15], and [Vulnerabilities][16]. To learn more, check out the dedicated [Guided Tour][13].

{{< img src="security/csm/csm_overview_3.png" alt="The Security Inbox on the Cloud Security overview shows a list of prioritized security issues" width="100%">}}

To get started with Datadog Security, navigate to the [**Security** > **Setup**][9] page in Datadog, which has detailed information for single or multi-configuration, or follow the getting started sections below to learn more about each area of the platform.

##  App and API Protection

Datadog [App and API Protection (AAP)][1] provides observability into application-level attacks that aim to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS). AAP leverages [Datadog APM][2], the [Datadog Agent][3], and in-app detection rules to detect threats in your application environment. Check out the product [Guided Tour](https://www.datadoghq.com/guided-tour/security/application-security-management/) to see more.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

## Workload Protection

[Workload Protection][26] monitors file, network, and process activity across your environment to detect real-time threats to your infrastructure. As part of the Datadog platform, you can combine the real-time threat detection of Workload Protection with metrics, logs, traces, and other telemetry to see the full context surrounding a potential attack on your workloads.

- Proactively block threats with [Active Protection][31].
- Manage out-of-the-box and custom [detection rules][32].
- Set up real-time [notifications][33].
- Investigate and remediate [security signals][34].

## Sensitive Data Scanner

[Sensitive Data Scanner][24] can help prevent sensitive data leaks and limit non-compliance risks by discovering, classifying, and optionally redacting sensitive data. It can scan for sensitive data in your telemetry data, such as application logs, APM spans, RUM events, and events from Event Management. It can also scan for sensitive information within your cloud storage resources. 

After you [set up Sensitive Data Scanner][25], use the Findings page to see details of sensitive data findings that have been identified, so that you can triage, investigate, and remediate the findings.

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="The summary page showing an overview of sensitive findings broken down by priority" style="width:100%;" >}}

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
[12]: /security/workload_protection/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /security/cloud_security_management/identity_risks/
[16]: /security/cloud_security_management/vulnerabilities/
[17]: /security/application_security/troubleshooting/#disabling-threat-management-and-protection
[18]: /security/application_security/troubleshooting/#disabling-software-composition-analysis
[19]: /security/application_security/troubleshooting/#disabling-code-security
[20]: /security/code_security/
[21]: /security/code_security/static_analysis/
[22]: /security/code_security/software_composition_analysis/
[23]: /security/code_security/iast/
[24]: /sensitive_data_scanner/
[25]: /sensitive_data_scanner/setup/
[26]: /security/workload_protection/
[27]: /security/code_security/static_analysis/
[28]: /security/code_security/software_composition_analysis/
[29]: /security/code_security/iast/
[30]: /security/code_security/secret_scanning/
[31]: /security/workload_protection/guide/active-protection
[32]: /security/workload_protection/workload_security_rules
[33]: /security/notifications/
[34]: /security/workload_protection/security_signals
