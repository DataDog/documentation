---
aliases:
- 7d8-c83-6fd
- /security_monitoring/default_rules/7d8-c83-6fd
- /security_monitoring/default_rules/gcp-gce-network-modified
disable_edit: true
integration_id: gcp.gce.route
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.gce.route
security: compliance
source: gcp
title: GCP GCE VPC network modified
type: security_rules
---

## Goal
Detect when a VPC network is created. 

## Strategy
This rule lets you monitor GCP GCE activity audit logs to determine when the following method is invoked to create a new VPC network:

* `beta.compute.networks.insert`

## Triage and response
1. Review the VPC network.
