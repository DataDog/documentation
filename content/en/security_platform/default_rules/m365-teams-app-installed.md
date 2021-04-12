---
aliases:
- 8dl-66d-taa
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: microsoft-365
title: Microsoft 365 Teams app installed
type: security_rules
---

### Goal
Detect when a user installs an app to Microsoft 365 Teams.

### Strategy
This rule monitors the Microsoft 365 logs for the event name `AppInstalled`.

### Triage & Response
1. Determine whether this app should be installed to Microsoft 365 teams.
