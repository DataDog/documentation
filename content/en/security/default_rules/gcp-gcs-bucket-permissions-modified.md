---
aliases:
- a7f-017-9cc
- /security_monitoring/default_rules/a7f-017-9cc
- /security_monitoring/default_rules/gcp-gcs-bucket-permissions-modified
disable_edit: true
integration_id: google-cloud-storage
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-storage
security: compliance
source: gcp
title: GCP Bucket permissions modified
type: security_rules
---

## Goal
Detect when permissions have changed on a GCS Bucket.

## Strategy
Monitor GCS bucket admin activity audit logs to determine the following method is invoked:

* `storage.setIamPermissions`

## Triage and response
1. Review the bucket permissions and ensure they are not overly permissive.

## Changelog
5 Septermber 2022 - Updated rule query
