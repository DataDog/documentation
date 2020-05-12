---
title: GCP Service Account Created
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.service.account
security: compliance

aliases:
- c19-1d0-3b1
---

## Overview

### Goal
Detect when a new service account is created.

### Strategy
This rule lets you monitor GCP admin activity audit logs to determine when a service account is created. 

### Triage & Response
1. Contact the user who created the service account and ensure that the account is needed and that the role is scoped properly.