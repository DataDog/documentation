---
title: GCP Unauthorized Service Account Activity
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
security: compliance

aliases:
- 8fc-9c9-c02
---

## Overview

### Goal
Detect when there is unauthorized activity by a service account in GCP

### Strategy
Monitor GCP logs and detect when the error message of `PERMISSION_DENIED` is returned for a service account.

### Triage & Response
1. Determine the service account that made the unauthorized calls.
2. Investigate if there is a misconfiguration in IAM permissions or if an attacker compromised the service account