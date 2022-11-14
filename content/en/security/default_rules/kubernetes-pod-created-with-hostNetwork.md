---
aliases:
- 72d-b43-42f
- /security_monitoring/default_rules/72d-b43-42f
- /security_monitoring/default_rules/kubernetes-pod-created-with-hostNetwork
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: kubernetes
title: Kubernetes Pod Created with hostNetwork
type: security_rules
---

## Goal
Detect when a pod is attached to the host network.

## Strategy
This rule monitors when a create (`@http.method:create`) action occurs for a pod (`@objectRef.resource:pods`) with the host network `@requestObject.spec.hostNetwork:true` attached.

Attaching the `hostNetwork` permits a pod to access the node's network adapter allowing a pod to listen to all network traffic for all pods on the node and communicate with other pods on the network namespace.

## Triage and response
1. Determine if the pod needs `hostNetwork` access.
