---
aliases:
- a7b-dbc-bdd
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.pubsub.subscription
security: compliance
source: gcp
title: GCP Pub/Sub Subscriber modified
type: security_rules
---

### Goal
Detect when a change to a GCP Pub/Sub Subscription has been made. This could stop audit logs from being sent to Datadog.

### Strategy
Monitor GCP admin activity audit logs to determine when any of the following methods are invoked:

* `google.pubsub.v1.Subscriber.UpdateSubscription`
* `google.pubsub.v1.Subscriber.DeleteSubscription`

### Triage & Response
1. Review the subscribtion and ensure it is properly configured.
