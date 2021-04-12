---
aliases:
- 27a-db7-89d
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: kubernetes
title: Kubernetes Pod Created in Kube Namespace
type: security_rules
---

### Goal
Detect when a user is creating a pod in one of the Kubernetes default namespaces.

### Strategy
This rule monitors when a create (`@http.method:create`) action occurs for a pod (`@objectRef.resource:pods`) within either of the `kube-system` or `kube-public` namespaces.

The only users creating pods in the `kube-system` namespace should be cluster administrators. Furthermore, it is best practice to not run any cluster critical infrastructure in the `kube-system` namespace.

The `kube-public` namespace is intended for Kubernetes objects which should be readable by unauthenticated users. Thus, a pod should likely not be created in the `kube-public` namespace.

### Triage & Response
1. Determine if the user should be creating this new pod in one of the default namespaces.
