---
aliases:
- 8c5-34f-fa2
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: route53
tactic: TA0006-credential-access
technique: T1552-unsecured-credentials
title: EC2 instance resolved a suspicious AWS metadata DNS query
type: security_rules
---

### Goal
Detect when a requested domain resolves to the AWS Metadata IP (169.254.169.254).

### Strategy
Inspect the Route 53 logs and determine if the response data for a DNS request matches the AWS Metadata IP (169.254.169.254). This could indicate an attacker is attempting to steal your credentials from the AWS metadata service.

### Triage and Response
1. Determine which instance is associated with the DNS request.
2. Determine whether the domain name which was requested (`dns.question.name`) should be permitted. If not, conduct an investigation and determine what requested the domain and determine if the AWS metadata credentials were accessed by an attacker.
