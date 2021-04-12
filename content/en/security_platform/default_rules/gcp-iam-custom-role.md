---
aliases:
- d24-0f0-62d
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.iam.role
security: compliance
source: gcp
title: GCP IAM custom role created or modified
type: security_rules
---

### Goal
Detect when a custom role is created or modified. 

### Strategy
Monitor GCP IAM activity audit logs to determine when any of the following methods are invoked:

* `google.iam.admin.v1.CreateRole`
* `google.iam.admin.v1.UpdateRole` 

### Triage & Response
1. Review the log and role and ensure the permissions are scoped properly.
2. Review the users associated with the role and ensure they should have the permissions attached to the role.
