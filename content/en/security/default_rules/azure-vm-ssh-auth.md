---
aliases:
- zib-w32-e2z
- /security_monitoring/default_rules/zib-w32-e2z
- /security_monitoring/default_rules/azure-vm-ssh-auth
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: Azure VM requires SSH Authentication
type: security_rules
---

## Description

Use SSH authentication keys to secure Linux virtual machines.

## Rationale

Using SSH to secure authentications is a security best practice, as traditional username and password authentication is vulnerable to malicious tactics such as brute-force attacks. SSH uses a combination of public and private key pairs to secure the authentication process. Access to the private key is automated and tightly controlled, without both keys SSH access will not be granted. This also eliminates the need for users to memorize complex passwords for virtual machine access.

## Remediation

### From the command line

1. Follow the steps listed at [Detailed steps: Create and manage SSH keys for authentication to a Linux VM in Azure][1] to create and deploy VMs using SSH.
2. If needing to transition from Username and Password authentication, to SSH, there is no way to transition directly. You must deprovision the current VM and create an image of it with SSH as the authentication method. Follow the steps on [How to create a managed image of a virtual machine or VHD][2]. 

[1]: https://docs.microsoft.com/en-us/azure/virtual-machines/linux/create-ssh-keys-detailed
[2]: https://docs.microsoft.com/en-us/azure/virtual-machines/linux/capture-image
