---
aliases:
- pra-z9v-3ig
- /security_monitoring/default_rules/pra-z9v-3ig
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.1.8
control: 1.1.8
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
title: Etcd pod specification file is owned by root
type: security_rules
---

## Description

Ensure that the `/etc/kubernetes/manifests/etcd.yaml` file ownership is set to `root:root`.

## Rationale

The etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` controls various parameters that set the behavior of the etcd service in the master node. etcd is a highly-available key-value store which Kubernetes uses for persistent storage of all of its REST API object. You should set its file ownership to maintain the integrity of the file. The file should be owned by `root:root`.

## Audit

Run the below command (based on the file location on your system) on the master node.

```bash
stat -c %U:%G /etc/kubernetes/manifests/etcd.yaml
```

Verify the ownership is set to `root:root`.

## Remediation

Run the below command (based on the file location on your system) on the master node. For example, `chown root:root /etc/kubernetes/manifests/etcd.yaml`

## Impact

None

## Default value

By default, `/etc/kubernetes/manifests/etcd.yaml` file ownership is set to root:root.

## References

1. https://coreos.com/etcd
2. https://kubernetes.io/docs/admin/etcd/

## CIS controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7

5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.
