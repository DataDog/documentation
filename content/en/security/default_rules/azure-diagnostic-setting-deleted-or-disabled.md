---
aliases:
- apn-0ib-a6f
- /security_monitoring/default_rules/apn-0ib-a6f
- /security_monitoring/default_rules/azure-diagnostic-setting-deleted-or-disabled
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Azure diagnostic setting deleted or disabled
type: security_rules
---

## Goal
Detect when a diagnostic setting is deleted which can disable centralized logging and metrics on Azure.

## Strategy
Monitor Azure logs where `@evt.name` is `"MICROSOFT.INSIGHTS/DIAGNOSTICSETTINGS/DELETE"` and `@evt.outcome` is `Success`.

## Triage and response
1. Inspect the diagnostic setting resource which is found in `@resourceId`.
2. Verify that the user (`{{@usr.id}}`) to determine if the removal of the resource is legitimate.
