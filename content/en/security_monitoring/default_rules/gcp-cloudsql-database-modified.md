---
title: GCP Cloud SQL Database Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.cloudsql.database
security: compliance

aliases:
- 60f-89d-fee
---

## Overview

### Goal
Detect when a Cloud SQL DB has been modified.

### Strategy
This rule lets you monitor GCP Cloud SQL admin activity audit logs to determine when one of the following methods are invoked:

* `cloudsql.instances.create`
* `cloudsql.instances.create`
* `cloudsql.users.update`

### Triage & Response
1. Review the Cloud SQL DB and ensure it is configured properly with the correct permissions.