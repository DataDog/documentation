---
aliases:
- 5be-7yq-bjy
control: '2.5'
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --peer-client-cert-auth argument is set to true
type: security_rules
---

## Description

Etcd should be configured for peer authentication.

## Rationale

Etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be accessible only by authenticated etcd peers in the etcd cluster.

## Audit

This recommendation is applicable only for etcd clusters. If you are using only one etcd server in your environment then this recommendation is not applicable.

Run the following command on the etcd server node: 
```
ps -ef | grep etcd
```
Verify that the `--peer-client-cert-auth` argument is set to `true`.  

## Remediation

Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master node and set the below parameter:

```
--peer-client-cert-auth=true
```

## Impact

All peers attempting to communicate with the etcd server will require a valid client certificate for authentication.

## Default Value

*Note*: This recommendation is applicable only for etcd clusters. If you are using only one etcd server in your environment then this recommendation is not applicable. By default, `--peer-client-cert-auth` argument is set to false.

## References

1. https://coreos.com/etcd/docs/latest/op-guide/security.html 
2. https://kubernetes.io/docs/admin/etcd/ 
3. https://coreos.com/etcd/docs/latest/op-guide/configuration.html#peer-client-cert-auth

## CIS Controls

Version 6.14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities. 

Version 7.14.6 Protect Information through Access Control Lists - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.                

[1]: https://coreos.com/etcd/docs/latest/op-guide/security.html 
[2]: https://kubernetes.io/docs/admin/etcd/ 
[3]: https://coreos.com/etcd/docs/latest/op-guide/configuration.html#peer-client-cert-auth
