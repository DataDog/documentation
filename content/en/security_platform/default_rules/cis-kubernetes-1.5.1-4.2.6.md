---
aliases:
- g4y-d5m-gaj
control: 4.2.6
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --protect-kernel-defaults argument is set to true
type: security_rules
---

## Description

Protect tuned kernel parameters from overriding kubelet default kernel parameter values.

## Rationale

Kernel parameters are usually tuned and hardened by the system administrators before putting the systems into production. These parameters protect the kernel and the system. Your kubelet kernel defaults that rely on such parameters should be appropriately set to match the desired secured system state. Ignoring this could potentially lead to running pods with undesired kernel behavior.

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. Verify that the `--protect-kernel-defaults` argument is set to true. If the `--protect-kernel-defaults` argument is not present, check that there is a Kubelet config file specified by `--config`, and that the file sets `protectKernelDefaults` to `true`.

## Remediation

If using a Kubelet config file, edit the file to set `protectKernelDefaults: true`. If using command line arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

`--protect-kernel-defaults=true`

Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

You would have to re-tune kernel parameters to match kubelet parameters.

## Default Value

By default, `--protect-kernel-defaults` is not set.

## References

1. [https://kubernetes.io/docs/admin/kubelet/][1]

## CIS Controls

Version 6.3 Secure Configurations for Hardware and Software on Mobile Devices, Laptops, Workstations, and Servers

[1]: https://kubernetes.io/docs/admin/kubelet/
