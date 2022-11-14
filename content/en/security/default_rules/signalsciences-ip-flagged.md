---
aliases:
- 4ec-343-f90
- /security_monitoring/default_rules/4ec-343-f90
- /security_monitoring/default_rules/signalsciences-ip-flagged
disable_edit: true
integration_id: signal_sciences
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: signal_sciences
source: signal_sciences
title: Signal Sciences flagged an IP
type: security_rules
---

## Goal
Detect when an IP is flagged by Signal Sciences.

## Strategy
This rule lets you monitor Signal Sciences events submitted through the Signal Sciences [integration][1] to detect when an IP is flagged. 

## Triage and response
1. Determine whether the attack is a false positive.
2. Determine whether the attack was successful.
3. If the attack exploited a vulnerability in the application, triage the vulnerability.

[1]: https://app.datadoghq.com/account/settings#integrations/sigsci
