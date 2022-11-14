---
aliases:
- 3hu-kfk-4nb
- /security_monitoring/default_rules/3hu-kfk-4nb
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.17
control: 1.2.17
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
title: Admission controller NodeRestriction is enabled
type: security_rules
---

## Description

Limit the Node and Pod objects that a kubelet could modify.

## Rationale

Using the NodeRestriction plug-in ensures that the kubelet is restricted to the Node and Pod objects that it could modify as defined. Such kubelets will only be allowed to modify their own Node API object, and only modify Pod API objects that are bound to their node.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--enable-admission-plugins` argument is set to a value that includes `NodeRestriction`.

## Remediation

Follow the Kubernetes documentation and configure NodeRestriction plug-in on kubelets. Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the --enable-admission-plugins parameter to a value that includes NodeRestriction. --enable-admission-plugins=...,NodeRestriction,...

## Impact

None

## Default value

By default, NodeRestriction is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://kubernetes.io/docs/admin/admission-controllers/#noderestriction 3. https://kubernetes.io/docs/admin/authorization/node/ 4. https://acotten.com/post/kube17-security

## CIS controls

Version 6 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know Version 7 4 Controlled Use of Administrative Privileges Controlled Use of Administrative Privileges
