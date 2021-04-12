---
aliases:
- 60f-89d-fee
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.cloudsql.database
security: compliance
source: gcp
title: GCP Cloud SQL database modified
type: security_rules
---

### Goal
Detect when a Cloud SQL DB has been modified.

### Strategy
This rule lets you monitor GCP Cloud SQL admin activity audit logs to determine when one of the following methods are invoked:

* `cloudsql.instances.create`
* `cloudsql.instances.create`
* `cloudsql.users.update`

### Triage & Response
1. Review the Cloud SQL DB and ensure it is configured properly with the correct permissions.
