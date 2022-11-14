---
aliases:
- ldd-v8t-81e
- /security_monitoring/default_rules/ldd-v8t-81e
- /security_monitoring/default_rules/azure_brute_forced_user_assigned_role
disable_edit: true
iaas: azure
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Signal Correlation)
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Brute-forced user has assigned a role
type: security_rules
---

## Goal
Correlate a successful credential stuffing login with a user assumed a role.

## Strategy
Correlate the [Credential Stuffing Attack on Azure][1] and [Azure AD member assigned Global Administrator role][2] signals based on the ARN: {{@userIdentity.arn}}.

## Triage and response
1. Set signal triage state to `Under Review`.
2. Determine if the credential stuffing attack was successful.
    * If the login was not legitimate:
        * Investigate the user using the `User Investigation Dashboard`
        * Rotate credentials on the credential stuffed account
        * Enable MFA if it is not already enabled
    * If the login was legitimate:
        * Triage the signal as a false positive

[1]: https://docs.datadoghq.com/security_platform/default_rules/azure_credential_stuffing_attack
[2]: https://docs.datadoghq.com/security_platform/default_rules/azure-ad-user-assigned-global-admin-role
