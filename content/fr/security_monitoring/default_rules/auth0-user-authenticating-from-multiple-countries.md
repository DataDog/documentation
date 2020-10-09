---
aliases:
  - /fr/820-088-db1
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: attack
source: auth0
tactic: TA0006-credential-access
title: Authentification d'un utilisateur Auth0 depuis plusieurs pays différents
type: security_rules
---
## Présentation

## **Objectif :**
Détecter les cas où un même utilisateur se connecte depuis plusieurs pays différents dans un bref laps de temps.

## **Stratégie :**
Utiliser les données GeoIP pour détecter les cas où un utilisateur se connecte depuis deux adresses IP correspondant à deux pays différents dans un bref laps de temps.

## **Triage et réponse :**
1. Vérifier si la double authentification a été utilisée.
2. Contacter l'utilisateur pour déterminer si ce comportement est normal.
3. Si le compte de l'utilisateur a été compromis, réinitialiser ses identifiants.