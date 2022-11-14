---
aliases:
- 5us-xuv-9wl
- /security_monitoring/default_rules/5us-xuv-9wl
- /security_monitoring/default_rules/cis-azure-1.3.0-1.22
disable_edit: true
integration_id: azure.active_directory
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.active_directory
title: Security Defaults is enabled on Azure Active Directory
type: security_rules
---

## Description

Security defaults in Azure Active Directory (Azure AD) make it easier to be secure and help protect your organization. Security defaults contain preconfigured security settings for common attacks. Microsoft security defaults are available to everyone. The goal is to ensure that all organizations have a basic level of security-enabled at no extra cost. You can enable security defaults in the Azure portal.

## Rationale

Security defaults provide secure default settings that are managed on behalf of organizations to keep customers safe until they are ready to manage their own identity security settings. For example:

- Requiring all users and admins to register for MFA
- Challenging users with MFA, mostly when they show up on a new device or app, but more often for critical roles and tasks.
- Disabling authentication from legacy authentication clients, which can't do MFA.

## Remediation

### From the console

1. Sign in to the Azure portal as a security administrator, conditional access administrator, or global administrator.
2. Navigate to Azure Active Directory > Properties.
3. Select Manage security defaults.
4. Set the Enable security defaults toggle to Yes.
5. Select Save.

## Impact

Enabling security defaults may negatively impact the functionality of other Microsoft services, such as Microsoft 365. This recommendation should be implemented initially and then may be overridden by other service/product specific CIS Benchmarks.

## References

1. https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/concept-fundamentals-security-defaults
2. https://techcommunity.microsoft.com/t5/azure-active-directory-identity/introducing-security-defaults/ba-p/1061414

Additional Information: The settings in this recommendation are different in the Microsoft 365 Benchmark. This is because the potential impact associated with disabling of security defaults is dependent upon the security settings implemented in the environment. It is recommended that organizations disabling security defaults plan to implement equivalent settings to replace the settings configured by security defaults.

## CIS Controls

Version 7 13 - Data Protection
