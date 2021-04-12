---
aliases:
- 154-6ed-00d
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Brute force attack on an Auth0 user
type: security_rules
---

## **Goal:**
Detect a brute force attack on a user. 

## **Strategy:**
**To determine a successful attempt:** Detect when the same user fails to login five times and then successfully logs in. This generates a `MEDIUM` severity signal.

**To determine an unsuccessful attempt:** Detect when the same user fails to login five times. This generates an `INFO` severity signal.

## **Triage & Response:**
1. Inspect the logs to see if this was a valid login attempt.
2. See if 2FA was authenticated
3. If the user was compromised, rotate user credentials.
