---
aliases:
- 8x3-97g-35a
- /security_monitoring/default_rules/8x3-97g-35a
- /security_monitoring/default_rules/gcp-service-account-impersonation-activity-gcploit
disable_edit: true
integration_id: gcp-cloud-functions
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp-cloud-functions
security: attack
source: gcp
tactic: TA0004-privilege-escalation
technique: T1078-valid-accounts
title: GCP Service Account Impersonation using GCPloit Exploitation Framework
type: security_rules
---

## Goal
Detect possible GCP service account impersonation activity using the gcploit exploitation framework.

## Strategy
Monitor GCP Cloud Function Logs `source:gcp.cloud.function` and detect if the following sequence of events has occurred within a one minute window:
* Function is created - `google.cloud.functions.v1.CloudFunctionsService.CreateFunction` with a timeout of 539s (`@data.protoPayload.request.function.timeout:539s`)
* Function's IAM access control policy is enumerated - `google.cloud.functions.v1.CloudFunctionsService.GetIamPolicy`
* Function's IAM access control policy is set - `google.cloud.functions.v1.CloudFunctionsService.SetIamPolicy`

## Triage & Response
1. Investigate if the function:`{{@function.name}}` was intentionally created by user `{{@usr.id}}`.
2. If unauthorized:
   * Revoke access of compromised credentials.
   * Remove unauthorized cloud functions.
   * Investigate other activities performed by the user `{{@usr.id}}` using the Cloud SIEM - User Investigation dashboard.
