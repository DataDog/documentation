---
aliases:
  - /fr/ljt-3f4-8ty
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Attaque par credential stuffing sur Azure
type: security_rules
---
## Présentation

## Objectif

Détecter et identifier l'adresse IP du réseau lorsque des tentatives de connexion sont enregistrées pour plusieurs comptes utilisateur.

## Stratégie

Surveiller votre déploiement Azure Active Directory afin de détecter lorsque la valeur de `@evt.category` correspond à `SignInLogs` et lorsqu'au moins un `@evt.outcome` initié depuis la même adresse IP de réseau a pour valeur `false`.

Le signal de sécurité renvoie **HIGH** lorsque `@evt.outcome` a pour valeur `success` après plusieurs échecs de connexion initiés depuis la même adresse IP de de réseau.

## Triage et réponse

1. Passer en revue les logs pour déterminer s'il s'agit d'une tentative de connexion valide.
2. Si la sécurité de l'utilisateur est compromise, réinitialiser ses identifiants.