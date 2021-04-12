---
aliases:
- 7d8-c83-6fd
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.gce.route
security: compliance
source: gcp
title: GCP GCE VPC network modified
type: security_rules
---

### Goal
Detect when a VPC network is created. 

### Strategy
This rule lets you monitor GCP GCE activity audit logs to determine when the following method is invoked to create a new VPC network:

* `beta.compute.networks.insert`

### Triage & Response
1. Review the VPC network.
