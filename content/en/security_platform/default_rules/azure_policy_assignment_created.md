---
aliases:
- f72-zu8-tjj
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: azure
title: Azure Policy Assignment Created
type: security_rules
---

## Goal

Detect when an Azure policy assignment has been created.

## Strategy

Monitor Azure activity logs and detect when the `@evt.name` is equal to `MICROSOFT.AUTHORIZATION/POLICYASSIGNMENTS/WRITE` and `@evt.outcome` is equal to `Success`.

## Triage && Response

1. Inspect the policy assignment and determine if an unsolicited change was made on any Azure resources.
