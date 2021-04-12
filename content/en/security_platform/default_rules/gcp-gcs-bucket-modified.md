---
aliases:
- 6c5-db7-1b4
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.gcs.bucket
security: compliance
source: gcp
title: GCP Bucket modified
type: security_rules
---

### Goal
Detect when an administrative change to a GCS Bucket has been made. This could change the retention policy or bucket lock. For more information, see the [GCS Bucket Lock docs][1].

### Strategy
This rule lets you monitor GCS bucket admin activity audit logs to determine if a bucket has been updated with the following method:

* `storage.buckets.update`

### Triage & Response
1. Review the bucket to ensure that it is properly configured.

[1]: https://cloud.google.com/storage/docs/bucket-lock
