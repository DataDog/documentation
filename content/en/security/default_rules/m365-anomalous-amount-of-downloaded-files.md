---
aliases:
- lmk-gfu-na5
- /security_monitoring/default_rules/lmk-gfu-na5
- /security_monitoring/default_rules/m365-anomalous-amount-of-downloaded-files
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: microsoft-365
security: attack
source: microsoft-365
tactic: TA0010-exfiltration
title: Microsoft 365 Anomalous Amount of Downloaded files
type: security_rules
---

## Goal
Detect when a Microsoft 365 user downloads an anomalous amount of files. This could be an indicator of data exfilteration.

## Strategy
Monitor Microsoft 365 audit logs to look for an anomalous amount of logs with an `@evt.name` value of `@evt.name:FileDownloaded`.

## Triage and response
1. Determine if the user `{{@usr.email}}` intended to download the files.
2. If `{{@usr.email}}` is not responsible for file downloads, investigate `{{@usr.email}}` for anomalous activity. If necessary, initiate your company's incident response (IR) process.
