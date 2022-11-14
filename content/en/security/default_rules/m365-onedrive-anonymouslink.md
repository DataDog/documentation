---
aliases:
- 7n1-x5b-ds7
- /security_monitoring/default_rules/7n1-x5b-ds7
- /security_monitoring/default_rules/m365-onedrive-anonymouslink
disable_edit: true
integration_id: onedrive
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: onedrive
source: microsoft-365
tactic: TA0010-exfiltration
title: Microsoft 365 OneDrive Anonymous Link Created
type: security_rules
---

## Goal
Detect when a user creates an anonymous link for a Microsoft 365 document in OneDrive. This would allow any unauthenticated user to access this document, if they had the link.

## Strategy
This rule monitors the Microsoft 365 logs for the event name `AnonymousLinkCreated`.

## Triage and response
1. Determine whether this document should be available anonymously.

## Changelog
* 4 October 2022 - Updated severity.
