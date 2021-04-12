---
aliases:
- rf4-zcq-5j9
control: 3.2.1
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Minimal audit policy is created
type: security_rules
---

## Description

Kubernetes can audit the details of requests made to the API server. The `--audit-policy-file` flag must be set for this logging to be enabled.

## Rationale

Logging is an important detective control for all systems, to detect potential unauthorised access.

## Audit

Run the following command on one of the cluster master nodes: 
```
ps -ef | grep kube-apiserver
```
Verify that the `--audit-policy-file` is set. Review the contents of the file specified and ensure that it contains a valid audit policy.

## Remediation

Create an audit policy file for your cluster.

## Impact

Audit logs will be created on the master nodes, which will consume disk space. Care should be taken to avoid generating too large volumes of log information as this could impact the available of the cluster nodes.

## Default Value

Unless the `--audit-policy-file` flag is specified, no auditing will be carried out.

## References

1. [https://kubernetes.io/docs/tasks/debug-application-cluster/audit/][1]

## CIS Controls

Version 7.6.2 Activate audit logging - Ensure that local logging has been enabled on all systems and networking devices.

[1]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
