---
aliases:
- pi5-992-feg
control: 1.2.6
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: docker.service auditing is configured
type: security_rules
---

## Description

Audit the `docker.service` if applicable.

## Rationale

As well as auditing Linux file system and system calls, you should also audit all Docker related files and directories. The Docker daemon runs with root privileges and its behavior depends on some key files and directories, including `docker.service`. The `docker.service` file might be present if the daemon parameters have been changed by an administrator. If so, it holds various parameters for the Docker daemon and should be audited.

## Audit

1. Locate the `docker.service` file by running: 
    ```
    systemctl show -p FragmentPath docker.service
    ```

2. If the file does not exist, this recommendation does not apply. If the file does exist, verify that there is an audit rule corresponding to the `docker.service` file by running: 

    ```
    auditctl -l | grep docker.service
    ```

## Remediation

If the file exists, a rule for it should be added. For example, add the following line to the `/etc/audit/audit.rules` file: 
```
-w /usr/lib/systemd/system/docker.service -k docker 
```

Then restart the audit daemon: 

```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, Docker related files and directories are not audited. The file `docker.service` may not be present on the system.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]

## CIS Controls

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information - Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data - Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html
