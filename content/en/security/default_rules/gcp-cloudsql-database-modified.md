---
aliases:
- 60f-89d-fee
- /security_monitoring/default_rules/60f-89d-fee
- /security_monitoring/default_rules/gcp-cloudsql-database-modified
disable_edit: true
integration_id: gcp.cloudsql.database
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.cloudsql.database
security: compliance
source: gcp
title: GCP Cloud SQL database modified
type: security_rules
---

## Goal
Detect when a Cloud SQL DB has been modified.

## Strategy
This rule lets you monitor GCP Cloud SQL admin activity audit logs to determine when one of the following methods are invoked:

* `cloudsql.instances.create`
* `cloudsql.instances.create`
* `cloudsql.users.update`

## Triage and response
1. Review the Cloud SQL DB and ensure it is configured properly with the correct permissions.
