---
aliases:
- v47-nhm-752
- /security_monitoring/default_rules/v47-nhm-752
- /security_monitoring/default_rules/okta-mfa-factor-reset-attempted
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: okta
tactic: TA0006-credential-access
title: Okta MFA reset for user
type: security_rules
---

## Goal
Detect when the multi-factor authentication (MFA) factors for an enrolled Okta user are reset.

## Strategy
This rule lets you monitor the following Okta event to determine when a user's MFA factors are reset:

* `user.mfa.factor.reset_all`

An attacker may attempt to reset MFA factors in a bid to access other user accounts by registering new attacker-controlled MFA factors.

## Triage and response
1. Determine if the user: `{{@usr.email}}` should have reset the MFA factors of the targeted user.
2. If the change was not made by the user:
    * Disable the affected user accounts.
    * Rotate user credentials.
    * Return targeted users MFA factors to the last known good state.
    * Begin your organization's incident response process and investigate.
3. If the change was made by the user:
    * Determine if the user was authorized to make that change.
    * If **Yes**, ensure the targeted user has new MFA factors assigned in accordance with organization policies.
    * If **No**, verify there are no other signals from the Okta administrator: `{{@usr.email}}`.
