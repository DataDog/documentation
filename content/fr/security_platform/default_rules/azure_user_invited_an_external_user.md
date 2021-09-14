---
aliases:
  - /fr/8pu-lqe-4ze
  - /fr/security_monitoring/default_rules/8pu-lqe-4ze
  - /fr/security_monitoring/default_rules/azure_user_invited_an_external_user
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
  - Détection des logs
security: conformité
source: azure
title: Un utilisateur Azure a invité un utilisateur externe
type: security_rules
---
## Objectif

Détecter lorsqu'une invitation est envoyée à un utilisateur externe.

## Stratégie

Surveiller les logs d'audit Azure Active Directory afin de détecter lorsque la valeur de `@evt.name` est égale à `Invite external user` et la valeur de `@evt.outcome` est égale à `success`.

## Triage et réponse

1. Déterminer si l'invitation et son destinataire sont valides.