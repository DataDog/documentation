---
title: GCP Logging Sink Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.project
security: compliance

aliases:
- e74-752-b34
---

## Overview

### Goal
Detect when a change to a GCP logging sink has been made. This could stop audit logs from being sent to Datadog.

### Strategy
Monitor GCP admin activity audit logs to determine when any of the following methods are invoked:

* `google.logging.v2.ConfigServiceV2.UpdateSink`
* `google.logging.v2.ConfigServiceV2.DeleteSink`

### Triage & Response
1. Review the sink and ensure the sink is properly configured.