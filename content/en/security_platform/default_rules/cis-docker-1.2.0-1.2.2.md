---
aliases:
- 9hi-unv-yy9
control: 1.2.2
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Only trusted users are allowed to control Docker daemon
type: security_rules
---

## Description

The Docker daemon requires access to the Docker socket which is, by default, owned by the user `root` and the group `docker`.

## Rationale

Docker allows you to share a directory between the Docker host and a guest container without limiting the access rights of the container. This means that you can start a container and map the `/` directory on your host to the container. The container is able to modify your host file system without any restrictions. This means that you could gain elevated privileges simply by being a member of the `docker` group and subsequently start a container which maps the root `/` directory on the host.


## Audit

Run the following command on the Docker host to see the members of the `docker` group, and ensure that only trusted users are members:

```
getent group docker
```

## Remediation

You should remove any untrusted users from the `docker` group. Additionally, you should not create a mapping of sensitive directories from the host to container volumes.

## Impact

Provided the proceeding instructions are implemented, rights to build and execute containers as normal user would be restricted.

## Default Value

Not Applicable

## References

1. [https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface]
2. [https://www.andreas-jung.com/contents/on-docker-security-docker-group-considered-harmful]
3. [http://www.projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/]

## CIS Controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.                

[1]: https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface 
[2]: https://www.andreas-jung.com/contents/on-docker-security-docker-group-considered-harmful 
[3]: http://www.projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/
