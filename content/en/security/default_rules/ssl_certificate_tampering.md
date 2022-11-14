---
aliases:
- wnt-129-8hr
- /security_monitoring/default_rules/wnt-129-8hr
- /security_monitoring/default_rules/ssl_certificate_tampering
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: file integrity monitoring
tactic: TA0005-defense-evasion
technique: T1553-subvert-trust-controls
title: SSL certificate tampering
type: security_rules
---

## Goal
Detect potential tampering with SSL certificates.

## Strategy
SSL certificates, and other forms of trust controls establish trust between systems. Attackers may attempt to subvert trust controls such as SSL certificates in order to trick systems or users into trusting attacker-owned assets such as fake websites, or falsely signed applications.

## Triage and response
1. Check whether there were any planned changed to the SSL certificates stores in your infrastructure.
2. If these changes are not acceptable, roll back the host or container in question to a known trustworthy configuration.
3. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
