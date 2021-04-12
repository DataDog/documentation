---
aliases:
- ac3-6b4-p6j
control: 1.2.3
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --token-auth-file parameter is not set
type: security_rules
---

## Description

Do not use token based authentication.

## Rationale

The token-based authentication utilizes static tokens to authenticate requests to the apiserver. The tokens are stored in clear-text in a file on the apiserver, and cannot be revoked or rotated without restarting the apiserver. Hence, do not use static token-based authentication.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-apiserver 
```
Verify that the `--token-auth-file` argument does not exist.

## Remediation

Follow the documentation and configure alternate mechanisms for authentication. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and remove the `--token-auth-file=<filename>` parameter.

## Impact

You will have to configure and use alternate authentication mechanisms such as certificates. Static token based authentication could not be used.

## Default Value

By default, `--token-auth-file` argument is not set.

## References

1. https://kubernetes.io/docs/admin/authentication/#static-token-file
2. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS Controls

Version 6

16.14 Encrypt/Hash All Authentication Files And Monitor Their Access - Verify that all authentication files are encrypted or hashed and that these files cannot be accessed without root or administrator privileges. Audit all access to password files in the system.

Version 7

16.4 Encrypt or Hash all Authentication Credentials - Encrypt or hash with a salt all authentication credentials when stored.
