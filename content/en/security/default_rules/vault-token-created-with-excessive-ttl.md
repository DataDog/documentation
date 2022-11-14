---
aliases:
- vih-ylo-wbc
- /security_monitoring/default_rules/vih-ylo-wbc
- /security_monitoring/default_rules/vault-token-created-with-excessive-ttl
disable_edit: true
integration_id: vault
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: vault
security: attack
source: vault
tactic: TA0003-persistence
title: Vault Token Created with Excessive TTL
type: security_rules
---

## Goal
Detect when a vault token is created with an excessive time-to-live (TTL) which can be indicative of an adversary maintaining persistence. 

## Strategy
Monitoring of vault audit logs where tokens are created with a time-to-live greater than 90000 seconds (25 hours). If the TTL requires modification, clone this rule and update `@auth.token_ttl:>90000` in the query. 

## Triage & Response
1. Verify max TTL for tokens in the appropriate Vault configuration.
2. If the max TTL is higher than required, modify the max TTL.
3. Verify with the token creator to confirm that the high TTL token is legitimate.
4. Revoke the token if it does not have a legitimate use case.
