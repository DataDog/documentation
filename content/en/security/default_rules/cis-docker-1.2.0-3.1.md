---
aliases:
- agi-95m-4vt
- /security_monitoring/default_rules/agi-95m-4vt
- /security_monitoring/default_rules/cis-docker-1.2.0-3.1
control: '3.1'
disable_edit: true
framework: cis-docker
integration_id: docker
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: docker
security: compliance
source: docker
title: Only the root account and group have ownership of the docker.service file
type: security_rules
---

## Description

You should verify that the docker.service file ownership and group ownership are correctly set to root.

## Rationale

The docker.service file contains sensitive parameters that may alter the behavior of the Docker daemon. It should therefore be individually and group owned by the root user in order to ensure that it is not modified or corrupted by a less privileged user.

## Audit

1. Locate the `docker.service` file by running: 
    ```
    systemctl show -p FragmentPath docker.service 
    ```
2. If the file does not exist, this recommendation is not applicable. If the file exists, verify that it is owned and group-owned by root, by running the following command with the correct filepath:
    ```
    stat -c %U:%G /usr/lib/systemd/system/docker.service | grep -v root:root 
    ```
    The command should not return anything.

## Remediation

1. Find out the file location: `systemctl show -p FragmentPath docker.service`
2. If the file does not exist, this recommendation is not applicable. If the file does exist, you should execute the command below, including the correct file path, in order to set the ownership and group ownership for the file to root.

For example, `chown root:root /usr/lib/systemd/system/docker.service`

## Impact

None.

## Default value

This file may not be present on the system and if it is not, this recommendation is not applicable. By default, if the file is present, the correct permissions are for the ownership and group ownership to be set to "root".

## References

1. https://docs.docker.com/engine/admin/systemd/

## CIS controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
