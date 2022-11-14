---
aliases:
- ydy-xer-rzi
- /security_monitoring/default_rules/ydy-xer-rzi
- /security_monitoring/default_rules/cryptominer_args
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: Process arguments match cryptocurrency miner
type: security_rules
---

## Goal

Detect when a process launches with arguments associated with cryptocurrency miners.

## Strategy

Cryptocurrency miners are often executed with unique arguments such as `--donate-level`. This can be used to identify suspicious processes with high confidence.

## Triage and response

1. Isolate the workload.
2. Use host metrics to verify if cryptocurrency mining is taking place. This will be indicated by an increase in CPU usage.
3. Review the process tree and related signals to determine the initial entry point.

*Requires agent version 7.27 or greater*
