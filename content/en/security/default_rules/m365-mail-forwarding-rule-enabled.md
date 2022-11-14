---
aliases:
- lw7-2vm-4tl
- /security_monitoring/default_rules/lw7-2vm-4tl
- /security_monitoring/default_rules/m365-mail-forwarding-rule-enabled
disable_edit: true
integration_id: exchange-server
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: exchange-server
security: attack
source: microsoft-365
tactic: TA0003-persistence
technique: T1137-office-application-startup
title: Exchange Online mail forwarding rule enabled
type: security_rules
---

## Goal
Detect when a user sets up a mail forwarding rule to another email address. An adversary or insider threat could set a forwarding rule to forward all emails to an external email address.

## Strategy
Monitor Microsoft 365 audit logs to look for events with `@evt.name` value of `Set-Mailbox`, where a value is set for `@Parameters.ForwardingSmtpAddress` and the `@evt.outcome` is `True`.

## Triage and response
1. Inspect the `@Parameters.ForwardingSmtpAddress` for `{{@usr.email}}` to see if it is sending email to an external non-company owned domain.
2. Determine if there is a legitimate use case for the mail forwarding rule.
3. If `{{@usr.email}}` is not aware of the mail forwarding rule, investigate all `{{@usr.email}}` accounts for anomalous activity.
