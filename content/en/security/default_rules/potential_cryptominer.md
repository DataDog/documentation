---
aliases:
- ibu-wip-tm1
- /security_monitoring/default_rules/ibu-wip-tm1
- /security_monitoring/default_rules/potential_cryptominer
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: DNS lookup for cryptocurrency mining pool
type: security_rules
---

## Goal

Attackers often use compromised cloud infrastructure to mine cryptocurrency. 

## Strategy

Detect when a process performs a DNS lookup for a domain related to cryptomining.

## Triage and response

`{{@process.executable.name}}` performed a DNS lookup for `{{@dns.question.name}}`

1. Contain the host or container and roll back to a known good configuration.
2. Review the process tree and determine the initial entry point.

*Requires Agent version 7.36 or greater*
