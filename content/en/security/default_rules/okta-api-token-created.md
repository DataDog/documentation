---
aliases:
- 020-008-4aa
- /security_monitoring/default_rules/020-008-4aa
- /security_monitoring/default_rules/okta-api-token-created
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: okta
tactic: TA0003-persistence
title: Okta API Token Created or Enabled
type: security_rules
---

## Goal
Detect when a new Okta API token is created.

## Strategy
This rule lets you monitor the following Okta event to detect when a new Okta API token is created:

* `system.api_token.create`

## Triage and response
1. Contact the user who created the API token and ensure that the API token is needed.
