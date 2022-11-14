---
aliases:
- 5am-8f6-ur7
- /security_monitoring/default_rules/5am-8f6-ur7
- /security_monitoring/default_rules/security-scan-detected
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
source: application-security
title: Security scanner detected
type: security_rules
---

### Goal
Detect when a security scanner is performed on your organization's services.

### Strategy
Monitor application security events to detect security scanners activity on web services.

The Application Security Signal severity is determined based or whether the scan is targeted, based on the HTTP response status codes:

* `MEDIUM` The attack attempts triggered `5XX` errors on the underlying web service.
* `LOW` The attack attempts hit real routes of the underlying web service, or was logged in.
* `INFO` A random security scanner. Logged for audibility and not requiring any follow-up actions.

### Triage and response
1. Consider blocking the attacking IP(s) temporarily to prevent them to reach deeper parts of your production systems.
2. Review the `5xx` errors and the other application security events detected to assess the impact on the services.
