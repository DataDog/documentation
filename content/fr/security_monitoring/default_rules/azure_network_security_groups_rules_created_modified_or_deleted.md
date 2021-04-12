---
aliases:
  - /fr/rzw-eru-lnp
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: compliance
source: azure
title: "Création, modification ou suppression de règles ou de groupes Azure\_Network\_Security"
type: security_rules
---
## Présentation

## Objectif

Détecter la création, modification ou suppression d'un groupe ou d'une règle Azure Network Security.

## Stratégie

Surveiller les logs d'activité Azure afin de détecter lorsque `@evt.name` prend pour valeur l'un des noms suivants :
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/DELETE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

et lorsque `@evt.outcome` a pour valeur `Success`.

## Triage et réponse

1. Inspecter le groupe ou la règle de sécurité pour déterminer si cet élément expose malencontreusement des ressources Azure.