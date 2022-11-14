---
aliases:
- ljt-3f4-8ty
- /security_monitoring/default_rules/ljt-3f4-8ty
- /security_monitoring/default_rules/azure_credential_stuffing_attack
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Credential Stuffing Attack on Azure
type: security_rules
---

## Goal

Detect and identify the network IP address or user agent when multiple user accounts have login attempt activities recorded.

## Strategy

Monitor Azure Active Directory and detect when any `@evt.category` is equal to `SignInLogs` and at least 5 of the `@evt.outcome` are equal to `false` by the same network IP address or user agent.

Security Signal returns **MEDIUM** if`@evt.outcome` has value of `success` after 5 multiple failed logins by the same network IP address or user agent.

## Triage and response

1. Inspect the log and determine if this was a valid login attempt.
2. If the user was compromised, rotate user credentials.

## Changelog
* 14 June 2022 - Updated triggering cases to align with other credential stuffing rules. Also updated other backend options to reduce noise levels.
* 26 October 2022 - Updated query.
