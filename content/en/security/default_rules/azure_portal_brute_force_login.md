---
aliases:
- rrb-osy-cuu
- /security_monitoring/default_rules/rrb-osy-cuu
- /security_monitoring/default_rules/azure_portal_brute_force_login
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Azure AD brute force login
type: security_rules
---

## Goal
Detect when a user is a victim of an Account Take Over (ATO) by a brute force attack.

## Strategy
Monitor Azure Active Directory Sign-in logs and detect when any `@evt.category` is equal to  `SignInLogs`, and `@evt.outcome` is equal to `failure`.

## Triage and response
1. Inspect the log and determine if this was a valid login attempt.
2. If the user was compromised, rotate user credentials.

## Changelog
* 26 October 2022 - Updated query.
