---
aliases:
- uho-muk-xqy
- /security_monitoring/default_rules/uho-muk-xqy
- /security_monitoring/default_rules/java_shell_execution
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: Java process spawned shell
type: security_rules
---

## Goal
Detect common shell utilities, HTTP utilities, or shells spawned by a Java process.

## Strategy
Many applications (like some databases, web servers, and search engines) run as Java processes. Attackers may take advantage of flaws in programs built with these applications (for example, SQL injection on a database running as a Java process). This detection triggers when a Java process spawns common shell utilities, HTTP utilities, or shells. If this is unexpected behavior, it could indicate an attacker attempting to compromise your host.

## Triage and response
1. Determine the nature and purpose of the Java process.
2. Determine whether there is an approved purpose for the Java process to execute shells and utilities.
3. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack). Investigate application logs or APM data to look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
4. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
