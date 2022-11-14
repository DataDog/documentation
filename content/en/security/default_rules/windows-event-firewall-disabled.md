---
aliases:
- p2q-2n2-wik
- /security_monitoring/default_rules/p2q-2n2-wik
- /security_monitoring/default_rules/windows-event-firewall-disabled
disable_edit: true
integration_id: windows
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: windows
security: attack
source: windows
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Windows Firewall Disabled
type: security_rules
---

## Goal
Detect when the Windows firewall is disabled.

## Strategy
Monitor the Windows event logs where `@evt.id` is `4950` and the `@Event.EventData.Data.SettingValue:No`.

## Triage and response
Verify if `{{@Event.System.Computer}}` has a legitimate reason for having the Windows firewall disabled.
