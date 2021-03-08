---
aliases:
  - /fr/37f-a98-5cd
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
source: kubernetes
title: Requête anonyme autorisée
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un utilisateur de requête non authentifié est autorisé dans Kubernetes.

### Stratégie
Cette règle surveille lorsqu'une action est autorisée (`@http.status_code:[100 TO 299]`) pour un utilisateur non authentifié (`@user.username:\"system:anonymous\"`).
L'endpoint `/healthz` est généralement accessible sans authentification et est exclu du filtre de requête.

### Triage et réponse
1. Passer en revue tous les chemins HTTP accédés et déterminer si l'un d'entre eux doit être autorisé pour les utilisateurs non authentifiés.
2. Déterminer les adresses IP qui ont accédé à des endpoints Kubernetes pouvant contenir des données sensibles.