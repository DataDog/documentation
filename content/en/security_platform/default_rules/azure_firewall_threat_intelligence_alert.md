---
aliases:
- 6ir-aj0-eec
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: threat-intel
source: azure
title: Azure Firewall Threat Intelligence Alert
type: security_rules
---

## Goal

Detect when an Azure firewall threat intelligence alert is received.

## Strategy

Monitor Azure Network Diagnostic logs and detect when `@evt.name` is equal to `AzureFirewallThreatIntelLog`.

## Triage & Response

1. Inspect the threat intelligence log.
2. Investigate the activity from this IP address.
