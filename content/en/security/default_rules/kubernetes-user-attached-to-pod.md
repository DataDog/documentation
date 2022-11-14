---
aliases:
- 3e1-0b7-119
- /security_monitoring/default_rules/3e1-0b7-119
- /security_monitoring/default_rules/kubernetes-user-attached-to-pod
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: kubernetes
tactic: TA0007-discovery
title: User Attached to a Pod
type: security_rules
---

## Goal
Detect when a user attaches to a pod.

## Strategy
This rule monitors when a user attaches (`@objectRef.subresource:attach`) to a pod (`@objectRef.resource:pods`).

A user should not need to attach to a pod. Attaching to a pod allows a user to attach to any process in a running container which may give an attacker access to sensitive data.

## Triage and response
1. Determine if the user should be attaching to a running container.
