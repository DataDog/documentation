---
aliases:
- xt5-0xp-nsj
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Critical System Binaries
type: security_rules
---

## Description
Detect modifications of critical system binaries.

## Rationale
PCI-DSS is the payment-card industry's compliance framework. Any systems that handle credit card data and transactions from the major credit card companies must be PCI-DSS compliance. Control 11.5 of the PCI-DSS framework states that organizations must "alert personnel to unauthorized modification (including changes, additions, and deletions) of critical system files, configuration files or content files". On Linux, critical system binaries are typically stores in `/bin/`, `/sbin/`, or `/usr/sbin/`. This rule tracks any modifications to those directories.

## Remediation
1. Check to see which user or process changed the critical system binaries.
2. If these changes were not authorized, and you cannot confirm the safety of the changes, roll back the host or container in question to an acceptable configuration.
