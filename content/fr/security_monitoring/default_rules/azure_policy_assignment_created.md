---
aliases:
  - /fr/f72-zu8-tjj
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: conformité
source: azure
title: Affectation de stratégie Azure créée
type: security_rules
---
## Présentation

## Objectif

Détecter lorsqu'une affectation de stratégie Azure a été créée.

## Stratégie

Surveiller les logs d'activité Azure afin de détecter lorsque la valeur de `@evt.name` est égale à `MICROSOFT.AUTHORIZATION/POLICYASSIGNMENTS/WRITE` et la valeur de `@evt.outcome` est égale à `Success`.

## Triage et réponse

1. Passer en revue l'affectation de stratégie et déterminer si un changement non désiré a été apporté aux ressources Azure.