---
aliases:
- 69v-npt-bzr
- /security_monitoring/default_rules/69v-npt-bzr
- /security_monitoring/default_rules/cis-docker-1.2.0-5.14
control: '5.14'
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
title: Restart attempts on container failure is limited to 5 attempts
type: security_rules
---

## Description

By using the `--restart` flag in the docker run command you can specify a restart policy for how a container should or should not be restarted on exit. You should choose the on-failure restart policy and limit the restart attempts to 5.

## Rationale

If you indefinitely keep trying to start the container, it could possibly lead to a denial of service on the host. It could be an easy way to do a distributed denial of service attack especially if you have many containers on the same host. Additionally, ignoring the exit status of the container and always attempting to restart the container, leads to non-investigation of the root cause behind containers getting terminated. If a container gets terminated, you should investigate on the reason behind it instead of just attempting to restart it indefinitely. You should use the on-failure restart policy to limit the number of container restarts to a maximum of 5 attempts.

## Audit

Execute this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: RestartPolicyName={{ .HostConfig.RestartPolicy.Name }} MaximumRetryCount={{ .HostConfig.RestartPolicy.MaximumRetryCount }}'` 

If this command returns `RestartPolicyName=always`, then the system is not configured optimally. If this command returns `RestartPolicyName=no` or just `RestartPolicyName=`, then restart policies are not being used and the container would never be restarted automatically. This may be a secure option, but it is not the best option from a usability standpoint. If this command returns `RestartPolicyName=on-failure`, then verify that the number of restart attempts is set to 5 or less by looking at `MaximumRetryCount`.

## Remediation

If you wish a container to be automatically restarted, use `docker run --detach --restart=on-failure:5 nginx`

## Impact

If this option is set, a container will only attempt to restart itself 5 times.

## Default value

By default, containers are not configured with restart policies.

## References

1. https://docs.docker.com/engine/reference/commandline/run/#restart-policies-restart

## CIS controls

Version 6

18 Application Software Security Application Software Security
