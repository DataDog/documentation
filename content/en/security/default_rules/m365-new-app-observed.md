---
aliases:
- kc5-vk1-ysw
- /security_monitoring/default_rules/kc5-vk1-ysw
- /security_monitoring/default_rules/m365-new-app-observed
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: microsoft-365
security: attack
source: microsoft-365
tactic: TA0003-persistence
title: A new Microsoft 365 application was installed
type: security_rules
---

## Goal
Detect when a new Microsoft 365 app is installed as a means of establishing persistence.

## Strategy
Monitor Microsoft 365 audit logs to look for events with an `@evt.name` value of `Add application.` and event `@evt.outcome` of `Success`.

## Triage and response
1. Determine if the user `{{@usr.email}}` intended to install `{{@ObjectId}}`.
2. If `{{@usr.email}}` is not responsible for installing `{{@ObjectId}}`, investigate `{{@usr.email}}` for anomalous activity. If necessary, initiate your company's incident response (IR) process.
