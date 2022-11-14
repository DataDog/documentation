---
aliases:
- g3k-7d3-mcx
- /security_monitoring/default_rules/g3k-7d3-mcx
- /security_monitoring/default_rules/azure-cosmosdb-user-listed-access-keys
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
title: Azure user viewed CosmosDB access keys
type: security_rules
---

## Goal
Detect when a user successfully requests to view a CosmoDB access key with the Azure API. An attacker with the appropriate privileges can view an access key and use it to access and manage the CosmoDB database. 

## Strategy
Monitor Azure CosmoDB logs where `@evt.name` is `"MICROSOFT.DOCUMENTDB/DATABASEACCOUNTS/LISTKEYS/ACTION\"` and `@evt.outcome` is `Success`.

## Triage and response
1. Verify that the user (`{{@usr.name}}`) should be viewing the access key for the following CosmoDB database: ({{`@resourceId`}}).
2. If the activity is not expected, investigate the activity around the CosmoDB Database ({{`@resourceId`}}).
