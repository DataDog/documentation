---
aliases:
- 522-190-266
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: gcp.gce.firewall.rule
security: compliance
source: gcp
title: GCP GCE Firewall rule modified
type: security_rules
---

### Goal
Detect when a firewall rule is created, modified or deleted. 

### Strategy
Monitor GCP GCE activity audit logs to determine when any of the following methods are invoked:

* `v1.compute.firewalls.delete`
* `v1.compute.firewalls.insert`
* `v1.compute.firewalls.patch` 

### Triage & Response
1. Review the log and role and ensure the permissions are scoped properly.
2. Review the users associated with the role and ensure they should have the permissions attached to the role.
