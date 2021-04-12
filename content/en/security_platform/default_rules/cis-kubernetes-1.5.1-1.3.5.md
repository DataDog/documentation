---
aliases:
- gwu-zan-dnt
control: 1.3.5
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --root-ca-file argument is set as appropriate
type: security_rules
---

## Description

Allow pods to verify the API server's serving certificate before establishing connections.

## Rationale

Processes running within pods that need to contact the API server must verify the API server's serving certificate. Failing to do so could be a subject to man-in-the-middle attacks. Providing the root certificate for the API server's serving certificate to the controller manager with the `--root-ca-file` argument allows the controller manager to inject the trusted bundle into pods so that they can verify TLS connections to the API server.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-controller-manager
```
Verify that the `--root-ca-file` argument exists and is set to a certificate bundle file containing the root certificate for the API server's serving certificate.

## Remediation

Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml` on the master node and set the `--root-ca-file` parameter to the certificate bundle file: `--root-ca-file=<path/to/file>`

## Impact

You need to setup and maintain root certificate authority file.

## Default Value

By default, `--root-ca-file` is not set.

## References

1. [https://kubernetes.io/docs/admin/kube-controller-manager/ ][1]
2. [https://github.com/kubernetes/kubernetes/issues/11000][2]

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7 14.4 Encrypt All Sensitive Information in Transit Encrypt all sensitive information in transit.                

[1]: https://kubernetes.io/docs/admin/kube-controller-manager/ 
[2]: https://github.com/kubernetes/kubernetes/issues/11000
