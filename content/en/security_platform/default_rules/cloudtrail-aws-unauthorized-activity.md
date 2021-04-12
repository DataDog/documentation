---
aliases:
- 1b1-37a-74c
control: cis-3.1
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: amazon
security: compliance
source: cloudtrail
title: AWS unauthorized activity
type: security_rules
---

### Goal
Detect when unauthorized activity is detected in AWS.

### Strategy
This rule lets you monitor CloudTrail to detect when the error message of `AccessDenied` is returned.

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.
