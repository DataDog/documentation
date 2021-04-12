---
aliases:
- a7f-017-9cc
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.gcs.bucket
security: compliance
source: gcp
title: GCP Bucket permissions modified
type: security_rules
---

### Goal
Detect when permissions have changed on a GCS Bucket.

### Strategy
Monitor GCS bucket admin activity audit logs to determine the following method is invoked:

* `storage.setIamPermissions`

### Triage & Response
1. Review the bucket permissions and ensure they are not overly permissive.
