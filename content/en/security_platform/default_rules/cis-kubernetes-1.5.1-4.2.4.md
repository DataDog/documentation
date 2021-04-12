---
aliases:
- un9-i5i-b9s
control: 4.2.4
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --read-only-port argument is set to 0
type: security_rules
---

## Description

Disable the read-only port.

## Rationale

The Kubelet process provides a read-only API in addition to the main Kubelet API. Unauthenticated access is provided to this read-only API which could possibly retrieve potentially sensitive information about the cluster.

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. Verify that the `--read-only-port` argument exists and is set to 0. If the `--read-only-port` argument is not present, check that there is a Kubelet config file specified by `--config`. Check that if there is a readOnlyPort entry in the file, it is set to 0.

## Remediation

If using a Kubelet config file, edit the file to set `readOnlyPort` to 0. If using command line arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

`--read-only-port=0`

Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

Removal of the read-only port will require that any service which made use of it will need to be re-configured to use the main Kubelet API.

## Default Value

By default, `--read-only-port` is set to 10255/TCP. However, if a config file is specified by `--config` the default value for `readOnlyPort` is 0.

## References

1. [https://kubernetes.io/docs/admin/kubelet/][1]

## CIS Controls

Version 6.9.1 Limit Open Ports, Protocols, and Services - Ensure that only ports, protocols, and services with validated business needs are running on each system.

Version 7 9.2 Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.

[1]: https://kubernetes.io/docs/admin/kubelet/
