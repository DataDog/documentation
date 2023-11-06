---
title: Security Inbox
kind: documentation
---

The **Security Inbox** shows a list of prioritized security issues that require immediate attention, either by fixing the underlying issue or by muting the issue for the impacted resources.

Security issues are a consolidation of other security detections and resource attributes such as being publicly accessible, attached to privileged roles, and residing in production environments.

The order in which security issues are displayed is based on the following criteria:

- Higher severity issues are listed first
- Whether an issue has a threat attached to it
- Number of related risks (publicly accessible, production environment, misconfiguration, vulnerability)
- Number of resources impacted
- Discovered date (newer issues are listed first)

{{< img src="security/csm/security_inbox.png" alt="The Security Inbox on the CSM overview shows prioritized issues for remediation" width="100%">}}