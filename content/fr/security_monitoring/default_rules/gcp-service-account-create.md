---
aliases:
  - /fr/c19-1d0-3b1
disable_edit: true
kind: documentation
rule_category:
  - Log Detection
scope: gcp.service.account
security: compliance
source: gcp
title: Compte de service GCP créé
type: security_rules
---
## Présentation

### Objectif
Détecter la création d'un compte de service GCP.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités d'administration GCP afin d'identifier la création d'un compte de service.

### Triage et réponse
1. Contacter l'utilisateur ayant créé le compte de service, puis s'assurer que le compte est nécessaire et que le rôle est correctement configuré.