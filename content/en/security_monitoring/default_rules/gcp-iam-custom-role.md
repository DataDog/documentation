---
title: GCP IAM Custom Role Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.iam.role
security: compliance

aliases:
- d24-0f0-62d
---

## Overview

### Goal
Detect when a custom role is created or modified. 

### Strategy
Monitor GCP IAM activity audit logs to determine when any of the following methods are invoked:

* `google.iam.admin.v1.CreateRole`
* `google.iam.admin.v1.UpdateRole` 

### Triage & Response
1. Review the log and role and ensure the permissions are scoped properly.
2. Review the users associated with the role and ensure they should have the permissions attached to the role.