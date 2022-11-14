---
aliases:
- c13-d72-723
- /security_monitoring/default_rules/c13-d72-723
- /security_monitoring/default_rules/gcp-anomalous-access-denied-sa
disable_edit: true
integration_id: google-cloud-iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-iam
security: attack
source: gcp
tactic: TA0004-privilege-escalation
technique: T1078-valid-accounts
title: Access denied for GCP Service Account
type: security_rules
---

## Goal
Detect when a GCP service account (`@usr.id:*.iam.gserviceaccount.com`) exhibits access denied behavior that deviates from normal.

## Strategy 
Inspect the GCP Service Account (`@usr.id:*.iam.gserviceaccount.com`) for errors (`@data.protoPayload.status.code:7`) caused by denied permissions (`@evt.outcome`). The anomaly detection will baseline each service account and then generate a security signal when a service account deviates from their baseline. 

## Triage and response
Investigate the logs and determine whether or not the GCP Service Account {{@usr.id}} is compromised.
