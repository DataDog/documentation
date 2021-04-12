---
aliases:
- rrb-osy-cuu
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Azure Portal brute force login
type: security_rules
---

## Goal

Detect when a user is a victim of an Account Take Over (ATO) by a brute force attack.

## Strategy

Monitor Azure Active Directory Sign-in logs and detect when any `@evt.category` is equal to  `SignInLogs`, and `@evt.outcome` is equal to `failure`.

## Triage & Response

1. Inspect the log and determine if this was a valid login attempt.
2. If the user was compromised, rotate user credentials.
