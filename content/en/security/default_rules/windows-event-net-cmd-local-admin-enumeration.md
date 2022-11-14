---
aliases:
- sl8-aa0-qkv
- /security_monitoring/default_rules/sl8-aa0-qkv
- /security_monitoring/default_rules/windows-event-net-cmd-local-admin-enumeration
disable_edit: true
integration_id: windows
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: windows
tactic: TA0007-discovery
technique: T1087-account-discovery
title: Windows Net command executed to enumerate administrators
type: security_rules
---

## Goal
Detect when a user runs the `net` command to enumerate the `Administrators` group, which could be indicative of adversarial reconnaissance activity.

## Strategy
Monitoring of Windows event logs where `@evt.id` is `4799`, `@Event.EventData.Data.CallerProcessName` is `*net1.exe` and `@Event.EventData.Data.TargetUserName` is `Administrators`.

## Triage and response
Verify if `{{@Event.EventData.Data.SubjectUserName}}` has a legitimate reason to check for users in the Administrator group on `{{host}}`.
