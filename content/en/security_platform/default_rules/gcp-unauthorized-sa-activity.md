---
aliases:
- 8fc-9c9-c02
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: gcp
title: GCP unauthorized service account activity
type: security_rules
---

### Goal
Detect when there is unauthorized activity by a service account in GCP

### Strategy
Monitor GCP logs and detect when a service account makes an API request and the request returns the status code equal to `7` within the log attribute `@data.protoPayload.status.code`. The status code `7` indicates the service account did not have permission to make the API call.

### Triage & Response
1. Determine the service account that made the unauthorized calls.
2. Investigate if there is a misconfiguration in IAM permissions or if an attacker compromised the service account
