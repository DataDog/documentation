---
aliases:
  - /fr/8fc-9c9-c02
disable_edit: true
kind: documentation
rule_category:
  - Log Detection
security: compliance
source: gcp
title: Activité de compte de service GCP non autorisée
type: security_rules
---
## Présentation

### Objectif
Détecter toute activité non autorisée provenant d'un compte de service dans GCP

### Stratégie
Surveiller les logs GCP et détecter lorsqu'un compte de service effectue une requête d'API qui renvoie un code de statut égal à `7` dans l'attribut de log `@data.protoPayload.status.code`. Un code le statut `7` indique que le compte de service n'était pas autorisé à effectuer l'appel d'API.

### Triage et réponse
1. Identifier le compte de service à l'origine des appels non autorisés.
2. Vérifier que les autorisations IAM sont bien configurées ou que le compte de service n'a pas été compromis à la suite d'une attaque.