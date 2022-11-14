---
aliases:
- 4kk-m7s-ur6
- /security_monitoring/default_rules/4kk-m7s-ur6
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.29
control: 1.2.29
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
title: etcd server requires API servers present a client certificate and key when
  connecting
type: security_rules
---

## Description

etcd should be configured to make use of TLS encryption for client connections.

## Rationale

etcd is a highly-available key value store used by Kubernetes deployments for persistent storage of all of its REST API objects. These objects are sensitive in nature and should be protected by client authentication. This requires the API server to identify itself to the etcd server using a client certificate and key.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--etcd-certfile` and `--etcd-keyfile` arguments exist and they are set as appropriate.

## Remediation

Follow the Kubernetes documentation and set up the TLS connection between the apiserver and etcd. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the etcd certificate and key file parameters. 
```
--etcd-certfile=<path/to/client-certificate-file> 
--etcd-keyfile=<path/to/client-key-file>
```

## Impact

TLS and client certificate authentication must be configured for etcd.

## Default value

By default, `--etcd-certfile` and `--etcd-keyfile` arguments are not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. https://coreos.com/etcd/docs/latest/op-guide/security.html

## CIS controls

Version 6 9 Limitation and Control of Network Ports, Protocols, and Services
Version 7 9 Limitation and Control of Network Ports, Protocols, and Services
