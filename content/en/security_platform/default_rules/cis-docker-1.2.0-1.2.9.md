---
aliases:
- xci-6f7-aip
control: 1.2.9
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: /etc/sysconfig/docker auditing is configured
type: security_rules
---

## Description

Audit `/etc/sysconfig/docker`, if applicable.

## Rationale

As well as auditing Linux file system and system calls, you should also audit the Docker daemon. Because this daemon runs with root privileges, it is very important to audit its activities and usage. Its behavior depends on some key files and directories, including `/etc/sysconfig/docker`. It contains various parameters related to the Docker daemon when run on CentOS and RHEL based distributions. If present, it is important that it is audited.

## Audit

Verify that there is an audit rule associated with the `/etc/sysconfig/docker` file. To see the rule for the `/etc/sysconfig/docker` file, run: 
```
auditctl -l | grep /etc/sysconfig/docker
```

## Remediation

You should add a rule for `/etc/sysconfig/docker` file. For example, add the following line to the `/etc/audit/audit.rules` file:

```
-w /etc/sysconfig/docker -k docker
```

Then restart the audit daemon: 

```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, Docker related files and directories are not audited. The file `/etc/sysconfig/docker` may not be present on the system and in that case, this recommendation is not applicable.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]

## CIS Controls

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information - Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data - Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html
