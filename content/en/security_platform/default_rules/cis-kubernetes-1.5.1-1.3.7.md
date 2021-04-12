---
aliases:
- 7a7-22h-gnc
control: 1.3.7
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --bind-address argument is set to 127.0.0.1 (Controller Manager)
type: security_rules
---

## Description

Do not bind the Controller Manager service to non-loopback insecure addresses.

## Rationale

The Controller Manager API service which runs on port 10252/TCP by default is used for health and metrics information and is available without authentication or encryption. As such it should only be bound to a localhost interface, to minimize the cluster's attack surface

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-controller-manager
```
Verify that the `--bind-address` argument is set to `127.0.0.1`.

## Remediation

Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml` on the master node and ensure the correct value for the `--bind-address` parameter.

## Impact

None

## Default Value

By default, the `--bind-address` parameter is set to `0.0.0.0`.

## References

1. https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/ 

*Notes*: Although the current Kubernetes documentation site says that `--address` is deprecated in favour of `--bind-address`. Kubeadm 1.11 still makes use of `--address`.

## CIS Controls

Version 6.9.1 Limit Open Ports, Protocols, and Services - Ensure that only ports, protocols, and services with validated business needs are running on each system. 

Version 7.9.2 Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
