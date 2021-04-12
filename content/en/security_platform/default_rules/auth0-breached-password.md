---
aliases:
- 6f0-939-666
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: auth0
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Auth0 user logged in with a breached password
type: security_rules
---

## **Goal:**
Detect when a user logs in with a breached password.

## **Strategy:**
Auth0 logs an event when a user logs in with a breached password. When this event is detected, Datadog generates a `MEDIUM` severity Security Signal.

You can see more information on how Auth0 detects breached passwords on their [documentation][1].

## **Triage & Response:**
1. Inspect the policy and user location to see if this was a login from approved location
2. See if 2FA was authenticated
3. If the user was compromised, rotate user credentials.

[1][https://auth0.com/docs/anomaly-detection/brute-force-protection]
