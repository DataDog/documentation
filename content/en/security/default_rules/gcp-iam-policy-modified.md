---
aliases:
- b58-97e-9f1
- /security_monitoring/default_rules/b58-97e-9f1
- /security_monitoring/default_rules/gcp-iam-policy-modified
disable_edit: true
integration_id: gcp.project
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.project
security: attack
source: gcp
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: GCP IAM policy modified
type: security_rules
---

## Goal
Detect a change to the IAM policy. 

## Strategy
This rule lets you monitor GCP admin activity audit logs to determine when the `SetIamPolicy` method is invoked. 

## Triage and response
1. Review the log and inspect the policy deltas (`@data.protoPayload.serviceData.policyDelta.bindingDeltas`) and ensure none of the actions are `REMOVE`.
