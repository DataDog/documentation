---
aliases:
- 8c6-2a6-515
- /security_monitoring/default_rules/8c6-2a6-515
- /security_monitoring/default_rules/okta-mfa-bypass
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: okta
tactic: TA0005-defense-evasion
title: Okta MFA Bypass Attempted
type: security_rules
---

## Goal
Detect when a user attempts to bypass multi-factor authentication (MFA).

## Strategy
This rule lets you monitor the following Okta events to detect when a user attempts to bypass MFA:

* `user.mfa.attempt_bypass`

## Triage and response
1. Contact the user who attempted to bypass MFA and ensure the request was legitimate.
