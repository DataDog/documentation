---
aliases:
- zax-6ov-em2
- /security_monitoring/default_rules/zax-6ov-em2
- /security_monitoring/default_rules/azure-cosmosdb-user-listed-connectionstrings
disable_edit: true
integration_id: azure-cosmosdb
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure-cosmosdb
security: attack
source: azure
tactic: TA0007-discovery
technique: T1580-cloud-infrastructure-discovery
title: Azure user viewed CosmosDB connection string
type: security_rules
---

## Goal
Detect when a user successfully requests to view a CosmoDB connection string with the Azure API. An attacker with the appropriate privileges can view a connection string and use it to access or modify data in the CosmoDB database. 

## Strategy
Monitor Azure CosmoDB logs where `@evt.name` is `"MICROSOFT.DOCUMENTDB/DATABASEACCOUNTS/LISTCONNECTIONSTRINGS/ACTION"` and `@evt.outcome` is `Success`.

## Triage and response
1. Verify that the user (`{{@usr.name}}`) should be viewing the connection string for the following CosmoDB database: ({{`@resourceId`}}).
2. If the activity is not expected, investigate the activity around the CosmoDB ({{`@resourceId`}}).
