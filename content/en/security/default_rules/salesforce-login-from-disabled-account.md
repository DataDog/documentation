---
aliases:
- kcl-yns-z9l
- /security_monitoring/default_rules/kcl-yns-z9l
- /security_monitoring/default_rules/salesforce-login-from-disabled-account
disable_edit: true
integration_id: salesforce
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: salesforce
security: attack
source: salesforce
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Salesforce Login from Disabled Account
type: security_rules
---

## Goal
Detect when a disabled account attempts to log into Salesforce

## Strategy
Inspect Salesforce logs and determine if there is a login attempt (`@evt.name:LoginEvent`) from from a disabled account (`@status:\"User is Inactive\"`). If more than ten attempts to authenticate to a disabled account a `MEDIUM` severity signal is created.

## Triage and response
1. Determine if the IP (`@network.client.ip`) has attempted to log into other accounts.
