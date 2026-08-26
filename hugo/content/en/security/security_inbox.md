---
title: Security Inbox
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Learn more about App and API Protection"
- link: "/security/cloud_security_management"
  tag: "Documentation"
  text: "Learn more about Cloud Security"
- link: "/security/default_rules/#all"
  tag: "Documentation"
  text: "Out-of-the-box Detection Rules"
- link: "https://www.datadoghq.com/blog/security-inbox-prioritization/"
  tag: "Blog"
  text: "How Datadog Security Inbox prioritizes security risks"
products:
- name: Cloud Security
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

Security Inbox provides a consolidated, actionable list of your most important security findings. It automatically contextualizes and correlates insights from Datadog security products across vulnerabilities, signals, misconfigurations, and identity risks into a unified, prioritized view of actions to take to strengthen your environment.

{{< img src="security/security_inbox_7.png" alt="The Security Inbox shows prioritized security issues for remediation" width="100%">}}

## Types of findings in Security Inbox

The findings that appear in Security Inbox are generated from App and API Protection (AAP) and Cloud Security. By default, these include the following types of findings:

- A curated set of [misconfigurations][1] for [Cloud Security Misconfigurations][2], compiled by Datadog Security Research.
- A curated set of [identity risks][1] for [Cloud Security Identity Risks][3], compiled by Datadog Security Research.
- Application library vulnerabilities for [Software Composition Analysis(SCA)][4]. All high and critical application library vulnerabilities on production services under attack appear in the inbox.
- Application code vulnerabilities for [Code Security vulnerabilities][5]. All high and critical application code vulnerabilities appear in the inbox.
- Emerging vulnerabilities, which are infrastructure vulnerabilities that have had CVEs published in the last 30 days and that have a [Datadog severity score][10] of Critical, or that the Datadog Security Research team has published. When Datadog rates a vulnerability as Critical, that means it's an exploitable critical vulnerability that affects an internet-facing production resource.
- [Attack Paths][1]. An attack path outlines a series of interconnected misconfigurations, container image, host, and application vulnerabilities that malicious actors could leverage to gain unauthorized access, escalate privileges, or compromise sensitive data in your cloud environment. All attack paths are listed in Security Inbox by default.

Security Inbox also takes the following detected risks into consideration when determining which findings appear in the inbox:

- **Public accessibility**: Publicly exposed resources carry elevated risk, especially if they contain vulnerabilities or misconfigurations. To learn more, see [How Datadog Determines if Resources are Publicly Accessible][6].
- **Privileged access**: Resources with privileged access carry elevated risk as they grant elevated permissions that can expand the attack surface.
- **Under attack**: Resources that are seeing suspicious security activity carry elevated risks. Resources are flagged as "Under Attack" if a security signal has been detected on the resource in the last 15 days.
- **Exploit available**: Vulnerabilities with public exploits available carry elevated risks. The availability of a public exploit is verified with different exploit databases, such as [cisa.gov][7], [exploit-db.com][8], and [nvd.nist.gov][9].
- **In production**: Vulnerabilities in production environments carry elevated risks. The environment is computed from the `env` and `environment` tags.

## How Security Inbox prioritization works

Security Inbox ranks issues by considering the severity of a finding first, followed by the number of correlated risks, and then the number of impacted resources and services.

- **Severity (Critical, High, Medium, and Low)**: Severity is determined by the [Datadog Security Scoring Framework][10] for cloud misconfigurations and identity risks, and by CVSS 3.1 for vulnerabilities.
- **Number of detected risks**: When two findings have the same severity, the one with a greater number of detected risks is given higher priority.
- **Number of impacted resources and services**: If two findings share both the same severity and the same number of detected risks, the finding that impacts a greater number of resources and services is prioritized higher.

**Note**: The type of finding, detected risk, or impacted resource does not influence prioritization.

## Use the security context map to identify and mitigate vulnerabilities

The security context map for [Attack Paths](#types-of-findings-in-security-inbox) provides a comprehensive view to help identify and address potential breach points. It effectively maps interconnected misconfigurations, permission gaps, and vulnerabilities that attackers might exploit.

Key features include:

- **Risk assessment**: The map enables security teams to assess the broader impact of vulnerabilities and misconfigurations. This includes evaluating whether security policies---such as access paths and permissions---need updating, and understanding the compliance implications of exposure, particularly when sensitive data is at risk within the blast radius.
- **Actionable context for immediate response**: The map includes service ownership information and other relevant context, allowing teams to make informed, real-time decisions. Teams can take action directly from the map by running integrated workflows, sharing security issue links, and accessing the AWS console view of resources for efficient remediation, all without switching tools.

{{< img src="security/security_context_map.png" alt="The security context map showing a publicly accessible AWS EC2 instance with a critical misconfiguration" width="100%">}}

## Customize Security Inbox to highlight crucial issues

Automation Pipelines enables you to configure rules that customize your Security Inbox, allowing you to highlight issues that are critical to your organization. By setting up these automated rules, you can streamline the management of newly discovered vulnerabilities, enhancing triage and remediation efforts at scale. Leveraging both the Automation Pipelines and Add to Security Inbox rules, you can optimize your security operations in the following ways:

- **Resurface issues not captured by default**: Highlight issues that might be missed by default or custom detection rules, ensuring no critical issue is overlooked.
- **Strengthen compliance and address key system concerns**: Address concerns affecting regulatory compliance or important business systems, regardless of severity.
- **Prioritize current risks**: Focus on immediate threats, such as identity risks after an incident or industry-wide vulnerabilities.

For more information, see [Automation Pipelines][11] and [Add to Security Inbox Rules][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/?category=all#all
[2]: /security/cloud_security_management/misconfigurations/
[3]: /security/cloud_security_management/identity_risks/
[4]: /security/code_security/software_composition_analysis
[5]: /security/code_security/iast
[6]: /security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /security/automation_pipelines/
[12]: /security/automation_pipelines/security_inbox