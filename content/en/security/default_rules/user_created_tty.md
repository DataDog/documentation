---
aliases:
- xr0-7mh-a47
- /security_monitoring/default_rules/xr0-7mh-a47
- /security_monitoring/default_rules/user_created_tty
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0003-persistence
technique: T1136-create-account
title: User created interactively
type: security_rules
---

## Goal
Detect the creation of a new user on the system using an interactive session.

## Strategy
Attacker's may add local accounts to systems that they have compromised to maintain access to those systems. If an attacker has gained a sufficient level of access (like admin privileges) on a system, they can make a new user for themselves.
In production systems, users should be created in the base image of the system (for example, the AMI or other VM image), or they should be created programmatically by configuration management tools. The creation of a new user by an interactive (human) session is suspicious.

## Triage & Response
1. Determine whether the creation of a new user is expected behavior.
2. If this behavior is unexpected, attempt to contain the compromise (possibly by terminating the workload, depending on the stage of attack), and look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the scope of the attack. Investigate whether or not multiple systems had this user added around the same time, and whether the systems impacted follow a pattern. For example, if a user was added to multiple systems, do they share the same workload or base image? What other activity occurred directly before or after the user was added?


*Requires Agent version 7.27 or greater*
