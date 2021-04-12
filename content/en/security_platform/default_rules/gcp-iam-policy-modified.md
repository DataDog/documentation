---
aliases:
- b58-97e-9f1
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.project
security: compliance
source: gcp
title: GCP IAM policy modified
type: security_rules
---

### Goal
Detect a change to the IAM policy. 

### Strategy
This rule lets you monitor GCP admin activity audit logs to determine when the `SetIamPolicy` method is invoked. 

### Triage & Response
1. Review the log and inspect the policy deltas (`@data.protoPayload.serviceData.policyDelta.bindingDeltas`) and ensure none of the actions are `REMOVE`.
