---
aliases:
- wvt-2gh-pmt
control: 1.2.5
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: /etc/docker auditing is configured
type: security_rules
---

## Description

Audit `/etc/docker`.

## Rationale

As well as auditing Linux file system and system calls, you should also audit all Docker related files and directories. The Docker daemon runs with root privilege and its behavior depends on some key files and directories, including `/etc/docker`. This holds various certificates and keys used for TLS communication between Docker daemon and Docker client and so it should be audited.

## Audit

Verify that there is an audit rule applied to the `/etc/docker` directory. To see the rule for the `/etc/docker` directory, run: 

```
auditctl -l | grep /etc/docker
```

## Remediation

You should add a rule for the `/etc/docker` directory. For example, add the following line to the `/etc/audit/audit.rules` file:

```
-w /etc/docker -k docker 
```

Then restart the audit daemon:

```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, Docker related files and directories are not audited.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]

## CIS Controls

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information - Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data - Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html
