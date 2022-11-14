---
aliases:
- eix-qdn-n68
- /security_monitoring/default_rules/eix-qdn-n68
- /security_monitoring/default_rules/ip_check_domain
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0007-discovery
technique: T1016-system-network-configuration-discovery
title: DNS lookup for IP lookup service
type: security_rules
---

## Goal

IP check services return the public IP of the client. They are used legitimately for configuration purposes when utilizing infrastructure as code. They can be abused by attackers to determine the organization they have compromised.

## Strategy

Detect when a DNS lookup is done for a domain belonging to an IP check service.

## Triage and response

1. Determine if `{{@process.executable.name}}` is expected to make a connection to `{{@dns.question.name}}`.
2. If the DNS lookup is unexpected, contain the host or container and roll back to a known good configuration.
3. Start incident response and determine the initial entry point.

*Requires Agent version 7.36 or greater*
