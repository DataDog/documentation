---
aliases:
- ymm-a8s-pjm
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Log data in /var/log/ was deleted
type: security_rules
---

## Goal
Many attackers attempt to evade detection by deleting evidence of their presence on a host or container. A common way to do this is by deleting or modifying critical system logs that would otherwise log their activity. This detection aims to detect an attackers attempts to conceal themselves by destroying log data.

## Strategy
This detection monitors the truncation (like the clearing of data within) of any log files under `/var/log` which is where many critical Linux log files are stored.

## Triage & Response
1. Check the name of the log file that was modified.
2. Check which user or process modified the log.
3. If this activity is not expected, contain the host or container, and roll back to a known good configuration.
