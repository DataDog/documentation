---
aliases:
- kvf-zte-cje
control: 1.2.8
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --authorization-mode argument includes Node
type: security_rules
---

## Description

Restrict kubelet nodes to reading only objects associated with them.

## Rationale

The Node authorization mode only allows kubelets to read Secret, ConfigMap, PersistentVolume, and PersistentVolumeClaim objects associated with their nodes.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-apiserver
```
Verify that the `--authorization-mode` argument exists and is set to a value to include Node.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--authorization-mode` parameter to a value that includes Node. `--authorization-mode=Node,RBAC`

## Impact

None

## Default Value

By default, Node authorization is not enabled.

## References

1. [https://kubernetes.io/docs/admin/kube-apiserver/ ][1]
2. [https://kubernetes.io/docs/admin/authorization/node/ ][2]
3. [https://github.com/kubernetes/kubernetes/pull/46076 ][3]
4. [https://acotten.com/post/kube17-security][4]

## CIS Controls

Version 6.9.1 Limit Open Ports, Protocols, and Services - Ensure that only ports, protocols, and services with validated business needs are running on each system. 

Version 7.9.2 Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.              

[1]: https://kubernetes.io/docs/admin/kube-apiserver/ 
[2]: https://kubernetes.io/docs/admin/authorization/node/ 
[3]: https://github.com/kubernetes/kubernetes/pull/46076 
[4]: https://acotten.com/post/kube17-security
