---
aliases:
- pgl-8ie-264
- /security_monitoring/default_rules/pgl-8ie-264
- /security_monitoring/default_rules/gcp-anomalous-api-requests
disable_edit: true
integration_id: google-cloud-iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-iam
security: attack
source: gcp
tactic: TA0007-discovery
technique: T1580-cloud-infrastructure-discovery
title: GCP service account accessing anomalous number of GCP APIs
type: security_rules
---

## Goal
Detect when a GCP service account is compromised.

## Strategy 
Inspect the GCP Admin Activity Logs (`@data.logName:*%2Factivity`) and filter for only GCP Service Accounts (`@usr.id:*.iam.gserviceaccount.com`). Count the unique number of GCP API calls (`@evt.name`) which are being made for each service account (`@usr.id`). The anomaly detection will baseline each service account and then generate a security signal when a service account deviates from their baseline. 

To read more about GCP Audit Logs, you can read our blog post [here][1].

## Triage and response
Investigate the logs and determine whether or not the GCP Service Account is compromised.

## Changelog
* 17 October 2022 - Updated tags.

[1]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/
