---
aliases:
- 522-190-266
- /security_monitoring/default_rules/522-190-266
- /security_monitoring/default_rules/gcp-gce-firewall-rule-modified
disable_edit: true
integration_id: gcp.gce.firewall.rule
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.gce.firewall.rule
security: attack
source: gcp
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: GCP GCE Firewall rule modified
type: security_rules
---

## Goal
Detect when a firewall rule is created, modified or deleted. 

## Strategy
Monitor GCP GCE activity audit logs to determine when any of the following methods are invoked:

* `v1.compute.firewalls.delete`
* `v1.compute.firewalls.insert`
* `v1.compute.firewalls.patch` 

## Triage and response
1. Review the log and role and ensure the permissions are scoped properly.
2. Review the users associated with the role and ensure they should have the permissions attached to the role.
