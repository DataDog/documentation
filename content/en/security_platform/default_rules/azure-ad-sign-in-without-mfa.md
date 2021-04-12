---
aliases:
- 07c-ed1-a61
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: azure
title: Azure AD Login Without MFA
type: security_rules
---

### Goal
Detect when any user logs in to Azure AD without multi-factor authentication.

### Strategy
This rule monitors Azure Activity logs for Active Directory logs and detects when any `@evt.category` has a value of  `SignInLogs`, and `@properties.authenticationRequirement` has a value of `singleFactorAuthentication`.

### Triage & Response
1. Reach out to the user to determine if the login was legitimate.
2. If the login was legitimate, request that the user enables 2FA.
3. If the login wasn't legitimate, rotate the credentials.
4. Review all user accounts to ensure MFA is enabled.
