---
aliases:
- em5-2ya-8se
- /security_monitoring/default_rules/em5-2ya-8se
- /security_monitoring/default_rules/azure-disk-export-uri-created
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
title: Azure disk export URI created
type: security_rules
---

## Goal
Detect when an Azure disk is successfully exported. Export URLs generated in Azure are accessible to anyone with the URI. This could be utilized as an exfiltration method that would allow an attacker to download an Azure Compute VM's disk as a VHD file.

## Strategy
Monitor Azure logs where `@evt.name` is `"MICROSOFT.COMPUTE/SNAPSHOTS/DISKS/ACTION"` and `@evt.outcome` is `Success`.

## Triage and response
1. Verify the disk (`{{@resourceId}}`) has a legitimate reason for being exported.
2. If the activity is not expected, investigate the activity around the IP (`{{@network.client.ip}}`) creating the export URI.
