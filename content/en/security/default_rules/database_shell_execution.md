---
aliases:
- ldw-moi-trt
- /security_monitoring/default_rules/ldw-moi-trt
- /security_monitoring/default_rules/database_shell_execution
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
title: Database process spawned shell
type: security_rules
---

## Goal
Detect common shell utilities, HTTP utilities, or shells spawned by a database process (e.g., MySQL, PostgreSQL, MongoDB).

## Strategy
Attacks on databases often take advantage of oversights in I/O sanitization and validation to run attacker statements and commands. For example, these attacks could take the form of database query injection, which can signal the beginning of an intrusion and wider attack, by establishing a web shell or exfiltrating data. This detection triggers when common shell utilities, HTTP utilities, or shells are spawned by one of a set of database processes (e.g., MySQL, MongoDB, PostgreSQL). This is atypical behavior for a database. If this is unexpected behavior, it could indicate an attacker attempting to compromise your database or host machine.

## Triage and response
1. Determine whether or not there is an approved purpose for your database to execute shells and utilities.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack). Investigate application logs or APM data to look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
