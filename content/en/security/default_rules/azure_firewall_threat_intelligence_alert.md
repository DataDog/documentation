---
aliases:
- 6ir-aj0-eec
- /security_monitoring/default_rules/6ir-aj0-eec
- /security_monitoring/default_rules/azure_firewall_threat_intelligence_alert
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: threat-intel
source: azure
title: Azure Firewall Threat Intelligence Alert
type: security_rules
---

## Goal
Detect when an Azure firewall threat intelligence alert is received.

## Strategy
Monitor Azure Network Diagnostic logs and detect when `@evt.name` is equal to `AzureFirewallThreatIntelLog`.

## Triage and response
1. Inspect the threat intelligence log.
2. Investigate the activity from this IP address.
