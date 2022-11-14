---
aliases:
- l6w-nd1-kir
- /security_monitoring/default_rules/l6w-nd1-kir
- /security_monitoring/default_rules/azure-ad-consent-to-application
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure
security: attack
source: azure
tactic: TA0001-initial-access
technique: T1566-phishing
title: Potential Illicit Consent Grant attack via Azure registered application
type: security_rules
---

## Goal
Detects when a user grants an application consent to access their data. An adversary may create an Azure-registered application to access data such as contact information, emails, or documents.

## Strategy
Monitor Azure AD Audit logs for the following `@evt.name`:

* `Consent to application`

Monitor Microsoft 365 Audit logs for the following `@evt.name`:

* `Consent to application.`

Because these are thirty-party applications external to the organization, normal remediation steps like resetting passwords for breached accounts or requiring Multi-Factor Authentication (MFA) on accounts are not effective against this type of attack.

## Triage and response
1. See the official [Microsoft playbook][1] on responding to a potential Illicit Consent Grant.
2. If the activity is benign:
    * Use the linked blog post in the suggested actions panel to tune out false positives.

[1]: https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/detect-and-remediate-illicit-consent-grants?view=o365-worldwide
