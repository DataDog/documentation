---
aliases:
  - /fr/rzw-eru-lnp
  - /fr/security_monitoring/default_rules/rzw-eru-lnp
  - /fr/security_monitoring/default_rules/azure_network_security_groups_rules_created_modified_or_deleted
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
  - Détection des logs
security: conformité
source: azure
title: "Création, modification ou suppression de règles ou de groupes Azure\_Network\_Security"
type: security_rules
---
## Objectif

Détecter la création, modification ou suppression d'un groupe ou d'une règle Azure Network Security.

## Stratégie

Surveiller les logs d'activité Azure afin de détecter lorsque `@evt.name` prend pour valeur l'un des noms suivants :
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/DELETE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

et lorsque la valeur de `@evt.outcome` est égale à `Success`.

## Triage et réponse

1. Inspecter le groupe ou la règle de sécurité pour déterminer si cet élément expose malencontreusement des ressources Azure.