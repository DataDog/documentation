---
aliases:
- rkm-8xh-x8b
- /security_monitoring/default_rules/rkm-8xh-x8b
- /security_monitoring/default_rules/aws-waf-webacl-delete
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
title: AWS WAF web access control list deleted
type: security_rules
---

## Goal
Detect when an AWS Web Application Firewall (WAF) Access Control List (ACL) is deleted.

## Strategy
The rule monitors AWS WAF logs `@eventSource:waf*.amazonaws.com` and detects when the `@evt.name` is `DeleteWebACL`.  

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call on the account: {{@usr.account_id}}.
2. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.
