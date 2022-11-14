---
aliases:
- 888-4d9-8a3
- /security_monitoring/default_rules/888-4d9-8a3
- /security_monitoring/default_rules/okta-user-denied-access-due-to-sign-in-policy
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: okta
title: Okta User Access Denied to Sign On
type: security_rules
---

## Goal
Detect when a user is denied access to sign on to an app based on sign-on policy.

## Strategy
This rule lets you monitor the following Okta events to detect when a user is denied access to sign on to an app based on sign-on policy:

* `application.policy.sign_on.deny_access`

## Triage and response
1. Inspect the `@target` array to determine why the user was denied access to sign on.
2. Contact the user to determine whether they attempted to access this app or whether their account is compromised.
