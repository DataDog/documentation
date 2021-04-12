---
aliases:
- s7h-nz8-rfi
control: 5.7.4
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: The default namespace should not be used
type: security_rules
---

## Description

Kubernetes provides a default namespace, where objects are placed if no namespace is specified for them. Placing objects in this namespace makes application of RBAC and other controls more difficult.

## Rationale

Resources in a Kubernetes cluster should be segregated by namespace, to allow for security controls to be applied at that level and to make it easier to manage resources.

## Audit

Run this command to list objects in default namespace: `kubectl get all`

The only entries there should be system managed resources such as the Kubernetes service.

## Remediation

Ensure that namespaces are created to allow for appropriate segregation of Kubernetes resources and that all new resources are created in a specific namespace.

## Impact

None

## Default Value

Unless a namespace is specific on object creation, the default namespace will be used.

## References

None

## CIS Controls

None
