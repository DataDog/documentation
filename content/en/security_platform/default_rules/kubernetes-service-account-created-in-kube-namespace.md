---
aliases:
- ca4-360-b9c
disable_edit: true
kind: documentation
rule_category:
- Log Detection
source: kubernetes
title: Kubernetes Service Account Created in Kube Namespace
type: security_rules
---

### Goal
Detect when a user is creating a service account in one of the Kubernetes default namespaces.

### Strategy
This rule monitors when a create (`@http.method:create`) action occurs for a service account (`@objectRef.resource:serviceaccounts`) within either of the `kube-system` or `kube-public` namespaces.

The only users creating service accounts in the `kube-system` namespace should be cluster administrators. Furthermore, it is best practice to not run any cluster critical infrastructure in the `kube-system` namespace.

The `kube-public` namespace is intended for kubernetes objects which should be readable by unauthenticated users. Thus, a service account should likely not be created in the `kube-public` namespace.

### Triage & Response
1. Determine if the user should be creating this new service account in one of the default namespaces.
