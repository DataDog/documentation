---
aliases:
- 6ph-8a1-ul5
- /security_monitoring/default_rules/6ph-8a1-ul5
- /security_monitoring/default_rules/suspicious_container_client
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0002-execution
technique: T1609-container-administration-command
title: Container management utility in container
type: security_rules
---

## Goal
Detect execution of a container management utility (e.g., `kubectl`) in a container.

## Strategy
After an attacker's initial intrusion into a victim container (for example, through a web shell exploit), they may attempt to escalate privileges, break out of the container, or exfiltrate secrets by running container management/orchestration utilities. This detection triggers when execution of one of a set of common container management utilities (like `kubectl` or `kubelet`) is detected in a container. If this is unexpected behavior, it could indicate an attacker attempting to compromise your containers and host.

## Triage and response
1. Determine whether or not this is expected behavior.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack) and look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the nature of the attack and utilities involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the exploit.

*Requires version 7.27 or higher*
