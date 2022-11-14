---
aliases:
- 0yz-7md-lqk
- /security_monitoring/default_rules/0yz-7md-lqk
- /security_monitoring/default_rules/aws_metadata_service
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0006-credential-access
technique: T1552-unsecured-credentials
title: Network utility accessed cloud metadata service
type: security_rules
---

## Goal
Detect when a network utility (like `cURL` or `Wget`) is used to access the cloud instance metadata service (IMDS) in an interactive session.

## Strategy
The cloud instance metadata service is a link-local HTTP endpoint that provides data about a given cloud instance. One function is to provide temporary security credentials so that they do not need to be stored on the host. Because IMDS can be used to fetch security credentials, attackers may use it to escalate privileges in order to access other cloud resources. This detection identifies when Linux network utilities are used in an interactive session to access the metadata service. Especially in production environments, it is unusual for this activity to occur interactively.

## Triage & Response
1. Determine whether or not this is expected behavior. For example, did an employee run commands for an approved reason, or does a configuration management utility use an interactive session?
2. If this behavior is unexpected, attempt to contain the compromise (possibly by terminating the workload, depending on the stage of attack) and look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the nature of the attack and the tools involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Using cloud audit logs, identify if the attached identity was misused.
5. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
