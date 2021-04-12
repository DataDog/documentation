---
aliases:
- s24-ea2-4qt
control: '3.2'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: docker.service file permissions are appropriately set
type: security_rules
---

## Description

You should verify that the docker.service file permissions are either set to 644 or to a more restrictive value.

## Rationale

The docker.service file contains sensitive parameters that may alter the behavior of the Docker daemon. It should therefore not be writable by any other user other than root in order to ensure that it can not be modified by less privileged users.

## Audit

1. Locate the `docker.service` file by running: 
    ```
    systemctl show -p FragmentPath docker.service
    ```
2. If the file does not exist, this recommendation is not applicable. If the file exists, verify that the file permissions are set to `644` or a more restrictive value by running the following command with the correct filepath:
    ```
    stat -c %a /usr/lib/systemd/system/docker.service
    ```

## Remediation

1. Find out the file location: `systemctl show -p FragmentPath docker.service`
2. If the file does not exist, this recommendation is not applicable. If the file exists, execute the command below including the correct file path to set the file permissions to 644. For example, `chmod 644 /usr/lib/systemd/system/docker.service`

## Impact

None

## Default Value

This file may not be present on the system. In that case, this recommendation is not applicable. By default, if the file is present, the file permissions are correctly set to 644.

## References

1. https://docs.docker.com/articles/systemd/

## CIS Controls

Version 6

14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7

14.6 Protect Information through Access Control Lists - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.
