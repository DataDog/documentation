---
aliases:
- e74-752-b34
- /security_monitoring/default_rules/e74-752-b34
- /security_monitoring/default_rules/gcp-logging-sink-modified
disable_edit: true
integration_id: gcp.project
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.project
security: compliance
source: gcp
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: GCP logging sink modified
type: security_rules
---

## Goal
Detect when a change to a GCP logging sink has been made. This could stop audit logs from being sent to Datadog.

## Strategy
Monitor GCP admin activity audit logs to determine when any of the following methods are invoked:

* `google.logging.v2.ConfigServiceV2.UpdateSink`
* `google.logging.v2.ConfigServiceV2.DeleteSink`

## Triage and response
1. Review the sink and ensure the sink is properly configured.
