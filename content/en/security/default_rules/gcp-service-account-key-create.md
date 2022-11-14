---
aliases:
- c17-28f-69c
- /security_monitoring/default_rules/c17-28f-69c
- /security_monitoring/default_rules/gcp-service-account-key-create
disable_edit: true
integration_id: gcp.service.account
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.service.account
security: attack
source: gcp
tactic: TA0003-persistence
title: GCP service account key created
type: security_rules
---

## Goal
Detect when a new service account key is created.  An attacker could use this key as a backdoor to your account. 

## Strategy
This rule lets you monitor GCP admin activity audit logs to detect the creation of a service account key. 

## Triage and response
1. Contact the user who created the service account key to ensure they're managing the key securely.
