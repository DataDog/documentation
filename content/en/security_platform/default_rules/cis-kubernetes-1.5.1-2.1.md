---
aliases:
- b8a-e8g-h6k
control: '2.1'
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --cert-file and --key-file arguments are set as appropriate
type: security_rules
---

## Description

Configure TLS encryption for the etcd service.

## Rationale

Etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be encrypted in transit.

## Audit

Run the following command on the etcd server node:
```
ps -ef | grep etcd
```
Verify that the `--cert-file` and the `--key-file` arguments are set as appropriate.

## Remediation

Follow the etcd service documentation and configure TLS encryption. Then, edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master node and set the below parameters:

```
--cert-file=</path/to/ca-file> 
--key-file=</path/to/key-file>
```

## Impact

Client connections only over TLS would be served.

## Default Value

By default, TLS encryption is not set.

## References

1. [https://coreos.com/etcd/docs/latest/op-guide/security.html ][1]
2. [https://kubernetes.io/docs/admin/etcd/][2]

## CIS Controls

Version 6.14.2 Encrypt All Sensitive Information Over Less-trusted Networks - All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7.14.4 Encrypt All Sensitive Information in Transit - Encrypt all sensitive information in transit.                

[1]: https://coreos.com/etcd/docs/latest/op-guide/security.html 
[2]: https://kubernetes.io/docs/admin/etcd/
