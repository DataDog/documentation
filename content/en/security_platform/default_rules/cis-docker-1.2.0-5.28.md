---
aliases:
- 3sx-8aj-uca
control: '5.28'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: PIDs cgroup limit is used
type: security_rules
---

## Description

You should use the `--pids-limit` flag at container runtime.

## Rationale

Attackers could launch a fork bomb with a single command inside the container. This fork bomb could crash the entire system and would require a restart of the host to make the system functional again. Using the PIDs cgroup parameter --pids-limit would prevent this kind of attack by restricting the number of forks that can happen inside a container within a specified time frame.

## Audit

Run this command and ensure that `PidsLimit` is not set to 0 or -
1.  A PidsLimit of 0 or -1 means that any number of processes can be forked concurrently inside the container. 

```
docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: PidsLimit={{ .HostConfig.PidsLimit }}'
```

## Remediation

Use `--pids-limit` flag with an appropriate value when launching the container. For example, `docker run -it --pids-limit 100 <Image_ID>`

In the above example, the number of processes allowed to run at any given time is set to 100. After a limit of 100 concurrently running processes is reached, Docker would restrict any new process creation.

## Impact

Set the PIDs limit value as appropriate. Incorrect values might leave containers unusable.

## Default Value

The Default value for `--pids-limit` is 0 which means there is no restriction on the number of forks. Note that the PIDs cgroup limit works only for kernel versions 4.3 and higher.

## References

1. https://github.com/docker/docker/pull/18697
2. https://docs.docker.com/engine/reference/commandline/run/#options

## CIS Controls

Version 6

18 Application Software Security Application Software Security
