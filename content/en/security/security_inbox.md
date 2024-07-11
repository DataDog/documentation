---
title: Security Inbox
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Learn more about Application Security Management"
- link: "/security/cloud_security_management"
  tag: "Documentation"
  text: "Learn more about Cloud Security Management"
- link: "/security/default_rules/#all"
  tag: "Documentation"
  text: "Out-of-the-box Detection Rules"
- link: "https://www.datadoghq.com/blog/security-inbox/"
  tag: "Blog"
  text: "Easily identify and prioritize your top security risks with Datadog Security Inbox"
products:
- name: Cloud Security Management
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

Security Inbox provides a consolidated, actionable list of your most important security findings. It automatically contextualizes and correlates insights from Datadog security products across vulnerabilities, signals, misconfigurations, and identity risks into a unified, prioritized view of actions to take to strengthen your environment.

{{< img src="security/security_inbox_5.png" alt="The Security Inbox shows prioritized security issues for remediation" width="100%">}}

## Types of findings in Security Inbox

The findings that appear in Security Inbox are generated from Application Security Management (ASM) and Cloud Security Management (CSM). These include the following types of findings:

- [Misconfigurations][1] for [CSM Misconfigurations][2].
- [Identity risks][1] for [CSM Identity Risks][3].
- Application library vulnerabilities for [Software Composition Analysis(SCA)][4]. All high and critical application library vulnerabilities on production services under attack appear in the inbox.
- Application code vulnerabilities for [Code Security vulnerabilities][5]. All high and critical application code vulnerabilities appear in the inbox.
- [Attack Paths][1]. An attack path outlines a series of interconnected misconfigurations, container image, host, and application vulnerabilities that malicious actors could leverage to gain unauthorized access, escalate privileges, or compromise sensitive data in your cloud environment. All attack paths are listed in Security Inbox by default.

Security Inbox also takes the following detected risks into consideration when determining which findings appear in the inbox:

- **Public accessibility**: Publicly exposed resources carry elevated risk, especially if they contain vulnerabilities or misconfigurations. To learn more, see [How Datadog Determines if Resources are Publicly Accessible][6].
- **Privileged access**: Resources with privileged access carry elevated risk as they grant elevated permissions that can expand the attack surface.
- **Under attack**: Resources that are seeing suspicious security activity carry elevated risks. Resources are flagged as "Under Attack" if a security signal has been detected on the resource in the last 15 days.
- **Exploit available**: Vulnerabilities with public exploits available carry elevated risks. The availability of a public exploit is verified with different exploit databases, such as [cisa.gov][7], [exploit-db.com][8], and [nvd.nist.gov][9].
- **In production**: Vulnerabilities in production environments carry elevated risks. The environment is computed from the `env` tag.

## How Security Inbox prioritization works

Security Inbox ranks issues by considering the severity of a finding first, followed by the number of correlated risks, and then the number of impacted resources and services.

- **Severity (Critical, High, Medium, and Low)**: Severity is determined by the [Datadog Security Scoring Framework][10] for cloud misconfigurations and identity risks, and by CVSS 3.1 for vulnerabilities.
- **Number of detected risks**: When two findings have the same severity, the one with a greater number of detected risks is given higher priority.
- **Number of impacted resources and services**: If two findings share both the same severity and the same number of detected risks, the finding that impacts a greater number of resources and services is prioritized higher.

**Note**: The type of finding, detected risk, or impacted resource does not influence prioritization.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/?category=cat-csm-security-issues#all
[2]: /security/cloud_security_management/misconfigurations/
[3]: /security/cloud_security_management/identity_risks/
[4]: /security/application_security/software_composition_analysis
[5]: /security/application_security/code_security
[6]: /security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /security/cloud_security_management/severity_scoring/#csm-severity-scoring-framework