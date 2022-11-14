---
aliases:
- 9jy-pei-duz
- /security_monitoring/default_rules/9jy-pei-duz
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-4.1.10
control: 4.1.10
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
title: Kubelet configuration file is owned by root
type: security_rules
---

## Description

Ensure that if the kubelet refers to a configuration file with the `--config` argument, that file is owned by root:root.

## Rationale

The kubelet reads various parameters, including security settings, from a config file specified by the `--config` argument. If this file is specified you should restrict its file permissions to maintain the integrity of the file. The file should be owned by root:root.

## Audit

Locate the Kubelet config file as follows: `ps -ef | grep kubelet | grep config`. If the `--config` argument is present, this gives the location of the Kubelet config file, for example `/var/lib/kubelet/config.yaml`. Run the following command (using the file location you just identified) to find that file's permissions: `stat -c %U:%G /var/lib/kubelet/config.yaml`. Verify that the ownership is set to `root:root`.

## Remediation

Run the following command (using the config file location identified in the Audit step): `chown root:root /etc/kubernetes/kubelet.conf`

## Impact

None

## Default value

By default, `/var/lib/kubelet/config.yaml` file as set up by kubeadm is owned by `root:root`.

## References

1. [https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/][1]

## CIS controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.

[1]: https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/
