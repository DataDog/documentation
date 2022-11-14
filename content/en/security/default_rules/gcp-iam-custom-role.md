---
aliases:
- d24-0f0-62d
- /security_monitoring/default_rules/d24-0f0-62d
- /security_monitoring/default_rules/gcp-iam-custom-role
disable_edit: true
integration_id: google-cloud-iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-iam
security: attack
source: gcp
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: GCP IAM custom role created or modified
type: security_rules
---

## Goal
Detect when a custom role is created or modified. 

## Strategy
Monitor GCP IAM activity audit logs to determine when any of the following methods are invoked:

* `google.iam.admin.v1.CreateRole`
* `google.iam.admin.v1.UpdateRole` 

## Triage and response
1. Review the log and role and ensure the permissions are scoped properly.
2. Review the users associated with the role and ensure they should have the permissions attached to the role.
