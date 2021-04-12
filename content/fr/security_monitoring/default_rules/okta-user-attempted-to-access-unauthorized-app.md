---
aliases:
  - /fr/59a-cl0-v2r
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
source: okta
title: Un utilisateur Okta a tenté d'accéder à une app non autorisée
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un utilisateur se voit refuser l'accès à une app.

### Stratégie
Cette règle vous permet de surveiller l'événement Okta suivant afin de détecter lorsqu'un utilisateur se voit refuser l'accès à une app :

* `app.generic.unauth_app_access_attempt`

### Triage et réponse
1. Déterminer si un utilisateur peut accéder ou non à l'app en question.
2. Contacter l'utilisateur pour déterminer s'il a bien essayé d'accéder à cette app ou si la sécurité de son compte est compromise.