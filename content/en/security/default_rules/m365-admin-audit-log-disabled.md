---
aliases:
- 1bw-akj-fk6
- /security_monitoring/default_rules/1bw-akj-fk6
- /security_monitoring/default_rules/m365-admin-audit-log-disabled
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: microsoft-365
security: attack
source: microsoft-365
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Microsoft 365 Audit Logging Disabled
type: security_rules
---

## Goal
Detect when admin or unified audit logging is disabled. An adversary or insider threat can disable audit logging as a means of defense evasion.

## Strategy
Monitor Microsoft 365 audit logs to look for events with an `@evt.name` value of `Set-AdminAuditLogConfig`, where `@Parameters.AdminAuditLogEnabled` OR `@Parameters.UnifiedAuditLogIngestionEnabled` is set to `False`.

## Triage and response
1. Determine if the user `{{@usr.email}}` intended to disable audit logging.
2. If `{{@usr.email}}` is not responsible for disabling the audit logging, investigate `{{@usr.email}}` for anomalous activity. If necessary, initiate your company's incident response (IR) process.
