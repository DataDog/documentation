---
aliases:
- e07-736-rty
- /security_monitoring/default_rules/e07-736-rty
- /security_monitoring/default_rules/salesforce-anomalous-amount-of-records-deleted
disable_edit: true
integration_id: salesforce
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: salesforce
security: attack
source: salesforce
tactic: TA0040-impact
technique: T1485-data-destruction
title: Anomalous amount of Salesforce records deleted
type: security_rules
---

## Goal
Detect when there is a significant increase in deleted records in Salesforce.

## Strategy
Inspect and baseline Salesforce logs and determine if there is a significant increase in successful (`@evt.outcome:Success`) delete operations (`@operation:Delete`).

## Triage and response
1. Determine if the user should be legitimately deleting Salesforce records.
