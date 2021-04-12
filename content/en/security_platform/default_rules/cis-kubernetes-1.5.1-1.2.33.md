---
aliases:
- edx-dra-f9p
control: 1.2.33
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --encryption-provider-config argument is set as appropriate
type: security_rules
---

## Description

Encrypt etcd key-value store.

## Rationale

etcd is a highly available key-value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be encrypted at rest to avoid any disclosures.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-apiserver
```
Verify that the `--encryption-provider-config` argument is set to a EncryptionConfig file. Additionally, ensure that the EncryptionConfig file has all the desired resources covered especially any secrets.

## Remediation

Follow the Kubernetes documentation and configure a EncryptionConfig file. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the `--encryption-provider-config` parameter to the path of that file: `--encryption-provider-config=</path/to/EncryptionConfig/File>`

## Impact

None

## Default Value

By default, `--encryption-provider-config` is not set.

## References

1. https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/ 
2. https://acotten.com/post/kube17-security 
3. https://kubernetes.io/docs/admin/kube-apiserver/ 
4. https://github.com/kubernetes/features/issues/92

## CIS Controls

Version 6 14.5 Encrypt At Rest Sensitive Information Sensitive information stored on systems shall be encrypted at rest and require a secondary authentication mechanism, not integrated into the operating system, in order to access the information. 

Version 7 14.8 Encrypt Sensitive Information at Rest Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.
