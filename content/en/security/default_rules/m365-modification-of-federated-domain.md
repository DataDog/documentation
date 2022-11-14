---
aliases:
- 6p9-30r-oqb
- /security_monitoring/default_rules/6p9-30r-oqb
- /security_monitoring/default_rules/m365-modification-of-federated-domain
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure
security: attack
source: azure
tactic: TA0006-credential-access
title: Microsoft 365 - Modification of Trusted Domain
type: security_rules
---

## Goal

Detects when a user creates or modifies a trusted domain object in Microsoft 365.

## Strategy

Monitor Azure AD Audit logs for the following `@evt.name`:

- `Set federation settings on domain`
- `Set domain authentication`

Monitor Microsoft 365 Audit logs for the following `@evt.name`:

- `Set federation settings on domain.`
- `Set domain authentication.`

An attacker can create a new attacker-controlled domain as federated or modify the existing federation settings for a domain by configuring a new, secondary signing certificate. Both of these techniques would allow the attacker to authenticate as any user bypassing authentication requirements like a valid password or MFA.

## Triage and response

1. Determine if `{{@usr.id}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
   - Remove the suspicious domain or settings.
   - Begin your organization's Incident Response (IR) process.
3. If the API call was made by the user:
   - Ensure the change was authorized.
