---
aliases:
- 7r2-ba2-fit
- /security_monitoring/default_rules/7r2-ba2-fit
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.2.18
control: 1.2.18
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
title: API server does not bind to an insecure API service address
type: security_rules
---

## Description

Do not bind the insecure API service.

## Rationale

If you bind the apiserver to an insecure address, basically anyone who could connect to it over the insecure port, would have unauthenticated and unencrypted access to your master node. The apiserver doesn't do any authentication checking for insecure binds and traffic to the Insecure API port is not encrpyted, allowing attackers to potentially read sensitive data in transit.

## Audit

Run the following command on the master node: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--insecure-bind-address` argument does not exist.

## Remediation

Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml on the master node and remove the --insecure-bind-address parameter.

## Impact

Connections to the API server will require valid authentication credentials.

## Default value

By default, the insecure bind address is not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS controls

Version 6 9.1 Limit Open Ports, Protocols, and Services Ensure that only ports, protocols, and services with validated business needs are running on each system. Version 7 9.2 Ensure Only Approved Ports, Protocols and Services Are Running Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
