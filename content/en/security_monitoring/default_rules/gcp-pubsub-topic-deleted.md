---
title: GCP Pub/Sub Topic Deleted
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.pubsub.topic
security: compliance

aliases:
- f68-e1e-db8
---

## Overview

### Goal
Detect when a GCP Pub/Sub Subscribtion has been deleted. This could stop audit logs from being sent to Datadog.

### Strategy
Monitor GCP admin activity audit logs to determine when the following method is invoked:

* `google.pubsub.v1.Publisher.DeleteTopic`

### Triage & Response
1. Review the subscribtion and ensure it is properly configured.