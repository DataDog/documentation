---
aliases:
- a9f-f61-a6c
- /security_monitoring/default_rules/a9f-f61-a6c
- /security_monitoring/default_rules/kubernetes-new-kubernetes-namespace-created
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: kubernetes
title: New Kubernetes Namespace Created
type: security_rules
---

## Goal
Detect when a user is creating a Kubernetes namespace.

## Strategy
This rule monitors when a `create` action occurs for the Kubernetes namespace (`@objectRef.resource:namespaces`) to detect when a user is creating a new Kubernetes namespace.

## Triage and response
1. Determine if the user should be creating this new namespace.
