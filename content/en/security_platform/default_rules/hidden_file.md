---
aliases:
- rx6-2a3-fac
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: A hidden file was created
type: security_rules
---

## Goal
Hidden files may be used by attackers to hide from detection mechanisms on hosts and containers. This detection aims at finding the creation of any new hidden files.

## Strategy
In Linux, files are hidden from users by prepending `.` to the filename. For example `.some.file`. This detection will monitor for the creation of any file thats name begins with a `.`.

## Triage & Response
1. Check to see which user or process created the new hidden file.
3. If these new files are not expected contain the host or container, roll back to a known good configuration.
