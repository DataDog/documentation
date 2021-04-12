---
aliases:
- dcf-339-120
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: gcp
title: GCP unauthorized user activity
type: security_rules
---

### Goal
Detect when unauthorized activity by a user is detected in GCP

### Strategy
Monitor GCP logs and detect when a user account makes an API request and the request returns the status code equal to `7` within the log attribute `@data.protoPayload.status.code`. The status code `7` indicates the user account did not have permission to make the API call.

### Triage & Response
1. Determine the user who made the unauthorized calls.
2. Determine if there is a misconfiguration in IAM permissions or whether an attacker has compromised the user account.
