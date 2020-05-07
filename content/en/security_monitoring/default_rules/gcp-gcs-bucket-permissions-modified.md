---
title: GCP Bucket Permissions Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.gcs.bucket
security: compliance

aliases:
- a7f-017-9cc
---

## Overview

### Goal
Detect when permissions have changed on a GCS Bucket.

### Strategy
Monitor GCS bucket admin activity audit logs to determine the following method is invoked:

* `storage.setIamPermissions`

### Triage & Response
1. Review the bucket permissions and ensure they are not overly permissive.