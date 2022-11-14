---
aliases:
- s7h-nz8-rfi
- /security_monitoring/default_rules/s7h-nz8-rfi
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-5.7.4
control: 5.7.4
disable_edit: true
framework: cis-kubernetes
integration_id: kubernetes
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: kubernetes
security: compliance
source: kubernetes
title: Resources are not created in the default namespace
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

## Default value

Unless a namespace is specific on object creation, the default namespace will be used.

## References

None

## CIS controls

None
