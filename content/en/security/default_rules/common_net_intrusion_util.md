---
aliases:
- 2vr-c3r-eih
- /security_monitoring/default_rules/2vr-c3r-eih
- /security_monitoring/default_rules/common_net_intrusion_util
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0007-discovery
technique: T1046-network-service-discovery
title: Network scanning utility executed
type: security_rules
---

## Goal
Detect execution of the `nmap` network utility.

## Strategy
`nmap` is a network utility commonly used by attackers to understand a victim's network topology and vulnerabilities. After an attacker's initial intrusion into a host (for example, through a web shell exploit, container breakout), they may attempt to use `nmap` to do reconnaissance. This detection triggers when an execution of `nmap` is detected on a system. If this is unexpected behavior, it could indicate an attacker attempting to compromise your systems.

## Triage and response
1. Determine which user executed `nmap` and whether this is allowed or expected behavior.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack) and look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the nature of the attack and network tools involved. Investigate the security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the exploit.


*Requires Agent version 7.27 or greater*
