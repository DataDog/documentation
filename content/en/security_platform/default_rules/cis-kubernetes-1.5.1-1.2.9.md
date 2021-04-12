---
aliases:
- exa-yvv-gqk
control: 1.2.9
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --authorization-mode argument includes RBAC
type: security_rules
---

## Description

Turn on Role Based Access Control.

## Rationale

Role Based Access Control (RBAC) allows fine-grained control over the operations that different entities can perform on different objects in the cluster. It is recommended to use the RBAC authorization mode.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-apiserver
```
Verify that the `--authorization-mode` argument exists and is set to a value to include RBAC.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--authorization-mode` parameter to a value that includes RBAC, for example: `--authorization-mode=Node,RBAC`

## Impact

When RBAC is enabled you will need to ensure that appropriate RBAC settings (including Roles, RoleBindings and ClusterRoleBindings) are configured to allow appropriate access.

## Default Value

By default, RBAC authorization is not enabled.

## References

1. [https://kubernetes.io/docs/reference/access-authn-authz/rbac/][1]

## CIS Controls

Version 6.9.1 Limit Open Ports, Protocols, and Services - Ensure that only ports, protocols, and services with validated business needs are running on each system. 

Version 7.9.2 Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.                

[1]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
