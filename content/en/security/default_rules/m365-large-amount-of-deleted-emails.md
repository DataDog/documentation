---
aliases:
- jq3-281-esg
- /security_monitoring/default_rules/jq3-281-esg
- /security_monitoring/default_rules/m365-large-amount-of-deleted-emails
disable_edit: true
integration_id: exchange-server
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: exchange-server
security: attack
source: microsoft-365
tactic: TA0040-impact
title: Microsoft 365 Anomalous Amount of Deleted Emails
type: security_rules
---

## Goal
Detect when an anomalous amount of emails are deleted from Microsoft 365 Exchange.

## Strategy
Monitor Microsoft 365 Exchange audit logs to look for events with an `@evt.name` value of `HardDelete`, where the `@Folder.Path` is the inbox (`*Inbox*`).

## Triage and response
1. Determine if the user `{{@usr.id}}` intended to delete the observed emails.
2. If `{{@usr.id}}` is not responsible for the email deletions, investigate `{{@usr.id}}` for anomalous activity. If necessary, initiate your company's incident response (IR) process.
