---
aliases:
- 6b4-f87-bcd
- /security_monitoring/default_rules/6b4-f87-bcd
- /security_monitoring/default_rules/kubernetes-service-created-with-NodePort
disable_edit: true
integration_id: kubernetes
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: kubernetes
title: Kubernetes Service Created with NodePort
type: security_rules
---

## Goal
Detect when a service's port is attached to the node's IP.

## Strategy
This rule monitors when a create (`@http.method:create`) action occurs for a service (`@objectRef.resource:services`) attaching the service's port to the node's IP `@requestObject.spec.type:NodePort`.

Exposing the service's port to the the node's IP allows other hosts on the network namespace to access this service.

## Triage and response
1. Determine if the service needs to expose it's network connection with `NodePort` access.
