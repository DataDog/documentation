---
aliases:
- yp7-hhy-s2z
control: 1.2.32
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --etcd-cafile argument is set as appropriate
type: security_rules
---

## Description

etcd should be configured to make use of TLS encryption for client connections.

## Rationale

etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be protected by client authentication. This requires the API server to identify itself to the etcd server using a SSL Certificate Authority file.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--etcd-cafile` argument exists and it is set as appropriate.

## Remediation

Follow the Kubernetes documentation and set up the TLS connection between the apiserver and etcd. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the etcd certificate authority file parameter: `--etcd-cafile=<path/to/ca-file>`

## Impact

TLS and client certificate authentication must be configured for etcd.

## Default Value

By default, `--etcd-cafile` is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. https://coreos.com/etcd/docs/latest/op-guide/security.html

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks - All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7 14.4 Encrypt All Sensitive Information in Transit - Encrypt all sensitive information in transit.
