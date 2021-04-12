---
aliases:
- 349-cpn-a92
control: 4.2.1
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Anonymous-auth argument is set to false
type: security_rules
---

## Description

Disable anonymous requests to the Kubelet server.

## Rationale

When enabled, requests that are not rejected by other configured authentication methods are treated as anonymous requests. These requests are then served by the Kubelet server. You should rely on authentication to authorize access and disallow anonymous requests.

## Audit

If using a Kubelet configuration file, check that there is an entry for authentication: anonymous: enabled set to false. Run the following command on each node: `ps -ef | grep kubelet`. Verify that the `--anonymous-auth` argument is set to false. This executable argument may be omitted, provided there is a corresponding entry set to false in the Kubelet config file.

## Remediation

If using a Kubelet config file, edit the file to set `authentication: anonymous: enabled` to false. If using executable arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable:

```
--anonymous-auth=false
```

Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

Anonymous requests will be rejected.

## Default Value

By default, anonymous access is enabled.

## References

1. [https://kubernetes.io/docs/admin/kubelet/ ][1]
2. [https://kubernetes.io/docs/admin/kubelet-authentication-authorization/#kubelet-authentication][2]

## CIS Controls

Version 6.14 Controlled Access Based on the Need to Know

Version 7.14 Controlled Access Based on the Need to Know

[1]: https://kubernetes.io/docs/admin/kubelet/
[2]: https://kubernetes.io/docs/admin/kubelet-authentication-authorization/#kubelet-authentication
