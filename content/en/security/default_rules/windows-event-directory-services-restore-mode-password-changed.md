---
aliases:
- 4f3-9ds-lrb
- /security_monitoring/default_rules/4f3-9ds-lrb
- /security_monitoring/default_rules/windows-event-directory-services-restore-mode-password-changed
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
title: Windows Directory Service Restore Mode password changed
type: security_rules
---

## Goal
Detect when a user resets the Directory Services Restore Mode (DSRM). The DSRM enabled emergency access to a Domain Controller. The DSRM user is a local administrator account that can be utilized for persistence. 

## Strategy
Monitoring of Windows event logs where `@evt.id` is `4794`.

## Triage and response
Verify if `{{@Event.UserData.LogFileCleared.SubjectUserName}}` has a legitimate reason to change the DSRM password on `{{host}}`.
