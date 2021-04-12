---
aliases:
- 2vc-udv-9at
control: '3.16'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Docker socket file permissions are set to 660 or more restrictively
type: security_rules
---

## Description

You should verify that the Docker socket file has permissions of 660 or are configured more restrictively.

## Rationale

Only root and the members of the docker group should be allowed to read and write to the default Docker Unix socket. The Docker socket file should therefore have permissions of 660 or more restrictive permissions.

## Audit

Verify that the Docker socket file has permissions of `660` or more restrictive, by running: 
```
stat -c %a /var/run/docker.sock
```

## Remediation

Run the command `chmod 660 /var/run/docker.sock`

This sets the file permissions of the Docker socket file to 660.

## Impact

None

## Default Value

By default, the permissions for the Docker socket file is correctly set to 660.

## References

1. https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option
2. https://docs.docker.com/engine/reference/commandline/dockerd/#bind-docker-to-another-hostport-or-a-unix-socket

## CIS Controls

Version 6

14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7

14.6 Protect Information through Access Control Lists Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.
