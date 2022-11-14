---
aliases:
- zb7-axd-ee5
- /security_monitoring/default_rules/zb7-axd-ee5
- /security_monitoring/default_rules/gsuite-forwarding-email-non-workspace-domain
disable_edit: true
integration_id: gsuite
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gsuite
security: attack
source: gsuite
tactic: TA0009-collection
technique: T1114-email-collection
title: Google Workspace user forwarding email out of non Google Workspace domain
type: security_rules
---

## Goal
Create a signal when Google Workspace detects a user setting up mail forwarding to a non-Google Workspace domain.

## Strategy
Monitor Google Workspace logs to detect when `email_forwarding_out_of_domain` events.

## Triage and response
1. Determine if the email address defined in `@event.parameters.email_forwarding_destination_address` is legitimate.
2. If the forwarding destination address is not legitimate, review all activity for `{{@usr.email}}` and all activity around the following IP: `{{@network.client.ip}}`.
