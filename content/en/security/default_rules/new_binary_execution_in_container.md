---
aliases:
- mjm-lp5-u67
- /security_monitoring/default_rules/mjm-lp5-u67
- /security_monitoring/default_rules/new_binary_execution_in_container
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0002-execution
title: File created and executed inside container
type: security_rules
---

## Goal
Detect when a file that is not part of the original container image has been created and executed within the container.

## Strategy
Attackers sometimes add scripts to running containers to exploit some functionality or automate some actions. Normally, containers are meant to be immutable environments, and when you require new scripts or other executable files, you add them to the container image itself and not to the running container. This detection identifies when newly created files are executed shortly after file creation or modification.

This rule uses the New Value detection method. Datadog will learn the historical behavior of a specified field in agent logs and then create a signal when unfamiliar values appear.

## Triage & Response
1. Determine whether the file executing is expected to be present in the container. 
2. If this behavior is unexpected, attempt to contain the compromise (possibly by terminating the workload, depending on the stage of attack), and look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the scope of the attack. Investigate whether the file was added to multiple containers around the same time, and whether the affected systems follow a pattern. For example, if a file was seen executing in multiple containers, do the containers share the same workload or base image? What other activity occurred directly before or after the user was added?


*Requires Agent version 7.29 or greater*
