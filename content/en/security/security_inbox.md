---
title: Security Inbox
kind: documentation
---

Security Inbox provides a consolidated, actionable list of your most important security findings. It automatically contextualizes and correlates insights from Datadog security products across vulnerabilities, signals, misconfigurations, and identity risks into a unified, prioritized view of actions to take to strengthen your environment.

## Which types of findings feed the Security Inbox

Application Security Management and Cloud Security Management can generate findings making it to the Inbox. They generate Findings with different Types:

- Misconfiguration for Cloud Security Management Misconfigurations. The misconfigurations getting into the inbox are listed here.
- Identify Risk for Cloud Security Management Identity Risks. The identity risk getting into the inbox are listed here
- Application Library Vulnerability for Application Security Management Library Vulnerabilities. All high and critical application library vulnerabilities on production services under attack get into the inbox.
- Application Code Vulnerability for Application Security Management code-level vulnerabilities. All high and critical application code vulnerabilities get into the inbox.
- Attack Path. An attack path outlines a series of interconnected misconfigurations, container image, host and/application vulnerabilities that malicious actors could leverage to gain unauthorized access, escalate privileges, or compromise sensitive data within the cloud environment. All Attack Paths make it to the Inbox by default. Attack Paths are listed here
- (Coming soon) Cloud Security Management Vulnerabilities

## Risks

The Security Inbox provides a curated list of findings worth remediating based on the following detected risks:

- **Public accessibility**: Publicly exposed resources carry elevated risk, especially if they contain vulnerabilities or misconfigurations. Here is how Datadog determines resource public accessibility.
- **Privileged access**: Resources with privileged access carry elevated risk as they grant elevated permissions that can expand the attack surface. Here is how Datadog determines resource public accessibility
- **Under attack**: Resources that are seeing suspicious security activity carry elevated risks. Resources are flagged as "Under Attack" if a security signal has been detected on the resource in the last 15 days.
- **Exploit available**: Vulnerabilities with public exploits available carry elevated risks. The availability of a public exploit is verified with different exploit databases, such as [cisa.gov][2], [exploit-db.com][3], and [nvd.nist.gov][4].
- **In production**: Vulnerabilities in production environments carry elevated risks. The environment is computed from the `env` tag.

## How security issues work

Security issues are a consolidation of other security detections and attributes such as a resource being publicly accessible, running on roles with high privileges, or if a public exploit exists. They also incorporate context from potential suspicious activity detected from cloud logs, application traces, and file and process activity detected on a host.

When a combination of risks suggesting a potential attack path in your environment is detected, a security issue is generated and displayed in the Security Inbox. The order in which security issues are listed is based on the following criteria:

- Higher severity issues are listed first
- Whether an issue has a threat attached to it
- Number of related risks (publicly accessible, production environment, misconfiguration, vulnerability)
- Number of resources impacted
- Discovered date (newer issues are listed first)

For a filtered view, click **Application Security** to view ASM-specific vulnerabilities or **Cloud Security** to view CSM-specific vulnerabilities.

{{< img src="security/csm/security_inbox_2.png" alt="The Security Inbox shows prioritized security issues for remediation" width="100%">}}

[1]:
[2]: https://www.cisa.gov/
[3]: https://www.exploit-db.com/
[4]: https://nvd.nist.gov/