---
aliases:
- wnt-129-8hr
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: SSL Certificate Tampering
type: security_rules
---

## Goal
Detect potential tampering with SSL certificates.

## Strategy
SSL certificates, and other forms of trust controls establish trust between systems. Attackers may attempt to subvert trust controls such as SSL certificates in order to trick systems or users into trusting attacker-owned assets such as fake websites, or falsely signed applications.

## Triage & Response
1. Check whether there were any planned changed to the SSL certificates stores in your infrastructure.
3. If these changes are not acceptable, roll back the host or container in question to a known trustworthy configuration.
