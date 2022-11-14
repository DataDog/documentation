---
aliases:
- h8p-rcn-miw
- /security_monitoring/default_rules/h8p-rcn-miw
- /security_monitoring/default_rules/aws-waf-anomaly-blocked-traffic-specific-rule
disable_edit: true
iaas: aws
integration_id: waf
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: waf
source: cloudtrail
title: AWS WAF traffic blocked by specific rule
type: security_rules
---

## Goal
Detects when a specific AWS Web Application Firewall (WAF) rule blocks an anomalous amount of traffic.

## Strategy
The rule monitors AWS WAF logs and detects when the `@system.action` has a value of `BLOCK`.

## Triage and response
1. Inspect the `@webaclId`: `{{@webaclId}}` logs to confirm if the observed traffic should have been blocked or not.
2. If the request should have been blocked, then navigate to the IP Investigation dashboard. Inspect other requests from the IP address:{{@network.client.ip}} to find any other potentially malicious behaviors from the IP.
