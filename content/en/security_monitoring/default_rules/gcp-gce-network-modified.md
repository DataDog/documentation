---
title: GCP GCE VPC Network Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.gce.route
security: compliance

aliases:
- 7d8-c83-6fd
---

## Overview

### Goal
Detect when a VPC network is created. 

### Strategy
This rule lets you monitor GCP GCE activity audit logs to determine when the following method is invoked to create a new VPC network:

* `beta.compute.networks.insert`

### Triage & Response
1. Review the VPC network.