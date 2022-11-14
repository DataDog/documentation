---
aliases:
- ykc-y9p-o0i
- /security_monitoring/default_rules/ykc-y9p-o0i
- /security_monitoring/default_rules/cis-azure-1.3.0-7.3
disable_edit: true
integration_id: azure.compute
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.compute
title: '''Unattached disks'' are encrypted with CMK'
type: security_rules
---

## Description

Ensure that unattached disks in a subscription are encrypted with a customer managed key (CMK).

## Rationale

Managed disks are encrypted by default with platform-managed keys. Using customer-managed keys may provide an additional level of security or meet an organization's regulatory requirements. Encrypting managed disks ensures that its entire content is fully unrecoverable without a key and thus protects the volume from unwarranted reads. Even if the disk is not attached to any of the VMs, there is always a risk where a compromised user account with administrative access to VM service can mount/attach these data disks which may lead to sensitive information disclosure and tampering.

## Impact

Encryption is available only on standard tier VMs. This could impact cost. Utilizing and maintaining customer-managed keys requires additional work to create, protect, and rotate keys.

## Remediation

If data stored in the disk is no longer useful, refer to [Azure documentation][1] to delete unattached data disks. If data stored in the disk is important, encrypt the disk. See the [Disk enable customer managed keys customer][2] or the [Encryption settings][3] documentation.

## References

1. https://docs.microsoft.com/en-us/azure/security/fundamentals/azure-disk-encryption-vms-vmss
2. https://docs.microsoft.com/en-us/azure/security-center/security-center-disk-encryption?toc=%2fazure%2fsecurity%2ftoc.json
3. https://docs.microsoft.com/en-us/rest/api/compute/disks/delete
4. https://docs.microsoft.com/en-us/cli/azure/disk?view=azure-cli-latest#az-disk-delete
5. https://docs.microsoft.com/en-us/rest/api/compute/disks/update#encryptionsettings
6. https://docs.microsoft.com/en-us/cli/azure/disk?view=azure-cli-latest#az-disk-update
7. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-5-encrypt-sensitive-data-at-rest

## CIS Controls

Version 7 14.8 - Encrypt Sensitive Information at Rest - Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.

[1]: https://docs.microsoft.com/en-us/rest/api/compute/disks/delete -https://docs.microsoft.com/en-us/cli/azure/disk?view=azure-cli-latest#az-disk-delete
[2]: https://docs.microsoft.com/en-us/azure/virtual-machines/disks-enable-customer-managed-keys-portal
[3]: https://docs.microsoft.com/en-us/rest/api/compute/disks/update#encryptionsettings
