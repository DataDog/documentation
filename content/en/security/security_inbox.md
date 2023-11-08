---
title: Security Inbox
kind: documentation
---

Security Inbox provides a consolidated, actionable list of your most critical security issues. It automatically contextualizes and correlates insights coming from Datadog security products across vulnerabilities, signals, misconfigurations, and identity risks into a unified, prioritized view.

## About security issues
Security issues are a consolidation of other security detections and resource attributes such as being publicly accessible, attached to privileged roles, and residing in production environments.

The order in which security issues are displayed is based on the following criteria:

- Higher severity issues are listed first
- Whether an issue has a threat attached to it
- Number of related risks (publicly accessible, production environment, misconfiguration, vulnerability)
- Number of resources impacted
- Discovered date (newer issues are listed first)

{{< img src="security/csm/security_inbox.png" alt="The Security Inbox on the CSM overview shows prioritized issues for remediation" width="100%">}}