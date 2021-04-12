---
aliases:
- eaf-ywf-nnp
control: 4.1.9
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Kubelet configuration file has permissions set to 644 or more restrictive
type: security_rules
---

## Description

Ensure that if the kubelet refers to a configuration file with the `--config` argument, that file has permissions of 644 or more restrictive.

## Rationale

The kubelet reads various parameters, including security settings, from a config file specified by the `--config` argument. If this file is specified you should restrict its file permissions to maintain the integrity of the file. The file should be writable by only the administrators on the system.

## Audit

Locate the Kubelet config file as follows: `ps -ef | grep kubelet | grep config`. If the `--config` argument is present, this gives the location of the Kubelet config file, for example `/var/lib/kubelet/config.yaml`. Run the following command (using the file location you just identified) to find that file's permissions: `stat -c %a /var/lib/kubelet/config.yaml`. Verify that the permissions are 644 or more restrictive.

## Remediation

Run the following command (using the config file location identified in the Audit step:

```
chmod 644 /var/lib/kubelet/config.yaml
```

## Impact

None

## Default Value

By default, the `/var/lib/kubelet/config.yaml` file as set up by kubeadm has permissions of 644.

## References

1. [https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/][1]

## CIS Controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.

[1]: https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/
