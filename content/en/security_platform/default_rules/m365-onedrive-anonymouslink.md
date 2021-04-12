---
aliases:
- 7n1-x5b-ds7
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: microsoft-365
title: Microsoft 365 OneDrive Anonymous Link Created
type: security_rules
---

### Goal
Detect when a user creates an anonymous link for a Microsoft 365 document in OneDrive. This would allow any unauthenticated user to access this document, if they had the link.

### Strategy
This rule monitors the Microsoft 365 logs for the event name `AnonymousLinkCreated`.

### Triage & Response
1. Determine whether this document should be available anonymously.
