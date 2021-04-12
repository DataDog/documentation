---
aliases:
- e74-752-b34
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.project
security: compliance
source: gcp
title: GCP logging sink modified
type: security_rules
---

### Goal
Detect when a change to a GCP logging sink has been made. This could stop audit logs from being sent to Datadog.

### Strategy
Monitor GCP admin activity audit logs to determine when any of the following methods are invoked:

* `google.logging.v2.ConfigServiceV2.UpdateSink`
* `google.logging.v2.ConfigServiceV2.DeleteSink`

### Triage & Response
1. Review the sink and ensure the sink is properly configured.
