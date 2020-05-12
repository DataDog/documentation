---
title: GCP Bucket Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.gcs.bucket
security: compliance

aliases:
- 6c5-db7-1b4
---

## Overview

### Goal
Detect when an administrative change to a GCS Bucket has been made. This could change the retention policy or bucket lock. For more information, see the [GCS Bucket Lock docs][1].

### Strategy
This rule lets you monitor GCS bucket admin activity audit logs to determine if a bucket has been updated with the following method:

* `storage.buckets.update`

### Triage & Response
1. Review the bucket to ensure that it is properly configured.

[1]: https://cloud.google.com/storage/docs/bucket-lock
