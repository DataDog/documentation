---
title: GCP Service Account Key Created
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.service.account
security: compliance

aliases:
- c17-28f-69c
---

## Overview

### Goal
Detect when a new service account key is created.  An attacker could use this key as a backdoor to your account. 

### Strategy
This rule lets you monitor GCP admin activity audit logs to detect the creation of a service account key. 

### Triage & Response
1. Contact the user who created the service account key to ensure they're managing the key securely.