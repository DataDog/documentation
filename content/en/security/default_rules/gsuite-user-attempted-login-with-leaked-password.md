---
aliases:
- dc3-7b8-f07
- /security_monitoring/default_rules/dc3-7b8-f07
- /security_monitoring/default_rules/gsuite-user-attempted-login-with-leaked-password
disable_edit: true
integration_id: gsuite
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gsuite
security: attack
source: gsuite
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: User attempted login with leaked password
type: security_rules
---

## Goal
Detect when a user attempts to log in with a password which is known to be compromised.

## Strategy
This rule allows you to monitor this Google Activity API call to detect if an attacker is trying to login with a leaked password: 

* [Leaked password][1]

## Triage and response
1. Determine which user in your organization owns the compromised password.
2. Contact the user and ensure they rotate the password on Google and any other accounts where they may have reused this password. Ensure the user is aware of strong password guidelines.

[1]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/login#account_disabled_password_leak
