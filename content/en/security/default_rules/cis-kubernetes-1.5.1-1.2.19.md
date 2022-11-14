---
aliases:
- zqy-4jm-w98
- /security_monitoring/default_rules/zqy-4jm-w98
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.19
control: 1.2.19
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
title: API server does not bind the API service to an insecure port
type: security_rules
---

## Description

Do not bind to insecure port.

## Rationale

Setting up the apiserver to serve on an insecure port would allow unauthenticated and unencrypted access to your master node. This would allow attackers who could access this port, to easily take control of the cluster.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--insecure-port` argument is set to `0`.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the below parameter. --insecure-port=0

## Impact

All components that use the API must connect via the secured port, authenticate themselves, and be authorized to use the API. This includes: kube-controller-manager kube-proxy kube-scheduler kubelets

## Default value

By default, the insecure port is set to 8080.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS controls

Version 6 9.1 Limit Open Ports, Protocols, and Services Ensure that only ports, protocols, and services with validated business needs are running on each system. Version 7 9.2 Ensure Only Approved Ports, Protocols and Services Are Running Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
