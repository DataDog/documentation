---
aliases:
- 6a7-df6-9aa
- /security_monitoring/default_rules/6a7-df6-9aa
- /security_monitoring/default_rules/auth0-credential-stuffing-attack
disable_edit: true
integration_id: auth0
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Credential stuffing attack on Auth0
type: security_rules
---

## Goal
Detect Account Take Over (ATO) through credential stuffing attack.

## Strategy
**To determine a successful attempt:** Detect a high number of failed logins from at least ten unique users and at least one successful login for a user. This generates a `HIGH` severity signal.

**To determine an unsuccessful attempt:** Detect a high number of failed logins from at least ten unique users. This generates an `INFO` severity signal.

## Triage and response
1. Inspect the logs to see if this was a valid login attempt.
2. See if 2FA was authenticated
3. If the user was compromised, rotate user credentials.

## Changelog
13 June 2022 - Updated Keep Alive window and evaluation window to reduce rule noise.
