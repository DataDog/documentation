---
aliases:
- 1bw-akj-fk7
- /security_monitoring/default_rules/1bw-akj-fk7
- /security_monitoring/default_rules/log4shell-malicious-payload
disable_edit: true
integration_id: nginx
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: nginx
security: attack
source: nginx
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: Log4Shell Scanning Detected
type: security_rules
---

## Goal
Detect when a Log4j scanning attempt occurs in your environment.

## Strategy
Regex search on logs to find specific payloads indicative of Log4j scanning.

## Triage and response
1. Investigate if the host is running a vulnerable version of the Log4j Java library
2. Use the [Log4j Investigation Dashboard](https://app.datadoghq.com/dash/integration/cloud_security_platform_log4shell_investigator) to conduct impact analysis
3. Explore what other services the attacker hit in the last day - Linked to investigation query 
4. Explore Java logs associated with the attacker - linked to investigation query
