---
aliases:
  - /fr/c19-1d0-3b1
  - /fr/security_monitoring/default_rules/c19-1d0-3b1
  - /fr/security_monitoring/default_rules/gcp-service-account-create
disable_edit: true
integration_id: gcp.service.account
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.service.account
security: conformité
source: gcp
title: Compte de service GCP créé
type: security_rules
---
### Objectif
Détecter la création d'un compte de service GCP.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités d'administration GCP afin d'identifier la création d'un compte de service.

### Triage et réponse
1. Contacter l'utilisateur ayant créé le compte de service, puis s'assurer que le compte est nécessaire et que le rôle est correctement configuré.