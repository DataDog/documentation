---
aliases:
- gh5-qhe-h9m
- /security_monitoring/default_rules/gh5-qhe-h9m
- /security_monitoring/default_rules/m365-sharepoint-shared-file-with-guest
disable_edit: true
integration_id: sharepoint
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: sharepoint
source: microsoft-365
tactic: TA0009-collection
technique: T1213-data-from-information-repositories
title: Microsoft 365 SharePoint object shared with guest
type: security_rules
---

## Goal
Detect when a user shares a Microsoft 365 Sharepoint document with a guest.

## Strategy
This rule monitors the Microsoft 365 logs for the event name `SharingInvitationCreated` when the `TargetUserOrGroupType` is `Guest`.

## Triage and response
1. Determine whether this document should be shared with the external user.
