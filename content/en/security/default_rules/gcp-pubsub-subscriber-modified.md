---
aliases:
- a7b-dbc-bdd
- /security_monitoring/default_rules/a7b-dbc-bdd
- /security_monitoring/default_rules/gcp-pubsub-subscriber-modified
disable_edit: true
integration_id: gcp.pubsub.subscription
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.pubsub.subscription
security: attack
source: gcp
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: GCP Pub/Sub Subscriber modified
type: security_rules
---

## Goal
Detect when a change to a GCP Pub/Sub Subscription has been made. This could stop audit logs from being sent to Datadog.

## Strategy
Monitor GCP admin activity audit logs to determine when any of the following methods are invoked:

* `google.pubsub.v1.Subscriber.UpdateSubscription`
* `google.pubsub.v1.Subscriber.DeleteSubscription`

## Triage and response
1. Review the subscribtion and ensure it is properly configured.
