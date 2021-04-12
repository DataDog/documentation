---
aliases:
- 9d8-ji4-rha
control: 4.2.2
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --authorization-mode argument is not set to AlwaysAllow (Kubelet)
type: security_rules
---

## Description

Do not allow all requests. Enable explicit authorization.

## Rationale

Kubelets, by default, allow all authenticated requests (even anonymous ones) without needing explicit authorization checks from the API server. You should restrict this behavior and only allow explicitly authorized requests.

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. If the `--authorization-mode` argument is present check that it is not set to AlwaysAllow. If it is not present check that there is a Kubelet config file specified by `--config`, and that file sets authorization: mode to something other than AlwaysAllow. It is also possible to review the running configuration of a Kubelet via the /configs endpoint on the Kubelet API port (typically `10250/TCP`). Accessing these with appropriate credentials will provide details of the Kubelet's configuration.

## Remediation

If using a Kubelet config file, edit the file to set authorization: mode to Webhook. If using executable arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and set the below parameter in `KUBELET_AUTHZ_ARGS` variable.

`--authorization-mode=Webhook`

Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

Unauthorized requests will be denied.

## Default Value

By default, `--authorization-mode` argument is set to `AlwaysAllow`.

## References

1. [https://kubernetes.io/docs/admin/kubelet/ ][1]
2. [https://kubernetes.io/docs/admin/kubelet-authentication-authorization/#kubelet-authentication][2]

## CIS Controls

Version 6.14 Controlled Access Based on the Need to Know
Version 7.14 Controlled Access Based on the Need to Know

[1]: https://kubernetes.io/docs/admin/kubelet/
[2]: https://kubernetes.io/docs/admin/kubelet-authentication-authorization/#kubelet-authentication
