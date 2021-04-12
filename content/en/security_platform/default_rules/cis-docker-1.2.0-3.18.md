---
aliases:
- wc9-677-7id
control: '3.18'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: daemon.json file permissions are set to 644 or more restrictive
type: security_rules
---

## Description

You should verify that the daemon.json file permissions are correctly set to 644 or more restrictively.

## Rationale

The daemon.json file contains sensitive parameters that may alter the behavior of the docker daemon. Therefore it should be writeable only by root to ensure it is not modified by less privileged users.

## Audit

Verify that the `daemon.json` file permissions are set to `644` or more restrictive, by running: 
```
stat -c %a /etc/docker/daemon.json
```

## Remediation

Run `chmod 644 /etc/docker/daemon.json`

This sets the file permissions for this file to 644.

## Impact

None

## Default Value

This file may not be present on the system, and in that case, this recommendation is not applicable.

## References

1. https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file

## CIS Controls

Version 6

14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7

14.6 Protect Information through Access Control Lists Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.
