---
aliases:
- it2-cj4-gy6
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Permissions were changed on sensitive Linux files
type: security_rules
---

## Goal
To access protected files and directories, attackers may attempt to change the permissions on these files and directories.

## Strategy
This detection monitors the permissions changes to sensitive files and directories such as `/etc/` and `/sbin/`.

## Triage & Response
1. Check to see if the file or directory was made more permissive.
2. Check which user or process made the change.
3. If these changes are unexpected, contain the host or container and roll back to the last known good configuration.
