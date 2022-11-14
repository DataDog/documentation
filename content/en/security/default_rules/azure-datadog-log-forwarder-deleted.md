---
aliases:
- qh4-l0f-cy9
- /security_monitoring/default_rules/qh4-l0f-cy9
- /security_monitoring/default_rules/azure-datadog-log-forwarder-deleted
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure
security: attack
source: azure
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Azure Datadog Log Forwarder Deleted
type: security_rules
---

## Goal
Detect when the Datadog Azure function is deleted which will prevent Azure logs from being sent to Datadog.

## Strategy
Monitor Azure logs where `@evt.name` is `"MICROSOFT.WEB/SITES/DELETE"`, `@evt.outcome` is `Success`, and the `@resourceID` contains `DATADOG` and `LOG`. This rule does not work if the the Azure resource group or Azure function does not contain `DATADOG` or `LOG`.

## Triage and response
1. Verify the Azure function (`@resourceId`) is responsible for forwarding logs to Datadog.
2. Determine if there is a legitimate reason for deleting the Azure function.
3. If activity is not expected, investigate activity from the service principal (`@identity.authorization.evidence`) or user (`{{@usr.id}}`).
