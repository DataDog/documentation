---
aliases:
- 8d2-d0c-0b6
control: cis-3.6
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: iam
security: compliance
source: cloudtrail
title: AWS Console brute force login
type: security_rules
---

### Goal
Detect when a user is a victim of an Account Take Over (ATO) by a brute force attack.

### Strategy
 This rule monitors CloudTrail and detects when any `@evt.name` has a value of `Console Login`, and `@responseElements.ConsoleLogin` has a value of `Failure`.

### Triage & Response
1. Determine if the user logged in with 2FA.
2. Reach out to the user and ensure the login was legitimate.
