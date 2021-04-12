---
aliases:
- tu8-xey-mp2
control: '2.3'
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --auto-tls argument is not set to true
type: security_rules
---

## Description

Do not use self-signed certificates for TLS.

## Rationale

Etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should not be available to unauthenticated clients. You should enable the client authentication via valid certificates to secure the access to the etcd service.

## Audit

Run the following command on the etcd server node: 
```
ps -ef | grep etcd
```
Verify that if the `--auto-tls` argument exists, it is not set to `true`.

## Remediation

Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master node and either remove the `--auto-tls` parameter or set it to false:

```
--auto-tls=false
```

## Impact

Clients will not be able to use self-signed certificates for TLS.

## Default Value

By default, `--auto-tls` is set to false.

## References

1. [https://coreos.com/etcd/docs/latest/op-guide/security.html ][1]
2. [https://kubernetes.io/docs/admin/etcd/ ][2]
3. [https://coreos.com/etcd/docs/latest/op-guide/configuration.html#auto-tls][3]

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. Version 7 14.4 Encrypt All Sensitive Information in Transit Encrypt all sensitive information in transit.                

[1]: https://coreos.com/etcd/docs/latest/op-guide/security.html 
[2]: https://kubernetes.io/docs/admin/etcd/ 
[3]: https://coreos.com/etcd/docs/latest/op-guide/configuration.html#auto-tls
