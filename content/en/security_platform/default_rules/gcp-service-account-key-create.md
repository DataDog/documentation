---
aliases:
- c17-28f-69c
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.service.account
security: compliance
source: gcp
title: GCP service account key created
type: security_rules
---

### Goal
Detect when a new service account key is created.  An attacker could use this key as a backdoor to your account. 

### Strategy
This rule lets you monitor GCP admin activity audit logs to detect the creation of a service account key. 

### Triage & Response
1. Contact the user who created the service account key to ensure they're managing the key securely.
