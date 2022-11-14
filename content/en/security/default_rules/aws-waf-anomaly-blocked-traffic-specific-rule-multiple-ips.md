---
aliases:
- 2yu-ey6-507
- /security_monitoring/default_rules/2yu-ey6-507
- /security_monitoring/default_rules/aws-waf-anomaly-blocked-traffic-specific-rule-multiple-ips
disable_edit: true
iaas: aws
integration_id: waf
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: waf
source: cloudtrail
title: AWS WAF traffic blocked by specific rule on multiple IPs
type: security_rules
---

## Goal
Detect when a specific AWS Web Application Firewall (WAF) rule blocks traffic from multiple IPs.

## Strategy
The rule monitors AWS WAF logs and detects when the `@system.action` has a value of `BLOCK`.

## Triage and response
1. Inspect the `@http.request_id`: `{{@http.request_id}}` to confirm if this request should have been blocked or not.
2. If the request should have been blocked, then navigate to the IP Investigation dashboard. Inspect other requests from the IP address:{{@network.client.ip}} to find any other potentially malicious behaviors from the IP.
