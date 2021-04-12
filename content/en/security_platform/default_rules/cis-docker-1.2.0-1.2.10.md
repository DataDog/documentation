---
aliases:
- aty-suc-tsx
control: 1.2.10
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: /etc/docker/daemon.json auditing is configured
type: security_rules
---

## Description

Audit `/etc/docker/daemon.json`, if applicable.

## Rationale

As well as auditing Linux file system and system calls, you should also audit all Docker related files and directories. The Docker daemon runs with root privileges and its behavior depends on some key files and directories, including `/etc/docker/daemon.json`. This holds various parameters for the Docker daemon, and so it should be audited.

## Audit

Verify that there is an audit rule associated with the `/etc/docker/daemon.json` file. To display the rule for the `/etc/docker/daemon.json` file, run: 

```
auditctl -l | grep /etc/docker/daemon.json
```

## Remediation

You should add a rule for the `/etc/docker/daemon.json` file. For example, add the following line to the `/etc/audit/audit.rules` file: 

```
-w /etc/docker/daemon.json -k docker 
```

Then restart the audit daemon: 

```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, Docker related files and directories are not audited. The file `/etc/docker/daemon.json` may not exist on the system and in that case, this recommendation is not applicable.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]
2. [https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file][2]

## CIS Controls

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information - Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data - Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html 
[2]: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file
