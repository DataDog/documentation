---
aliases:
- twq-bfg-rvn
control: 4.1.4
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Proxy kubeconfig file ownership is set to root:root
type: security_rules
---

## Description

If kube-proxy is running, ensure that the file ownership of its kubeconfig file is set to root:root.

## Rationale

The kubeconfig file for kube-proxy controls various parameters for the kube-proxy service in the worker node. You should set its file ownership to maintain the integrity of the file. The file should be owned by root:root.

## Audit

Find the kubeconfig file being used by `kube-proxy` by running the following command: `ps -ef | grep kube-proxy`. If `kube-proxy` is running, get the kubeconfig file location from the `--kubeconfig` parameter.

Run the following command (based on the file location on your system) on the each worker node. For example, `stat -c %U:%G <proxy kubeconfig file>`. Verify that the ownership is set to `root:root`.

## Remediation

Run the below command (based on the file location on your system) on the each worker node:

`chown root:root <proxy kubeconfig file>`

## Impact

None

## Default Value

By default, proxy file ownership is set to root:root.

## References

1. [https://kubernetes.io/docs/admin/kube-proxy/][1]

## CIS Controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.

[1]: https://kubernetes.io/docs/admin/kube-proxy/

## Audit

Find the kubeconfig file being used by kube-proxy by running the following command: ps -ef | grep kube-proxy If kube-proxy is running, get the kubeconfig file location from the --kubeconfig parameter. Run the below command (based on the file location on your system) on the each worker node. For example, stat -c %U:%G <proxy kubeconfig file> Verify that the ownership is set to root:root.
