---
aliases:
  - /fr/020-008-4aa
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
source: okta
title: Token d'API Okta créé ou activé
type: security_rules
---
## Présentation

### Objectif
Détecter la création d'un token d'API Okta.

### Stratégie
Cette règle vous permet de surveiller l'événement Okta suivant afin de détecter si un nouveau token d'API Okta est créé :

* `system.api_token.create`

### Triage et réponse
1. Contacter l'utilisateur ayant créé le token d'API et s'assurer que le token d'API est nécessaire.