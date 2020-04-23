---
title: GCP Pub/Sub Subscriber Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
src_img: /images/integrations_logos/google_cloud_platform.png
source: gcp
scope: gcp.pubsub.subscription
security: compliance

aliases:
- a7b-dbc-bdd
---

## Overview

### Goal
Detect when a change to a GCP Pub/Sub Subscribtion has been made. This could stop audit logs from being sent to Datadog.

### Strategy
Monitor GCP admin activity audit logs to determine when any of the following methods are invoked:

* `google.pubsub.v1.Subscriber.UpdateSubscription`
* `google.pubsub.v1.Subscriber.DeleteSubscription`

### Triage & Response
1. Review the subscribtion and ensure it is properly configured.