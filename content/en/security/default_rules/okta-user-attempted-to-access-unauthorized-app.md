---
aliases:
- 59a-cl0-v2r
- /security_monitoring/default_rules/59a-cl0-v2r
- /security_monitoring/default_rules/okta-user-attempted-to-access-unauthorized-app
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: okta
tactic: TA0007-discovery
title: Okta User Attempted to Access Unauthorized App
type: security_rules
---

## Goal
Detect when a user is denied access to an app.

## Strategy
This rule lets you monitor the following Okta events to detect when a user is denied access to an app:

* `app.generic.unauth_app_access_attempt`

## Triage and response
1. Determine whether or not the user should have access to this app.
2. Contact the user to determine whether they attempted to access this app or whether their account is compromised.
