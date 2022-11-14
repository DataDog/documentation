---
aliases:
- p1b-13u-xtn
- /security_monitoring/default_rules/p1b-13u-xtn
- /security_monitoring/default_rules/runc_modification
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0004-privilege-escalation
technique: T1611-escape-to-host
title: Runc binary modified
type: security_rules
---

## Goal
Detect modifications to the `runc` binary outside of the normal package management lifecycle.

## Strategy
[CVE-2019-5736][1], a vulnerability in `runc` through version 1.0-rc6 could allow attackers to overwrite the host `runc` binary, which allows the attacker to effectively escape a running container, and gain root access on the underlying host.
Any modifications to `runc` (outside of standard package management upgrades) could be exploiting this vulnerability to gain root access to the system.

## Triage & Response
1. Check to see which user or process changed the `runc` binary.
2. If these changes are not acceptable, roll back contain the host in question to an acceptable configuration.
3. Update `runc` to a version above 1.0-rc6 (or Docker 18.09.2 and above).
4. Determine the nature of the attack and utilities involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path.

*Requires Agent version 7.27 or greater*

[1]: https://nvd.nist.gov/vuln/detail/CVE-2019-5736
