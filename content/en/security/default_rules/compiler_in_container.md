---
aliases:
- hlb-3os-6op
- /security_monitoring/default_rules/hlb-3os-6op
- /security_monitoring/default_rules/compiler_in_container
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0005-defense-evasion
technique: T1027-obfuscated-files-or-information
title: Compiler executed in container
type: security_rules
---

## Goal
Detect when a compiler (like `clang` or `bcc`) is executed inside of a container.

## Strategy
After an initial compromise, attackers may attempt to download additional tools to their victim's infrastructure. In order to make these additional tools difficult to detect or analyze, attackers sometimes deliver their tools as uncompiled code, and then compile their malicious binaries directly on the victim's infrastructure. In containerized environments, the use of compilers is especially suspicious because in production it is best practice to make containers immutable. The use of a compiler in a production container could indicate an attacker staging tools, or unwanted container configuration drift. 


## Triage & Response
1. Determine whether or not this is expected behavior. For example, did an employee compile a tool inside of a container for an approved reason, or does an approved software compile additional files on startup?
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack) and look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the nature of the attack and the tools involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
