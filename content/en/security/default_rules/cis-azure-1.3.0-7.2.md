---
aliases:
- zlm-ehm-wut
- /security_monitoring/default_rules/zlm-ehm-wut
- /security_monitoring/default_rules/cis-azure-1.3.0-7.2
disable_edit: true
integration_id: azure.compute
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.compute
title: '''OS and Data'' disks are encrypted with CMK'
type: security_rules
---

## Description

Ensure that OS disks (boot volumes) and data disks (non-boot volumes) are encrypted with a Customer Managed Key (CMK).

## Rationale

Encrypting the IaaS VM's OS disk (boot volume) and data disks (non-boot volume) ensures that the entire content is fully unrecoverable without a key and thus protects the volume from unwarranted reads. CMK is superior encryption although requires additional planning.

## Remediation

### From the console

**Note**: Disks must be detached from VMs to have encryption changed.

1. Go to Virtual Machines
2. For each virtual machine, go to Settings
3. Click on Disks
4. Click the X to detach the disk from the VM
5. Search for disks and locate the unattached disk
6. Click the disk select Encryption
7. Change your encryption type and select your encryption set
8. Click Save
9. Go back to the VM and re-attach the disk

### Using PowerShell

```powershell
$KVRGname = ''MyKeyVaultResourceGroup''; $VMRGName = ''MyVirtualMachineResourceGroup''; $vmName = ''MySecureVM''; $KeyVaultName = ''MySecureVault''; $KeyVault = Get-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $KVRGname; $diskEncryptionKeyVaultUrl = $KeyVault.VaultUri; $KeyVaultResourceId = $KeyVault.ResourceId; Set-AzVMDiskEncryptionExtension -ResourceGroupName $VMRGname -VMName $vmName -DiskEncryptionKeyVaultUrl $diskEncryptionKeyVaultUrl -DiskEncryptionKeyVaultId $KeyVaultResourceId;
```

**NOTES**:

- During encryption, a reboot is likely required. It may take up to 15 minutes to complete the process.

- On Linux machines, you may need to set the `-skipVmBackup` parameter.

## Impact

Using CMK/BYOK entail additional management of keys. You must have your key vault setup to use this.

## References


1. https://docs.microsoft.com/azure/security/fundamentals/azure-disk-encryption-vms-vmss
2. https://docs.microsoft.com/en-us/azure/security-center/security-center-disk-encryption?toc=%2fazure%2fsecurity%2ftoc.json
3. https://docs.microsoft.com/azure/security/fundamentals/data-encryption-best-practices#protect-data-at-resthttps://docs.microsoft.com/azure/virtual-machines/windows/disk-encryption-portal-quickstart
4. https://docs.microsoft.com/en-us/rest/api/compute/disks/delete
5. https://docs.microsoft.com/en-us/rest/api/compute/disks/update#encryptionsettings
6. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-5-encrypt-sensitive-data-at-rest
7. https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disks-enable-customer-managed-keys-powershell

## CIS Controls

Version 7 14.8 - Encrypt Sensitive Information at Rest - Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.
