---
aliases:
- inr-e2u-vr4
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Memory files in /proc/ were accessed
type: security_rules
---

## Goal
Attackers looking for a specific mission target commonly gain access to a host or container adjacent to their mission target. To move laterally to the planned target, attackers commonly try to find credentials that would give them access to the host or container in question. A technique for finding these credentials is memory dumping. By dumping the contents of system memory to disk, an attacker can often find unencrypted credentials.

## Strategy
This detection monitors the access of memory and memory maps that can be accessed from the `/proc/` directory on Linux.

## Triage & Response
1. If this activity is not expected, contain the host or container, and roll back to a known good configuration.
2. Consider rotating any credentials that were in use on the host/container.
