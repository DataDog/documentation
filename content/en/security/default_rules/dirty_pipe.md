---
aliases:
- hhg-4ov-n9l
- /security_monitoring/default_rules/hhg-4ov-n9l
- /security_monitoring/default_rules/dirty_pipe
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0004-privilege-escalation
technique: T1068-exploitation-for-privilege-escalation
title: Dirty Pipe exploitation attempted
type: security_rules
---

## Goal

Detect exploitation of CVE-2022-0847 "Dirty Pipe". Dirty Pipe is a vulnerability in the Linux kernel which allows underprivileged processes to write to arbitrary readable files, leading to privilege escalation. 

## Strategy

This detection triggers when the `splice()` syscall is made and the `PIPE_BUF_FLAG_CAN_MERGE` flag is set. Explanation of the vulnerability and exploitation can be found in the [public disclosure](https://dirtypipe.cm4all.com/).

## Triage & Response

1. Determine if the host is vulnerable. This vulnerability affects kernel versions starting from 5.8. After its discovery, it was fixed for all currently maintained releases of Linux in versions 5.16.11, 5.15.25, and 5.10.102. The exploit was successful if the field `splice.pipe_exit_flag` is `PIPE_BUF_FLAG_CAN_MERGE`.
2. Attempt to contain the compromise (possibly by terminating the workload, depending on the stage of attack) and look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. If the host is vulnerable, update the kernel to a patched version.

*Requires Agent version 7.35 or greater*
