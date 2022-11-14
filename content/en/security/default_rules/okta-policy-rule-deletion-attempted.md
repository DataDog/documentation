---
aliases:
- wiz-kf3-3yo
- /security_monitoring/default_rules/wiz-kf3-3yo
- /security_monitoring/default_rules/okta-policy-rule-deletion-attempted
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: okta
title: Okta policy rule deleted
type: security_rules
---

## Goal
Detect when an Okta policy rule is deleted.

## Strategy
This rule lets you monitor the following Okta event to detect when a policy rule is deleted:

* `policy.rule.delete`

## Triage and response
1. Contact the Okta administrator to confirm that the user: `{{@usr.email}}` should be deleting policy rules.
2. If the change was **not** authorized, verify there are no other signals from the user: `{{@usr.email}}`.
