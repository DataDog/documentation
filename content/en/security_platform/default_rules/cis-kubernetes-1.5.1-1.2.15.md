---
aliases:
- q35-6ka-nvd
control: 1.2.15
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Admission control plugin NamespaceLifecycle is set
type: security_rules
---

## Description

Reject creating objects in a namespace that is undergoing termination.

## Rationale

Setting admission control policy to NamespaceLifecycle ensures that objects cannot be created in non-existent namespaces, and that namespaces undergoing termination are not used for creating the new objects. This is recommended to enforce the integrity of the namespace termination process and also for the availability of the newer objects.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--disable-admission-plugins` argument is set to a value that does not include `NamespaceLifecycle`.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the --disable-admission-plugins parameter to ensure it does not include NamespaceLifecycle.

## Impact

None

## Default Value

By default, NamespaceLifecycle is set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://kubernetes.io/docs/admin/admission-controllers/#namespacelifecycle

## CIS Controls

Version 6 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know Version 7 4 Controlled Use of Administrative Privileges Controlled Use of Administrative Privileges
