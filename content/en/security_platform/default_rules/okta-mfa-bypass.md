---
aliases:
- 8c6-2a6-515
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: okta
title: Okta MFA Bypass Attempted
type: security_rules
---

### Goal
Detect when a user attempts to bypass multi-factor authentication (MFA).

### Strategy
This rule lets you monitor the following Okta events to detect when a user attempts to bypass MFA:

* `user.mfa.attempt_bypass`

### Triage & Response
1. Contact the user who attempted to bypass MFA and ensure the request was legitimate.
