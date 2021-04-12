---
aliases:
- hvr-5bi-sf6
control: 1.2.3
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Auditing is configured for the Docker daemon
type: security_rules
---

## Description

Audit all Docker daemon activities.

## Rationale

As well as auditing the normal Linux file system and system calls, you should also audit the Docker daemon. Because this daemon runs with root privileges. It is very important to audit its activities and usage.

## Audit

Verify that there are audit rules for the Docker daemon. To see the rules associated with the Docker daemon, run: 

```
auditctl -l | grep /usr/bin/dockerd
```

## Remediation

You should add rules for the Docker daemon. For example, add the following line to the `/etc/audit/audit.rules` file: 

```
-w /usr/bin/dockerd -k docker 
```

Then restart the audit daemon using the following command:

```
service auditd restart
```

## Impact

Auditing can generate large log files. You should ensure that these are rotated and archived periodically. A separate partition should also be created for audit logs to avoid filling up any other critical partition.

## Default Value

By default, the Docker daemon is not audited.

## References

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]

## CIS Controls

Version 6.6.2 Ensure Audit Log Settings Support Appropriate Log Entry Formatting - Validate audit log settings for each hardware device and the software installed on it, ensuring that logs include a date, timestamp, source addresses, destination addresses, and various other useful elements of each packet and/or transaction. Systems should record logs in a standardized format such as syslog entries or those outlined by the Common Event Expression initiative. If systems cannot generate logs in a standardized format, log normalization tools can be deployed to convert logs into such a format. 

Version 7.6.2 Activate audit logging - Ensure that local logging has been enabled on all systems and networking devices. 

Version 6.3 Enable Detailed Logging - Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html
