---
aliases:
- b2e-a9g-30x
- /security_monitoring/default_rules/b2e-a9g-30x
- /security_monitoring/default_rules/gsuite-access-to-workspace-by-google
disable_edit: true
integration_id: gsuite
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gsuite
security: attack
source: gsuite
tactic: TA0001-initial-access
technique: T1199-trusted-relationship
title: Google Workspace accessed by Google
type: security_rules
---

## Goal
Create a signal when Google accesses your Google Workspace tenant using administrative tools. 

## Strategy
Monitor Google Workspace logs to detect `ACCESS` events, which are part of Google's [Access Transparency][1] logs.

## Triage and response
1. Determine the scope of Google's access activity, which can be found in the `ACCESS` event in the Google Workspace event log.
2. Review which Google Workspace user (`@event.parameters.OWNER_EMAIL`) and resources (`@event.parameters.RESOURCE_NAME`) were accessed by Google.
3. Investigate the resource(s) being accessed to determine if there is a legitimate reason it should be reviewed by Google.

[1]: https://support.google.com/a/answer/9230474?hl=en
