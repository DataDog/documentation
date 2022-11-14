---
aliases:
- b23-5ac-d0g
- /security_monitoring/default_rules/b23-5ac-d0g
- /security_monitoring/default_rules/jumpcloud-admin-login-no-mfa
control: '4.2'
disable_edit: true
framework: cis-aws
integration_id: jumpcloud
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: jumpcloud
security: compliance
source: jumpcloud
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Jumpcloud admin login without MFA
type: security_rules
---

## Goal
Detect when a JumpCloud administrator authenticates without multi-factor authentication (MFA) enabled. This is not indicative of malicious activity, however as a best practice, administrator accounts should have MFA enabled.

## Strategy
This rule monitors JumpCloud audit logs to detect when an admin user successfully authenticates to JumpCloud and the log indicates that `@mfa` is `false`.

## Triage and response
1. Reach out to the {{@usr.name}} to determine if the login was legitimate.
2. If the login was legitimate, request that the user enables MFA.
3. If the login wasn’t legitimate, rotate the credentials, enable MFA and triage an actions uncovered from step 1.
4. Review all user accounts to ensure MFA is enabled.
