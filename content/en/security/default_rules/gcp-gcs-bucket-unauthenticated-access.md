---
aliases:
- 30a-b8b-80f
- /security_monitoring/default_rules/30a-b8b-80f
- /security_monitoring/default_rules/gcp-gcs-bucket-unauthenticated-access
disable_edit: true
integration_id: google-cloud-storage
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: google-cloud-storage
security: attack
source: gcp
tactic: TA0009-collection
technique: T1530-data-from-cloud-storage
title: GCP Bucket Contents Downloaded Without Authentication
type: security_rules
---

## Goal
Detect unauthenticated access to an object in a GCS bucket (`bucket_name`).

## Strategy 
Monitor GCS bucket (`bucket_name`) for get requests(`@evt.name:storage.objects.get`) made by unauthenticated users (`@usr.id`).

## Triage and response
Investigate the logs and determine whether or not the accessed bucket: {{bucket_name}} should be accessible to unauthenticated users.

## Changelog
* 27 October 2022 - updated tags.
