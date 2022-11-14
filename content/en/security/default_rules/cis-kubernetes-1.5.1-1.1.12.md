---
aliases:
- iwn-p4i-x2e
- /security_monitoring/default_rules/iwn-p4i-x2e
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.1.12
control: 1.1.12
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
title: Etcd data directory is owned by the etcd user and group
type: security_rules
---

## Description

Ensure that the etcd data directory ownership is set to `etcd:etcd`.

## Rationale

`etcd` is a highly-available key-value store used by Kubernetes deployments for persistent storage of all of its REST API objects. This data directory should be protected from any unauthorized reads or writes. It should be owned by `etcd:etcd`.

## Audit

On the etcd server node, get the etcd data directory passed as an argument `--data-dir` from the command:

```bash
ps -ef | grep etcd
```

Based on the etcd data directory found above, run the command:

```bash
stat -c %U:%G /var/lib/etcd
```

Verify the ownership is set to `etcd:etcd`.

## Remediation

On the etcd server node, get the etcd data directory, passed as an argument `--data-dir`, from the below command: `ps -ef | grep etcd`

Run the command (based on the etcd data directory found above): `chown etcd:etcd /var/lib/etcd`

## Impact

None

## Default value

By default, etcd data directory ownership is set to `etcd:etcd`.

## References

1. https://coreos.com/etcd/docs/latest/op-guide/configuration.html#data-dir
2. https://kubernetes.io/docs/admin/etcd/

## CIS controls

Version 6

14 Controlled Access Based on the Need to Know

Version 7

5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.
