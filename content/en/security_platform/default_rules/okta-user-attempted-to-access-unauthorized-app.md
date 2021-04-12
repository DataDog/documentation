---
aliases:
- 59a-cl0-v2r
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: okta
title: Okta User Attempted to Access Unauthorized App
type: security_rules
---

### Goal
Detect when a user is denied access to an app.

### Strategy
This rule lets you monitor the following Okta events to detect when a user is denied access to an app:

* `app.generic.unauth_app_access_attempt`

### Triage & Response
1. Determine whether or not the user should have access to this app.
2. Contact the user to determine whether they attempted to access this app or whether their account is compromised.
