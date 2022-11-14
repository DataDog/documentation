---
aliases:
- c6a-b25-2e9
- /security_monitoring/default_rules/c6a-b25-2e9
- /security_monitoring/default_rules/twistlock-container-compliance-finding
disable_edit: true
integration_id: twistlock
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: twistlock
title: Container violated compliance standards
type: security_rules
---

## Goal
Detect when a container is not running within compliance standards.

## Strategy
This rule lets you monitor Twistlock logs to detect when a `High` or `Critical` severity compliance issue is discovered in a running container. 

## Triage and response
1. Determine the impact of the compliance finding.
2. Remediate the compliance finding.

## Change Log
27 Jun 2022 - Updated Rule and added findings for critical vulnerabilities.
