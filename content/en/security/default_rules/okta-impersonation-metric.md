---
aliases:
- 0fx-z3l-ggi
- /security_monitoring/default_rules/0fx-z3l-ggi
- /security_monitoring/default_rules/okta-impersonation-metric
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: okta
security: attack
source: okta
tactic: TA0001-initial-access
technique: T1199-trusted-relationship
title: Okta Impersonation
type: security_rules
---

## Goal
Detect an Okta session impersonation.

## Strategy
This rule lets you monitor the following Okta events to detect a user session impersonation:

* `user.session.impersonation.initiate`
* `user.session.impersonation.end`
* `user.session.impersonation.grant`
* `user.session.impersonation.extend`
* `user.session.impersonation.revoke`

These events indicate that the user: `{{@usr.email}}` has the effective permissions of the impersonated user. This is likely to occur through [Okta support access][1]. This [blog][2] illustrates the potential impact an attacker can cause by impersonation session.

## Triage and response
1. Contact your Okta administrator to ensure the user: `{{@usr.email}}` is authorized to impersonate a user session.
2. If the user impersonation session is not legitimate:
    * Task your Okta administrator to end the impersonation session.
    * Investigate the actions taken by the user `{{@usr.email}}` during the session and revert back to the last known good state.
    * Begin your company's incident response process and investigate.

[1]: https://support.okta.com/help/s/article/Granting-Access-to-Okta-Support?language=en_US
[2]: https://blog.cloudflare.com/cloudflare-investigation-of-the-january-2022-okta-compromise/
