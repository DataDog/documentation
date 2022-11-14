---
aliases:
- 8fc-9c9-c02
- /security_monitoring/default_rules/8fc-9c9-c02
- /security_monitoring/default_rules/gcp-unauthorized-sa-activity
disable_edit: true
integration_id: google-cloud-iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-iam
security: compliance
source: gcp
tactic: TA0007-discovery
title: GCP unauthorized service account activity
type: security_rules
---

## Goal
Detect when there is unauthorized activity by a service account in GCP.

## Strategy
Monitor GCP logs and detect when a service account makes an API request and the request returns the status code equal to `7` within the log attribute `@data.protoPayload.status.code`. The status code `7` indicates the service account did not have permission to make the API call.

## Triage and response
1. Investigate the service account:`{{@usr.id}}` that made the unauthorized calls and confirm if there is a misconfiguration in IAM permissions or if an attacker compromised the service account.
2. If unauthorized, revoke access of compromised service account and rotate credentials.

## Changelog
22 June 2022 - Updated query, rule case and triage.
