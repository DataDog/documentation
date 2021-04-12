---
aliases:
- f68-e1e-db8
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.pubsub.topic
security: compliance
source: gcp
title: GCP Pub/Sub topic deleted
type: security_rules
---

### Goal
Detect when a GCP Pub/Sub Subscribtion has been deleted. This could stop audit logs from being sent to Datadog.

### Strategy
Monitor GCP admin activity audit logs to determine when the following method is invoked:

* `google.pubsub.v1.Publisher.DeleteTopic`

### Triage & Response
1. Review the subscribtion and ensure it is properly configured.
