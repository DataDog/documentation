---
aliases:
- jyb-pxc-x25
control: '5.1'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: An AppArmor Profile is enabled
type: security_rules
---

## Description

AppArmor is an effective and easy-to-use Linux application security system. It is available on some Linux distributions by default, for example, on Debian and Ubuntu.

## Rationale

AppArmor protects the Linux OS and applications from various threats by enforcing a security policy which is also known as an AppArmor profile. You can create your own AppArmor profile for containers or use Docker's default profile. Enabling this feature enforces security policies on containers as defined in the profile.

## Audit

You should run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: AppArmorProfile={{ .AppArmorProfile }}'` 

This command returns a valid AppArmor Profile for each container instance.

## Remediation

If AppArmor is applicable for your Linux OS, enable it.

1. Verify AppArmor is installed.
2. Create or import a AppArmor profile for Docker containers.
3. Enable enforcement of the policy.
4. Start your Docker container using the customized AppArmor profile. For example: `docker run --interactive --tty --security-opt="apparmor:PROFILENAME" ubuntu /bin/bash` Alternatively, Docker's default AppArmor policy can be used.

## Impact

The container will have the security controls defined in the AppArmor profile. It should be noted that if the AppArmor profile is misconfigured, this may cause issues with the operation of the container.

## Default Value

By default, the docker-default AppArmor profile is applied to running containers. This profile can be found at `/etc/apparmor.d/docker`

## References

1. https://docs.docker.com/engine/security/apparmor/
2. https://docs.docker.com/engine/reference/run/#security-configuration
3. https://docs.docker.com/engine/security/security/#other-kernel-security-features

## CIS Controls

Version 6

14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7

14.6 Protect Information through Access Control Lists - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.
