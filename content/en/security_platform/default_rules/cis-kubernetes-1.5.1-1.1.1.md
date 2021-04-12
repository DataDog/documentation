---
aliases:
- mdi-ze8-gbk
control: 1.1.1
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: API server pod specification file permissions are set to 644 or more restrictive
type: security_rules
---

## Description

Ensure that the API server pod specification file has permissions of 644 or more restrictive.

## Rationale

The API server pod specification file controls various parameters that set the behavior of the API server. You should restrict its file permissions to maintain the integrity of the file. The file should be writable by only the administrators on the system.

## Audit

Run the below command (based on the file location on your system) on the master node:

```bash
stat -c %a /etc/kubernetes/manifests/kube-apiserver.yaml
```

Verify the permissions are `644` or more restrictive.

## Remediation

Run the below command (based on the file location on your system) on the master node. For example, `chmod 644 /etc/kubernetes/manifests/kube-apiserver.yaml`

## Impact

None

## Default Value

By default, the `kube-apiserver.yaml` file has permissions of 640.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7

5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.
