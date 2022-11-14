---
aliases:
- mez-uvc-4s3
- /security_monitoring/default_rules/mez-uvc-4s3
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.28
control: 1.2.28
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
title: API server uses a service account public key file for service accounts
type: security_rules
---

## Description

Explicitly set a service account public key file for service accounts on the apiserver.

## Rationale

By default, if no --service-account-key-file is specified to the apiserver, it uses the private key from the TLS serving certificate to verify service account tokens. To ensure that the keys for service account tokens could be rotated as needed, a separate public/private key pair should be used for signing service account tokens. Hence, the public key should be specified to the apiserver with --service-account-key-file.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--service-account-key-file` argument exists and is set as appropriate.

## Remediation

Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--service-account-key-file` parameter to the public key file for service accounts: `--service-account-key-file=<filename>`

## Impact

The corresponding private key must be provided to the controller manager. You would need to securely maintain the key file and rotate the keys based on your organization's key rotation policy.

## Default value

By default, `--service-account-key-file` argument is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. https://github.com/kubernetes/kubernetes/issues/24167

## CIS controls

Version 6 3 Secure Configurations for Hardware and Software on Mobile Devices, Laptops, Workstations, and Servers 
Version 7 5 Secure Configuration for Hardware and Software on Mobile Devices, Laptops, Workstations and Servers
