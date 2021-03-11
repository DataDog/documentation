---
aliases:
  - /fr/8pu-lqe-4ze
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: compliance
source: azure
title: Un utilisateur Azure a invité un utilisateur externe
type: security_rules
---
## Présentation

## Objectif

Détecter lorsqu'une invitation est envoyée à un utilisateur externe.

## Stratégie

Surveiller les logs d'audit Azure Active Directory afin de détecter lorsque la valeur de `@evt.name` est égale à `Invite external user` et la valeur de `@evt.outcome` est égale à `success`.

## Triage et réponse

1. Déterminer si l'invitation et son destinataire sont valides.