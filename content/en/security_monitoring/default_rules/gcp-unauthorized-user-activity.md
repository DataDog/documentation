---
title: GCP Unauthorized User Activity
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
security: compliance

aliases:
- dcf-339-120
---

## Overview

### Goal
Detect when unauthorized activity by a user is detected in GCP

### Strategy
Monitor GCP logs and detect when the error message of `PERMISSION_DENIED` is returned for a user account.

### Triage & Response
1. Determine the user who made the unauthorized calls.
2. Determine if there is a misconfiguration in IAM permissions or whether an attacker has compromised the user account.