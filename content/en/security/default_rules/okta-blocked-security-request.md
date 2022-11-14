---
aliases:
- hzd-556-lum
- /security_monitoring/default_rules/hzd-556-lum
- /security_monitoring/default_rules/okta-blocked-security-request
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: okta
title: Okta blocked numerous requests from a malicious IP
type: security_rules
---

## Goal
Detect when a request is blocked due to a block list rule (such as an IP network zone or location rule).

## Strategy
This rule lets you monitor the following Okta events to detect when a malicious IP address communicates with your Okta account:

* `security.request.blocked`

## Triage & Response
1. Verify with the owner of `{{@usr.name}}` that they were attempting a request to `{{@target_app}}`.
2. If the request cannot be verified with the user, correlate with other log sources to see if the blocked IP in the `title` of `{{@title}}` has communicated elsewhere on the network.
