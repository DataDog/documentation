---
aliases:
- f31-2il-7kq
- /security_monitoring/default_rules/f31-2il-7kq
- /security_monitoring/default_rules/windows-event-user-added-to-domain-admins-group
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
title: Windows User Added to Domain Admin Group
type: security_rules
---

## Goal
Detect when a user is added to the Domain Administrator group. A rogue active directory account can added to the Domain Admins group.

## Strategy
Monitoring of Windows event logs where `@evt.id` is `4728` and the `@Event.EventData.Data.TargetUserName:"Domain Admins"`

## Triage & Response
Verify if `{{@Event.EventData.Data.TargetUserName}}` should be added to the `Domain Admins` group
