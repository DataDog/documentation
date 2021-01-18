---
aliases:
  - /fr/w6m-rmy-hra
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: attaque
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Échec explicite de l'authentification multifacteur pour une connexion Azure
type: security_rules
---
## Présentation

## Objectif

Détecter et identifier l'adresse IP du réseau lorsque des tentatives d'authentification multifacteur ont échoué pour plusieurs comptes utilisateur.

## Stratégie

Surveiller les logs de connexion d'Azure Active Directory afin de détecter lorsque la valeur de `@evt.category` est égale à `SignInLogs`, la valeur de `@properties.authenticationRequirement` est égale à `multiFactorAuthentication` et la valeur de `@evt.outcome` est égale à `failure`.

## Triage et réponse

1. Passer en revue les logs pour déterminer s'il s'agit d'une tentative de connexion valide.
2. Si la sécurité de l'utilisateur est compromise, réinitialiser ses identifiants.