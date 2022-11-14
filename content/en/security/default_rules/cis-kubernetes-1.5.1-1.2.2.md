---
aliases:
- 6q7-uqw-dtq
- /security_monitoring/default_rules/6q7-uqw-dtq
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.2
control: 1.2.2
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
title: Basic authentication is disabled for the API server
type: security_rules
---

## Description

Do not use basic authentication.

## Rationale

Basic authentication uses plaintext credentials for authentication. Currently, the basic authentication credentials last indefinitely, and the password cannot be changed without restarting the API server. The basic authentication is currently supported for convenience. Hence, basic authentication should not be used.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--basic-auth-file` argument does not exist.

## Remediation

Follow the documentation and configure alternate mechanisms for authentication. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and remove the `--basic-auth-file=<filename>` parameter.

## Impact

You will have to configure and use alternate authentication mechanisms such as tokens and certificates. Username and password for basic authentication could no longer be used.

## Default value

By default, basic authentication is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/
2. https://kubernetes.io/docs/admin/authentication/#static-password-file

## CIS controls

Version 6

16.14 Encrypt/Hash All Authentication Files And Monitor Their Access - Verify that all authentication files are encrypted or hashed and that these files cannot be accessed without root or administrator privileges. Audit all access to password files in the system.

Version 7

16.4 Encrypt or Hash all Authentication Credentials - Encrypt or hash with a salt all authentication credentials when stored.
