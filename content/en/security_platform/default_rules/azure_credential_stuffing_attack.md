---
aliases:
- ljt-3f4-8ty
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Credential Stuffing Attack on Azure
type: security_rules
---

## Goal

Detect and identify the network IP address when multiple user accounts have login attempt activities recorded.

## Strategy

Monitor Azure Active Directory and detect when any `@evt.category` is equal to `SignInLogs` and more than 1 of the `@evt.outcome` are equal to `false` and was initiated by the same network IP address.

Security Signal returns **HIGH** if`@evt.outcome` has value of `success` after multiple failed logins were initiated by the same network IP address.

## Triage & Response

1. Inspect the log and determine if this was a valid login attempt.
2. If the user was compromised, rotate user credentials.
