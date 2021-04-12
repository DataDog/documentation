---
aliases:
- 634-w65-56w
control: '5.2'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: SELinux security options are set
type: security_rules
---

## Description

SELinux is an effective and easy-to-use Linux application security system. It is available by default on some distributions such as Red Hat and Fedora.

## Rationale

SELinux provides a Mandatory Access Control (MAC) system that greatly augments the default Discretionary Access Control (DAC) model. You can therefore add an extra layer of safety to your containers by enabling SELinux on your Linux host.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: SecurityOpt={{ .HostConfig.SecurityOpt }}'` 

This command returns all the security options currently configured on the containers listed.

## Remediation

If SELinux is applicable for your Linux OS, you should use it.

1. Set the SELinux State.
2. Set the SELinux Policy.
3. Create or import a SELinux policy template for Docker containers.
4. Start Docker in daemon mode with SELinux enabled. For example: `docker daemon --selinux-enabled`
5. Start your Docker container using the security options. For example, `docker run --interactive --tty --security-opt label=level:TopSecret centos /bin/bash`

## Impact

Any restrictions defined in the SELinux policy will be applied to your containers. It should be noted that if your SELinux policy is misconfigured, this may have an impact on the correct operation of the affected containers.

## Default Value

By default, no SELinux security options are applied on containers.

## References

1. https://docs.docker.com/engine/security/security/#other-kernel-security-features
2. https://docs.docker.com/engine/reference/run/#security-configuration
3. http://docs.fedoraproject.org/en-US/Fedora/13/html/Security-Enhanced_Linux/
4. https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html/container_security_guide/docker_selinux_security_policy

## CIS Controls

Version 6

14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7

14.6 Protect Information through Access Control Lists Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.
