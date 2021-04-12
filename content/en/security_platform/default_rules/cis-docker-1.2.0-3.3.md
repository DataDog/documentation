---
aliases:
- aex-57w-5ut
control: '3.3'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: docker.socket file ownership is set to root:root
type: security_rules
---

## Description

You should verify that the docker.socket file ownership and group ownership are correctly set to root.

## Rationale

The docker.socket file contains sensitive parameters that may alter the behavior of the Docker remote API. For this reason, it should be owned and group owned by root in order to ensure that it is not modified by less privileged users.

## Audit

1. Locate the `docker.socket` file by running: 
    ```
    systemctl show -p FragmentPath docker.socket
    ```
2. If the file does not exist, this recommendation is not applicable. If the file exists, verify that the file is owned and group-owned by root by running the following command with the correct filepath:
    ```
    stat -c %U:%G /usr/lib/systemd/system/docker.socket | grep -v root:root 
    ```
    The command should not return a value.

## Remediation

1. Find out the file location: `systemctl show -p FragmentPath docker.socket`
2. If the file does not exist, this recommendation is not applicable. If the file exists, execute the command below, including the correct file path to set the ownership and group ownership for the file to root. For example, `chown root:root /usr/lib/systemd/system/docker.socket`

## Impact

None

## Default Value

This file may not be present on the system. In that case, this recommendation is not applicable. By default, if the file is present, the ownership and group ownership for it should be set to root.

## References

1. https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option 2. https://github.com/docker/docker-ce/blob/master/components/packaging/deb/systemd/docker.socket

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
