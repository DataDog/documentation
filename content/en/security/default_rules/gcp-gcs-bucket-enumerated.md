---
aliases:
- a6b-6c9-419
- /security_monitoring/default_rules/a6b-6c9-419
- /security_monitoring/default_rules/gcp-gcs-bucket-enumerated
disable_edit: true
integration_id: google-cloud-storage
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-storage
security: attack
source: gcp
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
title: GCP Bucket enumerated
type: security_rules
---

## Goal
Detect when a service account lists out GCS Buckets.

## Strategy
This rule lets you monitor GCS bucket admin activity audit logs to determine when a service account invokes the following method:

* `storage.buckets.list`

## Triage and response
1. Determine whether this service account should be making list bucket calls.
 * If the account was compromised, secure the account and investigate how it was compromised and if the account made other unauthorized calls.
 * If the owner of the service account intended to make the `ListBuckets` API call, consider whether this API call is needed. It could cause a security issue for the application to know the name of the bucket it needs to access. If it's not needed, modify this rule's filter to stop generating signals for this specific service account.
