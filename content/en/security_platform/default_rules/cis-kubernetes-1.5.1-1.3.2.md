---
aliases:
- nve-czf-sku
control: 1.3.2
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --profiling argument is set to false (Controller Manager)
type: security_rules
---

## Description

Disable profiling, if not needed.

## Rationale

Profiling allows for the identification of specific performance bottlenecks. It generates a significant amount of program data that could potentially be exploited to uncover system and program details. If you are not experiencing any bottlenecks and do not need the profiler for troubleshooting purposes, it is recommended to turn it off to reduce the potential attack surface.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-controller-manager
```
Verify that the `--profiling` argument is set to `false`.

## Remediation

Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml` on the master node and set the below parameter:

```
--profiling=false
```

## Impact

Profiling information would not be available.

## Default Value

By default, profiling is enabled.

## References

1. [https://kubernetes.io/docs/admin/kube-controller-manager/ ][1]
2. [https://github.com/kubernetes/community/blob/master/contributors/devel/profiling.md][2]

## CIS Controls

Version 6.14 Controlled Access Based on the Need to Know

Version 7.4 Controlled Use of Administrative Privileges 

[1]: https://kubernetes.io/docs/admin/kube-controller-manager/ 
[2]: https://github.com/kubernetes/community/blob/master/contributors/devel/profiling.md
