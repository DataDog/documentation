---
aliases:
- faw-pq4-uih
control: '2.4'
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --peer-cert-file and --peer-key-file arguments are set as appropriate
type: security_rules
---

## Description

Etcd should be configured to make use of TLS encryption for peer connections.

## Rationale

Etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be encrypted in transit and also amongst peers in the etcd clusters.

## Audit

This recommendation is applicable only for etcd clusters. If you are using only one etcd server in your environment then this recommendation is not applicable.

Run the following command on the etcd server node: 
```
ps -ef | grep etcd
```
Verify that the `--peer-cert-file` and `--peer-key-file` arguments are set as appropriate. 

## Remediation

Follow the etcd service documentation and configure peer TLS encryption as appropriate for your etcd cluster. Then, edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master node and set the below parameters:

```
--peer-cert-file=</path/to/peer-cert-file> 
--peer-key-file=</path/to/peer-key-file>
```

## Impact

Etcd cluster peers would need to set up TLS for their communication.

## Default Value

*Note*: This recommendation is applicable only for etcd clusters. If you are using only one etcd server in your environment then this recommendation is not applicable. By default, peer communication over TLS is not configured.

## References

1. [https://coreos.com/etcd/docs/latest/op-guide/security.html ][1]
2. [https://kubernetes.io/docs/admin/etcd/][2]

## CIS Controls

Version 6.14.2 Encrypt All Sensitive Information Over Less-trusted Networks - All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7.14.4 Encrypt All Sensitive Information in Transit - Encrypt all sensitive information in transit.  

[1]: https://coreos.com/etcd/docs/latest/op-guide/security.html 
[2]: https://kubernetes.io/docs/admin/etcd/
