---
aliases:
  - /fr/aoc-jdx-q3d
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: conformité
source: azure
title: Règles de pare-feu pour le serveur SQL Azure créée ou modifiée
type: security_rules
---
## Présentation

## Objectif

Détecter la création, modification ou suppression d'une règle Azure Network Security.

## Stratégie

Surveiller les logs d'activité Azure afin de détecter lorsque la valeur de `@evt.name` est égale à l'un des éléments suivants :
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

et lorsque la valeur de `@evt.outcome` est égale à `Success`.

## Triage et réponse

1. Passer en revue la règle de sécurité afin de déterminer si elle expose malencontreusement des ressources Azure.