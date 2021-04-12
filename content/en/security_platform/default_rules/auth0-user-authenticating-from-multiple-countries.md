---
aliases:
- 820-088-db1
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: auth0
tactic: TA0006-credential-access
title: Auth0 user authenticating from multiple countries
type: security_rules
---

## **Goal:**
Detect log ins from the same user from multiple countries within a short time frame.

## **Strategy:**
Utilize geo-ip data to detect when a user logs in from two IP addresses which are in different countries within a short time frame.

## **Triage & Response:**
1. See if 2FA was used for authentication.
2. Contact the user and see if this behavior is expected.
3. If the user was compromised, rotate the user credentials.
