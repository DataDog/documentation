---
aliases:
- 4af-ed1-fc0
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: attack
source: azure
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: Azure Frontdoor WAF Blocked a Request
type: security_rules
---

### Goal
Detect when an Azure Frontdoor Web Application Firewall (WAF) blocks a request from an IP address.

### Strategy
This rule monitors Azure Activity logs for Frontdoor Web Application Firewall logs and detects when the `@evt.name` has a value of  `Microsoft.Network/FrontDoor/WebApplicationFirewallLog/Write` and `@properties.action` has a value of `Block`.

### Triage & Response
1. Inspect whether this request should have been blocked or not.
2. Navigate to the IP dashboard and inspect other requests this IP address has made.
