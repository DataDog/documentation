---
aliases:
- 3tl-l71-myn
- /security_monitoring/default_rules/3tl-l71-myn
- /security_monitoring/default_rules/paste_sites
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0011-command-and-control
technique: T1105-ingress-tool-transfer
title: DNS lookup for paste service
type: security_rules
---

## Goal

Paste sites such as pastebin.com can be used by attackers to host malicious scripts, configuration files, and other text data. The files are then downloaded to the host using a network utility such as `wget` or `curl`. These sites may also be used to exfiltrate data.

## Strategy

Detect when a process performs a DNS lookup for a paste site.

## Triage and response
1. Check if the application `{{@process.executable.name}}` is expected to make connections to `{{@dns.question.name}}`.
2. If the DNS lookup is unexpected, contain the host or container and roll back to a known good configuration.
3. Follow your organization's internal processes for investigating and remediating compromised systems.


*Requires Agent version 7.36 or greater*
