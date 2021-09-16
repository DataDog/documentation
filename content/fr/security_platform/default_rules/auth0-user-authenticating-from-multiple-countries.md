---
aliases:
  - /fr/820-088-db1
  - /fr/security_monitoring/default_rules/820-088-db1
  - /fr/security_monitoring/default_rules/auth0-user-authenticating-from-multiple-countries
disable_edit: true
integration_id: auth0
kind: documentation
rule_category:
  - Détection des logs
security: attaque
source: auth0
tactic: TA0006-credential-access
title: Authentification d'un utilisateur Auth0 depuis plusieurs pays différents
type: security_rules
---
## **Objectif :**
Détecter les cas où un même utilisateur se connecte depuis plusieurs pays différents dans un bref laps de temps.

## **Stratégie :**
Utiliser les données GeoIP pour détecter les cas où un utilisateur se connecte depuis deux adresses IP correspondant à deux pays différents dans un bref laps de temps.

## **Triage et réponse :**
1. Vérifier si la double authentification a été utilisée.
2. Contacter l'utilisateur pour déterminer si ce comportement est normal.
3. Si le compte de l'utilisateur a été compromis, réinitialiser ses identifiants.