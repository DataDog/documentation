---
aliases:
- 7r2-807-3pa
- /security_monitoring/default_rules/7r2-807-3pa
- /security_monitoring/default_rules/azure-snapshot-export-uri-created
disable_edit: true
integration_id: azure-vm
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure-vm
security: attack
source: azure
tactic: TA0009-collection
technique: T1074-data-staged
title: Azure snapshot export URI created
type: security_rules
---

## Goal
Detect if an Azure snapshot is exported. Export URLs generated in Azure are accessible to anyone with the URL.

## Strategy
Monitor Azure logs where `@evt.name` is `"MICROSOFT.COMPUTE/SNAPSHOTS/BEGINGETACCESS/ACTION"` and `@evt.outcome` is `Success`.

## Triage and response
1. Verify the snapshot (`@resourceId`) has a legitimate reason for being exported.
2. If the activity is not expected, investigate the activity around the IP (`{{@network.client.ip}}`) creating the export URL.
