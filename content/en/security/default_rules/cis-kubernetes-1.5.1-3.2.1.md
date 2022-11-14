---
aliases:
- rf4-zcq-5j9
- /security_monitoring/default_rules/rf4-zcq-5j9
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-3.2.1
control: 3.2.1
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
title: A minimal audit policy exists
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

## Default value

Unless the `--audit-policy-file` flag is specified, no auditing will be carried out.

## References

1. [https://kubernetes.io/docs/tasks/debug-application-cluster/audit/][1]

## CIS controls

Version 7.6.2 Activate audit logging - Ensure that local logging has been enabled on all systems and networking devices.

[1]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
