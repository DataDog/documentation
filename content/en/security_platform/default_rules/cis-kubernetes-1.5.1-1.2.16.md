---
aliases:
- ebm-wei-9zr
control: 1.2.16
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Admission control plugin PodSecurityPolicy is set
type: security_rules
---

## Description

Reject creating pods that do not match Pod Security Policies.

## Rationale

A Pod Security Policy is a cluster-level resource that controls the actions that a pod can perform and what it has the ability to access. The PodSecurityPolicy objects define a set of conditions that a pod must run with in order to be accepted into the system. Pod Security Policies are comprised of settings and strategies that control the security features a pod has access to and hence this must be used to control pod access permissions. Note: When the PodSecurityPolicy admission plugin is in use, there needs to be at least one PodSecurityPolicy in place for ANY pods to be admitted. See section 1.7 for recommendations on PodSecurityPolicy settings.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--enable-admission-plugins` argument is set to a value that includes `PodSecurityPolicy`.

## Remediation

Follow the documentation and create Pod Security Policy objects as per your environment. Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the --enable-admission-plugins parameter to a value that includes PodSecurityPolicy: --enable-admission-plugins=...,PodSecurityPolicy,... Then restart the API Server.

## Impact

The policy objects must be created and granted before pod creation would be allowed.

## Default Value

By default, PodSecurityPolicy is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://kubernetes.io/docs/admin/admission-controllers/#podsecuritypolicy 3. https://kubernetes.io/docs/concepts/policy/pod-security-policy/#enabling-pod-security-policies

## CIS Controls

Version 6 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know Version 7 4 Controlled Use of Administrative Privileges Controlled Use of Administrative Privileges
