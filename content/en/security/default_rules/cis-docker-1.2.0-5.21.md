---
aliases:
- yha-436-t3b
- /security_monitoring/default_rules/yha-436-t3b
- /security_monitoring/default_rules/cis-docker-1.2.0-5.21
control: '5.21'
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
title: Seccomp profiles are enabled for filtering incoming system calls
type: security_rules
---

## Description

Seccomp filtering provides a means for a process to specify a filter for incoming system calls. The default Docker seccomp profile works on a whitelist basis and allows for a large number of common system calls, whilst blocking all others. This filtering should not be disabled unless it causes a problem with your container application usage.

## Rationale

A large number of system calls are exposed to every userland process with many of them going unused for the entire lifetime of the process. Most of applications do not need all these system calls and would therefore benefit from having a reduced set of available system calls. Having a reduced set of system calls reduces the total kernel surface exposed to the application and thus improvises application security.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: SecurityOpt={{ .HostConfig.SecurityOpt }}'` 

This returns either `<no value>` or your modified seccomp profile. If it returns `[seccomp:unconfined]`, the container is running without any seccomp profiles and is therefore not configured in line with good security practices.

## Remediation

By default, seccomp profiles are enabled. You do not need to do anything unless you want to modify and use a modified seccomp profile.

## Impact

With Docker 1.10 and greater, the default seccomp profile blocks syscalls, regardless of `--cap-add passed` to the container. You should create your own custom seccomp profile in such cases. You can also disable the default seccomp profile by passing `--security-opt=seccomp:unconfined` on docker run.

## Default value

When you run a container, it uses the default profile unless you override it with the `--security-opt` option.

## References

1. http://blog.scalock.com/new-docker-security-features-and-what-they-mean-seccomp-profiles
2. https://docs.docker.com/engine/reference/run/#security-configuration
3. https://github.com/docker/docker/blob/master/profiles/seccomp/default.json
4. https://docs.docker.com/engine/security/seccomp/
5. https://www.kernel.org/doc/Documentation/prctl/seccomp_filter.txt
6. https://github.com/docker/docker/issues/22870

## CIS controls

Version 6

18 Application Software Security Application Software Security
