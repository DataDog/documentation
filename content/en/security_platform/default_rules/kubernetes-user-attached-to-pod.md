---
aliases:
- 3e1-0b7-119
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: kubernetes
title: User Attached to a Pod
type: security_rules
---

### Goal
Detect when a user attaches to a pod.

### Strategy
This rule monitors when a user attaches (`@objectRef.subresource:attach`) to a pod (`@objectRef.resource:pods`).

A user should not need to attach to a pod. Attaching to a pod allows a user to attach to any process in a running container which may give an attacker access to sensitive data.

### Triage & Response
1. Determine if the user should be attaching to a running container.
