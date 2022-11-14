---
aliases:
- edj-z5a-yvu
- /security_monitoring/default_rules/edj-z5a-yvu
- /security_monitoring/default_rules/azure-ad-credential-added-to-application
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure
security: attack
source: azure
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Credential added to Azure AD application
type: security_rules
---

## Goal

Detects when a user adds a secret or certificate to an Azure Active Directory Application.

## Strategy

Monitor Azure AD Audit logs for the following `@evt.name`:

* `Update application – Certificates and secrets management`
* `Add service principal credentials`

Monitor Microsoft 365 Audit logs for the following `@evt.name`:

* `Update application – Certificates and secrets management`
* `Add service principal credentials.`

An attacker can add a secret or certificate to an application in order to connect to Azure AD as the application and perform API operation leveraging the application permissions that are assigned to it.

## Triage and response

1. Determine if `{{@usr.id}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
   * Remove the suspicious key.
   * Invalidate all existing refresh tokens. This ensures the attacker is unable to connect to your tenant.
   * Begin your organization's Incident Response (IR) process.
3. If the API call was made by the user:
   * Ensure the change was authorized.
