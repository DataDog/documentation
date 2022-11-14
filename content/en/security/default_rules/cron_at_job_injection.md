---
aliases:
- a78-b2n-xmd
- /security_monitoring/default_rules/a78-b2n-xmd
- /security_monitoring/default_rules/cron_at_job_injection
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: file integrity monitoring
tactic: TA0002-execution
technique: T1053-scheduled-task-or-job
title: Cron job modified
type: security_rules
---

## Goal
Detect the creation or modification of new cron jobs on a system.

## Strategy
Cron is a task scheduling system that runs tasks on a time-based schedule. Attackers can use cron jobs to gain persistence on a system, or even to run malicious code at system-boot. Cron jobs can also be used for remote code execution, or to run a process under a different user-context.

## Triage and response
1. Check to see which cron task was created or modified.
2. Check whether the cron task was created or modified by a known user or process.
3. If these changes are not acceptable, roll back the host or container in question to an acceptable configuration.


*Requires Agent version 7.27 or greater*
