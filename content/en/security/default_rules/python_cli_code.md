---
aliases:
- qmh-7zh-cwn
- /security_monitoring/default_rules/qmh-7zh-cwn
- /security_monitoring/default_rules/python_cli_code
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0002-execution
technique: T1059-command-and-scripting-interpreter
title: Python executed with suspicious arguments
type: security_rules
---

## Goal

Detect Python code being provided and executed on the command line using the `-c` flag.

## Strategy

Python code can be specified on the command line using the `-c` flag. Attackers may use this to run "one-liners" which establish communication with an attacker-run server, download additional malware, or otherwise advance their mission. Libraries such as `socket` and `subprocess` are commonly used in these attacks and are unlikely to have a legitimate purpose when used in this way.

## Triage and response

1. Review the process tree and identify if the Python command is expected.
2. If the command is not expected, contain the host or container and roll back to a known good configuration.
3. Start the incident response process and determine the initial entry point.

*Requires Agent version 7.27 or greater*
