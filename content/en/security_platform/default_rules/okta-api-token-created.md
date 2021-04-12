---
aliases:
- 020-008-4aa
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: okta
title: Okta API Token Created or Enabled
type: security_rules
---

### Goal
Detect when a new Okta API token is created.

### Strategy
This rule lets you monitor the following Okta event to detect when a new Okta API token is created:

* `system.api_token.create`

### Triage & Response
1. Contact the user who created the API token and ensure that the API token is needed.
