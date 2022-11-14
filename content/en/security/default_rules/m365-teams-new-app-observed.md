---
aliases:
- qdk-m4v-gw0
- /security_monitoring/default_rules/qdk-m4v-gw0
- /security_monitoring/default_rules/m365-teams-new-app-observed
disable_edit: true
integration_id: microsoft-teams
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: microsoft-teams
security: attack
source: microsoft-365
tactic: TA0003-persistence
technique: T1137-office-application-startup
title: A new Microsoft 365 Teams app is observed
type: security_rules
---

## Goal
Detect when a new Microsoft 365 teams app is installed as a means of establishing persistence.

## Strategy
Monitor Microsoft 365 audit logs to look for events with an `@evt.name` value of `AppInstalled`, where the `AddOnType` has a value of `4` and a new `@AddOnName` is observed.

## Triage and response
1. Determine if the user `{{@usr.email}}` intended to install `{{@AddOnName}}`.
2. If `{{@usr.email}}` is not responsible for installing `{{@AddOnName}}`, investigate `{{@usr.email}}` for anomalous activity. If necessary, initiate your company's incident response (IR) process.
