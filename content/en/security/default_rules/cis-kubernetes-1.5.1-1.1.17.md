---
aliases:
- mwt-4aa-d87
- /security_monitoring/default_rules/mwt-4aa-d87
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.1.17
control: 1.1.17
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
title: controller-manager.conf file cannot be altered by non-owners
type: security_rules
---

## Description

Ensure that the `controller-manager.conf` file has permissions of 644 or more restrictive.

## Rationale

The `controller-manager.conf` file is the kubeconfig file for the Controller Manager. You should restrict its file permissions to maintain the integrity of the file. The file should be writable by only the administrators on the system.

## Audit

Run the following command (based on the file location on your system) on the master node.

```bash
stat -c %a /etc/kubernetes/controller-manager.conf
```

Verify the permissions are `644` or more restrictive.

## Remediation

Run the below command (based on the file location on your system) on the master node. For example, `chmod 644 /etc/kubernetes/controller-manager.conf`

## Impact

None

## Default value

By default, `controller-manager.conf` has permissions of 640.

## References

1. https://kubernetes.io/docs/admin/kube-controller-manager/

## CIS controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7

5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.
