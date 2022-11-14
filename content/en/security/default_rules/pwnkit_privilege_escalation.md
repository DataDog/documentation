---
aliases:
- vw5-94j-nr5
- /security_monitoring/default_rules/vw5-94j-nr5
- /security_monitoring/default_rules/pwnkit_privilege_escalation
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0004-privilege-escalation
technique: T1068-exploitation-for-privilege-escalation
title: Pwnkit privilege escalation attempt
type: security_rules
---

## Goal

Detect exploitation of CVE-2021-4034 dubbed PwnKit.

## Strategy

PwnKit is a local privilege escalation vulnerability originally found by [Qualys](https://blog.qualys.com/vulnerabilities-threat-research/2022/01/25/pwnkit-local-privilege-escalation-vulnerability-discovered-in-polkits-pkexec-cve-2021-4034). It affects PolicyKit’s `pkexec` program, which is a SUID-root program installed by default on many Linux distributions. This detection triggers whenever `pkexec` is executed by a non-root process with the `SHELL` and `PATH` variables set.

## Triage and response

1. Determine the purpose of the process executing `pkexec`.
2. Look for any suspicious actions or commands being executed after the `pkexec` execution.
3. If this behavior is unexpected, it could indicate a malicious actor has access to the host and is attempting to increase privileges for post exploitation actions. Investigate application logs or APM data to look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
4. Ensure to update the PolicyKit package to its latest version to mitigate the vulnerability. If updating is not feasible, remove the SUID bit that is set by default on `pkexec` with the following command: `sudo chmod -s \$(which pkexec)`.

*Requires Agent version 7.27 or greater*
