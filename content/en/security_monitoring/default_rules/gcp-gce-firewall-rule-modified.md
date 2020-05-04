---
title: GCP GCE Firewall Rule Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.gce.firewall.rule
security: compliance

aliases:
- 522-190-266
---

## Overview

### Goal
Detect when a firewall rule is created, modified or deleted. 

### Strategy
Monitor GCP GCE activity audit logs to determine when any of the following methods are invoked:

* `v1.compute.firewalls.delete`
* `v1.compute.firewalls.insert`
* `v1.compute.firewalls.patch` 

### Triage & Response
1. Review the log and role and ensure the permissions are scoped properly.
2. Review the users associated with the role and ensure they should have the permissions attached to the role.