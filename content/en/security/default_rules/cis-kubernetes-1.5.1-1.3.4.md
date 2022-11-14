---
aliases:
- ssa-pgr-9y8
- /security_monitoring/default_rules/ssa-pgr-9y8
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.3.4
control: 1.3.4
disable_edit: true
framework: cis-kubernetes
integration_id: kubernetes
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: kubernetes
security: compliance
source: kubernetes
title: Controller manager has a service account private key file set
type: security_rules
---

## Description

Explicitly set a service account private key file for service accounts on the controller manager.

## Rationale

To ensure that keys for service account tokens can be rotated as needed, a separate public/private key pair should be used for signing service account tokens. The private key should be specified to the controller manager with `--service-account-private-key-file` as appropriate.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-controller-manager
```
Verify that the `--service-account-private-key-file` argument is set as appropriate.

## Remediation

Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml` on the master node and set the `--service-account-private-key-file parameter` to the private key file for service accounts:

```
--service-account-private-key-file=<filename>
```

## Impact

You would need to securely maintain the key file and rotate the keys based on your organization's key rotation policy.

## Default value

By default, `--service-account-private-key-file` it not set.

## References

1. [https://kubernetes.io/docs/admin/kube-controller-manager/][1]

## CIS controls

Version 6.14 Controlled Access Based on the Need to Know

Version 7.4 Controlled Use of Administrative Privileges          

[1]: https://kubernetes.io/docs/admin/kube-controller-manager/
