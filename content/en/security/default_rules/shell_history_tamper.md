---
aliases:
- wn5-psv-go1
- /security_monitoring/default_rules/wn5-psv-go1
- /security_monitoring/default_rules/shell_history_tamper
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0005-defense-evasion
technique: T1070-indicator-removal
title: Shell command history modified
type: security_rules
---

## Goal
Detect the tampering of shell command history on a host or container. 

## Strategy
Commands used within a terminal are contained within a local file so users can review applications, scripts, or processes that were previously executed.  Adversaries tamper with the integrity of the shell command history by deletion, truncation, or the linking of `/dev/null` by use of a symlink. This allows adversaries to obfuscate their actions and delay the incident response process. 

## Triage and response
1. Review the tampering action taken against the shell command history files.
2. Review the user or process that performed the action against the shell command history.
3. Determine whether or not this is expected behavior.
4. If this activity is not expected, contain the host or container, and roll back to a known good configuration.

*Requires Agent version 7.27 or greater*
