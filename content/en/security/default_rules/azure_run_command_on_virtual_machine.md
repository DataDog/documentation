---
aliases:
- e7n-akg-cid
- /security_monitoring/default_rules/e7n-akg-cid
- /security_monitoring/default_rules/azure_run_command_on_virtual_machine
disable_edit: true
integration_id: azure.compute
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure.compute
security: attack
source: azure
tactic: TA0002-execution
title: User ran a command on Azure Compute
type: security_rules
---

## Goal
Detect when a user runs a command on an Azure Virtual Machine through the Azure CLI or Portal.

## Strategy
Monitor Azure Compute logs for `MICROSOFT.COMPUTE/VIRTUALMACHINES/RUNCOMMAND/ACTION` events that have `@evt.outcome` of `Success`. 

## Triage and response
1. Reach out to the user to determine if the activity is legitimate.
