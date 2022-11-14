---
aliases:
- mft-lau-5u0
- /security_monitoring/default_rules/mft-lau-5u0
- /security_monitoring/default_rules/okta-admin-role-assigned-to-user
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: okta
tactic: TA0004-privilege-escalation
title: Okta administrator role assigned to user
type: security_rules
---

## Goal
Detect when administrative privileges are provisioned to an Okta user.

## Strategy
This rule lets you monitor the following Okta event to detect when administrative privileges are provisioned:

* `user.account.privilege.grant`

## Triage and response
1. Contact the Okta administrator: `{{@usr.email}}` to confirm that the user or users should have administrative privileges.
2. If the change was **not** authorized, verify there are no other signals from the Okta administrator: `{{@usr.email}}`.
