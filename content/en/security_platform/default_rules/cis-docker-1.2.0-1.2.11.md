---
aliases:
- 3r2-3jv-hy5
control: 1.2.11
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: /usr/bin/containerd auditing is configured
type: security_rules
---

## Description

Audit `/usr/bin/containerd`, if applicable.

## Rationale

As well as auditing Linux file system and system calls, you should audit all Docker related files and directories. The Docker daemon runs with root privileges and its behavior depends on some key files and directories, including `/usr/bin/containerd`, so it should be audited.

## Audit

Verify that there is an audit rule corresponding to the `/usr/bin/containerd` file. To display the rule for the `/usr/bin/containerd` file, run: 

```
auditctl -l | grep /usr/bin/containerd
```

## Remediation

You should add a rule for the `/usr/bin/containerd` file. For example, add the following line to the `/etc/audit/audit.rules` file:

```
-w /usr/bin/containerd -k docker 
```

Then restart the audit daemon: 

```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, Docker related files and directories are not audited. The file `/usr/bin/containerd` may not be present on the system and in that case, this recommendation is not applicable.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]
2. [https://github.com/docker/docker/pull/20662][2]
3. [https://containerd.tools/][3]

## CIS Controls

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information - Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data - Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html 
[2]: https://github.com/docker/docker/pull/20662 
[3]: https://containerd.tools/
