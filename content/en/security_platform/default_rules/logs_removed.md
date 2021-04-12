---
aliases:
- g5g-xiy-sbf
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: A log file in /var/log/ was removed
type: security_rules
---

## Goal
Many attackers attempt to evade detection by deleting evidence of their presence on a host or container. A common way to do this is by deleting or modifying critical system logs that would otherwise log their activity. This detection aims to detect an attackers attempts to conceal themselves by destroying log data.

## Strategy
This detection monitors the deletion of any log files under `/var/log` which is where many critical Linux log files are stored.

## Triage & Response
1. Check the name of the log file that was deleted.
2. Check which user or process deleted the log.
3. If this activity is not expected, contain the host or container, and roll back to a known good configuration.
