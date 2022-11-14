---
aliases:
- 07c-ed1-a61
- /security_monitoring/default_rules/07c-ed1-a61
- /security_monitoring/default_rules/azure-ad-sign-in-without-mfa
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: compliance
source: azure
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Azure AD Login Without MFA
type: security_rules
---

## Goal
Detect when any user logs in to Azure AD without multi-factor authentication.

## Strategy
This rule monitors Azure Activity logs for Active Directory logs and detects when any `@evt.category` has a value of  `SignInLogs`, and `@properties.authenticationRequirement` has a value of `singleFactorAuthentication`.

## Triage and response
1. Reach out to the user to determine if the login was legitimate.
2. If the login was legitimate, request that the user enables 2FA.
3. If the login wasn't legitimate, rotate the credentials.
4. Review all user accounts to ensure MFA is enabled.
