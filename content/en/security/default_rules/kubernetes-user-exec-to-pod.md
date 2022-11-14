---
aliases:
- 1d5-6cd-162
- /security_monitoring/default_rules/1d5-6cd-162
- /security_monitoring/default_rules/kubernetes-user-exec-to-pod
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: kubernetes
tactic: TA0002-execution
title: User Exec into a Pod
type: security_rules
---

## Goal
Detect when a user execs into a pod.

## Strategy
This rule monitors when a user execs (`@objectRef.subresource:exec`) into to a pod (`@objectRef.resource:pods`).

A user should not need to exec into a pod. Execing into a pod allows a user to execute any process in container which is not already running.
It is most common to execute the bash process to gain an interactive shell.
If this is an attacker, they can access any data which the pod has permissions to, including secrets.

## Triage and response
1. Determine if the user should be execing into a running container.
