---
aliases:
- 0kb-4zy-y2r
- /security_monitoring/default_rules/0kb-4zy-y2r
- /security_monitoring/default_rules/cloudtrail-aws-user-enumerated-api-keys-anomaly
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: cloudtrail
tactic: TA0007-discovery
title: Anomalous API Gateway API key reads by user
type: security_rules
---

## Goal
Detect when a user is enumerating API Gateway API keys.

## Strategy
Baseline `GetApiKeys` events by `@userIdentity.session_name` to surface anomalous `GetApiKeys` calls. 

## Triage and response
1. Investigate activity for the following ARN `{{@userIdentity.arn}}` using `{{@userIdentity.session_name}}`.
2. Review any other security signals for `{{@userIdentity.arn}}`.
