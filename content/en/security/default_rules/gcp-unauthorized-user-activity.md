---
aliases:
- dcf-339-120
- /security_monitoring/default_rules/dcf-339-120
- /security_monitoring/default_rules/gcp-unauthorized-user-activity
disable_edit: true
integration_id: google-cloud-iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-iam
security: compliance
source: gcp
tactic: TA0007-discovery
title: GCP unauthorized user activity
type: security_rules
---

## Goal
Detect when unauthorized activity by a user is detected in GCP.

## Strategy
Monitor GCP logs and detect when a user account makes an API request and the request returns the status code equal to `7` within the log attribute `@data.protoPayload.status.code`. The status code `7` indicates the user account did not have permission to make the API call.

## Triage and response
1. Investigate the user:`{{@usr.id}}` that made the unauthorized calls and confirm if there is a misconfiguration in IAM permissions or if an attacker compromised the user account.
2. If unauthorized, revoke access of compromised user account and rotate credentials.

## Changelog
22 June 2022 - Updated query, rule case and triage.
