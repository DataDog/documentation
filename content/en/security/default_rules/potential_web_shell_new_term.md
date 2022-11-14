---
aliases:
- wub-i7c-72x
- /security_monitoring/default_rules/wub-i7c-72x
- /security_monitoring/default_rules/potential_web_shell_new_term
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: Unfamiliar command spawned from web server
type: security_rules
---

## Goal
Detect shell utilities, HTTP utilities, or shells spawned by a web server.

## Strategy
Web shell attacks often involve attackers loading and running malicious files onto a victim machine, creating a backdoor on the compromised system. Attackers use web shells for a variety of purposes, and they can signal the beginning of an intrusion or wider attack. This detection triggers when shell utilities, HTTP utilities, or shells are spawned by a common web server process.

This rule uses the New Value detection method. Datadog will learn the historical behavior of a specified field in agent logs and then create a signal when unfamiliar values appear.

## Triage and response
1. Determine whether or not there is an approved purpose for your web application to execute shells and utilities.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack). Investigate application logs or APM data to look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
