---
aliases:
- cwg-e1k-090
- /security_monitoring/default_rules/cwg-e1k-090
- /security_monitoring/default_rules/cis-azure-1.3.0-7.1
disable_edit: true
integration_id: azure.compute
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.compute
title: Virtual Machines are utilizing Managed Disks
type: security_rules
---

## Description

Migrate blob-based VHDs to managed disks on virtual machines to exploit the default features of this configuration. The features include:

1. Default disk encryption
2. Resilience, as Microsoft manages the disk storage and moves it if underlying hardware is faulty
3. Reduction of costs over storage accounts

## Rationale

Managed disks are by default encrypted on the underlying hardware so no additional encryption is required for basic protection. Additional encryption is available if required. Managed disks are more resilient than storage accounts. For ARM deployed virtual machines, Azure Adviser recommends moving VHDs to managed disks from both a security and cost management perspective.

## References

1. https://docs.microsoft.com/en-us/azure/virtual-machines/windows/convert-unmanaged-to-managed-disks
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-1-define-asset-management-and-data-protection-strategy

## Remediation

### From the console

1. Using the search feature, go to Virtual Machines
2. Select the virtual machine you would like to convert
3. Select Disks in the menu for the VM
4. Select Migrate to managed disks
5. Follow the prompts to convert the disk and finish by selecting Migrate to start the process

**NOTE**: VMs are stopped and restarted after migration is complete.

### Using PowerShell

```powershell
Stop-AzVM -ResourceGroupName $rgName -Name $vmName -Force ConvertTo-AzVMManagedDisk -ResourceGroupName $rgName -VMName $vmName Start-AzVM -ResourceGroupName $rgName -Name $vmName
```

## Impact

There is no operational impact of migrating to managed disks other than the benefits mentioned above.

**NOTE**: When converting to managed disks, VMs are powered off and back on.

## CIS Controls

Version 7 13 - Data Protection
