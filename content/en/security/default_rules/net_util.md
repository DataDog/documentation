---
aliases:
- zwp-j22-2l2
- /security_monitoring/default_rules/zwp-j22-2l2
- /security_monitoring/default_rules/net_util
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0011-command-and-control
technique: T1105-ingress-tool-transfer
title: Network utility executed
type: security_rules
---

## Goal
Detect execution of a network utility executed from a suspicious location on a host.

## Strategy
After an attacker's initial intrusion into a host (for example, through a web shell exploit, or a container breakout), they may attempt to use network utilities for a variety of malicious purposes (for example, reconnaissance, or data exfiltration). This detection triggers when execution of one of a set of network utilities (for example, `nslookup`, `netcat`) is detected on a host. Different utilities may serve different purposes in an attack; for example, DNS tools like `nslookup` could be involved in a DNS data exfiltration attack, and `netcat` could indicate a backdoor and data exfiltration. If this is unexpected behavior, it could indicate an attacker attempting to compromise your host.

These utilities executed by a file located in `/tmp` or another writeable directory could indicate a malicious script attempting to perform actions on the host. These actions may include downloading additional tools or exfiltrating data.

## Triage and response
1. Determine which user executed the utility and whether or not this is allowed or expected behavior.
2. Review the ancestors for unexpected processes or files executed. 
3. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack), and look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
4. Determine the nature of the attack and network tools involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path and signals from other tools. For example, if a DNS exfiltration attack is suspected, examine DNS traffic and servers if available.
5. Find and repair the root cause of the exploit.

*Requires Agent version 7.34 or greater*
