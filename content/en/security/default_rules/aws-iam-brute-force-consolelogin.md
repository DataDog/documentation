---
aliases:
- 8d2-d0c-0b6
- /security_monitoring/default_rules/8d2-d0c-0b6
- /security_monitoring/default_rules/aws-iam-brute-force-consolelogin
disable_edit: true
iaas: aws
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: cloudtrail
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Potential brute force attack on AWS ConsoleLogin
type: security_rules
---

## Goal
Detect when a user is a victim of an Account Take Over (ATO) by a brute force attack.

## Strategy
 This rule monitors CloudTrail and detects when any `@evt.name` has a value of `Console Login`, and `@responseElements.ConsoleLogin` has a value of `Failure`.

## Triage and response
1. Determine if the user logged in with 2FA.
2. Reach out to the user and ensure the login was legitimate.

## Changelog 
17 March 2022 - Update rule query.
