---
aliases:
- 52l-d2d-n78
- /security_monitoring/default_rules/52l-d2d-n78
- /security_monitoring/default_rules/windows-event-audit-log-cleared
disable_edit: true
integration_id: windows
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: windows
tactic: TA0005-defense-evasion
technique: T1070-indicator-removal
title: Windows Audit Log Cleared
type: security_rules
---

## Goal
Detect when a user clears Windows Security logs.

## Strategy
Monitoring of Windows event logs where `@evt.id` is `1102`.

## Triage and response
Verify if `{{@Event.UserData.LogFileCleared.SubjectUserName}}` has a legitimate reason to clear the security event logs on `{{host}}`.

## Changelog
* 27 October 2022 - updated tags.
