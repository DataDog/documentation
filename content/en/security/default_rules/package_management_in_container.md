---
aliases:
- 9fi-ky3-oxl
- /security_monitoring/default_rules/9fi-ky3-oxl
- /security_monitoring/default_rules/package_management_in_container
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
title: Package installed in container
type: security_rules
---

## Goal
Detect installation of software using a package management utility (`apt` or `yum`) in a container.

## Strategy
After an attacker's initial intrusion into a victim's container (for example, through a web shell exploit), they may attempt to install tools and utilities for a variety of malicious purposes. This detection triggers when one of a set of common package management utilities installs a package in a container. Package management in containers is against best practices which highly emphasize immutability. If this is unexpected behavior, it could indicate an attacker attempting to install tools to further compromise your systems.


## Triage and response
1. Determine whether or not this is expected behavior.
2. If this behavior is unexpected, attempt to contain the compromise. This may be achieved by terminating the workload, depending on the stage of attack.
3. Look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
4. Determine the nature of the attack and the tools involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
5. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
