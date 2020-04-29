---
title: GCP GCE Network Route Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.gce.route
security: compliance

aliases:
- 3b3-32c-73c
---

## Overview

### Goal
Detect when a firewall rule is created or modified. 

### Strategy
This rule lets you monitor GCP GCE activity audit logs to determine if a firewall is being adjusted by showing you when any of the following methods are invoked:

* `beta.compute.routes.insert`
* `beta.compute.routes.patch`

### Triage & Response
1. Veirify that the GCP route is configured properly and that the user intended to modify the firewall.