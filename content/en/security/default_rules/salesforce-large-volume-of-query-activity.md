---
aliases:
- cz6-1ud-98v
- /security_monitoring/default_rules/cz6-1ud-98v
- /security_monitoring/default_rules/salesforce-large-volume-of-query-activity
disable_edit: true
integration_id: salesforce
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: salesforce
security: attack
source: salesforce
tactic: TA0010-exfiltration
title: Anomalous amount of Salesforce query results
type: security_rules
---

## Goal
Detect when there is a spike in Salesforce query results for a user. A large query can be an early warning sign of a user attempting to exfiltrate Salesforce data. 

## Strategy
Inspect and baseline Salesforce logs and determine if there is a spike in the number of rows returned (`@rows_returned`). 

## Triage and response
1. Determine if the user should be legitimately performing large queries.
