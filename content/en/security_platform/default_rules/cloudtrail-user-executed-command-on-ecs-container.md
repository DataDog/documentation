---
aliases:
- ugx-lde-wnu
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ecs
security: attack
source: cloudtrail
tactic: TA0004-privilege-escalation
title: Anomalous AWS user executed a command on ECS container
type: security_rules
---

### Goal
Detect when a user executes a command on an ECS container for the first time. An attacker may use this as a technique to escalate their privileges
because they can run arbitrary commands on behalf of the container with the role and permissions associated with the
container.

### Strategy
This rule lets you monitor this CloudTrail API call to detect if a user is executing a command on an ECS container:

* `ExecuteCommand`

### Triage & Response
1. Determine if the user should be executing a command on this container
