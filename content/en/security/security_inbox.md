---
title: Security Inbox
kind: documentation
---

## Prioritize and remediate important security issues

The **Security Inbox** on the [CSM Overview][4] shows a list of prioritized security issues that require immediate attention. Security issues are a consolidation of other security detections and resource attributes such as being publicly accessible, attached to privileged roles, and residing in production environments.

The order in which security issues are prioritized is based on the following criteria:

- Higher severity issues are listed first
- Whether an issue has a threat attached to it
- Number of related risks (publicly accessible, production environment, misconfiguration, vulnerability)
- Number of resources impacted
- Discovered date (newer issues are listed first)

Remediating security issues can meaningfully improve your organization's security. Use the **Security Inbox** to prioritize which security issues to resolve, either by fixing the underlying issues or by muting the issue.

{{< img src="security/csm/security_inbox.png" alt="The Security Inbox on the CSM overview shows prioritized issues for remediation" width="100%">}}

[4]: https://app.datadoghq.com/security/csm