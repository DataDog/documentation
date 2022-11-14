---
aliases:
- 8za-hxt-w1q
- /security_monitoring/default_rules/8za-hxt-w1q
- /security_monitoring/default_rules/cis-azure-1.3.0-6.2
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: SSH access is restricted from the Internet
type: security_rules
---

## Description

Disable SSH access on network security groups from the internet.

## Rationale

The potential security problem with using SSH over the internet is that attackers can use various brute force techniques to gain access to Azure Virtual Machines. Once the attackers gain access, they can use a virtual machine as a launch point for compromising other machines on the Azure Virtual Network or even attack networked devices outside of Azure.

## Remediation

Disable direct SSH access to your Azure Virtual Machines from the internet. After direct SSH access from the internet is disabled, you have other options you can use to access these virtual machines for remote management.

## References

1. https://docs.microsoft.com/en-us/azure/security/azure-security-network-security-best-practices#disable-rdpssh-access-to-azure-virtual-machines
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic

## CIS Controls

Version 7 9.2 Ensure Only Approved Ports, Protocols and Services Are Running: Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
