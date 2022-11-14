---
aliases:
- c07-f8e-051
- /security_monitoring/default_rules/c07-f8e-051
- /security_monitoring/default_rules/route53-suspicious-domain-requested
disable_edit: true
iaas: aws
integration_id: route53
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: route53
title: EC2 instance requested a suspicious domain
type: security_rules
---

## Goal
Detect when a requested domain has a suspicious TLD.

## Strategy
Inspect the Route 53 logs and determine if the TLD of the DNS question (`@dns.question.name`) matches one of the top 5 TLDs on [Spamhaus's Most Abused Top Level Domains list][1].

## Triage and response
1. Determine which instance is associated with the DNS request.
2. Determine whether the domain name which was requested (`dns.question.name`) should be permitted. If not, conduct an investigation and determine what requested the domain and determine if the AWS metadata credentials were accessed by an attacker.

[1]: https://www.spamhaus.org/statistics/tlds/
