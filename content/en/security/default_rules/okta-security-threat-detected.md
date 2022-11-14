---
aliases:
- b73-5bc-c0b
- /security_monitoring/default_rules/b73-5bc-c0b
- /security_monitoring/default_rules/okta-security-threat-detected
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: okta
title: Malicious IP Communicating with Okta
type: security_rules
---

## Goal
Detect when an IP address identified as malicious by Okta's ThreatInsight communicates with your Okta account.

## Strategy
This rule lets you monitor the following Okta events to detect when a malicious IP address communicates with your Okta account:

* `security.threat.detected`

## Triage and response
1. Determine if the `@usr.email` is `Unknown` or is an authenticated user.
2. If the user is authenticated, conduct an investigation to determine if the IP address that is communicating with Okta is the user's IP address, or if the account is compromised.
3. Consider switching ThreatInsight from `log mode` to `log and block mode` to block future requests from IP addresses on the ThreatInsight threat intelligence list.
