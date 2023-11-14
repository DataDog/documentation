---
title: Security Inbox
kind: documentation
---

Security Inbox provides a consolidated, actionable list of your most critical security issues. It automatically contextualizes and correlates insights from Datadog security products across vulnerabilities, signals, misconfigurations, and identity risks into a unified, prioritized view.

## How security issues work

Security issues are a consolidation of other security detections and attributes such as a resource being publicly accessible, running on roles with high privileges, or if a public exploit exists. They also incorporate context from potential suspicious activity detected from cloud logs, application traces, and file and process activity detected on a host.

When a combination of risks suggesting a potential attack path in your environment is detected, a security issue is generated and displayed in the Security Inbox. The order in which security issues are listed is based on the following criteria:

- Higher severity issues are listed first
- Whether an issue has a threat attached to it
- Number of related risks (publicly accessible, production environment, misconfiguration, vulnerability)
- Number of resources impacted
- Discovered date (newer issues are listed first)

For a filtered view, click ASM to view ASM-specific vulnerabilities or CSM to view CSM-specific vulnerabilities.

{{< img src="security/csm/security_inbox.png" alt="The Security Inbox on the CSM overview shows prioritized issues for remediation" width="100%">}}