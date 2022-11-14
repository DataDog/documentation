---
aliases:
- h56-k5y-xp3
- /security_monitoring/default_rules/h56-k5y-xp3
- /security_monitoring/default_rules/gcp-service-account-impersonation-activity-access-token
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
title: GCP Service Account impersonation activity using access token generation
type: security_rules
---

## Goal
Detect GCP service account impersonation activity through the use of access tokens.

## Strategy
Monitor GCP Admin Activity audit logs for event `@evt.name:GenerateAccessToken`:
* Successful Attempts: `@data.protoPayload.authorizationInfo.granted:true`
* Failed Attempts: `@evt.outcome:PERMISSION_DENIED`

## Triage & Response
1. Investigate if the user `{{@usr.id}}` from IP address:`{{@network.client.ip}}` intended to perform this activity.
2. If unauthorized:
   * Revoke access of compromised user and service account.
   * Investigate other activities performed by the user `{{@usr.id}}` using the Cloud SIEM - User Investigation dashboard.
   * Investigate other activities performed by the IP `{{@network.client.ip}}` using the Cloud SIEM - IP Investigation dashboard.
