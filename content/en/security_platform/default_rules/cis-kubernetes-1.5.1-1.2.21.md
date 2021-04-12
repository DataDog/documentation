---
aliases:
- pv9-m3h-8wy
control: 1.2.21
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --profiling argument is set to false (API server)
type: security_rules
---

## Description

Disable profiling, if not needed.

## Rationale

Profiling allows for the identification of specific performance bottlenecks. It generates a significant amount of program data that could potentially be exploited to uncover system and program details. If you are not experiencing any bottlenecks and do not need the profiler for troubleshooting purposes, it is recommended to turn it off to reduce the potential attack surface.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--profiling` argument is set to `false`.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the below parameter. --profiling=false

## Impact

Profiling information would not be available.

## Default Value

By default, profiling is enabled.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 2. https://github.com/kubernetes/community/blob/master/contributors/devel/profiling.md

## CIS Controls

Version 6 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know Version 7 14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know
