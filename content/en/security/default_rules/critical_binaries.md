---
aliases:
- xt5-0xp-nsj
- /security_monitoring/default_rules/xt5-0xp-nsj
- /security_monitoring/default_rules/critical_binaries
control: '11.5'
disable_edit: true
fim: 'true'
framework: pci
framework_version: '3.2'
integration_id: file integrity monitoring
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
source: file integrity monitoring
title: Critical system binary modified
type: security_rules
---

## Goal
Detect modifications of critical system binaries.

## Strategy
PCI-DSS is the payment-card industry's compliance framework. Any systems that handle credit card data and transactions from the major credit card companies must be PCI-DSS compliance. Control 11.5 of the PCI-DSS framework states that organizations must "alert personnel to unauthorized modifications (including changes, additions, and deletions) of critical system files, configuration files, or content files". On Linux, critical system binaries are typically stored in `/bin/`, `/sbin/`, or `/usr/sbin/`. This rule tracks any modifications to those directories.

## Triage and response
1. Identify which user or process changed the critical system binaries.
2. If these changes were not authorized, and you cannot confirm the safety of the changes, roll back the host or container in question to an acceptable configuration.

*Requires Agent version 7.27 or greater*
