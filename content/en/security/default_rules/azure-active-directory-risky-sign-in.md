---
aliases:
- lb6-1tt-tv9
- /security_monitoring/default_rules/lb6-1tt-tv9
- /security_monitoring/default_rules/azure-active-directory-risky-sign-in
disable_edit: true
integration_id: azure-active-directory
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure-active-directory
security: attack
source: azure
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Azure Active Directory Risky Sign-In
type: security_rules
---

## Goal
Detect whenever Azure Identity Protection categorizes an Azure Active Directory login as risky.

## Strategy
Monitor Azure Active Directory sign in activity (`@evt.name:"Sign-in activity"`) and generate a signal when Azure identifies the user as risky or compromised (`@properties.riskState:"atRisk" OR "confirmedCompromised"`). 

## Triage and response
1. Analyze the location (`@network.client.geoip.subdivision.name`) of `{{@usr.id}}` to determine if they're logging into from their usual location. 
2. If log in activity is not legitimate, disable `{{@usr.id}}` account.
3. Investigate any devices owned by `{{@usr.id}}`.

## Changelog
14 June 2022 - Fixed bug in rule query.
