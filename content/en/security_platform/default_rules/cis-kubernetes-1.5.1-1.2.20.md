---
aliases:
- 5er-t93-rpz
control: 1.2.20
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --secure-port argument is not set to 0
type: security_rules
---

## Description

Do not disable the secure port.

## Rationale

The secure port is used to serve https with authentication and authorization. If you disable it, no https traffic is served and all traffic is served unencrypted.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--secure-port` argument is either not set or is set to an integer value between `1` and `65535`.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and either remove the --secure-port parameter or set it to a different (non-zero) desired port.

## Impact

You need to set the API Server up with the right TLS certificates.

## Default Value

By default, port 6443 is used as the secure port.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. Version 7 14.4 Encrypt All Sensitive Information in Transit Encrypt all sensitive information in transit.
