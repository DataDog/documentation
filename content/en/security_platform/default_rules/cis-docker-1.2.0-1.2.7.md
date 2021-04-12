---
aliases:
- yxa-i75-xdr
control: 1.2.7
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: docker.socket auditing is configured
type: security_rules
---

## Description

Audit `docker.socket`, if applicable.

## Rationale

As well as auditing Linux file system and system calls, you should also audit the Docker daemon. Because this daemon runs with root privileges, it is very important to audit its activities and usage. Its behavior depends on some key files and directories, including the `docker.socket` file, which holds various parameters for the Docker daemon, it should be audited.

## Audit

1. Locate the `docker.socket` file by running: 
    ```
    systemctl show -p FragmentPath docker.socket 
    ```
2. If the file does not exist, this recommendation is not applicable. If the `docker.socket` file exists, verify that there is an audit rule corresponding to the `docker.socket` file by running: 
    ```
    auditctl -l | grep docker.socket 
    ```

## Remediation

If the file exists, you should add a rule for it. For example, add the following line to the `/etc/audit/audit.rules` file:

```
-w /usr/lib/systemd/system/docker.socket -k docker 
```

Then restart the audit daemon: 
```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, Docker related files and directories are not audited. The file `docker.socket` may not be present, but if it is, it should be audited.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]

## CIS Controls

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information - Enforce detailed audit logging for access to nonpublic data and special authentication for sensitive data. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data - Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html
