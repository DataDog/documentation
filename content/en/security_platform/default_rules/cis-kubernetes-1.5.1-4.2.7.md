---
aliases:
- jeq-xry-fa2
control: 4.2.7
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --make-iptables-util-chains argument is set to true
type: security_rules
---

## Description

Allow Kubelet to manage `iptables`.

## Rationale

Kubelets can automatically manage the required changes to `iptables` based on how you choose your networking options for the pods. It is recommended to let kubelets manage the changes to `iptables`. This ensures that the `iptables` configuration remains in sync with pods networking configuration. Manually configuring `iptables` with dynamic pod network configuration changes might hamper the communication between pods/containers and to the outside world. You might have `iptables` rules too restrictive or too open.

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. Verify that if the `--make-iptables-util-chains` argument exists then it is set to true. If the `--make-iptables-util-chains` argument does not exist, and there is a Kubelet config file specified by `--config`, verify that the file does not set `makeIPTablesUtilChains` to `false`.

## Remediation

If using a kubelet config file, edit the file to set `makeIPTablesUtilChains: true`. If using command line arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and remove the `--make-iptables-util-chains` argument from the `KUBELET_SYSTEM_PODS_ARGS` variable. Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

Kubelet would manage the `iptables` on the system and keep it in sync. If you are using any other `iptables` management solution, then there might be some conflicts.

## Default Value

By default, `--make-iptables-util-chains argument` is set to true.

## References

1. [https://kubernetes.io/docs/admin/kubelet/][1]

## CIS Controls

Version 6.9 Limitation and Control of Network Ports, Protocols, and Services

[1]: https://kubernetes.io/docs/admin/kubelet/
