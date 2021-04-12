---
aliases:
- rii-wmd-3qm
control: 4.2.5
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --streaming-connection-idle-timeout argument is not set to 0
type: security_rules
---

## Description

Do not disable timeouts on streaming connections.

## Rationale

Setting idle timeouts ensures that you are protected against denial-of-service attacks, inactive connections, and running out of ephemeral ports.

*Note*: By default, `--streaming-connection-idle-timeout` is set to four hours, which might be too high for your environment. Setting this as appropriate would additionally ensure that such streaming connections are timed out after serving legitimate use cases.

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. Verify that the `--streaming-connection-idle-timeout` argument is not set to 0. If the argument is not present, and there is a Kubelet config file specified by `--config`, check that it does not set `streamingConnectionIdleTimeout` to 0.

## Remediation

If using a Kubelet config file, edit the file to set `streamingConnectionIdleTimeout` to a value other than 0. If using command line arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

`--streaming-connection-idle-timeout=5m`

Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

Long-lived connections could be interrupted.

## Default Value

By default, `--streaming-connection-idle-timeout` is set to four hours.

## References

1. [https://kubernetes.io/docs/admin/kubelet/ ][1]
2. [https://github.com/kubernetes/kubernetes/pull/18552][2]

## CIS Controls

Version 6.9 Limitation and Control of Network Ports, Protocols, and Services

[1]: https://kubernetes.io/docs/admin/kubelet/
[2]: https://github.com/kubernetes/kubernetes/pull/18552
