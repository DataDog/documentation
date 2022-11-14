---
aliases:
- 6fj-qtv-ei2
- /security_monitoring/default_rules/6fj-qtv-ei2
- /security_monitoring/default_rules/m365-azure-ad-unusual-service-principal-login
disable_edit: true
integration_id: active-directory
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: active-directory
security: attack
source: microsoft-365
tactic: TA0004-privilege-escalation
technique: T1078-valid-accounts
title: Unusual Authentication by Microsoft 365 Azure AD Service Principal
type: security_rules
---

## Goal
Detect when a Microsoft 365 Azure AD service principal uses an unusual authentication method.

## Strategy
Using the `New Value` detection method, find when a `Microsoft 365 Azure AD service principal` uses a new `@AuthenticationMethod`.

## Triage and response
1. Determine if the service principal `{{@usr.id}}` should be authenticating using the `{{@AuthenticationMethod}}` authentication method and `{{@ExtendedProperties.RequestType}}` request type.
2. If `{{@usr.email}}` should not be authenticating using `{{@AuthenticationMethod}}`,
    * Investigate other activities performed by the user `{{@usr.id}}` using the Cloud SIEM - User Investigation dashboard 
    * If necessary, initiate your company's incident response (IR) process.
