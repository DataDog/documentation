---
aliases:
- moj-p98-l67
- /security_monitoring/default_rules/moj-p98-l67
- /security_monitoring/default_rules/aws-waf-webacl-modify
disable_edit: true
iaas: aws
integration_id: waf
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: waf
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS WAF web access control list modified
type: security_rules
---

## Goal
Detect when an AWS Web Application Firewall (WAF) Access Control List (ACL) is updated.

## Strategy
The rule monitors AWS WAF logs `@eventSource:waf*.amazonaws.com` and detects when the `@evt.name` is `UpdateWebACL`.  

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call on the account: {{@usr.account_id}}.
2. If the API call was not made legitimately by the user, rotate the user's credentials and investigate what other APIs were successfully accessed.
