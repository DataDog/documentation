---
aliases:
- gh5-qhe-h9m
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: microsoft-365
title: Microsoft 365 SharePoint object shared with guest
type: security_rules
---

### Goal
Detect when a user shares a Microsoft 365 Sharepoint document with a guest.

### Strategy
This rule monitors the Microsoft 365 logs for the event name `SharingInvitationCreated` when the `TargetUserOrGroupType` is `Guest`.

### Triage & Response
1. Determine whether this document should be shared with the external user.
