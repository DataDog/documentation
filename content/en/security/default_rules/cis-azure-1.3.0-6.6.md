---
aliases:
- yxy-zsq-2mn
- /security_monitoring/default_rules/yxy-zsq-2mn
- /security_monitoring/default_rules/cis-azure-1.3.0-6.6
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: UDP Services are restricted from the Internet
type: security_rules
---

## Description

Disable internet exposed UDP ports on network security groups.

## Rationale

The potential security problem with broadly exposing UDP services over the internet is that attackers can use DDoS amplification techniques to reflect spoofed UDP traffic from Azure Virtual Machines. The most common types of these attacks use exposed DNS, NTP, SSDP, SNMP, CLDAP, and other UDP-based services as amplification source for disrupting services of other machines on the Azure Virtual Network or even attack networked devices outside of Azure.

## Remediation

Disable direct UDP access to your Azure Virtual Machines from the internet. After direct UDP access from the internet is disabled, you can use other options to access UDP-based services running on these virtual machines.

## References

1. https://docs.microsoft.com/en-us/azure/security/fundamentals/network-best-practices#secure-your-critical-azure-service-resources-to-only-your-virtual-networks
2. https://docs.microsoft.com/en-us/azure/security/fundamentals/ddos-best-practices
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic

## CIS Controls

Version 7

9.2 Ensure Only Approved Ports, Protocols and Services Are Running: Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.

7 Virtual Machines: This section covers security recommendations to follow to set virtual machine policies on an Azure subscription.
