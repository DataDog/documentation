---
aliases:
- 0bt-76f-qi0
- /security_monitoring/default_rules/0bt-76f-qi0
- /security_monitoring/default_rules/azure-command-executed-in-container-instance
disable_edit: true
integration_id: azure-containerinstances
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure-containerinstances
security: attack
source: azure
tactic: TA0002-execution
technique: T1609-container-administration-command
title: Azure user ran command on container instance
type: security_rules
---

## Goal
Detect when a command is executed on a container instance with the Azure API.

## Strategy
Monitor Azure container instance logs where `@evt.name` is `"MICROSOFT.CONTAINERINSTANCE/CONTAINERGROUPS/CONTAINERS/EXEC/ACTION"` and `@evt.outcome` is `Success`.

## Triage and response
1. Verify that the user (`{{@usr.id}}`) should be executing commands on the container (`@resourceId`).
2. If the activity is not expected, investigate the activity around the container (`@resourceId`).
