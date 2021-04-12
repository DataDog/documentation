---
aliases:
- c19-1d0-3b1
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.service.account
security: compliance
source: gcp
title: GCP service account created
type: security_rules
---

### Goal
Detect when a new service account is created.

### Strategy
This rule lets you monitor GCP admin activity audit logs to determine when a service account is created. 

### Triage & Response
1. Contact the user who created the service account and ensure that the account is needed and that the role is scoped properly.
