---
aliases:
  - /fr/6f0-939-666
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: attack
source: auth0
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: Connexion d'un utilisateur Auth0 avec un mot de passe volé
type: security_rules
---
## Présentation

## **Objectif :**
Détecter lorsqu'un utilisateur se connecte avec un mot de passe volé.

## **Stratégie :**
Auth0 enregistre un événement lorsqu'un utilisateur se connecte en utilisant un mot de passe volé. Lors de la détection de cet événement, Datadog génère un signal de sécurité de sévérité `MEDIUM`.

Pour en savoir plus sur la détection des mots de passe volés par Auth0, consultez la [documentation][1].

## **Triage et réponse :**
1. Inspecter la stratégie et l'emplacement de l'utilisateur pour vérifier que la connexion a eu lieu depuis un emplacement approuvé.
2. Vérifier si la double authentification a été utilisée.
3. Si le compte utilisateur a été compromis, réinitialiser ses identifiants.

[1][https://auth0.com/docs/anomaly-detection/brute-force-protection]