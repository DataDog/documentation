---
aliases:
- umr-s7e-j9c
control: '5.25'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Container is restricted from acquiring additional privileges
type: security_rules
---

## Description

You should restrict the container from acquiring additional privileges via SUID or SGID bits.

## Rationale

A process can set the `no_new_priv` bit in the kernel and this persists across forks, clones and execve. The `no_new_priv` bit ensures that the process and its child processes do not gain any additional privileges via SUID or SGID bits. This reduces the danger associated with many operations because the possibility of subverting privileged binaries is lessened.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: SecurityOpt={{ .HostConfig.SecurityOpt }}'` 

This command returns all of the security options currently configured for containers. The option `no-new-privileges` should be one of them.

## Remediation

Start your container with the options `docker run --rm -it --security-opt=no-new-privileges ubuntu bash`

## Impact

The `no_new_priv` option prevents LSMs like SELinux from allowing processes to acquire new privileges.

## Default Value

By default, new privileges are not restricted.

## References

1. https://github.com/projectatomic/atomic-site/issues/269
2. https://github.com/docker/docker/pull/20727
3. https://www.kernel.org/doc/Documentation/prctl/no_new_privs.txt
4. https://lwn.net/Articles/475678/
5. https://lwn.net/Articles/475362/

## CIS Controls

Version 6

5 Controlled Use of Administration Privileges Controlled Use of Administration Privileges
