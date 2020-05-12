---
title: GCP Bucket Enumerated
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.gcs.bucket
security: attack
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery

aliases:
- a6b-6c9-419
---

## Overview

### Goal
Detect when a service account lists out GCS Buckets.

### Strategy
This rule lets you monitor GCS bucket admin activity audit logs to determine when a service account invokes the following method:

* `storage.buckets.list`

### Triage & Response
1. Determine whether this service account should be making list bucket calls.
 * If the account was compromised, secure the account and investigate how it was compromised and if the account made other unauthorized calls.
 * If the owner of the service account intended to make the `ListBuckets` API call, consider whether this API call is needed. It could cause a security issue for the application to know the name of the bucket it needs to access. If it's not needed, modify this rule's filter to stop generating signals for this specific service account.