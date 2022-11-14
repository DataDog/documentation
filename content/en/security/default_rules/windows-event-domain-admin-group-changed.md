---
aliases:
- p9l-g28-nxb
- /security_monitoring/default_rules/p9l-g28-nxb
- /security_monitoring/default_rules/windows-event-domain-admin-group-changed
disable_edit: true
integration_id: windows
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: windows
security: attack
source: windows
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Windows Domain Admin Group Changed
type: security_rules
---

## Goal
Detect when the Domain Administrator group is modified.

## Strategy
Monitoring of Windows event logs where `@evt.id` is 4737 and the `@Event.EventData.Data.TargetUserName:"Domain Admins"`

## Triage & Response
Verify if `{{@Event.EventData.Data.SubjectUserName}}` has a legitimate reason for changing the `Domain Admins` group
