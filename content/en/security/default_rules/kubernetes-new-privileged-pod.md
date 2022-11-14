---
aliases:
- kqq-0do-gio
- /security_monitoring/default_rules/kqq-0do-gio
- /security_monitoring/default_rules/kubernetes-new-privileged-pod
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: kubernetes
security: attack
source: kubernetes
tactic: TA0004-privilege-escalation
title: New Kubernetes privileged pod created
type: security_rules
---

## Goal
Detect when a privileged pod is created. Privileged pods remove container isolation which allows privileged actions on the host.

## Strategy
This rule monitors when a pod (`@objectRef.resource:pods`) is created (`@http.method:create`) and the privileged security context (`@requestObject.spec.containers.securityContext.privileged`) is `true`.

## Triage & Response
1. Determine if the pod should be privileged.
