---
aliases:
- 3bs-xtv-2wl
- /security_monitoring/default_rules/3bs-xtv-2wl
- /security_monitoring/default_rules/cis-azure-1.3.0-1.21
cloud: azure
disable_edit: true
integration_id: azure.active_directory
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.active_directory
title: Azure custom subscription owner roles do not exist
type: security_rules
---

## Description

Subscription ownership should not include permission to create custom owner roles. The principle of least privilege should be followed and only necessary privileges should be assigned instead of allowing full administrative access.

## Rationale

Classic subscription admin roles offer basic access management and include Account Administrator, Service Administrator, and Co-Administrators. It is recommended the least necessary permissions be given initially. Permissions can be added as needed by the account holder. This ensures the account holder cannot perform actions which were not intended.

## Remediation

Using Azure Command Line Interface 2.0, list all roles with the `az role definition list` command. Check the output for any entries with an `assignableScope` of `/` or a `subscription`, and an action of `*`. Verify the usage and impact of removing the role identified. You can delete a role with the `az role definition delete --name "rolename"` command.

## References

1. https://docs.microsoft.com/en-us/azure/billing/billing-add-change-azure-subscription-administrator 
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-2-define-enterprise-segmentation-strategy 
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-6-define-identity-and-privileged-access-strategy 
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-1-protect-and-limit-highly-privileged-users 
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-5-automate-entitlement-management 
6. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-2-restrict-administrative-access-to-business-critical-systems 
7. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-2-define-enterprise-segmentation-strategy 
8. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-6-define-identity-and-privileged-access-strategy 
9. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-7-follow-just-enough-administration-least-privilege-principle

## CIS Controls

Version 7 4 Controlled Use of Administrative Privileges Controlled Use of Administrative Privileges 16 Account Monitoring and Control Account Monitoring and Control
