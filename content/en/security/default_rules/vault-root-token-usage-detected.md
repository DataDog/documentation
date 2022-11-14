---
aliases:
- d6v-ktd-7pk
- /security_monitoring/default_rules/d6v-ktd-7pk
- /security_monitoring/default_rules/vault-root-token-usage-detected
disable_edit: true
integration_id: vault
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: vault
source: vault
title: Vault Root Token
type: security_rules
---

## Goal
Detect when a vault root token is used. Root tokens can perform any activity and have the highest level of privileges in Vault and should only be used in emergencies. 

## Strategy
This rule monitors Vault Audit Logs (`source:vault`) to detect when `root` is seen in:

* auth policy (`@auth.policies`)

This rule also monitors the API endpoint `/sys/generate-root` which is used to create new root keys.

## Triage & Response
1. Determine who created the root token and when. You can get token creation time using the token accessor with `vault token lookup -accessor <accessor>`. 
2. Inspect the requests made with the root token and ensure that its usage is valid.
3. Ensure that after the root token is no longer needed, it is revoked (`vault token revoke -accessor <token>`).

## Change Log
* 29 June 2022 - Updated queries to reduce noise levels. Replaced initial query with token creation detection.
* 17 October 2022 - Updated queries and cases.
