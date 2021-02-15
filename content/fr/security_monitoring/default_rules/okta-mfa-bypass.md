---
aliases:
  - /fr/8c6-2a6-515
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
source: okta
title: Tentative de contournement de l'authentification multifacteur MFA
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un utilisateur essaie de contourner l'authentification multifacteur.

### Stratégie
Cette règle vous permet de surveiller l'événement Okta suivant afin de détecter lorsqu'un utilisateur essaie de contourner l'authentification multifacteur :

* `user.mfa.attempt_bypass`

### Triage et réponse
1. Contacter l'utilisateur ayant essayé de contourner l'authentification multifacteur et vérifier la légitimité de la requête.