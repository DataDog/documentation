---
aliases:
- 9rd-o7d-606
- /security_monitoring/default_rules/9rd-o7d-606
- /security_monitoring/default_rules/okta-one-time-refresh-token-attempted-reuse
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: okta
tactic: TA0006-credential-access
title: Okta one-time refresh token reused
type: security_rules
---

## Goal
Detect when an Okta [refresh token][1] is reused.

## Strategy
This rule lets you monitor the following Okta events when token reuse is detected:

* `app.oauth2.token.detect_reuse`
* `app.oauth2.as.token.detect_reuse`

An attacker that has access to a refresh token could query the organization's authorization server `/token` endpoint to obtain additional access tokens. The additional access tokens potentially allow the attacker to get unauthorized access to applications.

## Triage and response
1. Determine if the source IP `{{@network.client.ip}}` is anomalous within the organization:
    * Does threat intelligence indicate that this IP has been associated with malicious activity?
    * Is the geo-location or ASN uncommon for the organization?
    * Has the IP created a `app.oauth2.token.detect_reuse` or `app.oauth2.as.token.detect_reuse` event previously?
2. If the token reuse event has been determined to be malicious, carry out the following actions:
    * [Revoke compromised tokens][2].
    * Recycle the credentials of any impacted clients.
    * Begin your company's incident response process and investigate.

[1]: https://developer.okta.com/docs/guides/refresh-tokens/main/
[2]: https://developer.okta.com/docs/guides/revoke-tokens/main/
