---
aliases:
- t6p-v9r-6k8
control: '2.6'
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --peer-auto-tls argument is not set to true
type: security_rules
---

## Description

Do not use automatically generated self-signed certificates for TLS connections between peers.

## Rationale

Etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be accessible only by authenticated etcd peers in the etcd cluster. Hence, do not use self-signed certificates for authentication.

## Audit

This recommendation is applicable only for etcd clusters. If you are using only one etcd server in your environment then this recommendation is not applicable.

Run the following command on the etcd server node: 
```
ps -ef | grep etcd
```
Verify that if the `--peer-auto-tls` argument exists, it is not set to `true`.

## Remediation

Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master node and either remove the `--peer-auto-tls` parameter or set it to false. 

```
--peer-auto-tls=false
```

## Impact

All peers attempting to communicate with the etcd server will require a valid client certificate for authentication.

## Default Value

*Note*: This recommendation is applicable only for etcd clusters. If you are using only one etcd server in your environment then this recommendation is not applicable. By default, `--peer-auto-tls` argument is set to false.

## References

1. [https://coreos.com/etcd/docs/latest/op-guide/security.html ][1]
2. [https://kubernetes.io/docs/admin/etcd/ ][2]
3. [https://coreos.com/etcd/docs/latest/op-guide/configuration.html#peer-auto-tls][3]

## CIS Controls

Version 6.14 Controlled Access Based on the Need to Know

Version 7.4 Controlled Use of Administrative Privileges             

[1]: https://coreos.com/etcd/docs/latest/op-guide/security.html 
[2]: https://kubernetes.io/docs/admin/etcd/ 
[3]: https://coreos.com/etcd/docs/latest/op-guide/configuration.html#peer-auto-tls
