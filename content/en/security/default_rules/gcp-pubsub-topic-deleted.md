---
aliases:
- f68-e1e-db8
- /security_monitoring/default_rules/f68-e1e-db8
- /security_monitoring/default_rules/gcp-pubsub-topic-deleted
disable_edit: true
integration_id: gcp.pubsub.topic
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.pubsub.topic
security: attack
source: gcp
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: GCP Pub/Sub topic deleted
type: security_rules
---

## Goal
Detect when a GCP Pub/Sub Subscribtion has been deleted. This could stop audit logs from being sent to Datadog.

## Strategy
Monitor GCP admin activity audit logs to determine when the following method is invoked:

* `google.pubsub.v1.Publisher.DeleteTopic`

## Triage and response
1. Review the subscribtion and ensure it is properly configured.
